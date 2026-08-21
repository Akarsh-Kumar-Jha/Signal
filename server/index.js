import { Annotation, START, END, StateGraph } from "@langchain/langgraph";
import { PromptTemplate } from "@langchain/core/prompts";
import * as z from "zod";
import { ChatGroq } from "@langchain/groq";
import { ChatOpenRouter } from "@langchain/openrouter";
import dotenv from "dotenv";
import { tool } from "langchain";
import { tavily } from "@tavily/core";
import Exa from "exa-js";
import GNews from "@gnews-io/gnews-io-js";

dotenv.config();

const groq_model = new ChatGroq({
  model: "openai/gpt-oss-120b",
});
const open_model = new ChatOpenRouter({
  model: "nvidia/nemotron-3.5-lightning",
});

const Tavily_Client = tavily({ apiKey: process.env.TAVILY_API_KEY });
const exa_client = new Exa(process.env.EXA_API_KEY);
const g_news_client = new GNews(process.env.G_NEWS_API_KEY);

const state = Annotation.Root({
  user_query: Annotation(),
  valid_query: Annotation(),
  clarification: Annotation(),
  multi_queries: Annotation(),
  tavily_results: Annotation(),
  exa_results: Annotation(),
  gnews_results: Annotation(),
  all_articles:Annotation(),
  trend_analysis:Annotation(),
  signal_analysis:Annotation(),
  impact_analysis:Annotation(),
  final_report:Annotation(),
});

const workflow = new StateGraph(state);

const queryValidSchema = z.object({
  valid: z
    .boolean()
    .describe(
      "True if the query is clear and suitable for news or research retrieval; otherwise false.",
    ),

  clarification: z
    .string()
    .nullable()
    .describe(
      "A short clarification question when the query is unclear; otherwise null.",
    ),
});

const validateTemplate = PromptTemplate.fromTemplate(`
Analyze the user's query and determine whether it is clear, understandable, and suitable for news or research retrieval.

If the query is valid, return:
- valid: true
- clarification: null

If clarification is needed, return:
- valid: false
- clarification: a short, helpful clarification question

Do not overcomplicate the validation.

User query: {user_query}
`);

const structuredQueryModel = groq_model.withStructuredOutput(queryValidSchema);

const query_vaild_chain = validateTemplate.pipe(structuredQueryModel);
const validate_query = async (state) => {
  const user_query = state.user_query;

  const valid_model_resp = await query_vaild_chain.invoke({
    user_query: user_query,
  });
  console.log("Query Validator >", valid_model_resp);

  return {
    valid_query: valid_model_resp.valid,
    clarification: valid_model_resp.clarification,
  };
};

const multiQuerySchema = z.object({
  multi_queries: z
    .array(z.string())
    .min(3)
    .max(3)
    .describe(
      "Three , focused, diverse search queries covering different aspects of the user's intent.",
    ),
});

const multiQueryTemplate = PromptTemplate.fromTemplate(`
Analyze the user's query and identify the main intent and the most important information needed to answer it.

Generate exactly 3 search queries. Each query is intended for a specific search provider.

1. Tavily query:
   - Focus on general web information, broad context, background, trends, and supporting information.
   - Create a natural and useful query for general web search.

2. Exa query:
   - Focus on deeper research, authoritative articles, industry analysis, company developments, funding, acquisitions, investments, and detailed information.
   - Create a query suitable for semantic and research-oriented search.

3. GNews query:
   - Focus on finding matching news articles using simple, broad, keyword-based search terms.
   - Use only the most important entities, topics, or keywords from the user's request.
   - Prefer 2 to 6 meaningful keywords.
   - Do NOT include unnecessary dates, months, years, "latest", "today", "breaking", or multiple unrelated concepts unless they are essential to the user's query.
   - Do NOT make the query overly specific.
   - Do NOT combine too many conditions such as funding, acquisitions, investments, regulations, and news in one query.
   - Choose the single most newsworthy aspect of the user's request.
   - The GNews API will handle recency through its news index, so the search query itself should focus primarily on the topic.

Requirements:
- Generate exactly 3 queries.
- Each query must have a different purpose.
- Avoid repeating similar queries.
- Keep queries concise and specific to the search provider.
- Return only the three search queries in the required structured format.

The order MUST be:

1. Tavily query
2. Exa query
3. GNews query

User query: {user_query}

Current date: {current_date}
`);

const structuredMultiQueryModel =
  groq_model.withStructuredOutput(multiQuerySchema);

const multiQueryChain = multiQueryTemplate.pipe(structuredMultiQueryModel);

const generateMultiQuery = async (state) => {
  const today = new Date();

  const currentDate = today.toLocaleDateString("en-GB");

  console.log("Current date:", currentDate);

  const userQuery = state.user_query;

  const multiQueryModelResp = await multiQueryChain.invoke({
    user_query: userQuery,
    current_date: currentDate,
  });

  console.log("\nMulti-query response:", multiQueryModelResp);

  return {
    multi_queries: multiQueryModelResp.multi_queries,
  };
};

// tavily_results: Annotation(),
//   exa_results: Annotation(),
//   gnews_results: Annotation(),

const tavily_node = async (state) => {
  const multi_queries = state.multi_queries;

  const query = multi_queries[0];
  const tavily_resp = await Tavily_Client.search(query, {
    searchDepth: "basic",
  });
  //   console.log(" Tavily Response >", tavily_resp);
  return {
    tavily_results: tavily_resp.results,
  };
};

const exa_node = async (state) => {
  const multi_queries = state.multi_queries;
  const query = multi_queries[1];
  const result = await exa_client.search(query, {
    numResults: 5,
    type: "auto",
    contents: {
      highlights: true,
    },
  });

  //   console.log("\n Exa Response >", result);

  return {
    exa_results: result.results,
  };
};

const g_news_node = async (state) => {
  const multi_queries = state.multi_queries;
  const query = multi_queries[2];
  const result = await g_news_client.search(query, {
    lang: "en",
    max: 5,
  });

  //   console.log('\n G_News Resp >',result);
  return {
    gnews_results: result.articles,
  };
};
workflow.addNode("QUERY_VALIDATOR", validate_query);
workflow.addNode("MULTI_QUERY_GENERATOR", generateMultiQuery);
workflow.addNode("Tavily_Node", tavily_node);
workflow.addNode("Exa_Node", exa_node);
workflow.addNode("G_NEWS_NODE", g_news_node);

workflow.addEdge(START, "QUERY_VALIDATOR");
workflow.addConditionalEdges(
  "QUERY_VALIDATOR",
  async (state) => {
    const { valid_query, clarification } = state;
    if (!valid_query || clarification) {
      return "end";
    }
    return "MULTI_QUERY_GENERATOR";
  },
  {
    end: END,
    MULTI_QUERY_GENERATOR: "MULTI_QUERY_GENERATOR",
  },
);

const combiner = async (state) => {
  const { tavily_results, gnews_results, exa_results } = state;

  let all_articles = tavily_results.map((article) => {
    return {
      tool: "Tavily",
      ...article,
    };
  });

  gnews_results.forEach((article) => {
    all_articles.push({
      tool: "G News",
      ...article,
    });
  });

  exa_results.forEach((article) => {
    all_articles.push({
      tool: "Exa",
      ...article,
    });
  });

  console.log("\n All Articles >", all_articles);

    return {
       all_articles:all_articles
    };
};

const trend_analysis_schema = z.object({
  trends: z
    .array(
      z.object({
        title: z.string().describe("Short name of the identified trend"),

        direction: z
          .enum(["growing", "stable", "declining", "emerging"])
          .describe("Current direction or momentum of the trend"),

        strength: z
          .enum(["high", "medium", "low"])
          .describe("Strength based on repetition and supporting evidence"),

        explanation: z
          .string()
          .describe("Clear explanation of what pattern or trend is happening"),

        evidence: z
          .array(
            z.object({
              article_title: z.string(),
              source: z.string(),
              url: z.string(),
            }),
          )
          .max(5)
          .describe("Articles supporting this trend"),
      }),
    )
    .max(8)
    .describe("Important trends detected across the articles"),

  overall_momentum: z
    .enum(["strong_growth", "moderate_growth", "stable", "declining", "mixed"])
    .describe("Overall momentum of the topic"),

  key_shift: z
    .string()
    .describe(
      "The single most important shift or change detected across the articles",
    ),

  summary: z
    .string()
    .describe("Short overall summary of the major trends and patterns"),
});

const trend_template = PromptTemplate.fromTemplate(`
    You are the Trend Analysis engine for SignalAI.

Your job is to analyze the provided collection of news and research articles and identify meaningful patterns, trends, momentum changes, and important shifts.

Do NOT summarize every article individually.

Instead, analyze the collection as a whole.

Identify:

- Topics or developments appearing repeatedly across multiple independent sources
- Topics showing increasing attention or momentum
- Emerging developments that may become more important
- Stable or declining topics when supported by the evidence
- Important shifts in the overall direction of the topic

Rules:

1. Do not treat duplicate or repeated coverage of the same event as a trend.
2. A trend should ideally be supported by multiple articles or independent sources.
3. Distinguish between:
   - growing
   - stable
   - declining
   - emerging
4. Do not invent trends that are not supported by the articles.
5. Prefer meaningful industry, market, technology, policy, or behavioral shifts.
6. Use specific evidence from the provided articles.
7. Keep explanations concise and analytical.
8. Focus on what is changing, not just what happened.

Determine the overall momentum of the topic and identify the single most important shift.

Analyze the following articles:

{all_articles}

Return the result strictly according to the provided schema.
    `);

const str_trend_model = open_model.withStructuredOutput(trend_analysis_schema);
const trend_chain = trend_template.pipe(str_trend_model);
const trend_node = async (state) => {
  console.log('\n___________________________Trend Node Invoked___________________________\n');
  const all_articles = state.all_articles;

  const trend_result = await trend_chain.invoke({
    all_articles:all_articles
  });

  // console.log('\n Trend Resp >');
  // console.dir(trend_result);

  return {
        trend_analysis:trend_result
  }
};

const signal_detection_schema = z.object({
  signals: z
    .array(
      z.object({
        id: z
          .string()
          .describe("Unique short signal identifier"),

        title: z
          .string()
          .describe("Short and clear title describing the signal"),

        type: z
          .enum([
            "major_change",
            "emerging_opportunity",
            "industry_movement",
            "important_event",
            "early_signal",
            "risk",
          ])
          .describe("The category of signal"),

        explanation: z
          .string()
          .describe(
            "Explain what meaningful development or change has been detected"
          ),

        signal_strength: z
          .enum(["strong", "moderate", "weak"])
          .describe(
            "Strength of the signal based on evidence and source coverage"
          ),

        confidence: z
          .enum(["high", "medium", "low"])
          .describe(
            "Confidence based on evidence quality and agreement between sources"
          ),

        evidence: z
          .array(
            z.object({
              article_title: z.string(),
              source: z.string(),
              url: z.string(),
              reason: z
                .string()
                .describe(
                  "Brief explanation of how this article supports the signal"
                ),
            })
          )
          .min(1)
          .max(5),

        why_it_is_a_signal: z
          .string()
          .describe(
            "Explain why this development stands out from ordinary news or noise"
          ),
      })
    )
    .max(8)
    .describe("Meaningful signals detected from the article collection"),

  strongest_signal: z
    .string()
    .describe("ID of the strongest signal"),

  analysis_summary: z
    .string()
    .describe(
      "Short summary of the most important signals found"
    ),
});
const signal_template = PromptTemplate.fromTemplate(`
    You are the Signal Detection engine for SignalAI.

SignalAI does not simply summarize news.

Your job is to find the meaningful signals hidden inside the noise.

Analyze the provided collection of articles and identify developments that indicate something important may be changing, emerging, accelerating, weakening, or becoming strategically significant.

A signal may represent:

- A major change
- An emerging opportunity
- A growing industry movement
- An important event with wider implications
- An early or weak development worth watching
- A potential risk

A signal is NOT simply a headline.

Multiple articles about the same event should be treated as supporting evidence for one stronger signal, not multiple separate signals.

For each signal:

- Give it a short and meaningful title.
- Explain what is actually happening.
- Explain why this stands out from ordinary news.
- Evaluate signal strength based on the amount and quality of supporting evidence.
- Evaluate confidence based on source agreement and evidence quality.
- Include only the most relevant supporting articles.

Rules:

1. Avoid creating a signal for every article.
2. Merge repeated coverage of the same development.
3. Do not confuse popularity or repeated reporting with importance.
4. Prefer developments with broader implications.
5. Early signals are allowed, but clearly mark them as weak or low confidence when evidence is limited.
6. Do not invent information beyond the provided articles.
7. Keep the output analytical, concise, and evidence-based.
8. Focus on "what is changing?" and "why should someone pay attention?"

Analyze these articles:

{all_articles}

Return the result strictly according to the provided schema.
`);

const str_signal_model = open_model.withStructuredOutput(signal_detection_schema);
const signal_chain = signal_template.pipe(str_signal_model);
const signal_node = async(state) => {
  console.log('\n________________Signal Node Invoked______________________\n');
  const all_articles = state.all_articles;
  const signal_model_resp = await signal_chain.invoke({
      all_articles:all_articles
  });

  // console.log('\n Signal Model Res >',signal_model_resp);

  return {
        signal_analysis:signal_model_resp
  };
    
};


const impact_analysis_schema = z.object({
  impacts: z
    .array(
      z.object({
        title: z
          .string()
          .describe("Short title of the important development"),

        development: z
          .string()
          .describe(
            "The specific development identified from the articles"
          ),

        why_it_matters: z
          .string()
          .describe(
            "Explain clearly why this development matters"
          ),

        affected_groups: z
          .array(z.string())
          .max(6)
          .describe(
            "Groups, industries, companies, users, or stakeholders affected"
          ),

        implications: z
          .array(z.string())
          .max(5)
          .describe(
            "Possible implications supported or reasonably inferred from the evidence"
          ),

        impact_level: z
          .enum(["high", "medium", "low"])
          .describe("Overall importance of the development"),

        time_horizon: z
          .enum(["immediate", "short_term", "long_term", "uncertain"])
          .describe(
            "When the main impact is likely to matter"
          ),

        confidence: z
          .enum(["high", "medium", "low"])
          .describe(
            "Confidence in the impact assessment based on available evidence"
          ),

        supporting_sources: z
          .array(
            z.object({
              article_title: z.string(),
              source: z.string(),
              url: z.string(),
            })
          )
          .min(1)
          .max(5),
      })
    )
    .max(8),

  highest_impact_development: z
    .string()
    .describe(
      "Title of the development with the greatest potential impact"
    ),

  overall_implication: z
    .string()
    .describe(
      "The most important overall implication across all analyzed developments"
    ),
});


const impact_template = PromptTemplate.fromTemplate(`
    You are the Impact Analysis engine for SignalAI.

Your primary job is to answer:

"So what?"

Analyze the provided collection of articles and identify the developments that have the most meaningful consequences.

Do not simply repeat what happened.

For each important development, determine:

- Why does this matter?
- Who could be affected?
- What could change as a result?
- What are the most reasonable implications?
- How important is this development?

Classify impact as:

HIGH:
A development with potentially broad, significant, strategic, economic, technological, regulatory, or societal consequences.

MEDIUM:
A meaningful development that affects a specific industry, market, group, or area but has limited broader consequences.

LOW:
A development with limited scope or importance.

Also determine the likely time horizon:

- immediate
- short_term
- long_term
- uncertain

Rules:

1. Do not create impacts for every article.
2. Focus on the most important developments.
3. Avoid speculation presented as fact.
4. Clearly distinguish supported implications from uncertain possibilities.
5. Do not exaggerate the importance of minor news.
6. Base confidence on evidence quality and agreement across sources.
7. Focus on consequences, not article summaries.
8. Keep the analysis concise, practical, and useful.

Analyze these articles:

{all_articles}

Return the result strictly according to the provided schema.
  
`);

const str_impact_model = open_model.withStructuredOutput(impact_analysis_schema);

const impact_chain = impact_template.pipe(str_impact_model);


const impact_node = async(state) => {
  console.log('\n___________________________Impact Node Invoked___________________________\n');
  const all_articles = state.all_articles;
  const impact_model_resp = await impact_chain.invoke({
    all_articles:all_articles
  });

  // console.log('\n Imapct Model Resp >');
  // console.dir(impact_model_resp);

  return {
        impact_analysis:impact_model_resp
  };

};


const final_signal_report_schema = z.object({
  big_picture: z
    .string()
    .describe(
      "A concise 2-4 sentence explanation of what is happening overall"
    ),

  what_matters_most: z
    .array(
      z.object({
        id: z
          .string()
          .describe("Unique identifier for this major development"),

        headline: z
          .string()
          .describe("Short and clear headline"),

        what_is_happening: z
          .string()
          .describe(
            "Concise explanation of the unique development"
          ),

        why_it_matters: z
          .string()
          .describe(
            "Clear explanation of why this development is important"
          ),

        impact: z
          .enum(["high", "medium", "low"])
          .describe("Overall importance level"),

        confidence: z
          .enum(["high", "medium", "low"])
          .describe("Confidence based on available evidence"),

        evidence_summary: z
          .string()
          .describe(
            "Brief summary of the evidence supporting this development"
          ),

        supporting_sources: z
          .array(
            z.object({
              title: z.string(),
              source: z.string(),
              url: z.string(),
              publishedAt: z.string().nullable(),
            })
          )
          .min(1)
          .max(5)
          .describe(
            "Relevant and non-duplicate sources supporting this development"
          ),
      })
    )
    .min(1)
    .max(5)
    .describe(
      "The most important unique developments, ranked by importance"
    ),

  emerging_trends: z
    .array(
      z.object({
        title: z.string(),

        direction: z.enum([
          "growing",
          "stable",
          "declining",
          "emerging",
        ]),

        explanation: z.string(),

        confidence: z.enum([
          "high",
          "medium",
          "low",
        ]),
      })
    )
    .max(6)
    .describe(
      "Unique trends that provide additional context without duplicating major developments"
    ),

  noise_vs_signal: z.object({
    signal_percentage: z
      .number()
      .min(0)
      .max(100),

    noise_percentage: z
      .number()
      .min(0)
      .max(100),

    signal_summary: z
      .array(z.string())
      .max(5)
      .describe(
        "Important types of developments considered meaningful signals"
      ),

    noise_summary: z
      .array(z.string())
      .max(5)
      .describe(
        "Types of repeated, duplicate, low-value, or less relevant information"
      ),

    reasoning: z
      .string()
      .describe(
        "Brief explanation of how the signal versus noise assessment was determined"
      ),
  }),

  contradictions_or_uncertainty: z
    .array(
      z.object({
        topic: z.string(),

        uncertainty_type: z.enum([
          "conflicting_reports",
          "mixed_evidence",
          "limited_evidence",
          "uncertain_outcome",
        ]),

        explanation: z.string(),

        possible_reason: z
          .string()
          .nullable(),

        confidence: z.enum([
          "high",
          "medium",
          "low",
        ]),

        supporting_sources: z
          .array(
            z.object({
              title: z.string(),
              source: z.string(),
              url: z.string(),
            })
          )
          .max(5),
      })
    )
    .max(5)
    .describe(
      "Conflicting, uncertain, or incomplete information detected in the available evidence"
    ),

  what_to_watch_next: z
    .array(
      z.object({
        indicator: z
          .string()
          .describe(
            "Specific development or indicator worth monitoring"
          ),

        why_watch: z
          .string()
          .describe(
            "Why this could meaningfully change the current situation"
          ),

        related_to: z
          .string()
          .describe(
            "The signal, trend, or development this relates to"
          ),

        time_horizon: z.enum([
          "immediate",
          "short_term",
          "long_term",
          "ongoing",
        ]),
      })
    )
    .min(3)
    .max(5),

  source_overview: z.object({
    total_articles_analyzed: z.number(),

    total_unique_sources_used: z.number(),

    selected_sources: z
      .array(
        z.object({
          title: z.string(),
          source: z.string(),
          url: z.string(),
          publishedAt: z.string().nullable(),
        })
      )
      .max(15)
      .describe(
        "The most useful and relevant unique sources used in the final report"
      ),
  }),
});

const final_report_template = PromptTemplate.fromTemplate( `
  
  You are the Final Signal Intelligence Report generator for SignalAI.

Your job is to synthesize the results of multiple independent analysis systems into one clear, evidence-based, non-duplicative Signal Intelligence Report.

You will receive:

1. The user's original query
2. The retrieved and normalized articles
3. Trend analysis
4. Signal detection analysis
5. Impact analysis

Your goal is NOT to simply combine these outputs.

You must intelligently synthesize them.

━━━━━━━━━━━━━━━━━━━━━━
CORE PRINCIPLE
━━━━━━━━━━━━━━━━━━━━━━

SignalAI finds the signal hidden inside the noise.

The final report must help the user understand:

- What is actually happening?
- What matters most?
- Why does it matter?
- What trends are emerging?
- What information is merely repeated noise?
- What should the user watch next?

━━━━━━━━━━━━━━━━━━━━━━
DEDUPLICATION RULES
━━━━━━━━━━━━━━━━━━━━━━

Before generating the report, internally compare all trends, signals, and impacts.

Different analyses may describe the same underlying development using different wording.

For example:

Trend:
"AI infrastructure investment is increasing."

Signal:
"Major companies are accelerating spending on AI compute."

Impact:
"Compute investment may create a competitive bottleneck."

These should NOT appear as three separate "What Matters Most" items.

They represent one underlying development.

Merge related findings into one unified signal.

A single major development should appear only once in the "What Matters Most" section.

You may use information from trend analysis and impact analysis to enrich that signal.

Do not repeat the same development with slightly different titles.

━━━━━━━━━━━━━━━━━━━━━━
REPORT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━

1. THE BIG PICTURE

Provide a concise 2–4 sentence explanation of the overall situation.

Explain the most important overall pattern or development.

Do not simply summarize individual articles.

━━━━━━━━━━━━━━━━━━━━━━

2. WHAT MATTERS MOST

Select the 3–5 most important UNIQUE developments.

Each development must represent a distinct underlying event, change, trend, or signal.

For each item include:

- Short headline
- What is happening
- Why it matters
- Impact level
- Confidence level
- Supporting sources

Rank items from most important to least important.

Do not include duplicate or overlapping developments.

━━━━━━━━━━━━━━━━━━━━━━

3. EMERGING TRENDS

Show only UNIQUE trends.

Do not repeat trends already fully represented as separate major signals unless the trend provides additional useful context.

Each trend should include:

- Title
- Direction: growing, stable, declining, or emerging
- Short explanation

━━━━━━━━━━━━━━━━━━━━━━

4. NOISE VS SIGNAL

Analyze the article collection and explain:

SIGNAL:
Important developments supported by meaningful evidence.

NOISE:
Duplicate coverage, repeated reports about the same event, minor announcements, low-relevance information, or developments with limited significance.

Estimate:

- Signal percentage
- Noise percentage

The percentages must add up to 100.

Also provide concise explanations of what was considered signal and what was considered noise.

Do not classify an article as noise simply because it comes from a less famous source.

Focus on duplication, relevance, significance, and informational value.

━━━━━━━━━━━━━━━━━━━━━━

5. WHAT TO WATCH NEXT

Generate 3–5 specific indicators or developments worth monitoring.

These should be logically connected to the current analysis.

Examples include:

- Funding announcements
- Regulatory decisions
- Product launches
- Earnings reports
- Policy changes
- Adoption metrics
- Market reactions

Do not make random predictions.

Do not present speculation as fact.

━━━━━━━━━━━━━━━━━━━━━━

6. SOURCE SELECTION

Use only sources from the provided article collection.

Do not invent sources, URLs, article titles, or publication dates.

Select the most relevant and useful sources.

Avoid listing duplicate articles covering the same event unless multiple sources are needed to demonstrate independent confirmation.

━━━━━━━━━━━━━━━━━━━━━━
QUALITY RULES
━━━━━━━━━━━━━━━━━━━━━━

1. Never invent information.
2. Never create duplicate or near-duplicate findings.
3. Merge overlapping trends, signals, and impacts into one unified development.
4. Prefer evidence supported by multiple independent sources.
5. Clearly lower confidence when evidence is weak, limited, or inconsistent.
6. Do not exaggerate the importance of minor news.
7. Keep explanations concise and analytical.
8. Separate facts from reasonable implications.
9. The report should feel like an intelligence briefing, not a news article.
10. Prioritize insight over summarization.
11. Every major development should be meaningfully distinct.
12. If the available information is insufficient, clearly reflect that uncertainty instead of inventing conclusions.

Return the result strictly according to the provided schema.

━━━━━━━━━━━━━━━━━━━━━━
INPUT
━━━━━━━━━━━━━━━━━━━━━━

User Query:
{user_query}

Trend Analysis:
{trend_analysis}

Signal Detection:
{signal_detection}

Impact Analysis:
{impact_analysis}

Available Articles:
{all_articles}
  
`);

// user_query
// generated_queries
// all_articles
// trend_analysis
// signal_detection
// impact_analysis


const str_final_model = open_model.withStructuredOutput(final_signal_report_schema);

const final_chain = final_report_template.pipe(str_final_model);

const final_report = async(state) => {
  console.log('\n__________________________Final Report Node Invoked______________________________\n');
  const {user_query,multi_queries,all_articles,trend_analysis,signal_analysis,impact_analysis} = state;
  const final_report_model_resp = await final_chain.invoke({
    all_articles:all_articles,
    impact_analysis:impact_analysis,
    signal_detection:signal_analysis,
    trend_analysis:trend_analysis,
    user_query:user_query,
    generated_queries:multi_queries
  });

  // console.log('\n\n Final Report >',final_report_model_resp);

  return {
      final_report:final_report_model_resp
  };
}

workflow.addEdge("MULTI_QUERY_GENERATOR", "Tavily_Node");
workflow.addEdge("MULTI_QUERY_GENERATOR", "Exa_Node");
workflow.addEdge("MULTI_QUERY_GENERATOR", "G_NEWS_NODE");
workflow.addNode("COMBINER", combiner);
workflow.addNode("Trend_Analysis_Node", trend_node);
workflow.addNode("Signal_Detection_Node",signal_node);
workflow.addNode("Impact_Analysis_Node",impact_node);
workflow.addNode("Final_Report_Node",final_report);

workflow.addEdge("Tavily_Node", "COMBINER");
workflow.addEdge("Exa_Node", "COMBINER");
workflow.addEdge("G_NEWS_NODE", "COMBINER");
workflow.addEdge("COMBINER","Trend_Analysis_Node");
workflow.addEdge("COMBINER","Signal_Detection_Node");
workflow.addEdge("COMBINER","Impact_Analysis_Node");
workflow.addEdge("Trend_Analysis_Node","Final_Report_Node");
workflow.addEdge("Signal_Detection_Node","Final_Report_Node");
workflow.addEdge("Impact_Analysis_Node","Final_Report_Node");
workflow.addEdge("Final_Report_Node",END);


const graph = workflow.compile();

// const drawableGraph = await graph.getGraphAsync();
// const mermaid = drawableGraph.drawMermaid();

// console.log(mermaid);

const result = await graph.invoke({
  user_query: "What is happening with AI startups in India?",
});

console.log("\n\n\nFinal Result >");
console.dir(result);

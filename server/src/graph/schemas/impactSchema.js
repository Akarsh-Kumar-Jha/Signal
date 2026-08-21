import { PromptTemplate } from "@langchain/core/prompts";
import * as z from "zod";
import { open_model } from "../../config/clients.js";

export const impact_analysis_schema = z.object({
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

export const impact_template = PromptTemplate.fromTemplate(`
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

export const str_impact_model = open_model.withStructuredOutput(impact_analysis_schema);
export const impact_chain = impact_template.pipe(str_impact_model);

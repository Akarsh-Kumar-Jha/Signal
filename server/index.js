import { Annotation, START, END, StateGraph } from "@langchain/langgraph";
import { PromptTemplate } from "@langchain/core/prompts";
import * as z from "zod";
import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import { tool } from "langchain";
import { tavily } from "@tavily/core";
import Exa from "exa-js";
import GNews from "@gnews-io/gnews-io-js";

dotenv.config();

const groq_model = new ChatGroq({
  model: "openai/gpt-oss-120b",
});

const Tavily_Client = tavily({ apiKey: process.env.TAVILY_API_KEY });
const exa_client = new Exa(process.env.EXA_API_KEY);
const g_news_client = new GNews(process.env.G_NEWS_API_KEY);

const state = Annotation.Root({
  user_query: Annotation(),
  valid_query: Annotation(),
  clarification: Annotation(),
  multi_queries: Annotation(),
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
    .max(4)
    .describe(
      "Three to four short, focused, diverse search queries covering different aspects of the user's intent.",
    ),
});

const multiQueryTemplate = PromptTemplate.fromTemplate(`
Analyze the user's query and identify its main intent, topic, and relevant angles.

Generate 3–4 short, focused, and diverse search queries that will help retrieve the most relevant and comprehensive news or research information.

Requirements:
- Each query should explore a different aspect of the user's intent.
- Avoid repeating similar queries.
- Make queries specific and useful for search.
- Use the current date when recency or time context is relevant.
- Do not add explanations or commentary.

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

// const Tavily_Tool = tool(
//   async ({ query }) => {
//     const tavily_resp = await Tavily_Client.search(query, {
//       searchDepth: "basic",
//     });
//     console.log(" Tavily Response >", tavily_resp);
//   },
//   {
//     name: "Tavily",
//     description:
//       "This The Tavily Tool use this for searchimg the web against any query",
//     schema: z.object({
//       query: z.string(),
//     }),
//   },
// );

// const Exa_Tool = tool(
//   async ({ query }) => {
//     const result = await exa_client.search(query, {
//       endPublishedDate: "2026-08-20T18:29:59.999Z",
//       numResults: 10,
//       startPublishedDate: "2026-08-12T18:30:00.000Z",
//       type: "auto",
//       contents: {
//         highlights: true,
//       },
//     });

//     console.log("\n Exa Tool Response >", result);
//   },
//   {
//     name: "Exa",
//     description: "This Tool searches The Web.",
//     schema: z.object({
//       query: z.string(),
//     }),
//   },
// );

// const g_news_tool = tool(async ({query}) => {
//   const result = await g_news_client.search(query, {
//     lang: "en",
//     country: "us", // Optional, country of origin of the source
//     max: 10, // Optional, maximum number of articles to be returned
//     from: "2025-01-01T00:00:00Z", // Optional, minimum publication date (included)
//     to: "2025-12-31T23:59:59Z", // Optional, maximum publication date (included)
//     // ..., any additional parameter specified in the documentation (see https://docs.gnews.io)
//   });
// });

const handover_queries = async (state) => {
  const multi_queries = state.multi_queries;
};
workflow.addNode("QUERY_VALIDATOR", validate_query);
workflow.addNode("MULTI_QUERY_GENERATOR", generateMultiQuery);
workflow.addNode("Handover_Queries", handover_queries);

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
workflow.addEdge("MULTI_QUERY_GENERATOR", END);
const graph = workflow.compile();

// const drawableGraph = await graph.getGraphAsync();
// const mermaid = drawableGraph.drawMermaid();

// console.log(mermaid);

await graph.invoke({
  user_query: "What is happening with AI startups in India?",
});

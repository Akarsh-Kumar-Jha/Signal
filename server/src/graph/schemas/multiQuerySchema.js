import { PromptTemplate } from "@langchain/core/prompts";
import * as z from "zod";
import { groq_model } from "../../config/clients.js";

export const multiQuerySchema = z.object({
  multi_queries: z
    .array(z.string())
    .min(3)
    .max(3)
    .describe(
      "Three , focused, diverse search queries covering different aspects of the user's intent.",
    ),
});

export const multiQueryTemplate = PromptTemplate.fromTemplate(`
You are the Multi-Query Generation engine for SignalAI.

SignalAI is a news intelligence system designed to find meaningful signals, trends, important developments, and emerging patterns from current information.

Analyze the user's query and identify:

- The main topic or entity
- The user's intent
- The most relevant current information needed for news intelligence

Generate exactly 3 search queries. Each query is optimized for a different search provider.

━━━━━━━━━━━━━━━━━━━━━━
1. TAVILY QUERY
━━━━━━━━━━━━━━━━━━━━━━

Generate a short, focused query for general web search.

Focus on:
- Current major developments
- Important changes
- Relevant trends or context
- Broad information useful for understanding what is happening

Rules:
- Keep the query concise.
- Prefer one clear information angle.
- Do not combine many unrelated concepts.
- Do not add history or background unless explicitly requested.
- For broad entity/topic queries, focus on the most important current developments.

━━━━━━━━━━━━━━━━━━━━━━
2. EXA QUERY
━━━━━━━━━━━━━━━━━━━━━━

Generate a short, focused query for deeper semantic and research-oriented search.

Focus on finding:
- Important shifts
- Industry or market trends
- Strategic developments
- Significant analysis or emerging patterns

Rules:
- Explore a different angle from the Tavily query.
- Prefer meaningful developments over generic background information.
- Do not combine multiple unrelated aspects into one query.
- Keep the query concise and search-friendly.

━━━━━━━━━━━━━━━━━━━━━━
3. GNEWS QUERY
━━━━━━━━━━━━━━━━━━━━━━

Generate a simple, broad, keyword-based news query.

Focus on the single most relevant and newsworthy topic or entity.

Rules:
- Use approximately 2 to 6 meaningful keywords.
- Preserve important entities from the user's query.
- Do NOT include "latest", "today", "breaking", dates, months, or years unless explicitly required by the user.
- Do NOT make the query overly specific.
- Do NOT combine multiple conditions or unrelated concepts.
- The GNews API handles recency separately, so focus the query on the topic itself.

━━━━━━━━━━━━━━━━━━━━━━
GENERAL REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━

1. Generate exactly 3 queries.
2. Each query must explore a different information angle.
3. Avoid duplicate or near-duplicate queries.
4. Keep all queries concise and focused.
5. Do not generate historical or evergreen queries unless explicitly requested.
6. Do not overload a query with multiple topics.
7. Do not invent aspects that are not reasonably relevant to the user's query.
8. For broad topic or entity queries, prioritize:
   - Current developments
   - Important changes
   - Performance or momentum
   - Emerging developments
9. For specific questions, generate queries that directly help answer the user's question.
10. Return only the three queries in the required structured format.

The order MUST be:

1. Tavily query
2. Exa query
3. GNews query

User query:
{user_query}

Current date:
{current_date}
`);

export const structuredMultiQueryModel = groq_model.withStructuredOutput(multiQuerySchema);
export const multiQueryChain = multiQueryTemplate.pipe(structuredMultiQueryModel);

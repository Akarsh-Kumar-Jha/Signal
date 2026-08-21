import { PromptTemplate } from "@langchain/core/prompts";
import * as z from "zod";
import { groq_model } from "../../config/clients.js";

export const queryValidSchema = z.object({
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

export const validateTemplate = PromptTemplate.fromTemplate(`
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

export const structuredQueryModel = groq_model.withStructuredOutput(queryValidSchema);
export const query_vaild_chain = validateTemplate.pipe(structuredQueryModel);

import { PromptTemplate } from "@langchain/core/prompts";
import * as z from "zod";
import { open_model } from "../../config/clients.js";

export const trend_analysis_schema = z.object({
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

export const trend_template = PromptTemplate.fromTemplate(`
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

export const str_trend_model = open_model.withStructuredOutput(trend_analysis_schema);
export const trend_chain = trend_template.pipe(str_trend_model);

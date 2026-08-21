import { PromptTemplate } from "@langchain/core/prompts";
import * as z from "zod";
import { open_model } from "../../config/clients.js";

export const signal_detection_schema = z.object({
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

export const signal_template = PromptTemplate.fromTemplate(`
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

export const str_signal_model = open_model.withStructuredOutput(signal_detection_schema);
export const signal_chain = signal_template.pipe(str_signal_model);

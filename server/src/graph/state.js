import { Annotation } from "@langchain/langgraph";

export const state = Annotation.Root({
  user_query: Annotation(),
  valid_query: Annotation(),
  clarification: Annotation(),
  multi_queries: Annotation(),
  tavily_results: Annotation(),
  exa_results: Annotation(),
  gnews_results: Annotation(),
  all_articles: Annotation(),
  trend_analysis: Annotation(),
  signal_analysis: Annotation(),
  impact_analysis: Annotation(),
  final_report: Annotation(),
});

import { final_chain } from "../schemas/finalReportSchema.js";

export const final_report = async (state) => {
  console.log('\n__________________________Final Report Node Invoked______________________________\n');
  const { user_query, multi_queries, all_articles, trend_analysis, signal_analysis, impact_analysis } = state;
  const final_report_model_resp = await final_chain.invoke({
    all_articles: all_articles,
    impact_analysis: impact_analysis,
    signal_detection: signal_analysis,
    trend_analysis: trend_analysis,
    user_query: user_query,
    generated_queries: multi_queries
  });

  return {
    final_report: final_report_model_resp
  };
};

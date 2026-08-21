import { trend_chain } from "../schemas/trendSchema.js";

export const trend_node = async (state) => {
  console.log('\n___________________________Trend Node Invoked___________________________\n');
  const all_articles = state.all_articles;

  const trend_result = await trend_chain.invoke({
    all_articles: all_articles
  });

  return {
    trend_analysis: trend_result
  };
};

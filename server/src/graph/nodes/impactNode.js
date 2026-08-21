import { impact_chain } from "../schemas/impactSchema.js";

export const impact_node = async (state) => {
  console.log('\n___________________________Impact Node Invoked___________________________\n');
  const all_articles = state.all_articles;
  const impact_model_resp = await impact_chain.invoke({
    all_articles: all_articles
  });

  return {
    impact_analysis: impact_model_resp
  };
};

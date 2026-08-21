import { signal_chain } from "../schemas/signalSchema.js";

export const signal_node = async (state) => {
  console.log('\n________________Signal Node Invoked______________________\n');
  const all_articles = state.all_articles;
  const signal_model_resp = await signal_chain.invoke({
    all_articles: all_articles
  });

  return {
    signal_analysis: signal_model_resp
  };
};

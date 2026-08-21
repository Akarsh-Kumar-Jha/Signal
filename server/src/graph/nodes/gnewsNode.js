import { g_news_client } from "../../config/clients.js";

export const g_news_node = async (state) => {
  try {
    const multi_queries = state.multi_queries || [];
    const query = multi_queries[2] || multi_queries[0] || state.user_query;
    const result = await g_news_client.search(query, {
      lang: "en",
      max: 5,
    });

    return {
      gnews_results: result.articles || [],
    };
  } catch (error) {
    console.warn("GNews API Error (falling back to empty results):", error.message || error);
    return {
      gnews_results: [],
    };
  }
};

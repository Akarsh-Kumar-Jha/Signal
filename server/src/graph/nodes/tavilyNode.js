import { Tavily_Client } from "../../config/clients.js";

export const tavily_node = async (state) => {
  try {
    const multi_queries = state.multi_queries || [];
    const query = multi_queries[0] || state.user_query;
    const tavily_resp = await Tavily_Client.search(query, {
      searchDepth: "basic",
    });

    return {
      tavily_results: tavily_resp.results || [],
    };
  } catch (error) {
    console.warn("Tavily API Error (falling back to empty results):", error.message || error);
    return {
      tavily_results: [],
    };
  }
};

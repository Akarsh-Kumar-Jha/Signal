import { exa_client } from "../../config/clients.js";

export const exa_node = async (state) => {
  try {
    const multi_queries = state.multi_queries || [];
    const query = multi_queries[1] || multi_queries[0] || state.user_query;
    const result = await exa_client.search(query, {
      numResults: 5,
      type: "auto",
      contents: {
        highlights: true,
      },
    });

    return {
      exa_results: result.results || [],
    };
  } catch (error) {
    console.warn("Exa API Error (falling back to empty results):", error.message || error);
    return {
      exa_results: [],
    };
  }
};

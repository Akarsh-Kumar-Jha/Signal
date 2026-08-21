import { graph } from "../graph/index.js";

export const invokeGraph = async (req, res) => {
  try {
    const { user_query } = req.body;

    if (!user_query || typeof user_query !== "string" || !user_query.trim()) {
      return res.status(400).json({
        error: "Missing or invalid 'user_query' in request body."
      });
    }

    const result = await graph.invoke({
      user_query: user_query.trim()
    });

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("Error during graph execution:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "An error occurred during graph processing."
    });
  }
};

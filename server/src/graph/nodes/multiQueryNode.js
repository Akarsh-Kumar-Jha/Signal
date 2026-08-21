import { multiQueryChain } from "../schemas/multiQuerySchema.js";

export const generateMultiQuery = async (state) => {
  const today = new Date();
  const currentDate = today.toLocaleDateString("en-GB");

  console.log("Current date:", currentDate);

  const userQuery = state.user_query;

  const multiQueryModelResp = await multiQueryChain.invoke({
    user_query: userQuery,
    current_date: currentDate,
  });

  console.log("\nMulti-query response:", multiQueryModelResp);

  return {
    multi_queries: multiQueryModelResp.multi_queries,
  };
};

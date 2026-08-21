import { query_vaild_chain } from "../schemas/validatorSchema.js";

export const validate_query = async (state) => {
  const user_query = state.user_query;

  const valid_model_resp = await query_vaild_chain.invoke({
    user_query: user_query,
  });
  console.log("Query Validator >", valid_model_resp);

  return {
    valid_query: valid_model_resp.valid,
    clarification: valid_model_resp.clarification,
  };
};

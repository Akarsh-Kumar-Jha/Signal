import { START, END, StateGraph } from "@langchain/langgraph";
import { state } from "./state.js";
import { validate_query } from "./nodes/validatorNode.js";
import { generateMultiQuery } from "./nodes/multiQueryNode.js";
import { tavily_node } from "./nodes/tavilyNode.js";
import { exa_node } from "./nodes/exaNode.js";
import { g_news_node } from "./nodes/gnewsNode.js";
import { combiner } from "./nodes/combinerNode.js";
import { trend_node } from "./nodes/trendNode.js";
import { signal_node } from "./nodes/signalNode.js";
import { impact_node } from "./nodes/impactNode.js";
import { final_report } from "./nodes/finalReportNode.js";

const workflow = new StateGraph(state);

workflow.addNode("QUERY_VALIDATOR", validate_query);
workflow.addNode("MULTI_QUERY_GENERATOR", generateMultiQuery);
workflow.addNode("Tavily_Node", tavily_node);
workflow.addNode("Exa_Node", exa_node);
workflow.addNode("G_NEWS_NODE", g_news_node);

workflow.addEdge(START, "QUERY_VALIDATOR");
workflow.addConditionalEdges(
  "QUERY_VALIDATOR",
  async (state) => {
    const { valid_query, clarification } = state;
    if (!valid_query || clarification) {
      return "end";
    }
    return "MULTI_QUERY_GENERATOR";
  },
  {
    end: END,
    MULTI_QUERY_GENERATOR: "MULTI_QUERY_GENERATOR",
  },
);

workflow.addEdge("MULTI_QUERY_GENERATOR", "Tavily_Node");
workflow.addEdge("MULTI_QUERY_GENERATOR", "Exa_Node");
workflow.addEdge("MULTI_QUERY_GENERATOR", "G_NEWS_NODE");
workflow.addNode("COMBINER", combiner);
workflow.addNode("Trend_Analysis_Node", trend_node);
workflow.addNode("Signal_Detection_Node", signal_node);
workflow.addNode("Impact_Analysis_Node", impact_node);
workflow.addNode("Final_Report_Node", final_report);

workflow.addEdge("Tavily_Node", "COMBINER");
workflow.addEdge("Exa_Node", "COMBINER");
workflow.addEdge("G_NEWS_NODE", "COMBINER");
workflow.addEdge("COMBINER", "Trend_Analysis_Node");
workflow.addEdge("COMBINER", "Signal_Detection_Node");
workflow.addEdge("COMBINER", "Impact_Analysis_Node");
workflow.addEdge("Trend_Analysis_Node", "Final_Report_Node");
workflow.addEdge("Signal_Detection_Node", "Final_Report_Node");
workflow.addEdge("Impact_Analysis_Node", "Final_Report_Node");
workflow.addEdge("Final_Report_Node", END);

export const graph = workflow.compile();

import { ChatGroq } from "@langchain/groq";
import { ChatOpenRouter } from "@langchain/openrouter";
import dotenv from "dotenv";
import { tavily } from "@tavily/core";
import Exa from "exa-js";
import GNews from "@gnews-io/gnews-io-js";

dotenv.config();

export const groq_model = new ChatGroq({
  model: "openai/gpt-oss-120b",
});

export const open_model = new ChatOpenRouter({
  model: "nvidia/nemotron-3.5-lightning",
});

export const Tavily_Client = tavily({ apiKey: process.env.TAVILY_API_KEY });
export const exa_client = new Exa(process.env.EXA_API_KEY);
export const g_news_client = new GNews(process.env.G_NEWS_API_KEY);

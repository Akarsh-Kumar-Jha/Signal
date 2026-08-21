export const combiner = async (state) => {
  const { tavily_results = [], gnews_results = [], exa_results = [] } = state;

  let all_articles = [];

  if (Array.isArray(tavily_results)) {
    tavily_results.forEach((article) => {
      all_articles.push({
        tool: "Tavily",
        ...article,
      });
    });
  }

  if (Array.isArray(gnews_results)) {
    gnews_results.forEach((article) => {
      all_articles.push({
        tool: "G News",
        ...article,
      });
    });
  }

  if (Array.isArray(exa_results)) {
    exa_results.forEach((article) => {
      all_articles.push({
        tool: "Exa",
        ...article,
      });
    });
  }

  console.log("\n All Articles >", all_articles.length, "articles collected across providers.");

  return {
    all_articles: all_articles,
  };
};

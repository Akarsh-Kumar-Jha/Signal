export function normalizeReport(apiResponse, fallbackQuery = '') {
  const root = apiResponse?.data || apiResponse || {};
  const finalReport = root.final_report || root;

  return {
    userQuery: root.user_query || fallbackQuery || 'Signal Intelligence Report',
    validQuery: root.valid_query !== undefined ? root.valid_query : true,
    clarification: root.clarification || null,

    bigPicture:
      finalReport.big_picture ||
      root.big_picture ||
      'Analysis complete. Review the signals and emerging developments below.',

    whatMattersMost: Array.isArray(finalReport.what_matters_most)
      ? finalReport.what_matters_most.map((item, idx) => ({
          id: item.id || `signal-${idx + 1}`,
          headline: item.headline || 'Key Development',
          whatIsHappening: item.what_is_happening || '',
          whyItMatters: item.why_it_matters || '',
          impact: item.impact || 'medium',
          confidence: item.confidence || 'high',
          evidenceSummary: item.evidence_summary || '',
          supportingSources: Array.isArray(item.supporting_sources)
            ? item.supporting_sources
            : [],
        }))
      : [],

    emergingTrends: Array.isArray(finalReport.emerging_trends)
      ? finalReport.emerging_trends.map((item) => ({
          title: item.title || 'Trend',
          direction: item.direction || 'growing',
          explanation: item.explanation || '',
          confidence: item.confidence || 'medium',
        }))
      : [],

    noiseVsSignal: {
      signalPercentage:
        finalReport.noise_vs_signal?.signal_percentage ?? 75,
      noisePercentage:
        finalReport.noise_vs_signal?.noise_percentage ?? 25,
      signalSummary: Array.isArray(finalReport.noise_vs_signal?.signal_summary)
        ? finalReport.noise_vs_signal.signal_summary
        : [],
      noiseSummary: Array.isArray(finalReport.noise_vs_signal?.noise_summary)
        ? finalReport.noise_vs_signal.noise_summary
        : [],
      reasoning: finalReport.noise_vs_signal?.reasoning || '',
    },

    uncertainties: Array.isArray(finalReport.contradictions_or_uncertainty)
      ? finalReport.contradictions_or_uncertainty.map((item) => ({
          topic: item.topic || 'Uncertainty',
          uncertaintyType: item.uncertainty_type || 'mixed_evidence',
          explanation: item.explanation || '',
          possibleReason: item.possible_reason || null,
          confidence: item.confidence || 'medium',
          supportingSources: Array.isArray(item.supporting_sources)
            ? item.supporting_sources
            : [],
        }))
      : [],

    whatToWatchNext: Array.isArray(finalReport.what_to_watch_next)
      ? finalReport.what_to_watch_next.map((item) => ({
          indicator: item.indicator || 'Key Indicator',
          whyWatch: item.why_watch || '',
          relatedTo: item.related_to || '',
          timeHorizon: item.time_horizon || 'short_term',
        }))
      : [],

    sources: Array.isArray(finalReport.source_overview?.selected_sources)
      ? finalReport.source_overview.selected_sources
      : Array.isArray(root.all_articles)
      ? root.all_articles.slice(0, 12).map((art) => ({
          title: art.title || art.name || 'Source Article',
          source: art.tool || art.source?.name || art.author || 'Web',
          url: art.url || art.link || '#',
          publishedAt: art.publishedAt || art.published_date || null,
        }))
      : [],

    sourceOverview: {
      totalArticlesAnalyzed:
        finalReport.source_overview?.total_articles_analyzed ||
        root.all_articles?.length ||
        0,
      totalUniqueSourcesUsed:
        finalReport.source_overview?.total_unique_sources_used || 0,
    },
  };
}

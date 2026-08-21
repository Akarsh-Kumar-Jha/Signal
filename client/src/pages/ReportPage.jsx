import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import AnalysisProgress from '../components/analysis/AnalysisProgress';
import ReportHeader from '../components/report/ReportHeader';
import BigPicture from '../components/report/BigPicture';
import SignalCard from '../components/report/SignalCard';
import EmergingTrends from '../components/report/EmergingTrends';
import NoiseVsSignal from '../components/report/NoiseVsSignal';
import UncertaintySection from '../components/report/UncertaintySection';
import WatchNext from '../components/report/WatchNext';
import SourcesList from '../components/report/SourcesList';
import ReportQuality from '../components/report/ReportQuality';

import { analyzeQuery } from '../services/api';
import { getReport, saveReport, getPendingQuery, removePendingQuery } from '../utils/storage';
import { normalizeReport } from '../utils/normalize';
import { AlertCircle, RefreshCw, PlusCircle, Radio } from 'lucide-react';

export default function ReportPage() {
  const { reportId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [userQuery, setUserQuery] = useState('');

  const fetchAnalysis = async (queryToRun) => {
    setLoading(true);
    setError(null);
    try {
      const rawData = await analyzeQuery(queryToRun);
      const normalized = normalizeReport(rawData, queryToRun);
      saveReport(reportId, queryToRun, rawData);
      removePendingQuery(reportId);
      setReport(normalized);
    } catch (err) {
      console.error('Error analyzing query:', err);
      setError(err.message || 'Failed to connect to SignalAI backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Check if report already exists in storage
    const cached = getReport(reportId);
    if (cached) {
      setUserQuery(cached.query);
      setReport(normalizeReport(cached.data, cached.query));
      setLoading(false);
      return;
    }

    // 2. Check if pending query exists from landing page navigation
    const pendingQuery = getPendingQuery(reportId);
    if (pendingQuery) {
      setUserQuery(pendingQuery);
      fetchAnalysis(pendingQuery);
      return;
    }

    // 3. Fallback: try generating query from slug
    const slugQuery = reportId
      .replace(/-[a-z0-9]{6}$/i, '')
      .replace(/-/g, ' ');
    
    if (slugQuery && slugQuery !== 'report') {
      setUserQuery(slugQuery);
      fetchAnalysis(slugQuery);
    } else {
      setLoading(false);
    }
  }, [reportId]);

  // Loading State
  if (loading) {
    return (
      <PageContainer>
        <AnalysisProgress userQuery={userQuery || 'Signal Analysis'} />
      </PageContainer>
    );
  }

  // Error State
  if (error) {
    return (
      <PageContainer>
        <div className="max-w-md mx-auto px-4 py-12 sm:py-16 text-center space-y-4 font-mono">
          <div className="w-12 h-12 bg-[#FF7A59]/10 text-[#FF7A59] border-2 border-[#18181B] mx-auto flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#18181B] uppercase">
            ANALYSIS FAILED
          </h2>
          <p className="text-xs sm:text-sm text-[#18181B]/80 leading-relaxed">
            {error}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => fetchAnalysis(userQuery)}
              className="px-4 py-2 bg-[#6C5CE7] text-white text-xs font-bold border-2 border-[#18181B] shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RETRY ANALYSIS</span>
            </button>
            <Link
              to="/"
              className="px-4 py-2 bg-[#18181B] text-white text-xs font-bold border-2 border-[#18181B] shadow-brutal-sm hover:bg-black transition-colors"
            >
              BACK TO HOME
            </Link>
          </div>
        </div>
      </PageContainer>
    );
  }

  // Report Not Found State
  if (!report) {
    return (
      <PageContainer>
        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4 font-mono">
          <div className="w-12 h-12 bg-[#18181B] text-[#6C5CE7] border-2 border-[#18181B] mx-auto flex items-center justify-center">
            <Radio className="w-6 h-6" />
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#18181B] uppercase">
            REPORT NOT FOUND
          </h2>
          <p className="text-xs sm:text-sm text-[#18181B]/80">
            No analysis report found for ID <code className="bg-[#18181B]/5 px-1.5 py-0.5 border border-[#18181B]">{reportId}</code>.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6C5CE7] text-white text-xs font-bold uppercase border-2 border-[#18181B] shadow-brutal-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>CREATE NEW ANALYSIS</span>
          </Link>
        </div>
      </PageContainer>
    );
  }

  // Render Completed Report
  return (
    <PageContainer className="pb-16">
      <ReportHeader userQuery={report.userQuery} timestamp={report.timestamp} />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-8 space-y-6 sm:space-y-10">
        {/* The Big Picture */}
        <BigPicture summary={report.bigPicture} />

        {/* What Matters Most */}
        {report.whatMattersMost && report.whatMattersMost.length > 0 && (
          <section className="w-full space-y-3 sm:space-y-4 font-mono">
            <div className="flex items-center gap-2">
              <span className="font-display text-base sm:text-xl font-extrabold text-[#18181B] uppercase">
                WHAT MATTERS MOST
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#6C5CE7] bg-[#C9BFFF]/50 px-2 py-0.5 border border-[#18181B]">
                {report.whatMattersMost.length} SIGNALS
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {report.whatMattersMost.map((signal, idx) => (
                <SignalCard key={signal.id || idx} signal={signal} index={idx} />
              ))}
            </div>
          </section>
        )}

        {/* Emerging Trends */}
        <EmergingTrends trends={report.emergingTrends} />

        {/* Noise vs Signal */}
        <NoiseVsSignal noiseVsSignal={report.noiseVsSignal} />

        {/* Contradictions & Uncertainty */}
        <UncertaintySection uncertainties={report.uncertainties} />

        {/* What to Watch Next */}
        <WatchNext watchList={report.whatToWatchNext} />

        {/* Sources List */}
        <SourcesList sources={report.sources} sourceOverview={report.sourceOverview} />

        {/* Quality & Methodology */}
        <ReportQuality />
      </div>
    </PageContainer>
  );
}

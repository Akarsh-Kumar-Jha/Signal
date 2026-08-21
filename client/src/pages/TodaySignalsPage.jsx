import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import SignalMap from '../components/today/SignalMap';
import CategoryFilter from '../components/today/CategoryFilter';
import SignalCluster from '../components/today/SignalCluster';
import { generateReportId } from '../utils/reportId';
import { savePendingQuery } from '../utils/storage';
import { Flame, Compass } from 'lucide-react';

const MOCK_CLUSTERS = [
  {
    id: 'cluster-1',
    title: 'AI Compute & Infrastructure Acceleration',
    category: 'AI',
    impact: 'HIGH',
    badge: '🔥 CRITICAL SIGNAL',
    summary: 'Major technology companies are accelerating multi-billion dollar capital expenditure into custom AI compute and data center expansion.',
    whyItMatters: 'Compute capacity is becoming the single primary bottleneck for next-gen model training and enterprise rollout.',
    sourceCount: 14,
    momentum: 'Strong Growth',
    query: 'What is happening with AI compute infrastructure investments?',
  },
  {
    id: 'cluster-2',
    title: 'Indian Startup GenAI Funding Shift',
    category: 'STARTUPS',
    impact: 'MEDIUM',
    badge: '📈 EMERGING TREND',
    summary: 'Venture capital investments in Indian GenAI and SaaS startups have risen significantly across Q1.',
    whyItMatters: 'Shifts focus from quick consumer apps to deep tech enablers and localized vernacular AI models.',
    sourceCount: 8,
    momentum: 'Rising Momentum',
    query: 'What is happening in India startup ecosystem funding?',
  },
  {
    id: 'cluster-3',
    title: 'Global Semiconductor Supply Chain Realignment',
    category: 'TECHNOLOGY',
    impact: 'HIGH',
    badge: '⚠ POLICY WATCH',
    summary: 'New export controls and domestic foundry subsidies are reshaping global chip fabrication distribution.',
    whyItMatters: 'Hardware supply chains are undergoing mandatory geographical diversification.',
    sourceCount: 11,
    momentum: 'High Priority',
    query: 'What is changing in global semiconductor manufacturing and policy?',
  },
  {
    id: 'cluster-4',
    title: 'Autonomous Vehicle Deployment Expansion',
    category: 'MARKETS',
    impact: 'DEVELOPING',
    badge: '👀 WATCH CLOSELY',
    summary: 'Municipal authorities in major metropolitan hubs are expanding commercial robotaxi operational licenses.',
    whyItMatters: 'Transition from limited pilots to un-crewed urban transportation commercialization.',
    sourceCount: 6,
    momentum: 'Developing',
    query: 'Latest developments in autonomous vehicle regulation and deployments',
  },
];

export default function TodaySignalsPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const navigate = useNavigate();

  const handleAnalyzeCluster = (queryToAnalyze) => {
    const reportId = generateReportId(queryToAnalyze);
    savePendingQuery(reportId, queryToAnalyze);
    navigate(`/report/${reportId}`);
  };

  const filteredClusters = activeCategory === 'ALL'
    ? MOCK_CLUSTERS
    : MOCK_CLUSTERS.filter((c) => c.category.toUpperCase() === activeCategory.toUpperCase() || activeCategory === 'AI');

  return (
    <PageContainer className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Heading */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border-2 border-[#18181B] shadow-brutal-sm font-mono text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5 text-[#FF7A59]" />
          <span>REAL-TIME CLUSTER FEED</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#18181B] tracking-tight uppercase">
          TODAY'S <span className="bg-[#6C5CE7] text-white px-3 py-0.5 border-2 border-[#18181B] shadow-brutal inline-block">SIGNALS.</span>
        </h1>
        <p className="text-xs sm:text-sm font-mono text-[#18181B]/80 max-w-xl">
          The strongest intelligence developments and structural shifts emerging across today's global news feed.
        </p>
      </div>

      {/* Signal Intensity Map */}
      <SignalMap />

      {/* Category Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono">
          <h2 className="font-display font-bold text-sm text-[#18181B] flex items-center gap-2 uppercase">
            <Compass className="w-4 h-4 text-[#6C5CE7]" />
            <span>ACTIVE INTELLIGENCE CLUSTERS</span>
          </h2>
        </div>
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* Cluster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClusters.map((cluster) => (
          <SignalCluster
            key={cluster.id}
            cluster={cluster}
            onAnalyze={handleAnalyzeCluster}
          />
        ))}
      </div>
    </PageContainer>
  );
}

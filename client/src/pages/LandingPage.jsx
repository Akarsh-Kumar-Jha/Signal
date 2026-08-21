import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Hero from '../components/landing/Hero';
import QueryPanel from '../components/landing/QueryPanel';
import { generateReportId } from '../utils/reportId';
import { savePendingQuery } from '../utils/storage';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleQuerySubmit = (userQuery) => {
    const reportId = generateReportId(userQuery);
    savePendingQuery(reportId, userQuery);
    navigate(`/report/${reportId}?q=${encodeURIComponent(userQuery)}`);
  };

  return (
    <PageContainer
      showFooter={false}
      containerClassName="bg-cover bg-center bg-no-repeat bg-fixed dark:bg-blend-multiply dark:bg-[#0D0E12]/90 min-h-screen"
      containerStyle={{ backgroundImage: "url('/landing-bg.png')" }}
      className="flex flex-col justify-center py-6 sm:py-10 px-4 max-w-7xl mx-auto min-h-[calc(100vh-2.75rem)] space-y-6 sm:space-y-8"
    >
      {/* Top Hero Section */}
      <Hero />

      {/* Main Query Intelligence Panel */}
      <div className="w-full">
        <QueryPanel onSubmit={handleQuerySubmit} />
      </div>
    </PageContainer>
  );
}

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { MonitoringDashboard } from '@/components/MonitoringDashboard';

const MonitoringPage = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <MonitoringDashboard />
        </div>
      </main>
    </div>
  );
};

export default MonitoringPage;
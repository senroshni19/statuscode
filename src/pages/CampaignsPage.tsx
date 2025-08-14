import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { EmailCampaigns } from '@/components/EmailCampaigns';

const CampaignsPage = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <EmailCampaigns />
        </div>
      </main>
    </div>
  );
};

export default CampaignsPage;
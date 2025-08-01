import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Dashboard />
        </div>
      </main>
    </div>
  );
};

export default Index;

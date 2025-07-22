import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CampaignsPage from "./pages/CampaignsPage";
import MonitoringPage from "./pages/MonitoringPage";
import NotFound from "./pages/NotFound";
import CorporateMalpracticeSystem  from "./pages/CorporateMalpracticeSystem";
import  Alert  from "./pages/Alert";
import EmployeeDirectory from "./pages/EmployeeDirectory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/corporate" element={<CorporateMalpracticeSystem />} />
          <Route path="/alerts" element={<><Alert /></>} />
          <Route path="/employee-directory" element={<EmployeeDirectory />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNav from "@/components/layout/AppNav";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Saved from "./pages/Saved";
import Digest from "./pages/Digest";
import Settings from "./pages/Settings";
import Proof from "./pages/Proof";
import TestChecklist from "./pages/TestChecklist";
import Ship from "./pages/Ship";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-background">
          <AppNav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/jt/proof" element={<Proof />} />
            <Route path="/jt/07-test" element={<TestChecklist />} />
            <Route path="/jt/08-ship" element={<Ship />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from "@/components/nav-bar";
import { OnboardingProvider } from "@/context/onboarding-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Search from "@/pages/search";
import AddIncident from "@/pages/add-incident";
import PublicRecords from "@/pages/public-records";
import DataExport from "@/pages/data-export";
import IncidentDetail from "@/pages/incident/[id]";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/add" element={<AddIncident />} />
      <Route path="/public-records" element={<PublicRecords />} />
      <Route path="/data-export" element={<DataExport />} />
      <Route path="/incident/:id" element={<IncidentDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <OnboardingProvider>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1">
              <Router />
            </main>
          </div>
          <Toaster />
        </OnboardingProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
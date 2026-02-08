import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Hub from "./pages/Hub";
import DomainLayout from "./components/DomainLayout";
import Overview from "./pages/domain/Overview";
import Submissions from "./pages/domain/Submissions";
import PlaceholderPage from "./pages/domain/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/domain/information" element={<DomainLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="edit-requests" element={<PlaceholderPage />} />
            <Route path="temples" element={<PlaceholderPage />} />
            <Route path="contributors" element={<PlaceholderPage />} />
            <Route path="categories" element={<PlaceholderPage />} />
            <Route path="audit" element={<PlaceholderPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

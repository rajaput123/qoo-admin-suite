import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Hub from "./pages/Hub";
import Profile from "./pages/Profile";
import DomainLayout from "./components/DomainLayout";
import Overview from "./pages/domain/Overview";
import Submissions from "./pages/domain/Submissions";
import EditRequests from "./pages/domain/EditRequests";
import Temples from "./pages/domain/Temples";
import Duplicates from "./pages/domain/Duplicates";
import Contributors from "./pages/domain/Contributors";
import Categories from "./pages/domain/Categories";
import AuditHistory from "./pages/domain/AuditHistory";
import OnboardingLayout from "./components/OnboardingLayout";
import OnboardingOverview from "./pages/onboarding/Overview";
import RegistrationPipeline from "./pages/onboarding/RegistrationPipeline";
import VerificationQueue from "./pages/onboarding/VerificationQueue";
import DirectOnboarding from "./pages/onboarding/DirectOnboarding";
import ComplianceRisk from "./pages/onboarding/ComplianceRisk";
import ApprovalLogs from "./pages/onboarding/ApprovalLogs";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/domain/information" element={<DomainLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="submissions" element={<Submissions />} />
            <Route path="edit-requests" element={<EditRequests />} />
            <Route path="temples" element={<Temples />} />
            <Route path="duplicates" element={<Duplicates />} />
            <Route path="contributors" element={<Contributors />} />
            <Route path="categories" element={<Categories />} />
            <Route path="audit" element={<AuditHistory />} />
          </Route>
          <Route path="/domain/onboarding" element={<OnboardingLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OnboardingOverview />} />
            <Route path="registration-pipeline" element={<RegistrationPipeline />} />
            <Route path="verification-queue" element={<VerificationQueue />} />
            <Route path="direct-onboarding" element={<DirectOnboarding />} />
            <Route path="compliance-risk" element={<ComplianceRisk />} />
            <Route path="approval-logs" element={<ApprovalLogs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

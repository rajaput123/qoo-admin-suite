import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TempleRegister from "./pages/TempleRegister";
import TempleHub from "./pages/TempleHub";
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
import TenantLayout from "./components/TenantLayout";
import TenantOverview from "./pages/tenant/Overview";
import AllTenants from "./pages/tenant/AllTenants";
import SubscriptionPlans from "./pages/tenant/SubscriptionPlans";
import UsageMonitoring from "./pages/tenant/UsageMonitoring";
import SuspensionCompliance from "./pages/tenant/SuspensionCompliance";
import RegionManagement from "./pages/tenant/RegionManagement";
import TenantLogs from "./pages/tenant/TenantLogs";
// Temple Admin Module Layouts
import TempleInfoLayout from "./pages/temple/TempleInfoLayout";
import BasicInfo from "./pages/temple/info/BasicInfo";
import SevasLayout from "./pages/temple/SevasLayout";
import SevaCategories from "./pages/temple/sevas/SevaCategories";
import BookingsLayout from "./pages/temple/BookingsLayout";
import AllBookings from "./pages/temple/bookings/AllBookings";
import SettingsLayout from "./pages/temple/SettingsLayout";
import TempleProfile from "./pages/temple/settings/TempleProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/temple-register" element={<TempleRegister />} />
          
          {/* Temple Admin Routes */}
          <Route path="/temple-hub" element={<TempleHub />} />
          
          {/* Temple Info Module */}
          <Route path="/temple/info" element={<TempleInfoLayout />}>
            <Route index element={<BasicInfo />} />
            <Route path="structure" element={<BasicInfo />} />
            <Route path="layout" element={<BasicInfo />} />
            <Route path="facilities" element={<BasicInfo />} />
            <Route path="branches" element={<BasicInfo />} />
            <Route path="media" element={<BasicInfo />} />
          </Route>
          
          {/* Sevas & Darshan Module */}
          <Route path="/temple/sevas" element={<SevasLayout />}>
            <Route index element={<SevaCategories />} />
            <Route path="list" element={<SevaCategories />} />
            <Route path="darshan" element={<SevaCategories />} />
            <Route path="pricing" element={<SevaCategories />} />
            <Route path="capacity" element={<SevaCategories />} />
          </Route>
          
          {/* Bookings Module */}
          <Route path="/temple/bookings" element={<BookingsLayout />}>
            <Route index element={<AllBookings />} />
            <Route path="today" element={<AllBookings />} />
            <Route path="upcoming" element={<AllBookings />} />
            <Route path="completed" element={<AllBookings />} />
            <Route path="cancelled" element={<AllBookings />} />
          </Route>
          
          {/* Settings Module */}
          <Route path="/temple/settings" element={<SettingsLayout />}>
            <Route index element={<TempleProfile />} />
            <Route path="subscription" element={<TempleProfile />} />
            <Route path="payments" element={<TempleProfile />} />
            <Route path="users" element={<TempleProfile />} />
            <Route path="notifications" element={<TempleProfile />} />
            <Route path="security" element={<TempleProfile />} />
          </Route>
          
          {/* Placeholder routes for other Temple modules */}
          <Route path="/temple/donations" element={<TempleHub />} />
          <Route path="/temple/devotees" element={<TempleHub />} />
          <Route path="/temple/events" element={<TempleHub />} />
          <Route path="/temple/communication" element={<TempleHub />} />
          <Route path="/temple/live" element={<TempleHub />} />
          <Route path="/temple/crowd" element={<TempleHub />} />
          <Route path="/temple/people" element={<TempleHub />} />
          <Route path="/temple/assets" element={<TempleHub />} />
          <Route path="/temple/tasks" element={<TempleHub />} />
          <Route path="/temple/reports" element={<TempleHub />} />
          
          {/* Super Admin Routes */}
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
          <Route path="/domain/tenants" element={<TenantLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<TenantOverview />} />
            <Route path="all" element={<AllTenants />} />
            <Route path="plans" element={<SubscriptionPlans />} />
            <Route path="usage" element={<UsageMonitoring />} />
            <Route path="suspension" element={<SuspensionCompliance />} />
            <Route path="regions" element={<RegionManagement />} />
            <Route path="logs" element={<TenantLogs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

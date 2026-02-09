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
import OfferingsLayout from "./pages/temple/OfferingsLayout";
import OfferingsToday from "./pages/temple/offerings/Today";
import OfferingsList from "./pages/temple/offerings/OfferingsList";
import SlotManagement from "./pages/temple/offerings/SlotManagement";
import BookingManagement from "./pages/temple/offerings/BookingManagement";
import PricingRules from "./pages/temple/offerings/PricingRules";
import PriestAssignment from "./pages/temple/offerings/PriestAssignment";
import OfferingsReports from "./pages/temple/offerings/Reports";
import BookingsLayout from "./pages/temple/BookingsLayout";
import BookingsToday from "./pages/temple/bookings/BookingsToday";
import AllBookings from "./pages/temple/bookings/AllBookings";
import CounterBooking from "./pages/temple/bookings/CounterBooking";
import CancellationsRefunds from "./pages/temple/bookings/CancellationsRefunds";
import Attendance from "./pages/temple/bookings/Attendance";
import BookingReports from "./pages/temple/bookings/BookingReports";
import SettingsLayout from "./pages/temple/SettingsLayout";
import TempleProfile from "./pages/temple/settings/TempleProfile";
// Temple Structure Module
import TempleStructureLayout from "./pages/temple/structure/TempleStructureLayout";
// Devotee & Volunteer Module
import DevoteesLayout from "./pages/temple/DevoteesLayout";
import DevoteeDashboard from "./pages/temple/devotees/Dashboard";
import DevoteesList from "./pages/temple/devotees/DevoteesList";
import DevoteeVolunteers from "./pages/temple/devotees/Volunteers";
import DevoteeGroups from "./pages/temple/devotees/Groups";
import DevoteeEngagement from "./pages/temple/devotees/Engagement";
import DevoteeReports from "./pages/temple/devotees/Reports";
import MainTemple from "./pages/temple/structure/MainTemple";
import Shrines from "./pages/temple/structure/Shrines";
import Sacred from "./pages/temple/structure/Sacred";
import Halls from "./pages/temple/structure/Halls";
import Counters from "./pages/temple/structure/Counters";
import HierarchyView from "./pages/temple/structure/HierarchyView";
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
            <Route path="layout" element={<BasicInfo />} />
            <Route path="facilities" element={<BasicInfo />} />
            <Route path="branches" element={<BasicInfo />} />
            <Route path="media" element={<BasicInfo />} />
          </Route>
          
          {/* Temple Structure Module */}
          <Route path="/temple/structure" element={<TempleStructureLayout />}>
            <Route index element={<MainTemple />} />
            <Route path="shrines" element={<Shrines />} />
            <Route path="sacred" element={<Sacred />} />
            <Route path="halls" element={<Halls />} />
            <Route path="counters" element={<Counters />} />
            <Route path="hierarchy" element={<HierarchyView />} />
          </Route>
          
          {/* Offerings Module */}
          <Route path="/temple/offerings" element={<OfferingsLayout />}>
            <Route index element={<OfferingsToday />} />
            <Route path="list" element={<OfferingsList />} />
            <Route path="slots" element={<SlotManagement />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="pricing" element={<PricingRules />} />
            <Route path="priests" element={<PriestAssignment />} />
            <Route path="reports" element={<OfferingsReports />} />
          </Route>
          
          {/* Bookings Module */}
          <Route path="/temple/bookings" element={<BookingsLayout />}>
            <Route index element={<BookingsToday />} />
            <Route path="all" element={<AllBookings />} />
            <Route path="counter" element={<CounterBooking />} />
            <Route path="cancellations" element={<CancellationsRefunds />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="reports" element={<BookingReports />} />
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
          
          {/* Devotee & Volunteer Module */}
          <Route path="/temple/devotees" element={<DevoteesLayout />}>
            <Route index element={<DevoteeDashboard />} />
            <Route path="list" element={<DevoteesList />} />
            <Route path="volunteers" element={<DevoteeVolunteers />} />
            <Route path="groups" element={<DevoteeGroups />} />
            <Route path="engagement" element={<DevoteeEngagement />} />
            <Route path="reports" element={<DevoteeReports />} />
          </Route>
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

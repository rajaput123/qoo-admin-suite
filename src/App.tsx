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
// Supplier Management Module
import SupplierLayout from "./pages/temple/SupplierLayout";
// Stock & Inventory Module
import InventoryLayout from "./pages/temple/InventoryLayout";
import InventoryDashboard from "./pages/temple/inventory/Dashboard";
import InventoryItems from "./pages/temple/inventory/Items";
import InventoryTransactions from "./pages/temple/inventory/Transactions";
import InventoryRequests from "./pages/temple/inventory/Requests";
import InventoryAdjustments from "./pages/temple/inventory/Adjustments";
import InventoryReports from "./pages/temple/inventory/Reports";
import SupplierDashboard from "./pages/temple/suppliers/Dashboard";
import SupplierRegistry from "./pages/temple/suppliers/Registry";
import SupplierOnboarding from "./pages/temple/suppliers/Onboarding";
import SupplierCategories from "./pages/temple/suppliers/Categories";
import SupplierPurchaseOrders from "./pages/temple/suppliers/PurchaseOrders";
import SupplierDeliveries from "./pages/temple/suppliers/Deliveries";
import SupplierPayments from "./pages/temple/suppliers/Payments";
import SupplierPerformance from "./pages/temple/suppliers/Performance";
import SupplierReports from "./pages/temple/suppliers/Reports";
// Prasadam Management Module
import PrasadamLayout from "./pages/temple/PrasadamLayout";
import PrasadamDashboard from "./pages/temple/prasadam/Dashboard";
import PrasadamMaster from "./pages/temple/prasadam/PrasadamMaster";
import RecipeMapping from "./pages/temple/prasadam/RecipeMapping";
import ProductionPlanning from "./pages/temple/prasadam/ProductionPlanning";
import BatchProduction from "./pages/temple/prasadam/BatchProduction";
import FinishedStock from "./pages/temple/prasadam/FinishedStock";
import CounterAllocation from "./pages/temple/prasadam/CounterAllocation";
import OnlineBooking from "./pages/temple/prasadam/OnlineBooking";
import SponsorshipAllocation from "./pages/temple/prasadam/SponsorshipAllocation";
import ExpiryWastage from "./pages/temple/prasadam/ExpiryWastage";
import PrasadamReports from "./pages/temple/prasadam/Reports";
// Devotee CRM Module
import DevoteesLayout from "./pages/temple/DevoteesLayout";
import DevoteeDashboard from "./pages/temple/devotees/Dashboard";
import DevoteesList from "./pages/temple/devotees/DevoteesList";
import DevoteeGroups from "./pages/temple/devotees/Groups";
import MainTemple from "./pages/temple/structure/MainTemple";
import Shrines from "./pages/temple/structure/Shrines";
import Sacred from "./pages/temple/structure/Sacred";
import Halls from "./pages/temple/structure/Halls";
import Counters from "./pages/temple/structure/Counters";
import HierarchyView from "./pages/temple/structure/HierarchyView";
// Event Management Module
import EventsLayout from "./pages/temple/EventsLayout";
import EventSetup from "./pages/temple/events/EventSetup";
import RitualAttachment from "./pages/temple/events/RitualAttachment";
import ResourcePlanning from "./pages/temple/events/ResourcePlanning";
import ExecutionMode from "./pages/temple/events/ExecutionMode";
import ClosureSummary from "./pages/temple/events/ClosureSummary";
// Task Management Module
import TasksLayout from "./pages/temple/TasksLayout";
import TaskDashboard from "./pages/temple/tasks/TaskDashboard";
import AllTasks from "./pages/temple/tasks/AllTasks";
import MyTasks from "./pages/temple/tasks/MyTasks";
import OverdueTasks from "./pages/temple/tasks/OverdueTasks";
import CompletedTasks from "./pages/temple/tasks/CompletedTasks";
// Crowd & Capacity Management Module
import CrowdLayout from "./pages/temple/CrowdLayout";
import ZoneConfiguration from "./pages/temple/crowd/ZoneConfiguration";
import SlotFlowControl from "./pages/temple/crowd/SlotFlowControl";
import RealTimeMonitoring from "./pages/temple/crowd/RealTimeMonitoring";
import CrowdAnalytics from "./pages/temple/crowd/CrowdAnalytics";
import PredictionRisk from "./pages/temple/crowd/PredictionRisk";
import CompliancePreparedness from "./pages/temple/crowd/CompliancePreparedness";
import DroneMonitoring from "./pages/temple/crowd/DroneMonitoring";
import AlertsEmergency from "./pages/temple/crowd/AlertsEmergency";
// Projects & Initiatives Module
import ProjectsLayout from "./pages/temple/ProjectsLayout";
import PortfolioDashboard from "./pages/temple/projects/PortfolioDashboard";
import ProjectMaster from "./pages/temple/projects/ProjectMaster";
import MilestonesPhases from "./pages/temple/projects/MilestonesPhases";
import BudgetFunding from "./pages/temple/projects/BudgetFunding";
import DonationMapping from "./pages/temple/projects/DonationMapping";
import ApprovalWorkflow from "./pages/temple/projects/ApprovalWorkflow";
import TaskIntegration from "./pages/temple/projects/TaskIntegration";
import RiskChange from "./pages/temple/projects/RiskChange";
import ProgressAnalytics from "./pages/temple/projects/ProgressAnalytics";
import ReportsGovernance from "./pages/temple/projects/ReportsGovernance";
// PR & Communication Module
import CommunicationLayout from "./pages/temple/CommunicationLayout";
import ControlCenter from "./pages/temple/communication/ControlCenter";
import CommAnnouncements from "./pages/temple/communication/Announcements";
import MediaCommunication from "./pages/temple/communication/MediaCommunication";
import LiveBroadcast from "./pages/temple/communication/LiveBroadcast";
import DevoteeExperience from "./pages/temple/communication/DevoteeExperience";
import PublicMeetings from "./pages/temple/communication/PublicMeetings";
import CommLogsReports from "./pages/temple/communication/LogsReports";
// Donation Management Module
import DonationsLayout from "./pages/temple/DonationsLayout";
import DonationDashboard from "./pages/temple/donations/Dashboard";
import DonorRegistry from "./pages/temple/donations/DonorRegistry";
import RecordDonation from "./pages/temple/donations/RecordDonation";
import Receipts80G from "./pages/temple/donations/Receipts80G";
import FundAllocation from "./pages/temple/donations/FundAllocation";
import DonationCampaigns from "./pages/temple/donations/Campaigns";
import UtilizationTracking from "./pages/temple/donations/UtilizationTracking";
import DonationReportsGovernance from "./pages/temple/donations/ReportsGovernance";
// Feedback & Analytics Module
import FeedbackLayout from "./pages/temple/FeedbackLayout";
import FeedbackDashboard from "./pages/temple/feedback/Dashboard";
import FeedbackCollection from "./pages/temple/feedback/Collection";
import FeedbackRatings from "./pages/temple/feedback/Ratings";
import FeedbackSentiment from "./pages/temple/feedback/Sentiment";
import FeedbackAnalytics from "./pages/temple/feedback/Analytics";
import FeedbackConfiguration from "./pages/temple/feedback/Configuration";
// Freelancer Management Module
import FreelancerLayout from "./pages/temple/FreelancerLayout";
import FreelancersList from "./pages/temple/freelancers/FreelancersList";
import FreelancerAssignments from "./pages/temple/freelancers/Assignments";
import FreelancerPayments from "./pages/temple/freelancers/Payments";
import FreelancerPerformance from "./pages/temple/freelancers/Performance";
import FreelancerInsights from "./pages/temple/freelancers/Insights";
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
          
          {/* Supplier Management Module */}
          <Route path="/temple/suppliers" element={<SupplierLayout />}>
            <Route index element={<SupplierDashboard />} />
            <Route path="registry" element={<SupplierRegistry />} />
            <Route path="onboarding" element={<SupplierOnboarding />} />
            <Route path="categories" element={<SupplierCategories />} />
            <Route path="purchase-orders" element={<SupplierPurchaseOrders />} />
            <Route path="deliveries" element={<SupplierDeliveries />} />
            <Route path="payments" element={<SupplierPayments />} />
            <Route path="performance" element={<SupplierPerformance />} />
            <Route path="reports" element={<SupplierReports />} />
          </Route>
          
          {/* Stock & Inventory Module */}
          <Route path="/temple/inventory" element={<InventoryLayout />}>
            <Route index element={<InventoryDashboard />} />
            <Route path="items" element={<InventoryItems />} />
            <Route path="transactions" element={<InventoryTransactions />} />
            <Route path="requests" element={<InventoryRequests />} />
            <Route path="adjustments" element={<InventoryAdjustments />} />
            <Route path="reports" element={<InventoryReports />} />
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
          
          {/* Prasadam Management Module */}
          <Route path="/temple/prasadam" element={<PrasadamLayout />}>
            <Route index element={<PrasadamDashboard />} />
            <Route path="master" element={<PrasadamMaster />} />
            <Route path="recipes" element={<RecipeMapping />} />
            <Route path="planning" element={<ProductionPlanning />} />
            <Route path="batches" element={<BatchProduction />} />
            <Route path="stock" element={<FinishedStock />} />
            <Route path="counters" element={<CounterAllocation />} />
            <Route path="online" element={<OnlineBooking />} />
            <Route path="sponsorship" element={<SponsorshipAllocation />} />
            <Route path="expiry" element={<ExpiryWastage />} />
            <Route path="reports" element={<PrasadamReports />} />
          </Route>

          {/* Placeholder routes for other Temple modules */}
          {/* Donation Management Module */}
          <Route path="/temple/donations" element={<DonationsLayout />}>
            <Route index element={<DonationDashboard />} />
            <Route path="donors" element={<DonorRegistry />} />
            <Route path="record" element={<RecordDonation />} />
            <Route path="receipts" element={<Receipts80G />} />
            <Route path="allocation" element={<FundAllocation />} />
            <Route path="campaigns" element={<DonationCampaigns />} />
            <Route path="utilization" element={<UtilizationTracking />} />
            <Route path="reports" element={<DonationReportsGovernance />} />
          </Route>
          <Route path="/temple/finance" element={<TempleHub />} />
          
          {/* Freelancer Management Module */}
          <Route path="/temple/freelancer" element={<Navigate to="/temple/freelancers" replace />} />
          <Route path="/temple/freelancers" element={<FreelancerLayout />}>
            <Route index element={<FreelancersList />} />
            <Route path="assignments" element={<FreelancerAssignments />} />
            <Route path="payments" element={<FreelancerPayments />} />
            <Route path="performance" element={<FreelancerPerformance />} />
            <Route path="insights" element={<FreelancerInsights />} />
          </Route>
          
          {/* VIP Management redirects to Devotees */}
          <Route path="/temple/vip" element={<Navigate to="/temple/devotees" replace />} />
          {/* Devotee CRM Module */}
          <Route path="/temple/devotees" element={<DevoteesLayout />}>
            <Route index element={<DevoteesList />} />
            <Route path="segments" element={<DevoteeGroups />} />
            <Route path="insights" element={<DevoteeDashboard />} />
          </Route>
          {/* Event Management Module */}
          <Route path="/temple/events" element={<EventsLayout />}>
            <Route index element={<EventSetup />} />
            <Route path="rituals" element={<RitualAttachment />} />
            <Route path="resources" element={<ResourcePlanning />} />
            <Route path="execution" element={<ExecutionMode />} />
            <Route path="closure" element={<ClosureSummary />} />
          </Route>
          <Route path="/temple/events" element={<TempleHub />} />
          {/* PR & Communication Module */}
          <Route path="/temple/communication" element={<CommunicationLayout />}>
            <Route index element={<ControlCenter />} />
            <Route path="announcements" element={<CommAnnouncements />} />
            <Route path="media" element={<MediaCommunication />} />
            <Route path="broadcast" element={<LiveBroadcast />} />
            <Route path="experience" element={<DevoteeExperience />} />
            <Route path="meetings" element={<PublicMeetings />} />
            <Route path="logs" element={<CommLogsReports />} />
          </Route>
          <Route path="/temple/live" element={<TempleHub />} />
          {/* Crowd & Capacity Management Module */}
          <Route path="/temple/crowd" element={<CrowdLayout />}>
            <Route index element={<ZoneConfiguration />} />
            <Route path="flow" element={<SlotFlowControl />} />
            <Route path="live" element={<RealTimeMonitoring />} />
            <Route path="analytics" element={<CrowdAnalytics />} />
            <Route path="prediction" element={<PredictionRisk />} />
            <Route path="compliance" element={<CompliancePreparedness />} />
            <Route path="drone" element={<DroneMonitoring />} />
            <Route path="alerts" element={<AlertsEmergency />} />
          </Route>
          <Route path="/temple/people" element={<TempleHub />} />
          <Route path="/temple/assets" element={<TempleHub />} />
          
          {/* Task Management Module */}
          <Route path="/temple/tasks" element={<TasksLayout />}>
            <Route index element={<TaskDashboard />} />
            <Route path="all" element={<AllTasks />} />
            <Route path="my" element={<MyTasks />} />
            <Route path="overdue" element={<OverdueTasks />} />
            <Route path="completed" element={<CompletedTasks />} />
          </Route>
          <Route path="/temple/reports" element={<TempleHub />} />
          
          {/* Feedback & Analytics Module */}
          <Route path="/temple/feedback" element={<FeedbackLayout />}>
            <Route index element={<FeedbackDashboard />} />
            <Route path="collection" element={<FeedbackCollection />} />
            <Route path="ratings" element={<FeedbackRatings />} />
            <Route path="sentiment" element={<FeedbackSentiment />} />
            <Route path="analytics" element={<FeedbackAnalytics />} />
            <Route path="config" element={<FeedbackConfiguration />} />
          </Route>
          
          {/* Projects & Initiatives Module */}
          <Route path="/temple/projects" element={<ProjectsLayout />}>
            <Route index element={<PortfolioDashboard />} />
            <Route path="master" element={<ProjectMaster />} />
            <Route path="milestones" element={<MilestonesPhases />} />
            <Route path="budget" element={<BudgetFunding />} />
            <Route path="donations" element={<DonationMapping />} />
            <Route path="approvals" element={<ApprovalWorkflow />} />
            <Route path="tasks" element={<TaskIntegration />} />
            <Route path="risk" element={<RiskChange />} />
            <Route path="analytics" element={<ProgressAnalytics />} />
            <Route path="reports" element={<ReportsGovernance />} />
          </Route>
          
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

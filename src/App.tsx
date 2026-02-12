import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTaskEngineBootstrap } from "@/modules/tasks/hooks";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import TempleRegister from "./pages/TempleRegister";
import TempleHub from "./pages/TempleHub";
import UpcomingModule from "./pages/temple/UpcomingModule";
import Profile from "./pages/Profile";
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
import InventoryPurchases from "./pages/temple/inventory/Purchases";
import TransactionDetail from "./pages/temple/inventory/TransactionDetail";
import ItemDetail from "./pages/temple/inventory/ItemDetail";
import PurchaseOrderDetail from "./pages/temple/inventory/purchases/PurchaseOrderDetail";
import DeliveryDetail from "./pages/temple/inventory/purchases/DeliveryDetail";
import SupplierDashboard from "./pages/temple/suppliers/Dashboard";
import SupplierRegistry from "./pages/temple/suppliers/Registry";
import SupplierOnboarding from "./pages/temple/suppliers/Onboarding";
import SupplierCategories from "./pages/temple/suppliers/Categories";
import SupplierPurchaseOrders from "./pages/temple/suppliers/PurchaseOrders";
import SupplierDeliveries from "./pages/temple/suppliers/Deliveries";
import SupplierPayments from "./pages/temple/suppliers/Payments";
import SupplierPerformance from "./pages/temple/suppliers/Performance";
import SupplierReports from "./pages/temple/suppliers/Reports";
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
import VirtualTour from "./pages/temple/structure/VirtualTour";
// Event Management Module
import EventsLayout from "./pages/temple/EventsLayout";
import AllEvents from "./pages/temple/events/AllEvents";
import CreateEvent from "./pages/temple/events/CreateEvent";
import CalendarView from "./pages/temple/events/CalendarView";
import EventTemplates from "./pages/temple/events/EventTemplates";
import EventResources from "./pages/temple/events/EventResources";
import EventDetails from "./pages/temple/events/EventDetails";
import EventExpenses from "./pages/temple/events/EventExpenses";
import EventReports from "./pages/temple/events/EventReports";
import EventArchive from "./pages/temple/events/EventArchive";
// Task Management Module
import TasksLayout from "./pages/temple/TasksLayout";
import TaskDashboard from "./pages/temple/tasks/TaskDashboard";
import AllTasks from "./pages/temple/tasks/AllTasks";
import MyTasks from "./pages/temple/tasks/MyTasks";
import OverdueTasks from "./pages/temple/tasks/OverdueTasks";
import CompletedTasks from "./pages/temple/tasks/CompletedTasks";
import ScheduledTemplates from "./pages/temple/tasks/ScheduledTemplates";
// Branch Management Module
import BranchLayout from "./pages/temple/BranchLayout";
import BranchDashboard from "./pages/temple/branches/Dashboard";
import AllBranches from "./pages/temple/branches/AllBranches";
import BranchDetails from "./pages/temple/branches/BranchDetails";
import BranchReports from "./pages/temple/branches/BranchReports";
// Institution Management Module
import InstitutionLayout from "./pages/temple/InstitutionLayout";
import InstitutionDashboard from "./pages/temple/institutions/Dashboard";
import AllInstitutions from "./pages/temple/institutions/AllInstitutions";
import InstitutionDetails from "./pages/temple/institutions/InstitutionDetails";
import InstitutionReports from "./pages/temple/institutions/InstitutionReports";
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
import DonationReportsGovernance from "./pages/temple/donations/ReportsGovernance";
// Feedback & Analytics Module
import FeedbackLayout from "./pages/temple/FeedbackLayout";
import FeedbackDashboard from "./pages/temple/feedback/Dashboard";
import FeedbackCollection from "./pages/temple/feedback/Collection";
import FeedbackSentiment from "./pages/temple/feedback/Sentiment";
import FeedbackAnalytics from "./pages/temple/feedback/Analytics";
// Freelancer Management Module
import FreelancerLayout from "./pages/temple/FreelancerLayout";
import FreelancersList from "./pages/temple/freelancers/FreelancersList";
import FreelancerAssignments from "./pages/temple/freelancers/Assignments";
import FreelancerPayments from "./pages/temple/freelancers/Payments";
import FreelancerPerformance from "./pages/temple/freelancers/Performance";
import FreelancerInsights from "./pages/temple/freelancers/Insights";
import VipLayout from "./pages/temple/VipLayout";
import VipDashboard from "./pages/temple/vip/Dashboard";
import VipDevotees from "./pages/temple/vip/Devotees";
import VipLevels from "./pages/temple/vip/Levels";
import VipActivity from "./pages/temple/vip/Activity";
import VipReports from "./pages/temple/vip/Reports";
// Finance Module
import FinanceLayout from "./pages/temple/FinanceLayout";
import FinanceDashboard from "./pages/temple/finance/FinanceDashboard";
import ChartOfAccounts from "./pages/temple/finance/ChartOfAccounts";
import FinanceLedger from "./pages/temple/finance/FinanceLedger";
import FundManagement from "./pages/temple/finance/FundManagement";
import ExpensesPayables from "./pages/temple/finance/ExpensesPayables";
import BankManagement from "./pages/temple/finance/BankManagement";
import FinancialReports from "./pages/temple/finance/FinancialReports";
// Projects & Initiatives Module
import ProjectsLayout from "./pages/temple/ProjectsLayout";
import ProjectsDashboard from "./pages/temple/projects/Dashboard";
import AllProjects from "./pages/temple/projects/AllProjects";
import CreateProject from "./pages/temple/projects/CreateProject";
import ProjectDetail from "./pages/temple/projects/ProjectDetail";
import ProjectsTimeline from "./pages/temple/projects/Timeline";
import ProjectsReports from "./pages/temple/projects/Reports";
import ProjectsArchive from "./pages/temple/projects/Archive";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useTaskEngineBootstrap();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing & Auth Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
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
              <Route path="virtual-tour" element={<VirtualTour />} />
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
              <Route path="items/:id" element={<ItemDetail />} />
              <Route path="transactions" element={<InventoryTransactions />} />
              <Route path="transactions/:id" element={<TransactionDetail />} />
              <Route path="purchases" element={<InventoryPurchases />} />
              <Route path="purchases/:id" element={<PurchaseOrderDetail />} />
              <Route path="purchases/deliveries/:id" element={<DeliveryDetail />} />
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

            {/* Prasadam & Kitchen (Upcoming) */}
            <Route
              path="/temple/prasadam/*"
              element={<UpcomingModule moduleTitle="Prasadam & Kitchen" />}
            />

            {/* Placeholder routes for other Temple modules */}
            {/* Donation Management Module */}
            <Route path="/temple/donations" element={<DonationsLayout />}>
              <Route index element={<DonationDashboard />} />
              <Route path="donors" element={<DonorRegistry />} />
              <Route path="record" element={<RecordDonation />} />
              <Route path="receipts" element={<Receipts80G />} />
              <Route path="allocation" element={<FundAllocation />} />
              <Route path="reports" element={<DonationReportsGovernance />} />
            </Route>
            {/* Finance & Accounts Module */}
            <Route path="/temple/finance" element={<FinanceLayout />}>
              <Route index element={<FinanceDashboard />} />
              <Route path="coa" element={<ChartOfAccounts />} />
              <Route path="ledger" element={<FinanceLedger />} />
              <Route path="funds" element={<FundManagement />} />
              <Route path="expenses" element={<ExpensesPayables />} />
              <Route path="banking" element={<BankManagement />} />
              <Route path="reports" element={<FinancialReports />} />
            </Route>
            <Route
              path="/temple/planner"
              element={<UpcomingModule moduleTitle="Planner" />}
            />
            <Route
              path="/temple/knowledge"
              element={<UpcomingModule moduleTitle="Knowledge Management" />}
            />

            {/* Freelancer Management Module */}
            <Route path="/temple/freelancer" element={<Navigate to="/temple/freelancers" replace />} />
            <Route path="/temple/freelancers" element={<FreelancerLayout />}>
              <Route index element={<FreelancersList />} />
              <Route path="assignments" element={<FreelancerAssignments />} />
              <Route path="payments" element={<FreelancerPayments />} />
              <Route path="performance" element={<FreelancerPerformance />} />
              <Route path="insights" element={<FreelancerInsights />} />
            </Route>

            {/* VIP Devotee Management Module */}
            <Route path="/temple/vip" element={<VipLayout />}>
              <Route index element={<VipDashboard />} />
              <Route path="devotees" element={<VipDevotees />} />
              <Route path="levels" element={<VipLevels />} />
              <Route path="activity" element={<VipActivity />} />
              <Route path="reports" element={<VipReports />} />
            </Route>

            {/* Devotee CRM Module */}
            <Route path="/temple/devotees" element={<DevoteesLayout />}>
              <Route index element={<DevoteesList />} />
              <Route path="segments" element={<DevoteeGroups />} />
              <Route path="insights" element={<DevoteeDashboard />} />
            </Route>
            {/* Event Management Module */}
            <Route path="/temple/events" element={<EventsLayout />}>
              <Route index element={<AllEvents />} />
              <Route path="create" element={<CreateEvent />} />
              <Route path="calendar" element={<CalendarView />} />
              <Route path="templates" element={<EventTemplates />} />
              <Route path="resources" element={<EventResources />} />
              <Route path="expenses" element={<EventExpenses />} />
              <Route path="reports" element={<EventReports />} />
              <Route path="archive" element={<EventArchive />} />
              <Route path=":eventId" element={<EventDetails />} />
            </Route>
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
            <Route
              path="/temple/assets"
              element={<UpcomingModule moduleTitle="Asset Management" />}
            />

            {/* Task Management Module */}
            <Route path="/temple/tasks" element={<TasksLayout />}>
              <Route index element={<TaskDashboard />} />
              <Route path="all" element={<AllTasks />} />
              <Route path="my" element={<MyTasks />} />
              <Route path="overdue" element={<OverdueTasks />} />
              <Route path="completed" element={<CompletedTasks />} />
              <Route path="templates" element={<ScheduledTemplates />} />
            </Route>
            <Route path="/temple/reports" element={<TempleHub />} />

            {/* Branch Management Module */}
            <Route path="/temple/branches" element={<BranchLayout />}>
              <Route index element={<BranchDashboard />} />
              <Route path="dashboard" element={<BranchDashboard />} />
              <Route path="all" element={<AllBranches />} />
              <Route path="reports" element={<BranchReports />} />
            </Route>
            <Route path="/temple/branches/:branchId" element={<BranchDetails />} />

            {/* Institution Management Module */}
            <Route path="/temple/institutions" element={<InstitutionLayout />}>
              <Route index element={<InstitutionDashboard />} />
              <Route path="dashboard" element={<InstitutionDashboard />} />
              <Route path="all" element={<AllInstitutions />} />
              <Route path="reports" element={<InstitutionReports />} />
            </Route>
            <Route path="/temple/institutions/:institutionId" element={<InstitutionDetails />} />

            {/* Feedback & Analytics Module */}
            <Route path="/temple/feedback" element={<FeedbackLayout />}>
              <Route index element={<FeedbackDashboard />} />
              <Route path="collection" element={<FeedbackCollection />} />
              <Route path="sentiment" element={<FeedbackSentiment />} />
              <Route path="analytics" element={<FeedbackAnalytics />} />
            </Route>

            {/* Projects & Initiatives */}
            <Route path="/temple/projects" element={<ProjectsLayout />}>
              <Route index element={<ProjectsDashboard />} />
              <Route path="all" element={<AllProjects />} />
              <Route path="create" element={<CreateProject />} />
              <Route path=":id" element={<ProjectDetail />} />
              <Route path="timeline" element={<ProjectsTimeline />} />
              <Route path="reports" element={<ProjectsReports />} />
              <Route path="archive" element={<ProjectsArchive />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

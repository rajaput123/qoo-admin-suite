import { CalendarDays, List, Calendar, LayoutTemplate, Eye, IndianRupee, BarChart3, Archive } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "All Events", path: "/temple/events", icon: List, description: "Create & manage all events" },
  { label: "Calendar View", path: "/temple/events/calendar", icon: Calendar, description: "Visual event calendar" },
  { label: "Event Templates", path: "/temple/events/templates", icon: LayoutTemplate, description: "Reusable event configurations" },
  { label: "Event Expenses", path: "/temple/events/expenses", icon: IndianRupee, description: "Track expenses across events" },
  { label: "Event Reports", path: "/temple/events/reports", icon: BarChart3, description: "Analytics & governance reports" },
  { label: "Event Archive", path: "/temple/events/archive", icon: Archive, description: "Completed & archived events" },
];

const EventsLayout = () => {
  return <TempleLayout title="Event Management" icon={CalendarDays} navItems={navItems} />;
};

export default EventsLayout;

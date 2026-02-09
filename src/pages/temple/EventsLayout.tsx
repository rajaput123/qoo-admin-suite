import { CalendarDays, ClipboardList, Link2, Boxes, Radio, FileCheck } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Event Setup", path: "/temple/events", icon: CalendarDays, description: "Create & configure events" },
  { label: "Ritual Attachment", path: "/temple/events/rituals", icon: Link2, description: "Attach rituals & sevas" },
  { label: "Resource Planning", path: "/temple/events/resources", icon: Boxes, description: "Kitchen, inventory, volunteers, logistics" },
  { label: "Execution Mode", path: "/temple/events/execution", icon: Radio, badge: "LIVE", description: "Event day live control" },
  { label: "Closure & Summary", path: "/temple/events/closure", icon: FileCheck, description: "Post-event reports & governance" },
];

const EventsLayout = () => {
  return <TempleLayout title="Event Management" icon={CalendarDays} navItems={navItems} />;
};

export default EventsLayout;

import { Megaphone, LayoutDashboard, Bell, Newspaper, Video, MessageSquare, Users, FileText } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Control Center", path: "/temple/communication", icon: LayoutDashboard, description: "Central communication hub" },
  { label: "Announcements", path: "/temple/communication/announcements", icon: Bell, description: "Official temple notices" },
  { label: "Media Communication", path: "/temple/communication/media", icon: Newspaper, description: "Press, social & digital media" },
  { label: "Live Broadcast", path: "/temple/communication/broadcast", icon: Video, description: "Streaming & live darshana" },
  { label: "Devotee Experience", path: "/temple/communication/experience", icon: MessageSquare, description: "Devotee experience feed" },
  { label: "Public Meetings", path: "/temple/communication/meetings", icon: Users, description: "Governance & official meetings" },
  { label: "Logs & Reports", path: "/temple/communication/logs", icon: FileText, description: "Communication archive & analytics" },
];

const CommunicationLayout = () => {
  return <TempleLayout title="PR & Communication" icon={Megaphone} navItems={navItems} />;
};

export default CommunicationLayout;

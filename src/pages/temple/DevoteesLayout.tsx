import { LayoutDashboard, Users, HandHelping, UsersRound, Activity, BarChart3 } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Dashboard", path: "/temple/devotees", icon: LayoutDashboard, description: "Overview & key metrics" },
  { label: "Devotees", path: "/temple/devotees/list", icon: Users, badge: "1,247", description: "Manage devotee records" },
  { label: "Volunteers", path: "/temple/devotees/volunteers", icon: HandHelping, badge: "86", description: "Volunteer profiles & assignments" },
  { label: "Groups", path: "/temple/devotees/groups", icon: UsersRound, description: "Segment & communicate" },
  { label: "Engagement", path: "/temple/devotees/engagement", icon: Activity, description: "Track devotee participation" },
  { label: "Reports", path: "/temple/devotees/reports", icon: BarChart3, description: "CRM analytics & insights" },
];

const DevoteesLayout = () => {
  return <TempleLayout title="Devotee & Volunteer" icon={Users} navItems={navItems} />;
};

export default DevoteesLayout;

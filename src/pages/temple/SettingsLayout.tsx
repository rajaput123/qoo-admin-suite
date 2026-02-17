import { Settings, User, CreditCard, Calendar, Users, Shield, LayoutGrid, Cog, FileText, Zap } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Profile", path: "/temple/settings", icon: User, description: "Organization profile & contact details" },
  { label: "Finance", path: "/temple/settings/finance", icon: CreditCard, description: "Bank accounts & tax information" },
  { label: "Subscription", path: "/temple/settings/subscription", icon: Calendar, description: "Plan & billing management" },
  { label: "Upgrade Plan", path: "/temple/settings/upgrade", icon: Zap, description: "Compare plans & buy credits" },
  { label: "Invoice", path: "/temple/settings/invoice", icon: FileText, description: "Invoice management & downloads" },
  { label: "Users", path: "/temple/settings/users", icon: Users, description: "User management & access" },
  { label: "Roles & Permissions", path: "/temple/settings/roles", icon: Shield, description: "Role creation & permissions" },
  { label: "Modules", path: "/temple/settings/modules", icon: LayoutGrid, description: "Module access control" },
  { label: "System", path: "/temple/settings/system", icon: Cog, description: "System-wide settings" },
];

const SettingsLayout = () => {
  return <TempleLayout title="Settings" icon={Settings} navItems={navItems} />;
};

export default SettingsLayout;

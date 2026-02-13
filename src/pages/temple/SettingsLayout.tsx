import { Settings, Building2, ShieldCheck, FileText, CreditCard, Bell, Plug, Sliders, LayoutGrid } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Organization", path: "/temple/settings", icon: Building2, description: "Profile & branding" },
  { label: "Access Control", path: "/temple/settings/access", icon: ShieldCheck, description: "Roles & permissions" },
  { label: "Module Policies", path: "/temple/settings/module-policies", icon: FileText, description: "Booking logic" },
  { label: "Financial Configuration", path: "/temple/settings/finance", icon: CreditCard, description: "Payment gateways" },
  { label: "Communication Settings", path: "/temple/settings/communication", icon: Bell, description: "Email & SMS" },
];

const SettingsLayout = () => {
  return <TempleLayout title="Admin Settings" icon={Settings} navItems={navItems} />;
};

export default SettingsLayout;

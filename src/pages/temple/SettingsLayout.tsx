import { Settings, User, CreditCard, Shield, Users, Bell, Palette } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Temple Profile", path: "/temple/settings", icon: Settings },
  { label: "Subscription", path: "/temple/settings/subscription", icon: CreditCard },
  { label: "Payment Setup", path: "/temple/settings/payments", icon: CreditCard },
  { label: "User Roles", path: "/temple/settings/users", icon: Users },
  { label: "Notifications", path: "/temple/settings/notifications", icon: Bell },
  { label: "Security", path: "/temple/settings/security", icon: Shield },
];

const SettingsLayout = () => {
  return <TempleLayout title="Settings" icon={Settings} navItems={navItems} />;
};

export default SettingsLayout;

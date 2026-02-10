import { Building2, List, BarChart3, Settings } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "All Institutions", path: "/temple/institutions", icon: List, description: "View & manage all institutions" },
  { label: "Institution Reports", path: "/temple/institutions/reports", icon: BarChart3, description: "Cross-institution analytics" },
  { label: "Settings", path: "/temple/institutions/settings", icon: Settings, description: "Institution configuration" },
];

const InstitutionLayout = () => {
  return <TempleLayout title="Institutions" icon={Building2} navItems={navItems} />;
};

export default InstitutionLayout;

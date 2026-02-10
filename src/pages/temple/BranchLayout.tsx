import { GitBranch, List, BarChart3, Settings } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "All Branches", path: "/temple/branches", icon: List, description: "View & manage all branches" },
  { label: "Branch Reports", path: "/temple/branches/reports", icon: BarChart3, description: "Cross-branch analytics" },
  { label: "Branch Settings", path: "/temple/branches/settings", icon: Settings, description: "Global branch configuration" },
];

const BranchLayout = () => {
  return <TempleLayout title="Branch Management" icon={GitBranch} navItems={navItems} />;
};

export default BranchLayout;

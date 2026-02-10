import { FolderKanban, LayoutDashboard, FileText, Milestone, Wallet, Heart, GitPullRequest, Link2, ShieldAlert, TrendingUp, FileBarChart } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Portfolio Dashboard", path: "/temple/projects", icon: LayoutDashboard, description: "Overview of all projects & KPIs" },
  { label: "Project Master", path: "/temple/projects/master", icon: FileText, description: "Create & manage projects" },
  { label: "Milestones & Phases", path: "/temple/projects/milestones", icon: Milestone, description: "Phase tracking & dependencies" },
  { label: "Budget & Funding", path: "/temple/projects/budget", icon: Wallet, description: "Budget control & variance" },
  { label: "Donation Mapping", path: "/temple/projects/donations", icon: Heart, description: "Donor fund traceability" },
  { label: "Approval Workflow", path: "/temple/projects/approvals", icon: GitPullRequest, description: "Governance approval stages" },
  { label: "Task Integration", path: "/temple/projects/tasks", icon: Link2, description: "Linked operational tasks" },
  { label: "Risk & Change", path: "/temple/projects/risk", icon: ShieldAlert, description: "Risk register & change control" },
  { label: "Progress Analytics", path: "/temple/projects/analytics", icon: TrendingUp, description: "Performance metrics & flags" },
  { label: "Reports & Governance", path: "/temple/projects/reports", icon: FileBarChart, description: "Exportable governance reports" },
];

const ProjectsLayout = () => {
  return <TempleLayout title="Projects & Initiatives" icon={FolderKanban} navItems={navItems} />;
};

export default ProjectsLayout;

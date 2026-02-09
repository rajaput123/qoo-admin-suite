import { ClipboardList, LayoutDashboard, List, FileStack, UserCheck, Play, BarChart3 } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Task Dashboard", path: "/temple/tasks", icon: LayoutDashboard, description: "Overview of tasks & priorities" },
  { label: "Task List", path: "/temple/tasks/list", icon: List, description: "All tasks with filters" },
  { label: "Task Templates", path: "/temple/tasks/templates", icon: FileStack, description: "Reusable task patterns" },
  { label: "Assignment", path: "/temple/tasks/assignment", icon: UserCheck, description: "HR-integrated assignment" },
  { label: "Execution & Status", path: "/temple/tasks/execution", icon: Play, description: "Track task completion" },
  { label: "Reports", path: "/temple/tasks/reports", icon: BarChart3, description: "Task analytics & summaries" },
];

const TasksLayout = () => {
  return <TempleLayout title="Task Management" icon={ClipboardList} navItems={navItems} />;
};

export default TasksLayout;

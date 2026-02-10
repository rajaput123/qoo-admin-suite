import { ClipboardList, LayoutDashboard, List, User, AlertTriangle, CheckCircle2 } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Dashboard", path: "/temple/tasks", icon: LayoutDashboard, description: "Operational overview" },
  { label: "All Tasks", path: "/temple/tasks/all", icon: List, badge: "22", description: "All linked tasks" },
  { label: "My Tasks", path: "/temple/tasks/my", icon: User, description: "Your assigned tasks" },
  { label: "Overdue Tasks", path: "/temple/tasks/overdue", icon: AlertTriangle, badge: "4", description: "Past due date" },
  { label: "Completed", path: "/temple/tasks/completed", icon: CheckCircle2, description: "Finished tasks" },
];

const TasksLayout = () => {
  return <TempleLayout title="Task Management" icon={ClipboardList} navItems={navItems} />;
};

export default TasksLayout;

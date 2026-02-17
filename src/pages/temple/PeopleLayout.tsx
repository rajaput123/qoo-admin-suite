import { Users, Clock, FileText, UserCheck, Building2, TreePine, Calendar, DollarSign } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Employees", path: "/temple/people", icon: Users, description: "Manage all employees" },
  { label: "Attendance", path: "/temple/people/attendance", icon: Clock, description: "Track attendance and leaves" },
  { label: "Shifts", path: "/temple/people/shifts", icon: Calendar, description: "Manage work shifts" },
  { label: "Leave", path: "/temple/people/leave", icon: Calendar, description: "Leave management" },
  { label: "Organization", path: "/temple/people/organization", icon: Building2, description: "Org structure" },
  { label: "Org Tree", path: "/temple/people/org-tree", icon: TreePine, description: "Organization hierarchy" },
  { label: "Expenses", path: "/temple/people/expenses", icon: DollarSign, description: "Employee expenses" },
  { label: "Onboarding", path: "/temple/people/onboarding", icon: UserCheck, description: "Employee onboarding" },
];

const PeopleLayout = () => {
  return <TempleLayout title="People & HR" icon={Users} navItems={navItems} />;
};

export default PeopleLayout;

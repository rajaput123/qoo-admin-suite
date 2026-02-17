import { Users, Clock, Calendar, Building2, DollarSign } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Employees", path: "/temple/people", icon: Users, description: "Manage all employees" },
  { label: "Organization", path: "/temple/people/organization", icon: Building2, description: "Org structure" },
  { label: "Shifts", path: "/temple/people/shifts", icon: Clock, description: "Manage work shifts" },
  { label: "Leave & Holidays", path: "/temple/people/leave", icon: Calendar, description: "Leave management" },
  { label: "Attendance", path: "/temple/people/attendance", icon: Clock, description: "Track attendance" },
  { label: "Expenses", path: "/temple/people/expenses", icon: DollarSign, description: "Employee expenses" },
];

const PeopleLayout = () => {
  return <TempleLayout title="People / HR" icon={Users} navItems={navItems} />;
};

export default PeopleLayout;

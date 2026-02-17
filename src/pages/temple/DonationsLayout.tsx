import { Heart, LayoutDashboard, Users, PlusCircle, Receipt, Wallet, FileBarChart, List, IndianRupee } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Dashboard", path: "/temple/donations", icon: LayoutDashboard, description: "Donation overview & KPIs" },
  {
    label: "Donations",
    path: "/temple/donations/list",
    icon: IndianRupee,
    description: "Manage all donations",
    children: [
      { label: "All Donations", path: "/temple/donations/list", icon: List, description: "Filterable donation register" },
      { label: "Add Donation", path: "/temple/donations/record", icon: PlusCircle, description: "Record a new donation" },
    ],
  },
  { label: "Donors", path: "/temple/donations/donors", icon: Users, description: "Donor registry & profiles" },
  { label: "Funds", path: "/temple/donations/allocation", icon: Wallet, description: "Fund allocation & utilization" },
  { label: "Receipts & 80G", path: "/temple/donations/receipts", icon: Receipt, description: "Receipts & tax certificates" },
  { label: "Reports", path: "/temple/donations/reports", icon: FileBarChart, description: "Reports, audit & governance" },
];

const DonationsLayout = () => {
  return <TempleLayout title="Donation Management" icon={Heart} navItems={navItems} />;
};

export default DonationsLayout;

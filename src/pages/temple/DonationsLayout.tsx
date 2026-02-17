import { Heart, LayoutDashboard, Users, Wallet, FileBarChart, IndianRupee } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Dashboard", path: "/temple/donations", icon: LayoutDashboard, description: "Donation overview & KPIs" },
  { label: "Donations", path: "/temple/donations/list", icon: IndianRupee, description: "All donations & add new" },
  { label: "Donors", path: "/temple/donations/donors", icon: Users, description: "Donor registry & profiles" },
  { label: "Funds", path: "/temple/donations/allocation", icon: Wallet, description: "Fund allocation & utilization" },
  { label: "Reports", path: "/temple/donations/reports", icon: FileBarChart, description: "Reports, audit & governance" },
];

const DonationsLayout = () => {
  return <TempleLayout title="Donation Management" icon={Heart} navItems={navItems} />;
};

export default DonationsLayout;

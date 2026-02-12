import { Heart, LayoutDashboard, Users, PlusCircle, Receipt, Wallet, FileBarChart } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Dashboard", path: "/temple/donations", icon: LayoutDashboard, description: "Donation overview & KPIs" },
  { label: "Donor Registry", path: "/temple/donations/donors", icon: Users, description: "All donors & profiles" },
  { label: "Record Donation", path: "/temple/donations/record", icon: PlusCircle, description: "Receive & record donations" },
  { label: "Receipts & 80G", path: "/temple/donations/receipts", icon: Receipt, description: "Receipt & tax certificate management" },
  { label: "Fund Allocation", path: "/temple/donations/allocation", icon: Wallet, description: "Purpose-based fund tagging" },
  { label: "Reports & Governance", path: "/temple/donations/reports", icon: FileBarChart, description: "Trustee reports & audit" },
];

const DonationsLayout = () => {
  return <TempleLayout title="Donation Management" icon={Heart} navItems={navItems} />;
};

export default DonationsLayout;

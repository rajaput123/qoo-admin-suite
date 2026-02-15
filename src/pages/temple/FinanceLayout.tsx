import { LayoutDashboard, Calendar, FileText, Banknote } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
    { label: "Finance Dashboard", path: "/temple/finance", icon: LayoutDashboard, description: "Income, expenses & balance overview" },
    { label: "Event Finance", path: "/temple/finance/event", icon: Calendar, description: "Event-wise financial tracking" },
    { label: "Reports", path: "/temple/finance/reports", icon: FileText, description: "Financial reports & exports" },
];

const FinanceLayout = () => {
    return <TempleLayout title="Finance & Accounts" icon={Banknote} navItems={navItems} />;
};

export default FinanceLayout;

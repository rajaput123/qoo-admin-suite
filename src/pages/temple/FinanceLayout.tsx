import { LayoutDashboard, Milestone, FileBarChart, Wallet, CreditCard, Building, Banknote } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
    { label: "Dashboard", path: "/temple/finance", icon: LayoutDashboard, description: "Overview & KPIs" },
    { label: "Chart of Accounts", path: "/temple/finance/coa", icon: FileBarChart, description: "Manage Account Heads" },
    { label: "General Ledger", path: "/temple/finance/ledger", icon: Building, description: "Journal Entries" },
    { label: "Fund Management", path: "/temple/finance/funds", icon: Wallet, description: "Restricted Funds" },
    { label: "Expenses & Payables", path: "/temple/finance/expenses", icon: CreditCard, description: "Invoices & Payments" },
    { label: "Bank & Cash", path: "/temple/finance/banking", icon: Banknote, description: "Accounts & Reconciliation" },
    { label: "Reports", path: "/temple/finance/reports", icon: Milestone, description: "Financial Statements" },
];

const FinanceLayout = () => {
    return <TempleLayout title="Finance & Accounts" icon={Banknote} navItems={navItems} />;
};

export default FinanceLayout;

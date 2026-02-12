import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp, AlertCircle, Building2, RefreshCw } from "lucide-react";
import { financeSelectors } from "@/modules/finance/financeStore";
import { financeIntegration } from "@/modules/finance/integration";
import { toast } from "sonner";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const FinanceDashboard = () => {
    const accounts = financeSelectors.getAccounts();
    // const transactions = financeSelectors.getTransactions();

    const handleSync = () => {
        try {
            const count = financeIntegration.syncDonationsToLedger();
            if (count > 0) {
                toast.success(`Synced ${count} new donations to Ledger`);
                setTimeout(() => window.location.reload(), 1000);
            } else {
                toast.info("No new donations to sync");
            }
        } catch (e) {
            toast.error("Sync failed");
        }
    };

    // Derived Metrics (Mock logic for now as actual transactions might be empty)
    // In a real app, calculate these from transactions.filter(t => t.date within range)
    const totalAssets = accounts.filter(a => a.type === "Asset").reduce((s, a) => s + (a.parentAccount ? a.balance : 0), 0);
    const cashInHand = accounts.find(a => a.name === "Cash on Hand")?.balance || 0;
    const bankBalance = accounts.filter(a => a.type === "Asset" && a.name.includes("Bank")).reduce((s, a) => s + a.balance, 0) || 0;

    // Mock Data for Charts (Replace with aggregated ledger query)
    const monthlyData = [
        { name: "Jan", income: 450000, expense: 320000 },
        { name: "Feb", income: 520000, expense: 380000 },
        { name: "Mar", income: 480000, expense: 410000 },
        { name: "Apr", income: 600000, expense: 450000 },
        { name: "May", income: 550000, expense: 390000 },
        { name: "Jun", income: 490000, expense: 420000 },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Financial Overview</h1>
                    <p className="text-muted-foreground">Trustee view of temple finances & liquidity</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Download Report</Button>
                    <Button variant="outline" onClick={handleSync} className="gap-2">
                        <RefreshCw className="h-4 w-4" /> Sync Donations
                    </Button>
                    <Button>Add Transaction</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Income (YTD)</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹30.9L</div>
                        <p className="text-xs text-muted-foreground">+12.5% from last year</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses (YTD)</CardTitle>
                        <ArrowDownLeft className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹23.7L</div>
                        <p className="text-xs text-muted-foreground">+4.1% from last year</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Net Surplus</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">₹7.2L</div>
                        <p className="text-xs text-muted-foreground">Healthy margin</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cash & Bank Position</CardTitle>
                        <Wallet className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{(totalAssets / 100000).toFixed(2)}L</div>
                        <p className="text-xs text-muted-foreground">Liquidity Available</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Income vs Expense</CardTitle>
                        <CardDescription>Monthly financial performance comparison</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip formatter={(val: number) => `₹${val.toLocaleString()}`} />
                                <Legend />
                                <Bar dataKey="income" name="Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Asset Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-green-100 rounded-lg"><Wallet className="h-4 w-4 text-green-700" /></div>
                                    <div>
                                        <p className="text-sm font-medium">Cash on Hand</p>
                                        <p className="text-xs text-muted-foreground">Petty cash & Hundi</p>
                                    </div>
                                </div>
                                <span className="font-bold">₹{cashInHand.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-blue-100 rounded-lg"><Building2 className="h-4 w-4 text-blue-700" /></div>
                                    <div>
                                        <p className="text-sm font-medium">Bank Accounts</p>
                                        <p className="text-xs text-muted-foreground">SBI, HDFC, etc.</p>
                                    </div>
                                </div>
                                <span className="font-bold">₹{bankBalance.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-amber-100 rounded-lg"><TrendingUp className="h-4 w-4 text-amber-700" /></div>
                                    <div>
                                        <p className="text-sm font-medium">Fixed Deposits</p>
                                        <p className="text-xs text-muted-foreground">Long term assets</p>
                                    </div>
                                </div>
                                <span className="font-bold">₹0</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-destructive/10 border-destructive/20">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-destructive">
                                <AlertCircle className="h-5 w-5" />
                                <CardTitle className="text-base">Pending Actions</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Vendor Invoices</span>
                                <Badge variant="outline" className="bg-background">3 Pending</Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Bank Reconciliation</span>
                                <Badge variant="outline" className="bg-background">Jan 2024</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};

export default FinanceDashboard;

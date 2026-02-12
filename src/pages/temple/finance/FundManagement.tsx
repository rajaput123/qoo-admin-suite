import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wallet, ShieldCheck, Lock, ArrowRight, Plus } from "lucide-react";
import { financeSelectors } from "@/modules/finance/financeStore";
import { Fund } from "@/modules/finance/types";

const FundCard = ({ fund }: { fund: Fund }) => {
    const isGeneral = fund.type === "General";
    const isRestricted = fund.type === "Restricted";

    return (
        <Card className="overflow-hidden">
            <div className={`h-2 w-full ${isGeneral ? "bg-blue-500" : isRestricted ? "bg-amber-500" : "bg-purple-500"}`} />
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">{fund.type}</Badge>
                    {fund.status === "Active" ? <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge> : <Badge variant="secondary">Closed</Badge>}
                </div>
                <CardTitle className="text-lg">{fund.name}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-[40px]">{fund.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mt-2">
                    <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                    <p className="text-3xl font-bold tracking-tight">₹{fund.balance.toLocaleString()}</p>
                </div>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t p-3">
                <Button variant="ghost" size="sm" className="w-full text-xs gap-1">
                    View Transactions <ArrowRight className="h-3 w-3" />
                </Button>
            </CardFooter>
        </Card>
    );
};

const FundManagement = () => {
    const funds = financeSelectors.getFunds();
    const totalFunds = funds.reduce((s, f) => s + f.balance, 0);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Fund Management</h1>
                    <p className="text-muted-foreground">Manage restricted and general temple funds</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Create New Fund
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 bg-primary text-primary-foreground">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-full">
                                <Wallet className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <p className="text-blue-100 font-medium">Total Funds Position</p>
                                <h2 className="text-4xl font-bold mt-1">₹{totalFunds.toLocaleString()}</h2>
                            </div>
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-blue-100 text-sm">General Fund</p>
                                <p className="text-xl font-bold">₹{funds.filter(f => f.type === "General").reduce((s, f) => s + f.balance, 0).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-blue-100 text-sm">Restricted</p>
                                <p className="text-xl font-bold">₹{funds.filter(f => f.type === "Restricted").reduce((s, f) => s + f.balance, 0).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-blue-100 text-sm">Endowment</p>
                                <p className="text-xl font-bold">₹{funds.filter(f => f.type === "Endowment").reduce((s, f) => s + f.balance, 0).toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Compliance Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="text-sm font-medium">Restricted Funds</p>
                                <p className="text-xs text-muted-foreground">100% Segregated</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Lock className="h-5 w-5 text-amber-600" />
                            <div>
                                <p className="text-sm font-medium">Endowment Corpus</p>
                                <p className="text-xs text-muted-foreground">Locked (Interest Only)</p>
                            </div>
                        </div>
                        <div className="pt-2">
                            <p className="text-xs text-muted-foreground mb-1">Fund Utilization (YTD)</p>
                            <Progress value={32} className="h-2" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {funds.map(fund => (
                    <FundCard key={fund.id} fund={fund} />
                ))}
            </div>
        </motion.div>
    );
};

export default FundManagement;

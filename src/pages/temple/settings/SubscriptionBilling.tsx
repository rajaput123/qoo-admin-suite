import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Calendar, CheckCircle2, Zap, ArrowUp, BarChart3, Gift, Sparkles, ArrowRight, Download } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const SubscriptionBilling = () => {
  const navigate = useNavigate();
  const [isFirstTime] = useState(true); // First-time user flag

  const currentPlan = {
    name: "Starter",
    price: 0,
    billingCycle: "monthly",
    creditsTotal: 100,
    creditsUsed: 0,
    nextBillingDate: "2026-03-17",
    startDate: "2026-02-17",
  };

  const creditsRemaining = currentPlan.creditsTotal - currentPlan.creditsUsed;
  const usagePercent = Math.round((creditsRemaining / currentPlan.creditsTotal) * 100);

  const usageBreakdown = [
    { module: "Offerings & Sevas", credits: 0, percentage: 0 },
    { module: "Donation Receipts", credits: 0, percentage: 0 },
    { module: "Booking Management", credits: 0, percentage: 0 },
    { module: "Reports Generated", credits: 0, percentage: 0 },
    { module: "Communication", credits: 0, percentage: 0 },
  ];

  const billingHistory = [
    { id: "INV-001", date: "2026-02-17", plan: "Starter (Free)", amount: 0, credits: 100, status: "active" as const },
  ];

  const creditActions = [
    { action: "Create a Seva / Offering", cost: 1 },
    { action: "Record a Donation", cost: 1 },
    { action: "Process a Booking", cost: 1 },
    { action: "Generate a Report", cost: 2 },
    { action: "Send Communication", cost: 1 },
    { action: "Add Branch / Structure", cost: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Billing & Credits</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your subscription, credits, and payment history</p>
      </div>

      {/* First-Time Welcome Banner */}
      {isFirstTime && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="py-5 px-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Welcome to Your Starter Plan!</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    You've been allocated <span className="font-semibold text-foreground">100 free credits</span> to explore the platform. 
                    Credits are consumed when you perform actions like creating sevas, recording donations, or generating reports.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="default" className="gap-1.5" onClick={() => navigate("/temple/settings/upgrade")}>
                      <ArrowUp className="h-3.5 w-3.5" /> View Plans
                    </Button>
                    <Button size="sm" variant="outline" className="gap-1.5">
                      <Gift className="h-3.5 w-3.5" /> How Credits Work
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Credit Balance + Current Plan */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Credit Balance Meter */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" /> Credit Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="relative inline-flex items-center justify-center w-36 h-36">
                  <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeDasharray={`${usagePercent * 3.14} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">{creditsRemaining}</span>
                    <span className="text-[10px] text-muted-foreground">of {currentPlan.creditsTotal} credits</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Used</span>
                  <span className="font-medium">{currentPlan.creditsUsed} credits</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-medium text-primary">{creditsRemaining} credits</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Renews on</span>
                  <span className="font-medium">{currentPlan.nextBillingDate}</span>
                </div>
              </div>
              <Button size="sm" className="w-full gap-1.5" onClick={() => navigate("/temple/settings/upgrade")}>
                <Zap className="h-3.5 w-3.5" /> Buy More Credits
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Current Plan */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg border bg-muted/30 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-foreground">{currentPlan.name}</h3>
                  <Badge variant="default" className="text-[10px]">Active</Badge>
                </div>
                <p className="text-2xl font-bold text-foreground">Free</p>
                <p className="text-xs text-muted-foreground mt-0.5">Auto-assigned on approval</p>
              </div>
              <div className="space-y-2 mb-4">
                {["100 Credits / month", "Basic Temple Structure", "Up to 5 Sevas", "Single Admin User", "Email Support"].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full gap-1.5" onClick={() => navigate("/temple/settings/upgrade")}>
                <ArrowUp className="h-3.5 w-3.5" /> Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* How Credits Work — First Time */}
      {isFirstTime && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Gift className="h-4 w-4 text-primary" /> How Credits Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Each action you perform on the platform consumes a small number of credits. Here's what typical actions cost:
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {creditActions.map((item) => (
                  <div key={item.action} className="flex items-center justify-between p-2.5 rounded-lg border bg-muted/20">
                    <span className="text-sm text-foreground">{item.action}</span>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      <Zap className="h-2.5 w-2.5 mr-0.5" /> {item.cost}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">💡 Tip:</span> Your 100 free credits can handle approximately 80-100 transactions. 
                  When credits run low, you'll see a warning banner. You can always buy more or upgrade your plan.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Usage Breakdown */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Usage Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentPlan.creditsUsed === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-1">No usage recorded yet</p>
                <p className="text-xs text-muted-foreground">Your credit usage will appear here as you start using the platform.</p>
                <Button variant="outline" size="sm" className="mt-4 gap-1.5" onClick={() => navigate("/temple")}>
                  <ArrowRight className="h-3.5 w-3.5" /> Start Using Modules
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {usageBreakdown.map((item) => (
                    <div key={item.module}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-foreground">{item.module}</span>
                        <span className="text-muted-foreground">{item.credits} credits ({item.percentage}%)</span>
                      </div>
                      <Progress value={item.percentage} className="h-1.5" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                  <span className="font-medium text-foreground">Total Used This Period</span>
                  <span className="font-semibold">{currentPlan.creditsUsed} credits</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment & Credit History */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Payment & Credit History
              </CardTitle>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <Download className="h-3 w-3" /> Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Credits</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-sm">{entry.date}</TableCell>
                    <TableCell className="text-sm">{entry.plan}</TableCell>
                    <TableCell className="text-right text-sm font-medium">
                      {entry.amount === 0 ? "Free" : `₹${entry.amount.toLocaleString()}`}
                    </TableCell>
                    <TableCell className="text-right text-sm">{entry.credits}</TableCell>
                    <TableCell>
                      <Badge variant={entry.status === "active" ? "default" : "secondary"} className="text-xs">
                        {entry.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Method */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">No payment method on file</p>
                  <p className="text-xs text-muted-foreground">Add a payment method when you're ready to upgrade or buy credits</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Add Method</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SubscriptionBilling;

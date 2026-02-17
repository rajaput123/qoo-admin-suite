import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Download, Calendar, CheckCircle2, Zap, TrendingDown, ArrowUp, BarChart3 } from "lucide-react";
import { toast } from "sonner";

const SubscriptionBilling = () => {
  const navigate = useNavigate();

  const currentPlan = {
    name: "Starter",
    price: 0,
    billingCycle: "monthly",
    creditsTotal: 100,
    creditsUsed: 32,
    nextBillingDate: "2026-03-15",
  };

  const creditsRemaining = currentPlan.creditsTotal - currentPlan.creditsUsed;
  const usagePercent = Math.round((creditsRemaining / currentPlan.creditsTotal) * 100);

  const usageBreakdown = [
    { module: "Offerings & Sevas", credits: 12, percentage: 37 },
    { module: "Donation Receipts", credits: 8, percentage: 25 },
    { module: "Booking Management", credits: 5, percentage: 16 },
    { module: "Reports Generated", credits: 4, percentage: 12 },
    { module: "Communication", credits: 3, percentage: 10 },
  ];

  const billingHistory = [
    { id: "INV-001", date: "2026-02-15", plan: "Starter", amount: 0, credits: 100, status: "active" as const },
    { id: "INV-002", date: "2026-01-15", plan: "Starter", amount: 0, credits: 100, status: "expired" as const },
    { id: "CRD-001", date: "2026-01-20", plan: "Credit Pack", amount: 499, credits: 50, status: "applied" as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Billing & Credits</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your subscription, credits, and payment history</p>
      </div>

      {/* Credit Balance + Current Plan */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Credit Balance Meter */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Credit Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="relative inline-flex items-center justify-center w-32 h-32">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="10"
                    strokeDasharray={`${usagePercent * 3.14} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">{creditsRemaining}</span>
                  <span className="text-[10px] text-muted-foreground">of {currentPlan.creditsTotal}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Used</span>
              <span className="font-medium">{currentPlan.creditsUsed} credits</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-medium">{creditsRemaining} credits</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Renews on {currentPlan.nextBillingDate}</p>
            <Button size="sm" className="w-full gap-1" onClick={() => navigate("/temple/settings/upgrade")}>
              <Zap className="h-3.5 w-3.5" /> Buy More Credits
            </Button>
          </CardContent>
        </Card>

        {/* Current Plan */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg border bg-muted/30 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold">{currentPlan.name}</h3>
                <Badge variant="default">Active</Badge>
              </div>
              <p className="text-2xl font-bold">
                {currentPlan.price === 0 ? "Free" : `₹${currentPlan.price.toLocaleString()}`}
              </p>
              <p className="text-xs text-muted-foreground">per {currentPlan.billingCycle}</p>
            </div>
            <div className="space-y-2 mb-4">
              {["100 Credits/month", "Basic Temple Structure", "Up to 5 Sevas", "Email Support"].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full gap-1" onClick={() => navigate("/temple/settings/upgrade")}>
              <ArrowUp className="h-3.5 w-3.5" /> Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Usage Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Payment & Credit History
          </CardTitle>
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

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">No payment method on file</p>
                <p className="text-xs text-muted-foreground">Add a payment method to upgrade or buy credits</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Add Payment Method</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionBilling;

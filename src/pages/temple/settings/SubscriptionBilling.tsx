import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Download, ArrowUp, ArrowDown, Calendar, CheckCircle2, FileText } from "lucide-react";
import { toast } from "sonner";

interface BillingHistory {
  id: string;
  date: string;
  plan: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  invoice: string;
}

const SubscriptionBilling = () => {
  const [currentPlan, setCurrentPlan] = useState({
    name: "Professional",
    price: 9999,
    billingCycle: "monthly",
    features: ["Unlimited Users", "All Modules", "Priority Support", "Advanced Reports"],
    nextBillingDate: "2024-02-15",
  });

  const billingHistory: BillingHistory[] = [
    { id: "INV-001", date: "2024-01-15", plan: "Professional", amount: 9999, status: "paid", invoice: "INV-2024-001.pdf" },
    { id: "INV-002", date: "2023-12-15", plan: "Professional", amount: 9999, status: "paid", invoice: "INV-2023-012.pdf" },
    { id: "INV-003", date: "2023-11-15", plan: "Standard", amount: 4999, status: "paid", invoice: "INV-2023-011.pdf" },
    { id: "INV-004", date: "2023-10-15", plan: "Standard", amount: 4999, status: "paid", invoice: "INV-2023-010.pdf" },
  ];

  const availablePlans = [
    { name: "Basic", price: 2999, features: ["Up to 5 Users", "Core Modules", "Email Support"] },
    { name: "Standard", price: 4999, features: ["Up to 15 Users", "All Modules", "Priority Support"] },
    { name: "Professional", price: 9999, features: ["Unlimited Users", "All Modules", "Priority Support", "Advanced Reports"] },
    { name: "Enterprise", price: 19999, features: ["Unlimited Users", "All Modules", "24/7 Support", "Custom Integrations", "Dedicated Manager"] },
  ];

  const handleUpgrade = (planName: string) => {
    toast.success(`Upgrading to ${planName} plan...`);
  };

  const handleDowngrade = (planName: string) => {
    if (confirm(`Are you sure you want to downgrade to ${planName}? This will take effect at the end of your billing cycle.`)) {
      toast.success(`Downgrade to ${planName} scheduled`);
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Downloading invoice ${invoiceId}...`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Paid</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscription & Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your platform subscription and billing</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold">{currentPlan.name}</h3>
                  <Badge variant="default">Active</Badge>
                </div>
                <p className="text-2xl font-bold">₹{currentPlan.price.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">per {currentPlan.billingCycle}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Next billing date</p>
                <p className="text-sm font-medium">{currentPlan.nextBillingDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Plan Features:</p>
              <ul className="space-y-1">
                {currentPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Available Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {availablePlans.map(plan => {
              const isCurrent = plan.name === currentPlan.name;
              const isUpgrade = plan.price > currentPlan.price;
              const isDowngrade = plan.price < currentPlan.price;
              
              return (
                <div
                  key={plan.name}
                  className={`p-4 rounded-lg border ${
                    isCurrent ? "border-primary bg-primary/5" : "bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{plan.name}</h3>
                    {isCurrent && <Badge variant="default">Current</Badge>}
                  </div>
                  <p className="text-2xl font-bold mb-2">₹{plan.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mb-3">per month</p>
                  <ul className="space-y-1 mb-4 text-xs">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {!isCurrent && (
                    <Button
                      variant={isUpgrade ? "default" : "outline"}
                      className="w-full"
                      size="sm"
                      onClick={() => isUpgrade ? handleUpgrade(plan.name) : handleDowngrade(plan.name)}
                    >
                      {isUpgrade ? (
                        <>
                          <ArrowUp className="h-4 w-4 mr-2" /> Upgrade
                        </>
                      ) : (
                        <>
                          <ArrowDown className="h-4 w-4 mr-2" /> Downgrade
                        </>
                      )}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.plan}</TableCell>
                  <TableCell className="text-right font-medium">₹{invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" /> Download
                    </Button>
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
                <p className="font-medium">Card ending in 1234</p>
                <p className="text-xs text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update Payment Method</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionBilling;

import { useState } from "react";
import { CustomField } from "@/components/CustomFieldsSection";
import { motion } from "framer-motion";
import {
  CreditCard,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Archive,
  Copy,
  Check,
  X,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import CustomFieldsSection from "@/components/CustomFieldsSection";

const plans = [
  {
    id: "PLAN-001",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    maxUsers: 2,
    maxBookings: 100,
    maxStorage: 0.5,
    features: ["Directory Listing", "Basic Profile"],
    apiLimit: 1000,
    status: "Active",
    version: "1.0",
    tenantCount: 2847,
  },
  {
    id: "PLAN-002",
    name: "Standard",
    monthlyPrice: 8000,
    yearlyPrice: 80000,
    maxUsers: 5,
    maxBookings: 5000,
    maxStorage: 2,
    features: ["Directory Listing", "Booking System", "Reports", "Email Support"],
    apiLimit: 25000,
    status: "Active",
    version: "2.1",
    tenantCount: 3256,
  },
  {
    id: "PLAN-003",
    name: "Premium",
    monthlyPrice: 15000,
    yearlyPrice: 150000,
    maxUsers: 15,
    maxBookings: 10000,
    maxStorage: 5,
    features: ["Directory Listing", "Booking System", "Reports", "Live Streaming", "Multi-Branch", "Priority Support"],
    apiLimit: 50000,
    status: "Active",
    version: "2.0",
    tenantCount: 1834,
  },
  {
    id: "PLAN-004",
    name: "Enterprise",
    monthlyPrice: 45000,
    yearlyPrice: 450000,
    maxUsers: 50,
    maxBookings: 50000,
    maxStorage: 20,
    features: ["All Features", "Dedicated Support", "Custom Integrations", "SLA Guarantee"],
    apiLimit: 200000,
    status: "Active",
    version: "1.5",
    tenantCount: 423,
  },
  {
    id: "PLAN-005",
    name: "Government",
    monthlyPrice: 25000,
    yearlyPrice: 250000,
    maxUsers: 30,
    maxBookings: 25000,
    maxStorage: 15,
    features: ["All Features", "Compliance Reports", "Audit Logs", "Government Portal Integration"],
    apiLimit: 100000,
    status: "Active",
    version: "1.0",
    tenantCount: 72,
  },
  {
    id: "PLAN-006",
    name: "Starter (Legacy)",
    monthlyPrice: 5000,
    yearlyPrice: 50000,
    maxUsers: 3,
    maxBookings: 2000,
    maxStorage: 1,
    features: ["Directory Listing", "Basic Booking"],
    apiLimit: 10000,
    status: "Archived",
    version: "1.0",
    tenantCount: 156,
  },
];

const SubscriptionPlans = () => {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const handleRowClick = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setDetailOpen(true);
  };

  const toggleSelect = (id: string) => {
    setSelectedPlans((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedPlans((prev) =>
      prev.length === plans.length ? [] : plans.map((p) => p.id)
    );
  };

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Subscription Plans</h1>
            <p className="text-sm text-muted-foreground">Configure global subscription plans and pricing</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" />
              New Plan
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6 glass-shadow">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search plans..." className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show Archived</span>
              <Switch />
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPlans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-6 py-3 rounded-full shadow-xl flex items-center gap-4"
          >
            <span className="text-sm font-medium">{selectedPlans.length} selected</span>
            <div className="h-4 w-px bg-background/20" />
            <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2">
              <Archive className="h-4 w-4" />
              Archive
            </Button>
            <Button size="sm" variant="ghost" className="text-background hover:text-background hover:bg-background/10 gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <button onClick={() => setSelectedPlans([])} className="ml-2 p-1 hover:bg-background/10 rounded">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.filter(p => p.status === "Active").map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleRowClick(plan)}
              className="glass-card rounded-2xl glass-shadow overflow-hidden cursor-pointer hover:shadow-xl transition-all group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground">v{plan.version}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Plan
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Copy className="h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Archive className="h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">₹{plan.monthlyPrice.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-xs text-muted-foreground">₹{plan.yearlyPrice.toLocaleString()}/year</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Users</span>
                    <span className="font-medium">{plan.maxUsers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bookings</span>
                    <span className="font-medium">{plan.maxBookings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-medium">{plan.maxStorage} GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">API Calls</span>
                    <span className="font-medium">{plan.apiLimit.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{plan.tenantCount.toLocaleString()} tenants</span>
                    <Badge className="bg-success/10 text-success text-xs">{plan.status}</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Archived Plans */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Archived Plans</h2>
          <div className="glass-card rounded-2xl glass-shadow overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="p-4 text-left">
                    <Checkbox
                      checked={selectedPlans.length === plans.filter(p => p.status === "Archived").length}
                      onCheckedChange={() => {}}
                    />
                  </th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Plan Name</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Monthly Price</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Tenants</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Version</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {plans.filter(p => p.status === "Archived").map((plan) => (
                  <tr key={plan.id} className="border-b border-border/50 hover:bg-muted/30 cursor-pointer" onClick={() => handleRowClick(plan)}>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedPlans.includes(plan.id)}
                        onCheckedChange={() => toggleSelect(plan.id)}
                      />
                    </td>
                    <td className="p-4 text-sm font-medium">{plan.name}</td>
                    <td className="p-4 text-sm">₹{plan.monthlyPrice.toLocaleString()}</td>
                    <td className="p-4 text-sm">{plan.tenantCount}</td>
                    <td className="p-4 text-sm text-muted-foreground">v{plan.version}</td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">{plan.status}</Badge>
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm">Restore</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add Plan Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto bg-white">
          <DialogHeader>
            <DialogTitle>Create New Plan</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-4 py-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Plan Name</label>
                <Input className="mt-1" placeholder="e.g., Premium Plus" />
              </div>
              <div>
                <label className="text-sm font-medium">Monthly Price (₹)</label>
                <Input type="number" className="mt-1" placeholder="0" />
              </div>
              <div>
                <label className="text-sm font-medium">Yearly Price (₹)</label>
                <Input type="number" className="mt-1" placeholder="0" />
              </div>
              <div>
                <label className="text-sm font-medium">Max Users</label>
                <Input type="number" className="mt-1" placeholder="5" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Max Bookings</label>
                <Input type="number" className="mt-1" placeholder="5000" />
              </div>
              <div>
                <label className="text-sm font-medium">Max Storage (GB)</label>
                <Input type="number" className="mt-1" placeholder="5" />
              </div>
              <div>
                <label className="text-sm font-medium">API Call Limit</label>
                <Input type="number" className="mt-1" placeholder="50000" />
              </div>
              <div>
                <label className="text-sm font-medium">Version</label>
                <Input className="mt-1" placeholder="1.0" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Enabled Features</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Directory Listing", "Booking System", "Reports", "Live Streaming", "Multi-Branch", "Volunteer Module", "VIP Module", "API Access"].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Checkbox id={feature} />
                    <label htmlFor={feature} className="text-sm">{feature}</label>
                  </div>
                ))}
              </div>
            </div>
            <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Create Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Plan Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold">{selectedPlan?.name}</p>
                <p className="text-sm text-muted-foreground font-normal">{selectedPlan?.id} • v{selectedPlan?.version}</p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 py-3 border-b border-border">
            <Button size="sm" variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              Duplicate
            </Button>
            <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive">
              <Archive className="h-4 w-4" />
              Archive
            </Button>
          </div>

          <div className="py-4 space-y-6">
            {/* Pricing */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Pricing</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Monthly</p>
                  <p className="text-2xl font-bold">₹{selectedPlan?.monthlyPrice.toLocaleString()}</p>
                </div>
                <div className="p-4 border border-border rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">Yearly</p>
                  <p className="text-2xl font-bold">₹{selectedPlan?.yearlyPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Limits */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Limits</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Max Users</span>
                  <span className="text-sm font-medium">{selectedPlan?.maxUsers}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Max Bookings</span>
                  <span className="text-sm font-medium">{selectedPlan?.maxBookings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Storage</span>
                  <span className="text-sm font-medium">{selectedPlan?.maxStorage} GB</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">API Calls</span>
                  <span className="text-sm font-medium">{selectedPlan?.apiLimit.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Enabled Features</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPlan?.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="gap-1">
                    <Check className="h-3 w-3 text-success" />
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Usage Statistics</h4>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Active Tenants</span>
                <span className="text-sm font-medium">{selectedPlan?.tenantCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubscriptionPlans;

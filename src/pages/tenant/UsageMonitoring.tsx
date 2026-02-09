import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Search,
  Filter,
  Download,
  AlertTriangle,
  TrendingUp,
  Database,
  Zap,
  Users,
  Calendar,
  Globe,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const usageCategories = [
  { label: "High Usage", count: 45, icon: AlertTriangle, color: "text-destructive" },
  { label: "Near Limit", count: 128, icon: TrendingUp, color: "text-warning" },
  { label: "Over Limit", count: 12, icon: Zap, color: "text-destructive" },
  { label: "Normal", count: 8247, icon: Activity, color: "text-success" },
];

const regionUsage = [
  { region: "Tamil Nadu", bookings: 245000, storage: 842, apiCalls: 1.2, users: 3420 },
  { region: "Karnataka", bookings: 198000, storage: 654, apiCalls: 980, users: 2890 },
  { region: "Maharashtra", bookings: 178000, storage: 567, apiCalls: 870, users: 2340 },
  { region: "Uttar Pradesh", bookings: 156000, storage: 489, apiCalls: 720, users: 2120 },
  { region: "Punjab", bookings: 89000, storage: 234, apiCalls: 450, users: 1230 },
];

const planUsage = [
  { plan: "Free", avgBookings: 45, avgStorage: 0.2, avgApi: 500, avgUsers: 1.5 },
  { plan: "Standard", avgBookings: 2800, avgStorage: 1.2, avgApi: 15000, avgUsers: 3.8 },
  { plan: "Premium", avgBookings: 6500, avgStorage: 3.5, avgApi: 35000, avgUsers: 8.2 },
  { plan: "Enterprise", avgBookings: 28000, avgStorage: 12.5, avgApi: 120000, avgUsers: 32 },
  { plan: "Government", avgBookings: 15000, avgStorage: 8.2, avgApi: 65000, avgUsers: 18 },
];

const highUsageTenants = [
  { temple: "ISKCON Mumbai", metric: "API Calls", usage: 195000, limit: 200000, percentage: 98, plan: "Enterprise", region: "Maharashtra" },
  { temple: "Tirupati Online Booking", metric: "Storage", usage: 4.8, limit: 5, percentage: 96, plan: "Premium", region: "Andhra Pradesh" },
  { temple: "Vaishno Devi Trust", metric: "Bookings", usage: 9200, limit: 10000, percentage: 92, plan: "Premium", region: "Jammu & Kashmir" },
  { temple: "Golden Temple Trust", metric: "API Calls", usage: 92000, limit: 100000, percentage: 92, plan: "Government", region: "Punjab" },
  { temple: "Meenakshi Temple", metric: "Users", usage: 14, limit: 15, percentage: 93, plan: "Premium", region: "Tamil Nadu" },
];

const nearLimitTenants = [
  { temple: "Kashi Vishwanath", metric: "Bookings", usage: 8500, limit: 10000, percentage: 85, plan: "Premium", region: "Uttar Pradesh" },
  { temple: "Siddhivinayak Trust", metric: "Storage", usage: 4.1, limit: 5, percentage: 82, plan: "Premium", region: "Maharashtra" },
  { temple: "Jagannath Puri", metric: "API Calls", usage: 42000, limit: 50000, percentage: 84, plan: "Premium", region: "Odisha" },
  { temple: "Somnath Temple", metric: "Users", usage: 12, limit: 15, percentage: 80, plan: "Premium", region: "Gujarat" },
];

const overLimitTenants = [
  { temple: "Problem Temple A", metric: "API Calls", usage: 55000, limit: 50000, overage: 10, plan: "Premium", region: "Kerala", restricted: true },
  { temple: "Overcapacity Temple", metric: "Bookings", usage: 12000, limit: 10000, overage: 20, plan: "Premium", region: "Karnataka", restricted: false },
  { temple: "Heavy Usage Temple", metric: "Storage", usage: 6.2, limit: 5, overage: 24, plan: "Premium", region: "Tamil Nadu", restricted: true },
];

const UsageMonitoring = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Usage Monitoring</h1>
            <p className="text-sm text-muted-foreground">Track usage across all tenants and enforce limits</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {usageCategories.map((cat, i) => (
            <motion.button
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveCategory(cat.label.toLowerCase().replace(" ", "-"))}
              className={cn(
                "glass-card rounded-2xl p-4 glass-shadow text-left transition-all hover:shadow-xl",
                activeCategory === cat.label.toLowerCase().replace(" ", "-") && "ring-2 ring-primary"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded-xl bg-muted", cat.color)}>
                  <cat.icon className="h-4 w-4" />
                </div>
                <span className="text-2xl font-bold text-foreground">{cat.count}</span>
              </div>
              <p className="text-sm text-muted-foreground">{cat.label}</p>
            </motion.button>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6 glass-shadow">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tenants..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="maharashtra">Maharashtra</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Metrics</SelectItem>
                <SelectItem value="bookings">Bookings</SelectItem>
                <SelectItem value="storage">Storage</SelectItem>
                <SelectItem value="api">API Calls</SelectItem>
                <SelectItem value="users">Users</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Region & Plan Usage Summary */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Region Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl glass-shadow overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Region-wise Usage
              </h2>
              <button className="text-xs text-primary hover:underline font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="p-3 text-left text-xs font-medium text-muted-foreground">Region</th>
                    <th className="p-3 text-right text-xs font-medium text-muted-foreground">Bookings</th>
                    <th className="p-3 text-right text-xs font-medium text-muted-foreground">Storage (GB)</th>
                    <th className="p-3 text-right text-xs font-medium text-muted-foreground">API (M)</th>
                    <th className="p-3 text-right text-xs font-medium text-muted-foreground">Users</th>
                  </tr>
                </thead>
                <tbody>
                  {regionUsage.map((region) => (
                    <tr key={region.region} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                      <td className="p-3 text-sm font-medium">{region.region}</td>
                      <td className="p-3 text-sm text-right">{(region.bookings / 1000).toFixed(0)}K</td>
                      <td className="p-3 text-sm text-right">{region.storage}</td>
                      <td className="p-3 text-sm text-right">{typeof region.apiCalls === "number" && region.apiCalls < 100 ? region.apiCalls.toFixed(1) : (Number(region.apiCalls) / 1000).toFixed(0)}K</td>
                      <td className="p-3 text-sm text-right">{region.users.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Plan Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl glass-shadow overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                Plan-wise Average Usage
              </h2>
              <button className="text-xs text-primary hover:underline font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="p-3 text-left text-xs font-medium text-muted-foreground">Plan</th>
                    <th className="p-3 text-right text-xs font-medium text-muted-foreground">Avg Bookings</th>
                    <th className="p-3 text-right text-xs font-medium text-muted-foreground">Avg Storage</th>
                    <th className="p-3 text-right text-xs font-medium text-muted-foreground">Avg API</th>
                    <th className="p-3 text-right text-xs font-medium text-muted-foreground">Avg Users</th>
                  </tr>
                </thead>
                <tbody>
                  {planUsage.map((plan) => (
                    <tr key={plan.plan} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                      <td className="p-3 text-sm font-medium">{plan.plan}</td>
                      <td className="p-3 text-sm text-right">{plan.avgBookings.toLocaleString()}</td>
                      <td className="p-3 text-sm text-right">{plan.avgStorage} GB</td>
                      <td className="p-3 text-sm text-right">{plan.avgApi.toLocaleString()}</td>
                      <td className="p-3 text-sm text-right">{plan.avgUsers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Alert Tables */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* High Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl glass-shadow overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                High Usage (90%+)
              </h2>
              <Badge className="bg-destructive/10 text-destructive text-xs">{highUsageTenants.length}</Badge>
            </div>
            <div className="divide-y divide-border/50 max-h-[300px] overflow-auto">
              {highUsageTenants.map((tenant, i) => (
                <div key={i} className="px-5 py-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{tenant.temple}</p>
                      <p className="text-xs text-muted-foreground">{tenant.plan} • {tenant.region}</p>
                    </div>
                    <Badge className="bg-destructive/10 text-destructive text-xs">{tenant.percentage}%</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{tenant.metric}:</span>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-destructive rounded-full" style={{ width: `${tenant.percentage}%` }} />
                    </div>
                    <span className="text-xs font-medium">{typeof tenant.usage === "number" && tenant.usage > 1000 ? `${(tenant.usage/1000).toFixed(0)}K` : tenant.usage}/{typeof tenant.limit === "number" && tenant.limit > 1000 ? `${(tenant.limit/1000).toFixed(0)}K` : tenant.limit}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Near Limit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl glass-shadow overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-warning" />
                Near Limit (75-90%)
              </h2>
              <Badge className="bg-warning/10 text-warning text-xs">{nearLimitTenants.length}</Badge>
            </div>
            <div className="divide-y divide-border/50 max-h-[300px] overflow-auto">
              {nearLimitTenants.map((tenant, i) => (
                <div key={i} className="px-5 py-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{tenant.temple}</p>
                      <p className="text-xs text-muted-foreground">{tenant.plan} • {tenant.region}</p>
                    </div>
                    <Badge className="bg-warning/10 text-warning text-xs">{tenant.percentage}%</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{tenant.metric}:</span>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-warning rounded-full" style={{ width: `${tenant.percentage}%` }} />
                    </div>
                    <span className="text-xs font-medium">{typeof tenant.usage === "number" && tenant.usage > 1000 ? `${(tenant.usage/1000).toFixed(0)}K` : tenant.usage}/{typeof tenant.limit === "number" && tenant.limit > 1000 ? `${(tenant.limit/1000).toFixed(0)}K` : tenant.limit}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Over Limit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-destructive" />
              Over Limit (Action Required)
            </h2>
            <Badge className="bg-destructive/10 text-destructive text-xs">{overLimitTenants.length} Critical</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Temple</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Metric</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Usage</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Overage</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Plan</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {overLimitTenants.map((tenant, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                    <td className="p-4">
                      <p className="text-sm font-medium">{tenant.temple}</p>
                      <p className="text-xs text-muted-foreground">{tenant.region}</p>
                    </td>
                    <td className="p-4 text-sm">{tenant.metric}</td>
                    <td className="p-4 text-sm font-medium text-destructive">
                      {typeof tenant.usage === "number" && tenant.usage > 1000 ? `${(tenant.usage/1000).toFixed(0)}K` : tenant.usage} / {typeof tenant.limit === "number" && tenant.limit > 1000 ? `${(tenant.limit/1000).toFixed(0)}K` : tenant.limit}
                    </td>
                    <td className="p-4">
                      <Badge className="bg-destructive/10 text-destructive text-xs">+{tenant.overage}%</Badge>
                    </td>
                    <td className="p-4 text-sm">{tenant.plan}</td>
                    <td className="p-4">
                      {tenant.restricted ? (
                        <Badge className="bg-destructive/10 text-destructive text-xs">Restricted</Badge>
                      ) : (
                        <Badge className="bg-warning/10 text-warning text-xs">Warning Sent</Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Upgrade</Button>
                        <Button size="sm" variant="outline">Contact</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UsageMonitoring;

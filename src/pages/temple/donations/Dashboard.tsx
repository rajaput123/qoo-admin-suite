import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, IndianRupee, Users, Receipt, TrendingUp, TrendingDown, Calendar, Eye, Link2, Globe } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useAllocations, useDonations, useDonors } from "@/modules/donations/hooks";

const monthlyData = [
  { month: "Jul", amount: 32 }, { month: "Aug", amount: 28 }, { month: "Sep", amount: 45 },
  { month: "Oct", amount: 52 }, { month: "Nov", amount: 61 }, { month: "Dec", amount: 78 },
  { month: "Jan", amount: 55 }, { month: "Feb", amount: 42 },
];

const purposeData = [
  { name: "General / Hundi", value: 35, color: "hsl(var(--primary))" },
  { name: "Annadanam", value: 22, color: "hsl(25, 95%, 53%)" },
  { name: "Project-linked", value: 18, color: "hsl(142, 76%, 36%)" },
  { name: "Seva Sponsorship", value: 15, color: "hsl(262, 83%, 58%)" },
  { name: "Prasadam Sponsorship", value: 10, color: "hsl(346, 77%, 50%)" },
];

const formatCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val.toLocaleString()}`;
};

const sourceColors: Record<string, string> = {
  Manual: "hsl(var(--primary))",
  "Online Portal": "hsl(210, 76%, 50%)",
  Booking: "hsl(142, 76%, 36%)",
  Event: "hsl(25, 95%, 53%)",
  Counter: "hsl(262, 83%, 58%)",
  Campaign: "hsl(346, 77%, 50%)",
  Seva: "hsl(45, 93%, 47%)",
};

const Dashboard = () => {
  const donors = useDonors();
  const donations = useDonations();
  const allocations = useAllocations();

  const allocatedSet = new Set(allocations.map(a => a.donationId));
  const pendingAllocDonations = donations.filter(d => !allocatedSet.has(d.donationId));
  const pendingAllocAmount = pendingAllocDonations.reduce((s, d) => s + d.amount, 0);

  const fyTotal = donations.reduce((s, d) => s + d.amount, 0);
  const activeDonors = new Set(donations.map(d => d.donorId)).size;
  const receiptsIssued = donations.length;

  // Source-wise aggregation
  const sourceAgg = new Map<string, { count: number; total: number }>();
  for (const d of donations) {
    const src = d.sourceModule || "Manual";
    const s = sourceAgg.get(src) ?? { count: 0, total: 0 };
    s.count += 1;
    s.total += d.amount;
    sourceAgg.set(src, s);
  }
  const sourceData = Array.from(sourceAgg.entries()).map(([name, { count, total }]) => ({
    name,
    count,
    total,
    color: sourceColors[name] || "hsl(var(--muted-foreground))",
  }));

  // Branch-wise aggregation
  const branchAgg = new Map<string, { count: number; total: number }>();
  for (const d of donations) {
    const branch = d.branchId || "Unassigned";
    const s = branchAgg.get(branch) ?? { count: 0, total: 0 };
    s.count += 1;
    s.total += d.amount;
    branchAgg.set(branch, s);
  }

  const stats = [
    { label: "Total Donations (FY)", value: formatCurrency(fyTotal), change: `${donations.length} donations`, up: true, icon: IndianRupee },
    { label: "Active Donors", value: activeDonors.toLocaleString(), change: `${donors.length} in registry`, up: true, icon: Users },
    { label: "Receipts Issued", value: receiptsIssued.toLocaleString(), change: "Auto-generated", up: true, icon: Receipt },
    { label: "Pending Allocation", value: formatCurrency(pendingAllocAmount), change: `${pendingAllocDonations.length} donations`, up: false, icon: Eye },
  ];

  const recentDonations = donations.slice(0, 6).map(d => ({
    id: d.donationId,
    donor: d.donorName,
    amount: d.amount,
    purpose: d.purpose,
    channel: d.channel,
    sourceModule: d.sourceModule || "Manual",
    sourceRecordId: d.sourceRecordId,
    date: d.date,
    status: allocatedSet.has(d.donationId) ? "Allocated" : "Pending",
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Donation Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time overview of donation activity, source traceability, and fund allocation</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-muted">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
                <span className={`text-xs font-medium flex items-center gap-1 ${s.up ? "text-green-600" : "text-amber-600"}`}>
                  {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Monthly Donations (₹ Lakhs)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Donation by Purpose</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={purposeData} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" stroke="none">
                    {purposeData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {purposeData.map(p => (
                  <div key={p.name} className="flex items-center gap-2 text-sm">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                    <span className="text-muted-foreground flex-1">{p.name}</span>
                    <span className="font-medium">{p.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Source Module + Branch Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Link2 className="h-4 w-4" /> By Source Module</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {sourceData.map(s => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                  <div>
                    <p className="font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.count} donations</p>
                  </div>
                </div>
                <span className="font-mono font-medium">{formatCurrency(s.total)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4" /> By Branch / Location</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {Array.from(branchAgg.entries()).map(([branch, data]) => (
              <div key={branch} className="flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-foreground font-mono">{branch}</p>
                  <p className="text-xs text-muted-foreground">{data.count} donations</p>
                </div>
                <span className="font-mono font-medium">{formatCurrency(data.total)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Recent Donations</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentDonations.map(d => (
              <div key={d.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{d.donor}</span>
                    <Badge variant={d.status === "Allocated" ? "outline" : "secondary"} className="text-[10px]">{d.status}</Badge>
                    <Badge variant="outline" className="text-[10px] bg-muted/50">{d.sourceModule}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {d.purpose} · {d.channel} · {d.date}
                    {d.sourceRecordId && <span className="font-mono"> · {d.sourceRecordId}</span>}
                  </p>
                </div>
                <span className="font-mono font-bold text-sm">{formatCurrency(d.amount)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Utilization Summary */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Fund Utilization Summary</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Total Received", value: formatCurrency(fyTotal), pct: 100 },
              { label: "Allocated to Purpose", value: formatCurrency(allocations.reduce((s, a) => s + a.allocated, 0)), pct: fyTotal > 0 ? Math.round((allocations.reduce((s, a) => s + a.allocated, 0) / fyTotal) * 100) : 0 },
              { label: "Utilized / Spent", value: formatCurrency(allocations.reduce((s, a) => s + a.utilized, 0)), pct: fyTotal > 0 ? Math.round((allocations.reduce((s, a) => s + a.utilized, 0) / fyTotal) * 100) : 0 },
            ].map(u => (
              <div key={u.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{u.label}</span>
                  <span className="font-bold">{u.value}</span>
                </div>
                <Progress value={u.pct} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{u.pct}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IndianRupee, Users, Wallet, CalendarCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useDonations, useDonors, useAllocations } from "@/modules/donations/hooks";

const formatCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val.toLocaleString()}`;
};

const channelColors: Record<string, string> = {
  Cash: "hsl(var(--primary))",
  UPI: "hsl(210, 76%, 50%)",
  "Bank Transfer": "hsl(142, 76%, 36%)",
  Online: "hsl(25, 95%, 53%)",
  Cheque: "hsl(262, 83%, 58%)",
  "In-Kind": "hsl(346, 77%, 50%)",
};

const Dashboard = () => {
  const donations = useDonations();
  const donors = useDonors();
  const allocations = useAllocations();

  const today = new Date().toISOString().slice(0, 10);
  const currentMonth = today.slice(0, 7);

  const todayTotal = donations.filter(d => d.date === today).reduce((s, d) => s + d.amount, 0);
  const monthlyTotal = donations.filter(d => d.date.startsWith(currentMonth)).reduce((s, d) => s + d.amount, 0);
  const activeDonors = new Set(donations.map(d => d.donorId)).size;
  const fundBalance = donations.reduce((s, d) => s + d.amount, 0) - allocations.reduce((s, a) => s + a.utilized, 0);

  // Donation by Channel
  const channelAgg = new Map<string, number>();
  for (const d of donations) {
    channelAgg.set(d.channel, (channelAgg.get(d.channel) ?? 0) + d.amount);
  }
  const channelData = Array.from(channelAgg.entries()).map(([name, value]) => ({
    name,
    value,
    color: channelColors[name] || "hsl(var(--muted-foreground))",
  }));

  // Donation by Fund/Purpose
  const fundAgg = new Map<string, number>();
  for (const d of donations) {
    fundAgg.set(d.purpose, (fundAgg.get(d.purpose) ?? 0) + d.amount);
  }
  const fundData = Array.from(fundAgg.entries()).map(([name, value]) => ({
    name,
    value,
  }));

  const recentDonations = donations.slice(0, 8);

  const stats = [
    { label: "Today's Total Donations", value: formatCurrency(todayTotal), icon: CalendarCheck },
    { label: "Monthly Donations", value: formatCurrency(monthlyTotal), icon: IndianRupee },
    { label: "Active Donors", value: activeDonors.toLocaleString(), icon: Users },
    { label: "Fund Balance Total", value: formatCurrency(fundBalance), icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Donation Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time overview of donation activity and fund status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Donation by Channel</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={channelData} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" stroke="none">
                    {channelData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {channelData.map(p => (
                  <div key={p.name} className="flex items-center gap-2 text-sm">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                    <span className="text-muted-foreground flex-1">{p.name}</span>
                    <span className="font-medium font-mono">{formatCurrency(p.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Donation by Fund</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={fundData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => formatCurrency(v)} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={120} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations Table */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Recent Donations</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Donor Name</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Fund</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Receipt No</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDonations.map(d => (
                <TableRow key={d.donationId}>
                  <TableCell className="text-sm">{d.date}</TableCell>
                  <TableCell className="font-medium text-sm">{d.donorName}</TableCell>
                  <TableCell className="text-right font-mono font-medium">{formatCurrency(d.amount)}</TableCell>
                  <TableCell className="text-sm">{d.purpose}</TableCell>
                  <TableCell className="text-sm">{d.channel}</TableCell>
                  <TableCell className="font-mono text-xs">{d.receiptNo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

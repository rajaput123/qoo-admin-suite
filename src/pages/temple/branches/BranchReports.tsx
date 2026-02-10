import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GitBranch, IndianRupee, TrendingUp, Users, Package, BarChart3 } from "lucide-react";
import { branches, branchReports } from "@/data/branchData";

const BranchReports = () => {
  const totalRevenue = branches.reduce((s, b) => s + b.monthlyRevenue, 0);
  const totalExpense = branches.reduce((s, b) => s + b.monthlyExpense, 0);
  const totalStock = branches.reduce((s, b) => s + b.totalStockValue, 0);
  const totalVolunteers = branches.reduce((s, b) => s + b.volunteerCount, 0);

  const topBranch = [...branches].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)[0];

  // Aggregate latest month per branch
  const latestReports = branches.map(b => {
    const reps = branchReports.filter(r => r.branchId === b.id).sort((a, c) => c.month.localeCompare(a.month));
    return { branch: b, report: reps[0] };
  }).filter(r => r.report);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Branch Reports</h1>
        <p className="text-muted-foreground text-sm">Cross-branch analytics & trust-level governance</p>
      </div>

      {/* Trust KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card><CardContent className="p-4"><GitBranch className="h-5 w-5 text-primary mb-2" /><p className="text-2xl font-bold">{branches.length}</p><p className="text-[11px] text-muted-foreground">Total Branches</p></CardContent></Card>
        <Card><CardContent className="p-4"><IndianRupee className="h-5 w-5 text-green-600 mb-2" /><p className="text-2xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</p><p className="text-[11px] text-muted-foreground">Total Revenue</p></CardContent></Card>
        <Card><CardContent className="p-4"><TrendingUp className="h-5 w-5 text-amber-600 mb-2" /><p className="text-2xl font-bold">₹{(totalExpense / 100000).toFixed(1)}L</p><p className="text-[11px] text-muted-foreground">Total Expense</p></CardContent></Card>
        <Card><CardContent className="p-4"><Package className="h-5 w-5 text-blue-600 mb-2" /><p className="text-2xl font-bold">₹{(totalStock / 100000).toFixed(1)}L</p><p className="text-[11px] text-muted-foreground">Stock Across Branches</p></CardContent></Card>
        <Card><CardContent className="p-4"><Users className="h-5 w-5 text-purple-600 mb-2" /><p className="text-2xl font-bold">{totalVolunteers}</p><p className="text-[11px] text-muted-foreground">Total Volunteers</p></CardContent></Card>
      </div>

      {/* Top Branch */}
      {topBranch && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex items-center gap-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Top Performing Branch</p>
              <p className="text-lg font-bold">{topBranch.name}</p>
              <p className="text-sm text-muted-foreground">Revenue: ₹{topBranch.monthlyRevenue.toLocaleString()} / month • {topBranch.activeEvents} active events</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Branch Comparison */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Branch-wise Comparison (Latest Month)</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Event Cost</TableHead>
                <TableHead className="text-right">Materials</TableHead>
                <TableHead className="text-right">Kitchen</TableHead>
                <TableHead className="text-right">Freelancers</TableHead>
                <TableHead className="text-center">Vol. Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestReports.map(({ branch, report }) => (
                <TableRow key={branch.id}>
                  <TableCell>
                    <p className="font-medium text-sm">{branch.name}</p>
                    <p className="text-xs text-muted-foreground">{branch.city}</p>
                  </TableCell>
                  <TableCell className="text-right text-sm text-green-600 font-medium">₹{report.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-sm">₹{report.eventCost.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-sm">₹{report.materialUsage.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-sm">₹{report.kitchenConsumption.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-sm">₹{report.freelancerPayments.toLocaleString()}</TableCell>
                  <TableCell className="text-center text-sm">{report.volunteerHours.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Revenue vs Expense */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Revenue vs Expense by Branch</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Expense</TableHead>
                <TableHead className="text-right">Net</TableHead>
                <TableHead className="text-right">Stock Value</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map(b => {
                const net = b.monthlyRevenue - b.monthlyExpense;
                return (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium text-sm">{b.name}</TableCell>
                    <TableCell className="text-right text-sm text-green-600">₹{b.monthlyRevenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm text-red-600">₹{b.monthlyExpense.toLocaleString()}</TableCell>
                    <TableCell className={`text-right text-sm font-medium ${net >= 0 ? "text-green-700" : "text-red-700"}`}>₹{net.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm">₹{b.totalStockValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${b.status === "Active" ? "text-green-700 border-green-300 bg-green-50" : "text-amber-700 border-amber-300 bg-amber-50"}`}>{b.status}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BranchReports;

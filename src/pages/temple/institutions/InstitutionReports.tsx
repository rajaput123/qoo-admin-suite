import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, IndianRupee, Heart, Users, BarChart3 } from "lucide-react";
import { institutions, institutionFinancials } from "@/data/institutionData";

const InstitutionReports = () => {
  const totalDonations = institutions.reduce((s, i) => s + i.monthlyDonations, 0);
  const totalExpenses = institutions.reduce((s, i) => s + i.monthlyExpense, 0);
  const totalStaff = institutions.reduce((s, i) => s + i.totalStaff, 0);
  const totalVolunteers = institutions.reduce((s, i) => s + i.volunteerCount, 0);

  const topInst = [...institutions].sort((a, b) => b.monthlyDonations - a.monthlyDonations)[0];

  const latestFinancials = institutions.map(inst => {
    const fin = institutionFinancials.filter(f => f.institutionId === inst.id).sort((a, b) => b.month.localeCompare(a.month));
    return { inst, fin: fin[0] };
  }).filter(r => r.fin);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Institution Reports</h1>
        <p className="text-muted-foreground text-sm">Cross-institution analytics & trust-level governance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card><CardContent className="p-4"><Building2 className="h-5 w-5 text-primary mb-2" /><p className="text-2xl font-bold">{institutions.length}</p><p className="text-[11px] text-muted-foreground">Total Institutions</p></CardContent></Card>
        <Card><CardContent className="p-4"><Heart className="h-5 w-5 text-red-500 mb-2" /><p className="text-2xl font-bold">₹{(totalDonations / 100000).toFixed(1)}L</p><p className="text-[11px] text-muted-foreground">Total Donations</p></CardContent></Card>
        <Card><CardContent className="p-4"><IndianRupee className="h-5 w-5 text-amber-600 mb-2" /><p className="text-2xl font-bold">₹{(totalExpenses / 100000).toFixed(1)}L</p><p className="text-[11px] text-muted-foreground">Total Expenses</p></CardContent></Card>
        <Card><CardContent className="p-4"><Users className="h-5 w-5 text-blue-600 mb-2" /><p className="text-2xl font-bold">{totalStaff}</p><p className="text-[11px] text-muted-foreground">Total Staff</p></CardContent></Card>
        <Card><CardContent className="p-4"><Users className="h-5 w-5 text-purple-600 mb-2" /><p className="text-2xl font-bold">{totalVolunteers}</p><p className="text-[11px] text-muted-foreground">Total Volunteers</p></CardContent></Card>
      </div>

      {topInst && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex items-center gap-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Top Institution (by Donations)</p>
              <p className="text-lg font-bold">{topInst.name}</p>
              <p className="text-sm text-muted-foreground">{topInst.type} • Donations: ₹{topInst.monthlyDonations.toLocaleString()} / month</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Institution-wise Financial Comparison</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institution</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Donations</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead className="text-right">Grants</TableHead>
                <TableHead className="text-right">Sponsorship</TableHead>
                <TableHead className="text-right">Surplus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestFinancials.map(({ inst, fin }) => (
                <TableRow key={inst.id}>
                  <TableCell>
                    <p className="font-medium text-sm">{inst.name}</p>
                    <p className="text-xs text-muted-foreground">{inst.city}</p>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{inst.type}</Badge></TableCell>
                  <TableCell className="text-right text-sm text-green-600">₹{fin.donationsReceived.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-sm">₹{fin.operationalExpenses.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-sm">₹{fin.grants.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-sm">₹{fin.sponsorship.toLocaleString()}</TableCell>
                  <TableCell className={`text-right text-sm font-medium ${fin.surplus >= 0 ? "text-green-700" : "text-red-700"}`}>₹{fin.surplus.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">Institution Overview</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institution</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Staff</TableHead>
                <TableHead className="text-center">Volunteers</TableHead>
                <TableHead className="text-center">Events</TableHead>
                <TableHead>Linked Branch</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {institutions.map(inst => (
                <TableRow key={inst.id}>
                  <TableCell className="font-medium text-sm">{inst.name}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{inst.type}</Badge></TableCell>
                  <TableCell className="text-center text-sm">{inst.totalStaff}</TableCell>
                  <TableCell className="text-center text-sm">{inst.volunteerCount}</TableCell>
                  <TableCell className="text-center text-sm">{inst.activeEvents}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{inst.linkedBranch || "—"}</TableCell>
                  <TableCell><Badge variant="outline" className={`text-xs ${inst.status === "Active" ? "text-green-700 border-green-300 bg-green-50" : "text-amber-700 border-amber-300 bg-amber-50"}`}>{inst.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InstitutionReports;

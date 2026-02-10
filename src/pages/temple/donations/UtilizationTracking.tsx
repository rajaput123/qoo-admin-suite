import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Eye, FileDown, IndianRupee, CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";

const utilizations = [
  { id: "UTL-001", donationId: "DON-2025-0891", donor: "Sri Ramesh Agarwal", amount: 500000, allocated: 500000, utilized: 410000, module: "Projects", entity: "Gopuram Renovation", lastExpense: "2025-02-08", expenseCount: 12, status: "In Progress" },
  { id: "UTL-002", donationId: "DON-2025-0889", donor: "Smt. Padma Devi", amount: 100000, allocated: 100000, utilized: 100000, module: "Kitchen", entity: "Daily Annadanam", lastExpense: "2025-02-10", expenseCount: 30, status: "Fully Utilized" },
  { id: "UTL-003", donationId: "DON-2025-0888", donor: "Venkatesh Trust", amount: 1000000, allocated: 1000000, utilized: 280000, module: "Projects", entity: "New Hall Construction", lastExpense: "2025-02-05", expenseCount: 8, status: "In Progress" },
  { id: "UTL-004", donationId: "DON-2025-0887", donor: "Karthik & Family", amount: 15000, allocated: 15000, utilized: 15000, module: "Prasadam", entity: "Laddu - Vaikunta Ekadashi", lastExpense: "2025-01-20", expenseCount: 1, status: "Fully Utilized" },
  { id: "UTL-005", donationId: "DON-2025-0885", donor: "Anonymous", amount: 50000, allocated: 50000, utilized: 0, module: "Sevas", entity: "Sahasranama Archana", lastExpense: "-", expenseCount: 0, status: "Not Started" },
  { id: "UTL-006", donationId: "DON-2025-0883", donor: "Village Dev Committee", amount: 300000, allocated: 250000, utilized: 180000, module: "Projects", entity: "Village Outreach", lastExpense: "2025-01-30", expenseCount: 6, status: "In Progress" },
];

const expenseTrail = [
  { date: "2025-02-08", description: "Gold foil procurement - Batch 3", amount: 85000, voucher: "EXP-2025-0456", approvedBy: "Sri Raghunath" },
  { date: "2025-02-01", description: "Contractor payment - Phase 2 milestone", amount: 120000, voucher: "EXP-2025-0421", approvedBy: "Sri Raghunath" },
  { date: "2025-01-25", description: "Scaffolding materials", amount: 45000, voucher: "EXP-2025-0398", approvedBy: "Sri Venkatesh" },
  { date: "2025-01-18", description: "Artisan wages - Week 3", amount: 60000, voucher: "EXP-2025-0367", approvedBy: "Sri Raghunath" },
  { date: "2025-01-10", description: "Stone carving materials", amount: 100000, voucher: "EXP-2025-0334", approvedBy: "Sri Venkatesh" },
];

const formatCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val.toLocaleString()}`;
};

const UtilizationTracking = () => {
  const [search, setSearch] = useState("");
  const [selectedUtil, setSelectedUtil] = useState<typeof utilizations[0] | null>(null);

  const filtered = utilizations.filter(u =>
    u.donor.toLowerCase().includes(search.toLowerCase()) || u.donationId.toLowerCase().includes(search.toLowerCase()) || u.entity.toLowerCase().includes(search.toLowerCase())
  );

  const totalAllocated = utilizations.reduce((s, u) => s + u.allocated, 0);
  const totalUtilized = utilizations.reduce((s, u) => s + u.utilized, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Utilization Tracking</h1>
          <p className="text-sm text-muted-foreground mt-1">Trace every donation from receipt to expenditure with full audit trail</p>
        </div>
        <Button variant="outline" size="sm"><FileDown className="h-4 w-4 mr-1" /> Export Report</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">{formatCurrency(totalAllocated)}</p><p className="text-xs text-muted-foreground">Total Allocated</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-green-600">{formatCurrency(totalUtilized)}</p><p className="text-xs text-muted-foreground">Utilized</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-amber-600">{formatCurrency(totalAllocated - totalUtilized)}</p><p className="text-xs text-muted-foreground">Remaining</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-primary">{Math.round((totalUtilized / totalAllocated) * 100)}%</p><p className="text-xs text-muted-foreground">Overall Utilization</p></CardContent></Card>
      </div>

      {/* Traceability Flow */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Donation Traceability Flow</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2 text-sm py-2">
            {["Donation Received", "Purpose Tagged", "Fund Allocated", "Expenses Logged", "Utilization Reported"].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium text-xs">{step}</div>
                {i < arr.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by donor, donation ID, or entity..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donation ID</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead className="text-right">Allocated</TableHead>
                <TableHead className="text-right">Utilized</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Expenses</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(u => {
                const pct = u.allocated > 0 ? Math.round((u.utilized / u.allocated) * 100) : 0;
                return (
                  <TableRow key={u.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedUtil(u)}>
                    <TableCell className="font-mono text-xs">{u.donationId}</TableCell>
                    <TableCell className="font-medium text-sm">{u.donor}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{u.module}</Badge></TableCell>
                    <TableCell className="text-sm">{u.entity}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatCurrency(u.allocated)}</TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatCurrency(u.utilized)}</TableCell>
                    <TableCell>
                      <div className="w-20">
                        <div className="text-xs mb-1">{pct}%</div>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{u.expenseCount}</TableCell>
                    <TableCell>
                      <Badge variant={u.status === "Fully Utilized" ? "default" : u.status === "Not Started" ? "destructive" : "secondary"} className="text-[10px]">{u.status}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Utilization Detail with Expense Trail */}
      <Dialog open={!!selectedUtil} onOpenChange={() => setSelectedUtil(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Utilization Detail – {selectedUtil?.donationId}</DialogTitle></DialogHeader>
          {selectedUtil && (
            <Tabs defaultValue="summary">
              <TabsList className="w-full">
                <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
                <TabsTrigger value="expenses" className="flex-1">Expense Trail</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Donor", selectedUtil.donor],
                    ["Module", selectedUtil.module],
                    ["Entity", selectedUtil.entity],
                    ["Last Expense", selectedUtil.lastExpense],
                    ["Allocated", formatCurrency(selectedUtil.allocated)],
                    ["Utilized", formatCurrency(selectedUtil.utilized)],
                  ].map(([l, v]) => (
                    <div key={l} className="p-2 rounded bg-muted/50">
                      <p className="text-[10px] text-muted-foreground">{l}</p>
                      <p className="text-sm font-medium">{v}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Utilization</span>
                    <span className="font-medium">{selectedUtil.allocated > 0 ? Math.round((selectedUtil.utilized / selectedUtil.allocated) * 100) : 0}%</span>
                  </div>
                  <Progress value={selectedUtil.allocated > 0 ? Math.round((selectedUtil.utilized / selectedUtil.allocated) * 100) : 0} className="h-2" />
                </div>
              </TabsContent>
              <TabsContent value="expenses" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Voucher</TableHead>
                      <TableHead>Approved By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseTrail.map(e => (
                      <TableRow key={e.voucher}>
                        <TableCell className="text-xs">{e.date}</TableCell>
                        <TableCell className="text-sm">{e.description}</TableCell>
                        <TableCell className="text-right font-mono text-sm">{formatCurrency(e.amount)}</TableCell>
                        <TableCell className="font-mono text-xs">{e.voucher}</TableCell>
                        <TableCell className="text-xs">{e.approvedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UtilizationTracking;

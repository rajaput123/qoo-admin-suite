import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Plus, ChevronLeft, ChevronRight, FileText, Download } from "lucide-react";
import { toast } from "sonner";
import SelectWithAddNew from "@/components/SelectWithAddNew";

const payments = [
  { id: "PAY-001", freelancerName: "Pixel Studio", eventName: "Brahmotsavam 2026", paymentDate: "2026-02-05", amount: 45000, paymentMode: "Bank Transfer", invoiceFile: "INV-001.pdf", status: "Paid" },
  { id: "PAY-002", freelancerName: "Decor Dreams", eventName: "Vaikunta Ekadasi", paymentDate: "2026-01-12", amount: 35000, paymentMode: "UPI", invoiceFile: "INV-002.pdf", status: "Paid" },
  { id: "PAY-003", freelancerName: "Sound Waves Pro", eventName: "January Broadcasting", paymentDate: "2026-02-01", amount: 18000, paymentMode: "Bank Transfer", invoiceFile: "INV-003.pdf", status: "Paid" },
  { id: "PAY-004", freelancerName: "CreativeMinds Design", eventName: "Annual Calendar Design", paymentDate: "2026-01-18", amount: 25000, paymentMode: "UPI", invoiceFile: "INV-004.pdf", status: "Paid" },
  { id: "PAY-005", freelancerName: "Vastu Consultancy", eventName: "New Shrine Consultation", paymentDate: "2026-01-25", amount: 30000, paymentMode: "Bank Transfer", invoiceFile: "INV-005.pdf", status: "Paid" },
  { id: "PAY-006", freelancerName: "Digital Stream Co", eventName: "Pongal Celebration", paymentDate: "2026-01-16", amount: 12000, paymentMode: "Cash", invoiceFile: "", status: "Paid" },
  { id: "PAY-007", freelancerName: "Pixel Studio", eventName: "Ratha Yatra", paymentDate: "", amount: 15000, paymentMode: "", invoiceFile: "", status: "Pending" },
  { id: "PAY-008", freelancerName: "Decor Dreams", eventName: "Ugadi Festival", paymentDate: "", amount: 55000, paymentMode: "", invoiceFile: "", status: "Pending" },
];

const Payments = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [paymentModeOptions, setPaymentModeOptions] = useState(["Bank Transfer", "UPI", "Cash", "Cheque", "NEFT"]);

  const totalPaid = payments.filter(p => p.status === "Paid").reduce((a, p) => a + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "Pending").reduce((a, p) => a + p.amount, 0);

  const filtered = payments.filter(p => {
    if (search && !p.freelancerName.toLowerCase().includes(search.toLowerCase()) && !p.eventName.toLowerCase().includes(search.toLowerCase()) && !p.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
            <p className="text-muted-foreground">Track all freelancer payments and settlements</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4" />Export</Button>
            <Button onClick={() => setShowAdd(true)} className="gap-2"><Plus className="h-4 w-4" />Record Payment</Button>
          </div>
        </div>

        {/* Summary */}
        <div className="flex gap-6 mb-4 text-sm">
          <span>Total Paid: <strong className="text-lg">₹{totalPaid.toLocaleString()}</strong></span>
          <span>Pending: <strong className="text-lg text-amber-600">₹{totalPending.toLocaleString()}</strong></span>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search freelancer, event, ID..." className="pl-9" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <Select value={filterStatus} onValueChange={v => { setFilterStatus(v); setPage(1); }}>
            <SelectTrigger className="w-[130px] bg-background"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="ml-auto">{filtered.length} payments</Badge>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Freelancer</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No payments found</TableCell></TableRow>
              ) : paged.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium text-primary">{p.id}</TableCell>
                  <TableCell className="font-medium">{p.freelancerName}</TableCell>
                  <TableCell>{p.eventName}</TableCell>
                  <TableCell>{p.paymentDate || "—"}</TableCell>
                  <TableCell className="text-right">₹{p.amount.toLocaleString()}</TableCell>
                  <TableCell>{p.paymentMode || "—"}</TableCell>
                  <TableCell>{p.invoiceFile ? <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs"><FileText className="h-3 w-3" />{p.invoiceFile}</Button> : "—"}</TableCell>
                  <TableCell><Badge variant={p.status === "Paid" ? "default" : "secondary"}>{p.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select value={perPage.toString()} onValueChange={v => { setPerPage(Number(v)); setPage(1); }}>
              <SelectTrigger className="w-[70px] h-8 bg-background"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover">{[10, 25, 50, 100].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}</SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">of {filtered.length} records</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2).map(p => (
              <Button key={p} variant={p === page ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={() => setPage(p)}>{p}</Button>
            ))}
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </motion.div>

      {/* Record Payment Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Record Payment</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-xs">Freelancer</Label><Input placeholder="Select freelancer" /></div>
            <div><Label className="text-xs">Event / Assignment</Label><Input placeholder="Select event" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Amount (₹)</Label><Input type="number" placeholder="Enter amount" /></div>
              <div><Label className="text-xs">Payment Date</Label><Input type="date" /></div>
            </div>
            <div><Label className="text-xs">Payment Mode</Label><SelectWithAddNew value="" onValueChange={() => {}} placeholder="Select mode" options={paymentModeOptions} onAddNew={v => setPaymentModeOptions(p => [...p, v])} /></div>
            <div><Label className="text-xs">Invoice File</Label><Input type="file" className="text-xs" accept=".pdf,.jpg,.png" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Payment recorded"); setShowAdd(false); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payments;

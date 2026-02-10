import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, IndianRupee, Banknote, Smartphone, Building2, Gift, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recentRecords = [
  { id: "DON-2025-0891", donor: "Sri Ramesh Agarwal", amount: 500000, purpose: "Project - Gopuram Renovation", channel: "Bank Transfer", mode: "NEFT", date: "2025-02-10", time: "10:30 AM", receiptNo: "REC-2025-0891", status: "Recorded" },
  { id: "DON-2025-0890", donor: "Anonymous", amount: 25000, purpose: "General / Hundi", channel: "Cash", mode: "Cash", date: "2025-02-10", time: "09:15 AM", receiptNo: "REC-2025-0890", status: "Recorded" },
  { id: "DON-2025-0889", donor: "Smt. Padma Devi", amount: 100000, purpose: "Annadanam Sponsorship", channel: "UPI", mode: "GPay", date: "2025-02-09", time: "04:45 PM", receiptNo: "REC-2025-0889", status: "Recorded" },
  { id: "DON-2025-0888", donor: "Venkatesh Trust", amount: 1000000, purpose: "Project - New Hall", channel: "Bank Transfer", mode: "RTGS", date: "2025-02-09", time: "11:00 AM", receiptNo: "REC-2025-0888", status: "Recorded" },
  { id: "DON-2025-0887", donor: "Karthik & Family", amount: 15000, purpose: "Prasadam Sponsorship", channel: "Online", mode: "Razorpay", date: "2025-02-08", time: "06:20 PM", receiptNo: "REC-2025-0887", status: "Recorded" },
];

const formatCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val.toLocaleString()}`;
};

const channelIcons: Record<string, typeof IndianRupee> = {
  "Cash": Banknote,
  "UPI": Smartphone,
  "Bank Transfer": Building2,
  "Online": Smartphone,
  "In-Kind": Gift,
};

const RecordDonation = () => {
  const [showRecord, setShowRecord] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<typeof recentRecords[0] | null>(null);
  const { toast } = useToast();

  const filtered = recentRecords.filter(r =>
    r.donor.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleRecord = () => {
    toast({ title: "Donation Recorded", description: "Receipt has been generated automatically." });
    setShowRecord(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Record Donation</h1>
          <p className="text-sm text-muted-foreground mt-1">Receive and record donations from all channels with auto-receipt generation</p>
        </div>
        <Button size="sm" onClick={() => setShowRecord(true)}>
          <Plus className="h-4 w-4 mr-1" /> New Donation
        </Button>
      </div>

      {/* Channel Quick Stats */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "Cash / Counter", count: "12 today", icon: Banknote },
          { label: "UPI / Online", count: "8 today", icon: Smartphone },
          { label: "Bank Transfer", count: "3 today", icon: Building2 },
          { label: "In-Kind", count: "1 today", icon: Gift },
          { label: "Event-linked", count: "5 today", icon: Calendar },
        ].map(c => (
          <Card key={c.label}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted"><c.icon className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-sm font-medium">{c.count}</p>
                <p className="text-[10px] text-muted-foreground">{c.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Records Table */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search donations..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donation ID</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(r => (
                <TableRow key={r.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedRecord(r)}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="font-medium text-sm">{r.donor}</TableCell>
                  <TableCell className="text-sm">{r.purpose}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{r.channel}</Badge></TableCell>
                  <TableCell className="text-xs">{r.mode}</TableCell>
                  <TableCell className="text-right font-mono font-medium">{formatCurrency(r.amount)}</TableCell>
                  <TableCell className="text-xs">{r.date}</TableCell>
                  <TableCell className="font-mono text-xs text-primary">{r.receiptNo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Record Detail Modal */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Donation Details</DialogTitle></DialogHeader>
          {selectedRecord && (
            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="receipt" className="flex-1">Receipt</TabsTrigger>
                <TabsTrigger value="allocation" className="flex-1">Allocation</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Donation ID", selectedRecord.id],
                    ["Donor", selectedRecord.donor],
                    ["Amount", formatCurrency(selectedRecord.amount)],
                    ["Purpose", selectedRecord.purpose],
                    ["Channel", selectedRecord.channel],
                    ["Mode", selectedRecord.mode],
                    ["Date", selectedRecord.date],
                    ["Time", selectedRecord.time],
                  ].map(([label, value]) => (
                    <div key={label} className="p-2 rounded bg-muted/50">
                      <p className="text-[10px] text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="receipt" className="mt-4">
                <div className="p-4 rounded-lg border bg-muted/30 text-center">
                  <p className="font-mono text-lg font-bold">{selectedRecord.receiptNo}</p>
                  <p className="text-sm text-muted-foreground mt-1">Auto-generated on {selectedRecord.date}</p>
                  <Button variant="outline" size="sm" className="mt-3">Download Receipt PDF</Button>
                </div>
              </TabsContent>
              <TabsContent value="allocation" className="mt-4">
                <div className="p-4 rounded-lg border bg-muted/30">
                  <p className="text-sm"><span className="font-medium">Purpose:</span> {selectedRecord.purpose}</p>
                  <p className="text-sm mt-2"><span className="font-medium">Allocation Status:</span> <Badge variant="default" className="text-xs ml-1">Recorded</Badge></p>
                  <p className="text-xs text-muted-foreground mt-3">Funds will be allocated via Fund Allocation page.</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* New Donation Form */}
      <Dialog open={showRecord} onOpenChange={setShowRecord}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Record New Donation</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Donor Name</Label><Input placeholder="Donor name or Anonymous" /></div>
              <div><Label>Phone (optional)</Label><Input placeholder="+91 XXXXX XXXXX" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Amount (₹)</Label><Input type="number" placeholder="e.g. 50000" /></div>
              <div><Label>Channel</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash / Counter</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="online">Online Payment</SelectItem>
                    <SelectItem value="cheque">Cheque / DD</SelectItem>
                    <SelectItem value="inkind">In-Kind</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Purpose</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select purpose" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General / Hundi</SelectItem>
                  <SelectItem value="annadanam">Annadanam Sponsorship</SelectItem>
                  <SelectItem value="prasadam">Prasadam Sponsorship</SelectItem>
                  <SelectItem value="seva">Seva Sponsorship</SelectItem>
                  <SelectItem value="project">Project-linked</SelectItem>
                  <SelectItem value="event">Event-linked</SelectItem>
                  <SelectItem value="corpus">Corpus Fund</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Payment Mode</Label><Input placeholder="e.g. GPay, NEFT, Cash" /></div>
              <div><Label>Reference No.</Label><Input placeholder="Transaction ref (optional)" /></div>
            </div>
            <div><Label>Remarks</Label><Textarea placeholder="Any special instructions or donor intent..." rows={2} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRecord(false)}>Cancel</Button>
            <Button onClick={handleRecord}>Record & Generate Receipt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecordDonation;

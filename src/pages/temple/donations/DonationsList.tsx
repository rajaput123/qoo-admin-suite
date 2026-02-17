import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, FileDown, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDonations, useDonors } from "@/modules/donations/hooks";
import { recordDonation } from "@/modules/donations/donationsStore";
import SelectWithAddNew from "@/components/SelectWithAddNew";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

const formatCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val.toLocaleString()}`;
};

const emptyForm = {
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  fund: "",
  channel: "",
  // Counter fields
  counterName: "",
  paymentMode: "",
  // Online fields
  paymentId: "",
  gatewayName: "",
  // Bank fields
  bankRefNo: "",
  // Donor fields
  donorName: "",
  mobile: "",
  email: "",
  address: "",
  // Receipt
  generateReceipt: true,
  sendNotification: false,
  remarks: "",
};

const DonationsList = () => {
  const donations = useDonations();
  const donors = useDonors();
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [filterChannel, setFilterChannel] = useState("all");
  const [filterFund, setFilterFund] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterDonor, setFilterDonor] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<(typeof donations)[number] | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [fundOptions, setFundOptions] = useState(["General / Hundi", "Annadanam Sponsorship", "Prasadam Sponsorship", "Seva Sponsorship", "Project-linked", "Event-linked", "Corpus Fund"]);
  const [channelOptions, setChannelOptions] = useState(["Counter", "Online", "Bank Transfer", "Event", "Campaign"]);

  const channels = [...new Set(donations.map(d => d.channel))];
  const funds = [...new Set(donations.map(d => d.purpose))];
  const sources = [...new Set(donations.map(d => d.sourceModule))];
  const donorNames = [...new Set(donations.map(d => d.donorName))];

  const filtered = donations.filter(d => {
    if (search && !(
      d.donorName.toLowerCase().includes(search.toLowerCase()) ||
      d.donationId.toLowerCase().includes(search.toLowerCase()) ||
      d.receiptNo.toLowerCase().includes(search.toLowerCase())
    )) return false;
    if (filterChannel !== "all" && d.channel !== filterChannel) return false;
    if (filterFund !== "all" && d.purpose !== filterFund) return false;
    if (filterSource !== "all" && d.sourceModule !== filterSource) return false;
    if (filterDonor !== "all" && d.donorName !== filterDonor) return false;
    if (filterDateFrom && d.date < filterDateFrom) return false;
    if (filterDateTo && d.date > filterDateTo) return false;
    return true;
  });

  const activeFilterCount = [filterChannel, filterFund, filterSource, filterDonor].filter(f => f !== "all").length + (filterDateFrom ? 1 : 0) + (filterDateTo ? 1 : 0);

  const getMode = () => {
    if (form.channel === "Counter") return form.paymentMode || "Cash";
    if (form.channel === "Online") return form.gatewayName || "Online";
    if (form.channel === "Bank Transfer") return "Bank Transfer";
    return form.channel || "Manual";
  };

  const handleRecord = () => {
    const amt = Number(form.amount);
    if (!Number.isFinite(amt) || amt <= 0) return;

    const channelMap: Record<string, string> = {
      "Counter": "Cash",
      "Online": "Online",
      "Bank Transfer": "Bank Transfer",
      "Event": "Cash",
      "Campaign": "Cash",
    };

    const d = recordDonation({
      donorName: form.donorName.trim() || "Anonymous Devotee",
      phone: form.mobile.trim() || undefined,
      email: form.email.trim() || undefined,
      amount: amt,
      purpose: form.fund || "General / Hundi",
      channel: (channelMap[form.channel] || form.channel || "Cash") as any,
      mode: getMode(),
      referenceNo: form.bankRefNo.trim() || form.paymentId.trim() || undefined,
      remarks: form.remarks.trim() || undefined,
      sourceModule: form.channel === "Counter" ? "Counter" : form.channel === "Online" ? "Online Portal" : "Manual",
      counterId: form.counterName.trim() || undefined,
      date: form.date || undefined,
      createdBy: "System",
    });
    toast({ title: "Donation Recorded", description: `Receipt ${d.receiptNo} generated.` });
    setShowAdd(false);
    setForm({ ...emptyForm });
    setCustomFields([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Donations</h1>
          <p className="text-sm text-muted-foreground mt-1">Complete donation register with source traceability</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><FileDown className="h-4 w-4 mr-1" /> Export</Button>
          <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-1" /> Add Donation</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          {/* Search + Filter Toggle */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by donor, ID, or receipt..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Button variant={showFilters ? "default" : "outline"} size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-1" />
              Filters
              {activeFilterCount > 0 && <Badge variant="secondary" className="ml-1.5 text-[10px] h-4 px-1">{activeFilterCount}</Badge>}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4 p-3 rounded-lg bg-muted/30 border">
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Date From</p>
                <Input type="date" className="h-8 text-xs" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Date To</p>
                <Input type="date" className="h-8 text-xs" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Fund</p>
                <Select value={filterFund} onValueChange={setFilterFund}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Funds</SelectItem>
                    {funds.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Channel</p>
                <Select value={filterChannel} onValueChange={setFilterChannel}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Channels</SelectItem>
                    {channels.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Donor</p>
                <Select value={filterDonor} onValueChange={setFilterDonor}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Donors</SelectItem>
                    {donorNames.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Source Module</p>
                <Select value={filterSource} onValueChange={setFilterSource}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    {sources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donation ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Donor Name</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Fund</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Location/Counter</TableHead>
                <TableHead>Receipt No</TableHead>
                <TableHead>Created By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground py-8">No donations match the selected filters</TableCell>
                </TableRow>
              )}
              {filtered.map(d => (
                <TableRow key={d.donationId} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedDonation(d)}>
                  <TableCell className="font-mono text-xs">{d.donationId}</TableCell>
                  <TableCell className="text-sm">{d.date}</TableCell>
                  <TableCell className="font-medium text-sm">{d.donorName}</TableCell>
                  <TableCell className="text-right font-mono font-medium">{formatCurrency(d.amount)}</TableCell>
                  <TableCell className="text-sm">{d.purpose}</TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{d.channel}</Badge></TableCell>
                  <TableCell className="text-xs font-mono">{d.counterId || d.branchId || "—"}</TableCell>
                  <TableCell className="font-mono text-xs">{d.receiptNo}</TableCell>
                  <TableCell className="text-xs">System</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Donation Detail Modal */}
      <Dialog open={!!selectedDonation} onOpenChange={() => setSelectedDonation(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Donation Details</DialogTitle></DialogHeader>
          {selectedDonation && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Donation ID", selectedDonation.donationId],
                  ["Date", selectedDonation.date],
                  ["Donor", selectedDonation.donorName],
                  ["Amount", formatCurrency(selectedDonation.amount)],
                  ["Fund", selectedDonation.purpose],
                  ["Channel", selectedDonation.channel],
                  ["Mode", selectedDonation.mode],
                  ["Receipt No", selectedDonation.receiptNo],
                  ["Location/Counter", selectedDonation.counterId || selectedDonation.branchId || "—"],
                  ["Source Module", selectedDonation.sourceModule],
                  ["Reference No", selectedDonation.referenceNo || "—"],
                  ["Created At", new Date(selectedDonation.createdAt).toLocaleString()],
                ].map(([label, value]) => (
                  <div key={label} className="p-2 rounded bg-muted/50">
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
              {selectedDonation.remarks && (
                <div className="p-2 rounded bg-muted/50">
                  <p className="text-[10px] text-muted-foreground">Remarks</p>
                  <p className="text-sm">{selectedDonation.remarks}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Donation Modal */}
      <Dialog open={showAdd} onOpenChange={(open) => { setShowAdd(open); if (!open) { setForm({ ...emptyForm }); setCustomFields([]); } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Donation</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">Record a new donation with auto-receipt generation</p>
          </DialogHeader>

          <Tabs defaultValue="donation" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-transparent">
              <TabsTrigger value="donation" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-xs">Donation Info</TabsTrigger>
              <TabsTrigger value="channel" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-xs">Channel Details</TabsTrigger>
              <TabsTrigger value="donor" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-xs">Donor Info</TabsTrigger>
              <TabsTrigger value="receipt" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none text-xs">Receipt</TabsTrigger>
            </TabsList>

            {/* Section A — Donation Info */}
            <TabsContent value="donation" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Amount (₹)</Label>
                  <Input type="number" placeholder="e.g. 50000" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Donation Date</Label>
                  <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-xs">Fund / Category</Label>
                <SelectWithAddNew
                  value={form.fund}
                  onValueChange={(v) => setForm(p => ({ ...p, fund: v }))}
                  placeholder="Select fund"
                  options={fundOptions}
                  onAddNew={(v) => { setFundOptions(p => [...p, v]); setForm(p => ({ ...p, fund: v })); }}
                  className="mt-1 bg-background"
                />
              </div>
              <div>
                <Label className="text-xs">Channel</Label>
                <SelectWithAddNew
                  value={form.channel}
                  onValueChange={(v) => setForm(p => ({ ...p, channel: v }))}
                  placeholder="Select channel"
                  options={channelOptions}
                  onAddNew={(v) => { setChannelOptions(p => [...p, v]); setForm(p => ({ ...p, channel: v })); }}
                  className="mt-1 bg-background"
                />
              </div>
            </TabsContent>

            {/* Section B — Channel-Specific */}
            <TabsContent value="channel" className="space-y-4 mt-4">
              {form.channel === "Counter" && (
                <>
                  <div>
                    <Label className="text-xs">Counter Name</Label>
                    <Input placeholder="e.g. CTR-001" value={form.counterName} onChange={e => setForm(p => ({ ...p, counterName: e.target.value }))} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Payment Mode</Label>
                    <Select value={form.paymentMode} onValueChange={(v) => setForm(p => ({ ...p, paymentMode: v }))}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select mode" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              {form.channel === "Online" && (
                <>
                  <div>
                    <Label className="text-xs">Payment ID</Label>
                    <Input placeholder="e.g. pay_abc123" value={form.paymentId} onChange={e => setForm(p => ({ ...p, paymentId: e.target.value }))} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Gateway Name</Label>
                    <Input placeholder="e.g. Razorpay, Paytm" value={form.gatewayName} onChange={e => setForm(p => ({ ...p, gatewayName: e.target.value }))} className="mt-1" />
                  </div>
                </>
              )}
              {form.channel === "Bank Transfer" && (
                <>
                  <div>
                    <Label className="text-xs">Bank Reference Number</Label>
                    <Input placeholder="e.g. NEFT/RTGS ref" value={form.bankRefNo} onChange={e => setForm(p => ({ ...p, bankRefNo: e.target.value }))} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Upload Proof</Label>
                    <Input type="file" accept=".pdf,.jpg,.png" className="mt-1" />
                  </div>
                </>
              )}
              {!["Counter", "Online", "Bank Transfer"].includes(form.channel) && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  {form.channel ? `No additional fields for "${form.channel}" channel.` : "Select a channel in Donation Info tab to see channel-specific fields."}
                </div>
              )}
            </TabsContent>

            {/* Section C — Donor Info */}
            <TabsContent value="donor" className="space-y-4 mt-4">
              <p className="text-xs text-muted-foreground">Donor information is optional. Leave blank for anonymous donations.</p>
              <div>
                <Label className="text-xs">Search Existing Donor</Label>
                <Select value="" onValueChange={(v) => {
                  const donor = donors.find(d => d.donorId === v);
                  if (donor) {
                    setForm(p => ({
                      ...p,
                      donorName: donor.name,
                      mobile: donor.phone !== "-" ? donor.phone : "",
                      email: donor.email !== "-" ? donor.email : "",
                      address: donor.city !== "-" ? donor.city : "",
                    }));
                  }
                }}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Search donor..." /></SelectTrigger>
                  <SelectContent>
                    {donors.map(d => <SelectItem key={d.donorId} value={d.donorId}>{d.name} ({d.donorId})</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Donor Name</Label>
                  <Input placeholder="Name or Anonymous" value={form.donorName} onChange={e => setForm(p => ({ ...p, donorName: e.target.value }))} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Mobile</Label>
                  <Input placeholder="+91 XXXXX XXXXX" value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Email</Label>
                  <Input type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Address</Label>
                  <Input placeholder="Address" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} className="mt-1" />
                </div>
              </div>
            </TabsContent>

            {/* Section E — Receipt */}
            <TabsContent value="receipt" className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Generate Receipt</p>
                  <p className="text-xs text-muted-foreground">Auto-generate receipt on save</p>
                </div>
                <Switch checked={form.generateReceipt} onCheckedChange={(v) => setForm(p => ({ ...p, generateReceipt: v }))} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Send SMS / Email Notification</p>
                  <p className="text-xs text-muted-foreground">Notify donor about the receipt</p>
                </div>
                <Switch checked={form.sendNotification} onCheckedChange={(v) => setForm(p => ({ ...p, sendNotification: v }))} />
              </div>
              <div>
                <Label className="text-xs">Remarks</Label>
                <Textarea placeholder="Any special instructions or donor intent..." rows={2} value={form.remarks} onChange={e => setForm(p => ({ ...p, remarks: e.target.value }))} className="mt-1" />
              </div>
              <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} editable={true} />
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => { setShowAdd(false); setForm({ ...emptyForm }); setCustomFields([]); }}>Cancel</Button>
            <Button onClick={handleRecord}>Record & Generate Receipt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationsList;

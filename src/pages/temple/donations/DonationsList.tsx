import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, FileDown, ListFilter, ArrowUpDown } from "lucide-react";
import { useDonations, useAllocations } from "@/modules/donations/hooks";
import type { DonationSourceModule } from "@/modules/donations/types";

const formatCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val.toLocaleString()}`;
};

const sourceModuleBadgeVariant = (src: string) => {
  switch (src) {
    case "Manual": return "outline";
    case "Booking": return "secondary";
    case "Event": return "default";
    case "Online Portal": return "default";
    case "Campaign": return "secondary";
    case "Counter": return "outline";
    default: return "outline" as const;
  }
};

const DonationsList = () => {
  const donations = useDonations();
  const allocations = useAllocations();
  const allocatedSet = new Set(allocations.map(a => a.donationId));

  const [search, setSearch] = useState("");
  const [filterChannel, setFilterChannel] = useState("all");
  const [filterPurpose, setFilterPurpose] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [filterBranch, setFilterBranch] = useState("all");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<(typeof donations)[number] | null>(null);

  const channels = [...new Set(donations.map(d => d.channel))];
  const purposes = [...new Set(donations.map(d => d.purpose))];
  const sources = [...new Set(donations.map(d => d.sourceModule))];
  const branches = [...new Set(donations.filter(d => d.branchId).map(d => d.branchId!))];

  const filtered = donations.filter(d => {
    if (search && !(
      d.donorName.toLowerCase().includes(search.toLowerCase()) ||
      d.donationId.toLowerCase().includes(search.toLowerCase()) ||
      d.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      (d.sourceRecordId && d.sourceRecordId.toLowerCase().includes(search.toLowerCase()))
    )) return false;
    if (filterChannel !== "all" && d.channel !== filterChannel) return false;
    if (filterPurpose !== "all" && d.purpose !== filterPurpose) return false;
    if (filterSource !== "all" && d.sourceModule !== filterSource) return false;
    if (filterBranch !== "all" && d.branchId !== filterBranch) return false;
    if (filterDateFrom && d.date < filterDateFrom) return false;
    if (filterDateTo && d.date > filterDateTo) return false;
    return true;
  });

  const totalFiltered = filtered.reduce((s, d) => s + d.amount, 0);
  const activeFilterCount = [filterChannel, filterPurpose, filterSource, filterBranch].filter(f => f !== "all").length + (filterDateFrom ? 1 : 0) + (filterDateTo ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Donations</h1>
          <p className="text-sm text-muted-foreground mt-1">Complete donation register with source traceability and advanced filters</p>
        </div>
        <Button variant="outline" size="sm"><FileDown className="h-4 w-4 mr-1" /> Export</Button>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">{filtered.length}</p><p className="text-xs text-muted-foreground">Donations Found</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">{formatCurrency(totalFiltered)}</p><p className="text-xs text-muted-foreground">Total Amount</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">{new Set(filtered.map(d => d.donorId)).size}</p><p className="text-xs text-muted-foreground">Unique Donors</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-4">
          {/* Search + Filter Toggle */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by donor, ID, receipt, or source record..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
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
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Purpose / Fund</p>
                <Select value={filterPurpose} onValueChange={setFilterPurpose}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Purposes</SelectItem>
                    {purposes.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
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
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Branch</p>
                <Select value={filterBranch} onValueChange={setFilterBranch}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {branches.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Date From</p>
                <Input type="date" className="h-8 text-xs" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1 font-medium">Date To</p>
                <Input type="date" className="h-8 text-xs" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)} />
              </div>
            </div>
          )}

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donation ID</TableHead>
                <TableHead>Donor</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell className="font-medium text-sm">{d.donorName}</TableCell>
                  <TableCell className="text-sm">{d.purpose}</TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{d.channel}</Badge></TableCell>
                  <TableCell><Badge variant={sourceModuleBadgeVariant(d.sourceModule) as any} className="text-[10px]">{d.sourceModule}</Badge></TableCell>
                  <TableCell className="text-xs font-mono">{d.branchId || "—"}</TableCell>
                  <TableCell className="text-right font-mono font-medium">{formatCurrency(d.amount)}</TableCell>
                  <TableCell className="text-xs">{d.date}</TableCell>
                  <TableCell>
                    <Badge variant={allocatedSet.has(d.donationId) ? "default" : "secondary"} className="text-[10px]">
                      {allocatedSet.has(d.donationId) ? "Allocated" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selectedDonation} onOpenChange={() => setSelectedDonation(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Donation Details</DialogTitle></DialogHeader>
          {selectedDonation && (
            <Tabs defaultValue="details">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                <TabsTrigger value="traceability" className="flex-1">Traceability</TabsTrigger>
                <TabsTrigger value="receipt" className="flex-1">Receipt</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Donation ID", selectedDonation.donationId],
                    ["Donor", selectedDonation.donorName],
                    ["Amount", formatCurrency(selectedDonation.amount)],
                    ["Purpose", selectedDonation.purpose],
                    ["Channel", selectedDonation.channel],
                    ["Mode", selectedDonation.mode],
                    ["Date", selectedDonation.date],
                    ["Time", selectedDonation.time],
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
              </TabsContent>
              <TabsContent value="traceability" className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Temple ID", selectedDonation.templeId],
                    ["Branch ID", selectedDonation.branchId || "—"],
                    ["Source Module", selectedDonation.sourceModule],
                    ["Source Record ID", selectedDonation.sourceRecordId || "—"],
                    ["Counter ID", selectedDonation.counterId || "—"],
                    ["Reference No.", selectedDonation.referenceNo || "—"],
                    ["Receipt No.", selectedDonation.receiptNo],
                    ["Created At", new Date(selectedDonation.createdAt).toLocaleString()],
                  ].map(([label, value]) => (
                    <div key={label} className="p-2 rounded bg-muted/50">
                      <p className="text-[10px] text-muted-foreground">{label}</p>
                      <p className="text-sm font-mono font-medium">{value}</p>
                    </div>
                  ))}
                </div>
                {selectedDonation.sourceRecordId && (
                  <div className="p-3 rounded-lg border bg-primary/5">
                    <p className="text-xs text-muted-foreground">This donation was automatically created from</p>
                    <p className="text-sm font-medium mt-1">{selectedDonation.sourceModule} → {selectedDonation.sourceRecordId}</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="receipt" className="mt-4">
                <div className="p-4 rounded-lg border bg-muted/30 text-center">
                  <p className="font-mono text-lg font-bold">{selectedDonation.receiptNo}</p>
                  <p className="text-sm text-muted-foreground mt-1">Auto-generated on {selectedDonation.date}</p>
                  <Button variant="outline" size="sm" className="mt-3">Download Receipt PDF</Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonationsList;

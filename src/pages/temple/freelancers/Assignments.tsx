import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Plus, ChevronLeft, ChevronRight, Link2, Zap, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import SelectWithAddNew from "@/components/SelectWithAddNew";
import { eventRefs, freelancerRefs, templeStructures, autoTasks } from "@/data/templeData";

const assignments = [
  { id: "ASN-001", freelancerId: "FRL-0001", freelancerName: "Pixel Studio", eventId: "EVT-002", eventName: "Vaikuntha Ekadasi", linkedStructure: "Main Temple", date: "2026-01-10", duration: "1 day", agreedPayment: 20000, status: "Completed", taskId: "" },
  { id: "ASN-002", freelancerId: "FRL-0002", freelancerName: "Decor Dreams", eventId: "EVT-002", eventName: "Vaikuntha Ekadasi", linkedStructure: "Main Temple", date: "2026-01-10", duration: "2 days", agreedPayment: 35000, status: "Completed", taskId: "" },
  { id: "ASN-003", freelancerId: "FRL-0003", freelancerName: "Sound Waves Pro", eventId: "", eventName: "Daily Live Broadcast", linkedStructure: "Main Temple", date: "2026-02-09", duration: "Ongoing", agreedPayment: 18000, status: "Assigned", taskId: "" },
  { id: "ASN-004", freelancerId: "FRL-0001", freelancerName: "Pixel Studio", eventId: "EVT-004", eventName: "Maha Shivaratri", linkedStructure: "Main Temple", date: "2026-02-15", duration: "1 day", agreedPayment: 25000, status: "Confirmed", taskId: "TSK-020" },
  { id: "ASN-005", freelancerId: "FRL-0003", freelancerName: "Sound Waves Pro", eventId: "EVT-004", eventName: "Maha Shivaratri", linkedStructure: "Main Temple", date: "2026-02-15", duration: "1 day", agreedPayment: 18000, status: "Confirmed", taskId: "TSK-021" },
  { id: "ASN-006", freelancerId: "FRL-0002", freelancerName: "Decor Dreams", eventId: "EVT-004", eventName: "Maha Shivaratri", linkedStructure: "Main Temple", date: "2026-02-14", duration: "2 days", agreedPayment: 45000, status: "Assigned", taskId: "TSK-022" },
  { id: "ASN-007", freelancerId: "FRL-0007", freelancerName: "Heritage Electricals", eventId: "EVT-004", eventName: "Maha Shivaratri", linkedStructure: "Main Temple", date: "2026-02-14", duration: "2 days", agreedPayment: 28000, status: "Assigned", taskId: "TSK-023" },
  { id: "ASN-008", freelancerId: "FRL-0004", freelancerName: "CreativeMinds Design", eventId: "", eventName: "Annual Calendar Design", linkedStructure: "Administration", date: "2026-01-05", duration: "10 days", agreedPayment: 25000, status: "Completed", taskId: "" },
  { id: "ASN-009", freelancerId: "FRL-0001", freelancerName: "Pixel Studio", eventId: "EVT-001", eventName: "Brahmotsavam 2026", linkedStructure: "Main Temple", date: "2026-03-15", duration: "10 days", agreedPayment: 150000, status: "Assigned", taskId: "" },
  { id: "ASN-010", freelancerId: "FRL-0003", freelancerName: "Sound Waves Pro", eventId: "EVT-001", eventName: "Brahmotsavam 2026", linkedStructure: "Main Temple", date: "2026-03-15", duration: "10 days", agreedPayment: 100000, status: "Assigned", taskId: "" },
];

const Assignments = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterEvent, setFilterEvent] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [freelancerOptions, setFreelancerOptions] = useState(freelancerRefs.map(f => f.businessName));
  const [eventOptions, setEventOptions] = useState(eventRefs.map(e => `${e.id} — ${e.name}`));
  const [structureOptions, setStructureOptions] = useState(templeStructures.map(s => s.name));

  const filtered = assignments.filter(a => {
    if (search && !a.freelancerName.toLowerCase().includes(search.toLowerCase()) && !a.eventName.toLowerCase().includes(search.toLowerCase()) && !a.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== "all" && a.status !== filterStatus) return false;
    if (filterEvent !== "all" && a.eventId !== filterEvent) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Assignments</h1>
            <p className="text-muted-foreground">Freelancer assignments linked to Events & Tasks — auto-generates task entries</p>
          </div>
          <Button onClick={() => setShowAdd(true)} className="gap-2"><Plus className="h-4 w-4" />Add Assignment</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search freelancer, event, ID..." className="pl-9" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <Select value={filterStatus} onValueChange={v => { setFilterStatus(v); setPage(1); }}>
            <SelectTrigger className="w-[140px] bg-background"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Assigned">Assigned</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterEvent} onValueChange={v => { setFilterEvent(v); setPage(1); }}>
            <SelectTrigger className="w-[180px] bg-background"><SelectValue placeholder="All Events" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Events</SelectItem>
              {eventRefs.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="ml-auto">{filtered.length} assignments</Badge>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Freelancer</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Structure</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Task Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">No assignments found</TableCell></TableRow>
              ) : paged.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium text-primary">{a.id}</TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{a.freelancerName}</span>
                      <span className="block text-[10px] text-muted-foreground font-mono">{a.freelancerId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="text-sm">{a.eventName}</span>
                      {a.eventId && <span className="block text-[10px] text-primary font-mono">{a.eventId}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{a.linkedStructure}</TableCell>
                  <TableCell className="text-sm">{a.date}</TableCell>
                  <TableCell className="text-sm">{a.duration}</TableCell>
                  <TableCell className="text-right font-medium">₹{a.agreedPayment.toLocaleString()}</TableCell>
                  <TableCell><Badge variant={a.status === "Completed" ? "default" : a.status === "Confirmed" ? "default" : a.status === "Cancelled" ? "destructive" : "secondary"}>{a.status}</Badge></TableCell>
                  <TableCell>
                    {a.taskId ? (
                      <span className="text-xs font-mono text-primary flex items-center gap-1">
                        <Zap className="h-3 w-3 text-purple-500" />{a.taskId}
                      </span>
                    ) : <span className="text-xs text-muted-foreground">—</span>}
                  </TableCell>
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

      {/* Add Assignment Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-lg bg-background">
          <DialogHeader><DialogTitle>Add Assignment</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-xs">Freelancer</Label><SelectWithAddNew value="" onValueChange={() => {}} placeholder="Select freelancer" options={freelancerOptions} onAddNew={v => setFreelancerOptions(p => [...p, v])} /></div>
            <div>
              <Label className="text-xs">Event (from Event Module)</Label>
              <Select>
                <SelectTrigger className="bg-background"><SelectValue placeholder="Select event" /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="none">Non-event assignment</SelectItem>
                  {eventRefs.map(e => <SelectItem key={e.id} value={e.id}>{e.id} — {e.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">Linked Structure</Label><SelectWithAddNew value="" onValueChange={() => {}} placeholder="Select structure" options={structureOptions.slice()} onAddNew={v => setStructureOptions(p => [...p, v])} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Date</Label><Input type="date" /></div>
              <div><Label className="text-xs">Duration</Label><Input placeholder="e.g., 2 days" /></div>
            </div>
            <div><Label className="text-xs">Agreed Payment (₹)</Label><Input type="number" placeholder="Enter amount" /></div>
            <div className="border rounded-lg p-3 bg-muted/30 text-xs text-muted-foreground">
              <Zap className="h-4 w-4 inline mr-1 text-purple-500" />
              A task will be auto-created in the Task module when this assignment is saved.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Assignment created & task auto-generated"); setShowAdd(false); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Assignments;

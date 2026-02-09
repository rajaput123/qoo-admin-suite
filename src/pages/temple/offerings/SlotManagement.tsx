import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Clock, CalendarDays, Plus, Lock, XCircle, ChevronUp, ChevronDown, Users, LayoutGrid, List } from "lucide-react";
import { toast } from "sonner";
import SearchableSelect from "@/components/SearchableSelect";
import { format } from "date-fns";

interface Slot {
  id: string;
  date: string;
  time: string;
  offering: string;
  structure: string;
  type: "Ritual" | "Darshan";
  capacity: number;
  booked: number;
  available: number;
  priest: string;
  status: "Open" | "Locked" | "Cancelled" | "Completed";
}

const mockSlots: Slot[] = [
  { id: "1", date: "2026-02-09", time: "5:30 AM", offering: "Suprabhatam", structure: "Main Temple", type: "Ritual", capacity: 50, booked: 48, available: 2, priest: "Pandit Sharma", status: "Completed" },
  { id: "2", date: "2026-02-09", time: "7:00 AM", offering: "Archana", structure: "Padmavathi Shrine", type: "Ritual", capacity: 30, booked: 30, available: 0, priest: "Pandit Rao", status: "Completed" },
  { id: "3", date: "2026-02-09", time: "9:00 AM", offering: "Abhishekam", structure: "Main Temple", type: "Ritual", capacity: 25, booked: 18, available: 7, priest: "Pandit Kumar", status: "Open" },
  { id: "4", date: "2026-02-09", time: "6:00 AM", offering: "Morning Darshan", structure: "Main Temple", type: "Darshan", capacity: 500, booked: 320, available: 180, priest: "—", status: "Open" },
  { id: "5", date: "2026-02-10", time: "5:30 AM", offering: "Suprabhatam", structure: "Main Temple", type: "Ritual", capacity: 50, booked: 12, available: 38, priest: "Pandit Sharma", status: "Open" },
  { id: "6", date: "2026-02-10", time: "7:00 AM", offering: "Archana", structure: "Padmavathi Shrine", type: "Ritual", capacity: 30, booked: 5, available: 25, priest: "Unassigned", status: "Open" },
  { id: "7", date: "2026-02-10", time: "9:00 AM", offering: "Abhishekam", structure: "Main Temple", type: "Ritual", capacity: 25, booked: 0, available: 25, priest: "Unassigned", status: "Open" },
  { id: "8", date: "2026-02-11", time: "5:30 AM", offering: "Suprabhatam", structure: "Main Temple", type: "Ritual", capacity: 50, booked: 0, available: 50, priest: "Unassigned", status: "Open" },
];

const priestOptions = [
  { value: "Pandit Sharma", label: "Pandit Sharma" },
  { value: "Pandit Rao", label: "Pandit Rao" },
  { value: "Pandit Kumar", label: "Pandit Kumar" },
  { value: "Pandit Iyer", label: "Pandit Iyer" },
];

const SlotManagement = () => {
  const [slots, setSlots] = useState<Slot[]>(mockSlots);
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [filterOffering, setFilterOffering] = useState("all");
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [assignPriest, setAssignPriest] = useState("");

  const filtered = slots.filter(s => {
    if (filterDate && s.date !== format(filterDate, "yyyy-MM-dd")) return false;
    if (filterOffering !== "all" && s.offering !== filterOffering) return false;
    return true;
  });

  const handleCapacity = (id: string, delta: number) => {
    setSlots(slots.map(s => {
      if (s.id !== id) return s;
      const newCap = Math.max(s.booked, s.capacity + delta);
      return { ...s, capacity: newCap, available: newCap - s.booked };
    }));
    toast.success(`Capacity ${delta > 0 ? "increased" : "decreased"}`);
  };

  const handleLock = (id: string) => {
    setSlots(slots.map(s => s.id === id ? { ...s, status: "Locked" } : s));
    toast.info("Slot locked");
  };

  const handleCancel = (id: string) => {
    setSlots(slots.map(s => s.id === id ? { ...s, status: "Cancelled" } : s));
    toast.warning("Slot cancelled");
  };

  const handleAssign = () => {
    if (selectedSlot && assignPriest) {
      setSlots(slots.map(s => s.id === selectedSlot.id ? { ...s, priest: assignPriest } : s));
      toast.success(`Priest assigned: ${assignPriest}`);
    }
    setIsAssignOpen(false);
    setSelectedSlot(null);
    setAssignPriest("");
  };

  const statusColor = (s: string) => {
    if (s === "Open") return "secondary";
    if (s === "Locked") return "outline";
    if (s === "Cancelled") return "destructive";
    return "default";
  };

  const uniqueOfferings = [...new Set(slots.map(s => s.offering))];

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Slot Management</h1>
            <p className="text-muted-foreground">Control date-wise execution of offerings</p>
          </div>
          <div className="flex gap-2">
            <div className="flex border rounded-lg overflow-hidden">
              <Button variant={viewMode === "table" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("table")} className="rounded-none"><List className="h-4 w-4" /></Button>
              <Button variant={viewMode === "calendar" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("calendar")} className="rounded-none"><LayoutGrid className="h-4 w-4" /></Button>
            </div>
            <Button onClick={() => setIsGenerateOpen(true)} className="gap-2"><Plus className="h-4 w-4" />Generate Slots</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2"><CalendarDays className="h-4 w-4" />{filterDate ? format(filterDate, "dd MMM yyyy") : "All Dates"}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover" align="start">
              <Calendar mode="single" selected={filterDate} onSelect={setFilterDate} />
              {filterDate && <div className="p-2 border-t"><Button variant="ghost" size="sm" className="w-full" onClick={() => setFilterDate(undefined)}>Clear</Button></div>}
            </PopoverContent>
          </Popover>
          <Select value={filterOffering} onValueChange={setFilterOffering}>
            <SelectTrigger className="w-[180px] bg-background"><SelectValue placeholder="Offering" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Offerings</SelectItem>
              {uniqueOfferings.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {viewMode === "table" ? (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><Clock className="h-5 w-5 text-primary" /></div>
                <div><CardTitle>All Slots</CardTitle><CardDescription>{filtered.length} slots</CardDescription></div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Offering</TableHead>
                    <TableHead>Structure</TableHead>
                    <TableHead className="text-center">Capacity</TableHead>
                    <TableHead className="text-center">Booked</TableHead>
                    <TableHead className="text-center">Available</TableHead>
                    <TableHead>Priest</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(s => (
                    <TableRow key={s.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium text-sm">{s.date}</TableCell>
                      <TableCell className="text-sm">{s.time}</TableCell>
                      <TableCell className="font-medium">{s.offering}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{s.structure}</TableCell>
                      <TableCell className="text-center">{s.capacity}</TableCell>
                      <TableCell className="text-center font-medium">{s.booked}</TableCell>
                      <TableCell className="text-center"><span className={s.available === 0 ? "text-destructive font-medium" : "text-emerald-600 font-medium"}>{s.available}</span></TableCell>
                      <TableCell className="text-sm">{s.priest}</TableCell>
                      <TableCell><Badge variant={statusColor(s.status) as any}>{s.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCapacity(s.id, 5)} disabled={s.status !== "Open"}><ChevronUp className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCapacity(s.id, -5)} disabled={s.status !== "Open"}><ChevronDown className="h-3 w-3" /></Button>
                          {s.type === "Ritual" && <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setSelectedSlot(s); setIsAssignOpen(true); }} disabled={s.status !== "Open"}><Users className="h-3 w-3" /></Button>}
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleLock(s.id)} disabled={s.status !== "Open"}><Lock className="h-3 w-3" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCancel(s.id)} disabled={s.status !== "Open"}><XCircle className="h-3 w-3 text-destructive" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Calendar mode="single" className="mx-auto" />
                <p className="text-sm text-muted-foreground mt-4">Select a date to view slots</p>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Generate Slots Dialog */}
      <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
        <DialogContent className="sm:max-w-[450px] bg-background">
          <DialogHeader><DialogTitle>Generate Slots</DialogTitle><DialogDescription>Bulk generate slots for a date range</DialogDescription></DialogHeader>
          <div className="space-y-3 py-2">
            <div><Label>From Date</Label><Input type="date" /></div>
            <div><Label>To Date</Label><Input type="date" /></div>
            <div><Label>Offering</Label>
              <Select><SelectTrigger className="bg-background"><SelectValue placeholder="Select offering" /></SelectTrigger>
                <SelectContent className="bg-popover"><SelectItem value="all">All Active Offerings</SelectItem><SelectItem value="Suprabhatam">Suprabhatam</SelectItem><SelectItem value="Archana">Archana</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setIsGenerateOpen(false)}>Cancel</Button><Button onClick={() => { setIsGenerateOpen(false); toast.success("Slots generated"); }}>Generate</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Priest Dialog */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader><DialogTitle>Assign Priest</DialogTitle><DialogDescription>{selectedSlot?.offering} – {selectedSlot?.date} {selectedSlot?.time}</DialogDescription></DialogHeader>
          <SearchableSelect options={priestOptions} value={assignPriest} onValueChange={setAssignPriest} placeholder="Select priest" />
          <DialogFooter><Button variant="outline" onClick={() => setIsAssignOpen(false)}>Cancel</Button><Button onClick={handleAssign}>Assign</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SlotManagement;

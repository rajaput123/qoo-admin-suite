import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Calendar, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { toast } from "sonner";
import SearchableSelect from "@/components/SearchableSelect";

interface PriestSchedule {
  id: string;
  priestName: string;
  date: string;
  slots: { time: string; offering: string; structure: string; status: "Assigned" | "Completed" | "Absent" }[];
}

const mockSchedule: PriestSchedule[] = [
  {
    id: "1", priestName: "Pandit Sharma", date: "2026-02-09",
    slots: [
      { time: "5:30 AM", offering: "Suprabhatam", structure: "Main Temple", status: "Completed" },
      { time: "7:00 PM", offering: "Ekantha Seva", structure: "Main Temple", status: "Assigned" },
    ],
  },
  {
    id: "2", priestName: "Pandit Rao", date: "2026-02-09",
    slots: [
      { time: "7:00 AM", offering: "Archana", structure: "Padmavathi Shrine", status: "Completed" },
    ],
  },
  {
    id: "3", priestName: "Pandit Kumar", date: "2026-02-09",
    slots: [
      { time: "9:00 AM", offering: "Abhishekam", structure: "Main Temple", status: "Assigned" },
    ],
  },
  {
    id: "4", priestName: "Pandit Iyer", date: "2026-02-09",
    slots: [
      { time: "11:00 AM", offering: "Sahasranama", structure: "Varadaraja Shrine", status: "Assigned" },
    ],
  },
];

const unassignedSlots = [
  { id: "u1", time: "4:00 PM", offering: "Ashtottara", structure: "Lakshmi Shrine", date: "2026-02-09" },
  { id: "u2", time: "5:30 AM", offering: "Suprabhatam", structure: "Main Temple", date: "2026-02-10" },
  { id: "u3", time: "7:00 AM", offering: "Archana", structure: "Padmavathi Shrine", date: "2026-02-10" },
];

const priestOptions = [
  { value: "Pandit Sharma", label: "Pandit Sharma" },
  { value: "Pandit Rao", label: "Pandit Rao" },
  { value: "Pandit Kumar", label: "Pandit Kumar" },
  { value: "Pandit Iyer", label: "Pandit Iyer" },
];

const PriestAssignment = () => {
  const [filterDate, setFilterDate] = useState("2026-02-09");
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedUnassigned, setSelectedUnassigned] = useState<typeof unassignedSlots[0] | null>(null);
  const [assignPriest, setAssignPriest] = useState("");
  const [viewPriest, setViewPriest] = useState<PriestSchedule | null>(null);

  const handleAssign = () => {
    if (assignPriest) toast.success(`Assigned ${assignPriest} to ${selectedUnassigned?.offering}`);
    setIsAssignOpen(false);
    setSelectedUnassigned(null);
    setAssignPriest("");
  };

  const handleAttendance = (priestName: string, slotTime: string) => {
    toast.success(`Attendance marked for ${priestName} at ${slotTime}`);
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Priest Assignment</h1>
            <p className="text-muted-foreground">Assign priests to ritual slots and track attendance</p>
          </div>
          <Select value={filterDate} onValueChange={setFilterDate}>
            <SelectTrigger className="w-[180px] bg-background"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="2026-02-09">9 Feb 2026</SelectItem>
              <SelectItem value="2026-02-10">10 Feb 2026</SelectItem>
              <SelectItem value="2026-02-11">11 Feb 2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Unassigned Slots */}
        {unassignedSlots.filter(s => s.date === filterDate).length > 0 && (
          <Card className="mb-6 border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-amber-700">
                <AlertTriangle className="h-4 w-4" />
                Unassigned Slots
                <Badge variant="outline" className="ml-auto border-amber-300 text-amber-700">{unassignedSlots.filter(s => s.date === filterDate).length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Offering</TableHead>
                    <TableHead>Structure</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unassignedSlots.filter(s => s.date === filterDate).map(s => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.time}</TableCell>
                      <TableCell>{s.offering}</TableCell>
                      <TableCell className="text-muted-foreground">{s.structure}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedUnassigned(s); setIsAssignOpen(true); }} className="gap-1">
                          <Users className="h-3 w-3" /> Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Priest Daily Schedule */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Calendar className="h-5 w-5 text-primary" /></div>
              <div><CardTitle>Priest Daily Schedule</CardTitle><CardDescription>{filterDate}</CardDescription></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSchedule.filter(s => s.date === filterDate).map(priest => (
                <div key={priest.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{priest.priestName}</p>
                        <p className="text-xs text-muted-foreground">{priest.slots.length} slot(s) assigned</p>
                      </div>
                    </div>
                  </div>
                  <Table>
                    <TableBody>
                      {priest.slots.map((slot, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium text-sm w-24">{slot.time}</TableCell>
                          <TableCell>{slot.offering}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{slot.structure}</TableCell>
                          <TableCell><Badge variant={slot.status === "Completed" ? "default" : slot.status === "Absent" ? "destructive" : "secondary"}>{slot.status}</Badge></TableCell>
                          <TableCell className="text-right">
                            {slot.status === "Assigned" && (
                              <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => handleAttendance(priest.priestName, slot.time)}>
                                <CheckCircle className="h-3 w-3" /> Mark Present
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Assign Priest Dialog */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Assign Priest</DialogTitle>
            <DialogDescription>{selectedUnassigned?.offering} – {selectedUnassigned?.time}</DialogDescription>
          </DialogHeader>
          <SearchableSelect options={priestOptions} value={assignPriest} onValueChange={setAssignPriest} placeholder="Select priest" />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignOpen(false)}>Cancel</Button>
            <Button onClick={handleAssign}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PriestAssignment;

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarCheck, Users, IndianRupee, Clock, Lock, Eye, AlertCircle, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const allSlots = [
  { id: "1", time: "5:30 AM", name: "Suprabhatam", type: "Ritual" as const, structure: "Main Temple", capacity: 50, booked: 48, available: 2, priest: "Pandit Sharma", walkin: 0, status: "In Progress" },
  { id: "2", time: "7:00 AM", name: "Archana", type: "Ritual" as const, structure: "Padmavathi Shrine", capacity: 30, booked: 30, available: 0, priest: "Pandit Rao", walkin: 0, status: "Fully Booked" },
  { id: "3", time: "9:00 AM", name: "Abhishekam", type: "Ritual" as const, structure: "Main Temple", capacity: 25, booked: 18, available: 7, priest: "Pandit Kumar", walkin: 0, status: "Open" },
  { id: "4", time: "6:00 AM – 8:00 AM", name: "Morning Darshan", type: "Darshan" as const, structure: "Main Temple", capacity: 500, booked: 320, available: 180, priest: "—", walkin: 45, status: "Open" },
  { id: "5", time: "8:00 AM – 10:00 AM", name: "Morning Darshan", type: "Darshan" as const, structure: "Main Temple", capacity: 500, booked: 500, available: 0, priest: "—", walkin: 0, status: "Fully Booked" },
  { id: "6", time: "11:00 AM", name: "Sahasranama", type: "Ritual" as const, structure: "Varadaraja Shrine", capacity: 40, booked: 12, available: 28, priest: "Pandit Iyer", walkin: 0, status: "Open" },
  { id: "7", time: "10:00 AM – 12:00 PM", name: "Shrine Darshan", type: "Darshan" as const, structure: "Padmavathi Shrine", capacity: 200, booked: 150, available: 50, priest: "—", walkin: 22, status: "Open" },
  { id: "8", time: "4:00 PM", name: "Ashtottara", type: "Ritual" as const, structure: "Lakshmi Shrine", capacity: 20, booked: 0, available: 20, priest: "Unassigned", walkin: 0, status: "Upcoming" },
  { id: "9", time: "4:00 PM – 6:00 PM", name: "Evening Darshan", type: "Darshan" as const, structure: "Main Temple", capacity: 500, booked: 180, available: 320, priest: "—", walkin: 0, status: "Upcoming" },
  { id: "10", time: "7:00 PM", name: "Ekantha Seva", type: "Ritual" as const, structure: "Main Temple", capacity: 15, booked: 15, available: 0, priest: "Pandit Sharma", walkin: 0, status: "Fully Booked" },
];

const statusColor = (s: string) => {
  if (s === "Fully Booked") return "destructive";
  if (s === "In Progress") return "default";
  if (s === "Open") return "secondary";
  return "outline";
};

const Today = () => {
  const [viewBookings, setViewBookings] = useState<typeof allSlots[0] | null>(null);
  const [filterType, setFilterType] = useState("all");
  const [filterStructure, setFilterStructure] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = allSlots.filter(s => {
    if (filterType !== "all" && s.type !== filterType) return false;
    if (filterStructure !== "all" && s.structure !== filterStructure) return false;
    if (filterStatus !== "all" && s.status !== filterStatus) return false;
    return true;
  });

  const totalBookings = allSlots.reduce((a, r) => a + r.booked, 0);
  const totalRevenue = 124500;
  const fullyBooked = allSlots.filter(r => r.available === 0).length;
  const upcoming = allSlots.filter(s => s.status === "Upcoming");
  const structures = [...new Set(allSlots.map(s => s.structure))];

  const kpis = [
    { label: "Total Bookings", value: totalBookings.toLocaleString(), icon: CalendarCheck, description: "Across all offerings today" },
    { label: "Revenue Today", value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, description: "Combined ritual & darshan" },
    { label: "Fully Booked", value: fullyBooked.toString(), icon: AlertCircle, description: "Slots at full capacity" },
    { label: "Upcoming", value: upcoming.length.toString(), icon: Clock, description: "Slots yet to begin" },
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Today's Operations</h1>
            <p className="text-muted-foreground">Real-time control for {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>

        {/* Stats Cards - Hub Module Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {kpis.map((kpi, i) => (
            <Card key={i} className="group hover:shadow-md transition-all duration-200">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-muted group-hover:bg-primary group-hover:shadow-lg transition-all duration-200">
                    <kpi.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                  </div>
                </div>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px] bg-background"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Ritual">Ritual</SelectItem>
              <SelectItem value="Darshan">Darshan</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStructure} onValueChange={setFilterStructure}>
            <SelectTrigger className="w-[170px] bg-background"><SelectValue placeholder="Structure" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Structures</SelectItem>
              {structures.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] bg-background"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Fully Booked">Fully Booked</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="ml-auto">{filtered.length} slots</Badge>
        </div>

        {/* Unified Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Offering</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Structure</TableHead>
                  <TableHead className="text-center">Capacity</TableHead>
                  <TableHead className="text-center">Booked</TableHead>
                  <TableHead className="text-center">Available</TableHead>
                  <TableHead className="text-center">Walk-in</TableHead>
                  <TableHead>Priest</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-sm">{r.time}</TableCell>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell><Badge variant={r.type === "Ritual" ? "default" : "secondary"}>{r.type}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{r.structure}</TableCell>
                    <TableCell className="text-center">{r.capacity}</TableCell>
                    <TableCell className="text-center font-medium">{r.booked}</TableCell>
                    <TableCell className="text-center">
                      <span className={r.available === 0 ? "text-destructive font-medium" : "text-emerald-600 font-medium"}>{r.available}</span>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">{r.type === "Darshan" ? r.walkin : "—"}</TableCell>
                    <TableCell className="text-sm">{r.priest}</TableCell>
                    <TableCell><Badge variant={statusColor(r.status) as any}>{r.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => toast.success(`Capacity increased for ${r.name}`)}>
                          <ChevronUp className="h-3 w-3" /> +Capacity
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => toast.info(`Slot locked: ${r.name}`)}>
                          <Lock className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => setViewBookings(r)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={11} className="text-center py-8 text-muted-foreground">No slots match filters</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* View Bookings Dialog */}
      <Dialog open={!!viewBookings} onOpenChange={() => setViewBookings(null)}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Bookings – {viewBookings?.name}</DialogTitle>
            <DialogDescription>{viewBookings?.time} · {viewBookings?.structure} · {viewBookings?.type}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Capacity</p>
                <p className="text-xl font-bold">{viewBookings?.capacity}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Booked</p>
                <p className="text-xl font-bold text-primary">{viewBookings?.booked}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Available</p>
                <p className="text-xl font-bold text-emerald-600">{viewBookings?.available}</p>
              </div>
            </div>
            {viewBookings?.type === "Darshan" && viewBookings.walkin > 0 && (
              <div className="p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-xs text-muted-foreground">Walk-in Count</p>
                <p className="text-xl font-bold">{viewBookings.walkin}</p>
              </div>
            )}
            <p className="text-sm text-muted-foreground">Priest: {viewBookings?.priest}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewBookings(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Today;

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, Users, IndianRupee, Clock, Lock, Eye, TrendingUp, AlertCircle, ChevronUp } from "lucide-react";
import { toast } from "sonner";

const todayRituals = [
  { id: "1", time: "5:30 AM", name: "Suprabhatam", structure: "Main Temple", capacity: 50, booked: 48, available: 2, priest: "Pandit Sharma", status: "In Progress" },
  { id: "2", time: "7:00 AM", name: "Archana", structure: "Padmavathi Shrine", capacity: 30, booked: 30, available: 0, priest: "Pandit Rao", status: "Fully Booked" },
  { id: "3", time: "9:00 AM", name: "Abhishekam", structure: "Main Temple", capacity: 25, booked: 18, available: 7, priest: "Pandit Kumar", status: "Open" },
  { id: "4", time: "11:00 AM", name: "Sahasranama", structure: "Varadaraja Shrine", capacity: 40, booked: 12, available: 28, priest: "Pandit Iyer", status: "Open" },
  { id: "5", time: "4:00 PM", name: "Ashtottara", structure: "Lakshmi Shrine", capacity: 20, booked: 0, available: 20, priest: "Unassigned", status: "Upcoming" },
  { id: "6", time: "7:00 PM", name: "Ekantha Seva", structure: "Main Temple", capacity: 15, booked: 15, available: 0, priest: "Pandit Sharma", status: "Fully Booked" },
];

const todayDarshan = [
  { id: "1", time: "6:00 AM – 8:00 AM", structure: "Main Temple", capacity: 500, booked: 320, walkin: 45, status: "Open" },
  { id: "2", time: "8:00 AM – 10:00 AM", structure: "Main Temple", capacity: 500, booked: 500, walkin: 0, status: "Fully Booked" },
  { id: "3", time: "10:00 AM – 12:00 PM", structure: "Padmavathi Shrine", capacity: 200, booked: 150, walkin: 22, status: "Open" },
  { id: "4", time: "4:00 PM – 6:00 PM", structure: "Main Temple", capacity: 500, booked: 180, walkin: 0, status: "Upcoming" },
  { id: "5", time: "6:00 PM – 8:00 PM", structure: "Main Temple", capacity: 300, booked: 0, walkin: 0, status: "Upcoming" },
];

const statusColor = (s: string) => {
  if (s === "Fully Booked") return "destructive";
  if (s === "In Progress") return "default";
  if (s === "Open") return "secondary";
  return "outline";
};

const Today = () => {
  const [viewBookings, setViewBookings] = useState<typeof todayRituals[0] | null>(null);

  const totalBookings = todayRituals.reduce((a, r) => a + r.booked, 0) + todayDarshan.reduce((a, d) => a + d.booked, 0);
  const totalRevenue = 124500;
  const fullyBooked = todayRituals.filter(r => r.available === 0).length + todayDarshan.filter(d => d.status === "Fully Booked").length;
  const upcoming = [...todayRituals, ...todayDarshan].filter(s => s.status === "Upcoming").slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Today's Operations</h1>
            <p className="text-muted-foreground">Real-time control for {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Bookings", value: totalBookings.toLocaleString(), icon: CalendarCheck, color: "text-primary" },
            { label: "Revenue Today", value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: "text-emerald-600" },
            { label: "Fully Booked Slots", value: fullyBooked, icon: AlertCircle, color: "text-destructive" },
            { label: "Upcoming Slots", value: upcoming.length, icon: Clock, color: "text-blue-600" },
          ].map((kpi, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
                    <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                  </div>
                  <kpi.icon className={`h-8 w-8 ${kpi.color} opacity-60`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Rituals */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-md"><CalendarCheck className="h-4 w-4 text-primary" /></div>
              Today's Rituals
              <Badge variant="secondary" className="ml-auto">{todayRituals.length} slots</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Ritual Name</TableHead>
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
                {todayRituals.map((r) => (
                  <TableRow key={r.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-sm">{r.time}</TableCell>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{r.structure}</TableCell>
                    <TableCell className="text-center">{r.capacity}</TableCell>
                    <TableCell className="text-center font-medium">{r.booked}</TableCell>
                    <TableCell className="text-center">
                      <span className={r.available === 0 ? "text-destructive font-medium" : "text-emerald-600 font-medium"}>{r.available}</span>
                    </TableCell>
                    <TableCell className="text-sm">{r.priest}</TableCell>
                    <TableCell><Badge variant={statusColor(r.status) as any}>{r.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => toast.success(`Capacity increased for ${r.name}`)}>
                          <ChevronUp className="h-3 w-3" /> Cap
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
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Today's Darshan */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="p-1.5 bg-blue-500/10 rounded-md"><Users className="h-4 w-4 text-blue-600" /></div>
              Today's Darshan
              <Badge variant="secondary" className="ml-auto">{todayDarshan.length} slots</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Structure</TableHead>
                  <TableHead className="text-center">Capacity</TableHead>
                  <TableHead className="text-center">Booked</TableHead>
                  <TableHead className="text-center">Walk-in</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayDarshan.map((d) => (
                  <TableRow key={d.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-sm">{d.time}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{d.structure}</TableCell>
                    <TableCell className="text-center">{d.capacity}</TableCell>
                    <TableCell className="text-center font-medium">{d.booked}</TableCell>
                    <TableCell className="text-center">{d.walkin}</TableCell>
                    <TableCell><Badge variant={statusColor(d.status) as any}>{d.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => toast.success(`Capacity increased`)}>
                          <ChevronUp className="h-3 w-3" /> Cap
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => toast.info(`Darshan slot closed`)}>
                          <Lock className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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
            <DialogDescription>{viewBookings?.time} · {viewBookings?.structure}</DialogDescription>
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

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search, Eye, XCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: string;
  bookingId: string;
  offering: string;
  type: "Ritual" | "Darshan";
  structure: string;
  devotee: string;
  date: string;
  quantity: number;
  amount: number;
  paymentStatus: "Paid" | "Pending" | "Refunded";
  bookingStatus: "Confirmed" | "Cancelled" | "Completed" | "No Show";
}

const mockBookings: Booking[] = [
  { id: "1", bookingId: "BK-2026-0001", offering: "Suprabhatam", type: "Ritual", structure: "Main Temple", devotee: "Ramesh Kumar", date: "2026-02-09", quantity: 2, amount: 1000, paymentStatus: "Paid", bookingStatus: "Confirmed" },
  { id: "2", bookingId: "BK-2026-0002", offering: "Archana", type: "Ritual", structure: "Padmavathi Shrine", devotee: "Lakshmi Devi", date: "2026-02-09", quantity: 1, amount: 100, paymentStatus: "Paid", bookingStatus: "Completed" },
  { id: "3", bookingId: "BK-2026-0003", offering: "Abhishekam", type: "Ritual", structure: "Main Temple", devotee: "Suresh Reddy", date: "2026-02-09", quantity: 1, amount: 2000, paymentStatus: "Paid", bookingStatus: "Confirmed" },
  { id: "4", bookingId: "BK-2026-0004", offering: "VIP Darshan", type: "Darshan", structure: "Main Temple", devotee: "Priya Sharma", date: "2026-02-09", quantity: 4, amount: 1200, paymentStatus: "Paid", bookingStatus: "Confirmed" },
  { id: "5", bookingId: "BK-2026-0005", offering: "Morning Darshan", type: "Darshan", structure: "Main Temple", devotee: "Anand Verma", date: "2026-02-09", quantity: 2, amount: 0, paymentStatus: "Paid", bookingStatus: "Completed" },
  { id: "6", bookingId: "BK-2026-0006", offering: "Suprabhatam", type: "Ritual", structure: "Main Temple", devotee: "Meena Iyer", date: "2026-02-10", quantity: 1, amount: 500, paymentStatus: "Pending", bookingStatus: "Confirmed" },
  { id: "7", bookingId: "BK-2026-0007", offering: "Archana", type: "Ritual", structure: "Padmavathi Shrine", devotee: "Vijay Nair", date: "2026-02-10", quantity: 3, amount: 300, paymentStatus: "Paid", bookingStatus: "Cancelled" },
  { id: "8", bookingId: "BK-2026-0008", offering: "Abhishekam", type: "Ritual", structure: "Main Temple", devotee: "Kavitha Rao", date: "2026-02-11", quantity: 1, amount: 2000, paymentStatus: "Refunded", bookingStatus: "Cancelled" },
];

const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewing, setViewing] = useState<Booking | null>(null);

  const filtered = bookings.filter(b => {
    if (searchQuery && !b.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) && !b.devotee.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterType !== "all" && b.type !== filterType) return false;
    if (filterStatus !== "all" && b.bookingStatus !== filterStatus) return false;
    return true;
  });

  const handleCancel = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, bookingStatus: "Cancelled" as const } : b));
    toast.warning("Booking cancelled");
  };

  const handleComplete = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, bookingStatus: "Completed" as const } : b));
    toast.success("Booking marked complete");
  };

  const payColor = (s: string) => s === "Paid" ? "default" : s === "Pending" ? "secondary" : "outline";
  const bookColor = (s: string) => s === "Confirmed" ? "default" : s === "Completed" ? "secondary" : s === "Cancelled" ? "destructive" : "outline";

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Booking Management</h1>
            <p className="text-muted-foreground">View and manage all bookings</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by Booking ID or Devotee..." className="pl-9" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px] bg-background"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-popover"><SelectItem value="all">All Types</SelectItem><SelectItem value="Ritual">Ritual</SelectItem><SelectItem value="Darshan">Darshan</SelectItem></SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px] bg-background"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-popover"><SelectItem value="all">All Status</SelectItem><SelectItem value="Confirmed">Confirmed</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="Cancelled">Cancelled</SelectItem></SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><BookOpen className="h-5 w-5 text-primary" /></div>
              <div><CardTitle>All Bookings</CardTitle><CardDescription>{filtered.length} bookings</CardDescription></div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Offering</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Structure</TableHead>
                  <TableHead>Devotee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(b => (
                  <TableRow key={b.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setViewing(b)}>
                    <TableCell className="font-mono text-xs font-medium">{b.bookingId}</TableCell>
                    <TableCell className="font-medium">{b.offering}</TableCell>
                    <TableCell><Badge variant={b.type === "Ritual" ? "default" : "secondary"}>{b.type}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{b.structure}</TableCell>
                    <TableCell>{b.devotee}</TableCell>
                    <TableCell className="text-sm">{b.date}</TableCell>
                    <TableCell className="text-center">{b.quantity}</TableCell>
                    <TableCell className="text-right font-medium">{b.amount > 0 ? `₹${b.amount}` : "Free"}</TableCell>
                    <TableCell><Badge variant={payColor(b.paymentStatus) as any}>{b.paymentStatus}</Badge></TableCell>
                    <TableCell><Badge variant={bookColor(b.bookingStatus) as any}>{b.bookingStatus}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); setViewing(b); }}><Eye className="h-3 w-3" /></Button>
                        {b.bookingStatus === "Confirmed" && (
                          <>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); handleComplete(b.id); }}><CheckCircle className="h-3 w-3 text-emerald-600" /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); handleCancel(b.id); }}><XCircle className="h-3 w-3 text-destructive" /></Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* View Booking Dialog */}
      <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
        <DialogContent className="sm:max-w-[550px] bg-background">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>Booking {viewing?.bookingId}</DialogTitle>
                <DialogDescription>{viewing?.offering} · {viewing?.structure}</DialogDescription>
              </div>
              <Badge variant={bookColor(viewing?.bookingStatus || "") as any}>{viewing?.bookingStatus}</Badge>
            </div>
          </DialogHeader>
          <Tabs defaultValue="details" className="mt-2">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Details</TabsTrigger>
              <TabsTrigger value="payment" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Payment</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Devotee</p><p className="font-medium">{viewing?.devotee}</p></div>
                <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Date</p><p className="font-medium">{viewing?.date}</p></div>
                <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{viewing?.type}</p></div>
                <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Quantity</p><p className="font-medium">{viewing?.quantity}</p></div>
              </div>
            </TabsContent>
            <TabsContent value="payment" className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Amount</p><p className="font-medium text-lg">{viewing?.amount ? `₹${viewing.amount}` : "Free"}</p></div>
                <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Payment Status</p><Badge variant={payColor(viewing?.paymentStatus || "") as any} className="mt-1">{viewing?.paymentStatus}</Badge></div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            {viewing?.bookingStatus === "Confirmed" && (
              <>
                <Button variant="outline" onClick={() => { handleCancel(viewing.id); setViewing(null); }} className="gap-1 text-destructive"><XCircle className="h-4 w-4" />Cancel</Button>
                <Button onClick={() => { handleComplete(viewing.id); setViewing(null); }} className="gap-1"><CheckCircle className="h-4 w-4" />Mark Complete</Button>
              </>
            )}
            {viewing?.bookingStatus !== "Confirmed" && <Button variant="outline" onClick={() => setViewing(null)}>Close</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;

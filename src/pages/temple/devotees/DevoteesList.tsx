import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Download, Users, UserCheck, IndianRupee, Calendar, Phone, Mail, MapPin, ChevronLeft, ChevronRight, Heart, BookOpen, HandHelping, StickyNote } from "lucide-react";
import { toast } from "sonner";

type Devotee = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
  gothram: string;
  nakshatra: string;
  preferredDeity: string;
  preferredShrine: string;
  totalDonations: number;
  totalSevas: number;
  totalDarshans: number;
  lastVisit: string;
  isVolunteer: boolean;
  tags: string[];
  smsAllowed: boolean;
  whatsappAllowed: boolean;
  emailAllowed: boolean;
  festivalNotifications: boolean;
  engagementLevel: string;
  bookings: { id: string; offering: string; type: string; date: string; status: string; amount: number }[];
  donations: { date: string; amount: number; structure: string; purpose: string }[];
  volunteerData?: { skills: string[]; events: number; hours: number; availability: string };
  notes: string[];
};

const devotees: Devotee[] = [
  { id: "DEV-0001", name: "Ramesh Kumar", phone: "+91 98765 43210", email: "ramesh@email.com", city: "Bangalore", state: "Karnataka", country: "India", gothram: "Bharadwaja", nakshatra: "Rohini", preferredDeity: "Lord Venkateswara", preferredShrine: "Main Temple", totalDonations: 125000, totalSevas: 28, totalDarshans: 48, lastVisit: "2026-02-09", isVolunteer: false, tags: ["VIP", "Donor"], smsAllowed: true, whatsappAllowed: true, emailAllowed: true, festivalNotifications: true, engagementLevel: "Highly Active", bookings: [{ id: "BK-0001", offering: "Suprabhatam", type: "Ritual", date: "2026-02-09", status: "Confirmed", amount: 1000 }, { id: "BK-0021", offering: "VIP Darshan", type: "Darshan", date: "2026-02-05", status: "Completed", amount: 300 }], donations: [{ date: "2026-02-05", amount: 25000, structure: "Main Temple", purpose: "Annadanam" }, { date: "2026-01-10", amount: 50000, structure: "Main Temple", purpose: "Temple Renovation" }], notes: ["Regular participant in major festivals", "Interested in sponsoring Annadanam monthly"] },
  { id: "DEV-0002", name: "Lakshmi Devi", phone: "+91 87654 32109", email: "lakshmi@email.com", city: "Chennai", state: "Tamil Nadu", country: "India", gothram: "Kashyapa", nakshatra: "Ashwini", preferredDeity: "Goddess Lakshmi", preferredShrine: "Padmavathi Shrine", totalDonations: 85000, totalSevas: 42, totalDarshans: 62, lastVisit: "2026-02-08", isVolunteer: true, tags: ["VIP", "Donor", "Festival Participant"], smsAllowed: true, whatsappAllowed: true, emailAllowed: false, festivalNotifications: true, engagementLevel: "Highly Active", bookings: [{ id: "BK-0002", offering: "Archana", type: "Ritual", date: "2026-02-08", status: "Completed", amount: 100 }], donations: [{ date: "2026-01-28", amount: 15000, structure: "Padmavathi Shrine", purpose: "Flower Donation" }], volunteerData: { skills: ["Cooking", "Admin"], events: 12, hours: 96, availability: "Weekends" }, notes: ["Very dedicated volunteer", "Leads Annadanam team on weekends"] },
  { id: "DEV-0003", name: "Suresh Reddy", phone: "+91 76543 21098", email: "suresh@email.com", city: "Hyderabad", state: "Telangana", country: "India", gothram: "Vasishta", nakshatra: "Pushya", preferredDeity: "Lord Shiva", preferredShrine: "Main Temple", totalDonations: 65000, totalSevas: 18, totalDarshans: 35, lastVisit: "2026-02-01", isVolunteer: false, tags: ["Regular Devotee", "Donor"], smsAllowed: true, whatsappAllowed: false, emailAllowed: true, festivalNotifications: true, engagementLevel: "Active", bookings: [{ id: "BK-0003", offering: "Abhishekam", type: "Ritual", date: "2026-02-01", status: "Completed", amount: 2000 }], donations: [{ date: "2026-02-01", amount: 10000, structure: "Main Temple", purpose: "General" }], notes: [] },
  { id: "DEV-0004", name: "Priya Sharma", phone: "+91 65432 10987", email: "priya@email.com", city: "Mumbai", state: "Maharashtra", country: "India", gothram: "Atri", nakshatra: "Swati", preferredDeity: "Lord Krishna", preferredShrine: "Varadaraja Shrine", totalDonations: 52000, totalSevas: 12, totalDarshans: 29, lastVisit: "2026-01-15", isVolunteer: false, tags: ["Regular Devotee"], smsAllowed: false, whatsappAllowed: true, emailAllowed: true, festivalNotifications: false, engagementLevel: "Occasional", bookings: [{ id: "BK-0004", offering: "Morning Darshan", type: "Darshan", date: "2026-01-15", status: "Completed", amount: 0 }], donations: [{ date: "2026-01-15", amount: 5000, structure: "Varadaraja Shrine", purpose: "Seva Sponsorship" }], notes: [] },
  { id: "DEV-0005", name: "Anand Verma", phone: "+91 54321 09876", email: "", city: "Pune", state: "Maharashtra", country: "India", gothram: "Bharadwaja", nakshatra: "Mrigashira", preferredDeity: "Lord Venkateswara", preferredShrine: "Main Temple", totalDonations: 48000, totalSevas: 22, totalDarshans: 41, lastVisit: "2026-02-08", isVolunteer: true, tags: ["Donor", "Festival Participant"], smsAllowed: true, whatsappAllowed: true, emailAllowed: false, festivalNotifications: true, engagementLevel: "Active", bookings: [{ id: "BK-0005", offering: "VIP Darshan", type: "Darshan", date: "2026-02-08", status: "Confirmed", amount: 600 }], donations: [{ date: "2026-02-08", amount: 20000, structure: "Main Temple", purpose: "Festival Contribution" }], volunteerData: { skills: ["Crowd Control", "Ritual Support"], events: 8, hours: 64, availability: "Festival Only" }, notes: ["Helps during major festivals"] },
  { id: "DEV-0006", name: "Meena Iyer", phone: "+91 43210 98765", email: "meena@email.com", city: "Bangalore", state: "Karnataka", country: "India", gothram: "Atri", nakshatra: "Uttara Phalguni", preferredDeity: "Goddess Saraswati", preferredShrine: "Main Temple", totalDonations: 32000, totalSevas: 45, totalDarshans: 86, lastVisit: "2026-02-09", isVolunteer: false, tags: ["Regular Devotee", "Festival Participant"], smsAllowed: true, whatsappAllowed: true, emailAllowed: true, festivalNotifications: true, engagementLevel: "Highly Active", bookings: [{ id: "BK-0006", offering: "Sahasranama", type: "Ritual", date: "2026-02-09", status: "Pending Payment", amount: 1500 }], donations: [{ date: "2026-01-20", amount: 8000, structure: "Main Temple", purpose: "Education Fund" }], notes: [] },
  { id: "DEV-0007", name: "Vijay Nair", phone: "+91 32109 87654", email: "vijay@email.com", city: "Kochi", state: "Kerala", country: "India", gothram: "Vasishta", nakshatra: "Revati", preferredDeity: "Lord Venkateswara", preferredShrine: "Main Temple", totalDonations: 18000, totalSevas: 38, totalDarshans: 72, lastVisit: "2026-02-08", isVolunteer: true, tags: ["Regular Devotee"], smsAllowed: true, whatsappAllowed: true, emailAllowed: true, festivalNotifications: true, engagementLevel: "Highly Active", bookings: [{ id: "BK-0007", offering: "Evening Darshan", type: "Darshan", date: "2026-02-08", status: "Confirmed", amount: 0 }], donations: [{ date: "2026-01-05", amount: 5000, structure: "Main Temple", purpose: "General" }], volunteerData: { skills: ["Admin", "Crowd Control"], events: 15, hours: 120, availability: "Weekdays" }, notes: ["Very reliable volunteer, always on time"] },
  { id: "DEV-0008", name: "Kavita Rao", phone: "+91 21098 76543", email: "kavita@email.com", city: "Mysore", state: "Karnataka", country: "India", gothram: "Kashyapa", nakshatra: "Chitra", preferredDeity: "Lord Ganesha", preferredShrine: "Main Temple", totalDonations: 12000, totalSevas: 31, totalDarshans: 55, lastVisit: "2026-02-07", isVolunteer: false, tags: ["Regular Devotee"], smsAllowed: true, whatsappAllowed: false, emailAllowed: true, festivalNotifications: true, engagementLevel: "Active", bookings: [], donations: [{ date: "2026-02-07", amount: 3000, structure: "Main Temple", purpose: "Annadanam" }], notes: [] },
];

const levelColor = (level: string) => {
  if (level === "Highly Active") return "text-green-700 border-green-300 bg-green-50";
  if (level === "Active") return "text-blue-700 border-blue-300 bg-blue-50";
  if (level === "Occasional") return "text-amber-700 border-amber-300 bg-amber-50";
  return "text-muted-foreground border-border bg-muted";
};

const ITEMS_PER_PAGE = 6;

const DevoteesList = () => {
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [filterActivity, setFilterActivity] = useState("all");
  const [filterVolunteer, setFilterVolunteer] = useState("all");
  const [viewing, setViewing] = useState<Devotee | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = devotees.filter(d => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.phone.includes(search) && !d.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterTag !== "all" && !d.tags.includes(filterTag)) return false;
    if (filterActivity !== "all" && d.engagementLevel !== filterActivity) return false;
    if (filterVolunteer === "yes" && !d.isVolunteer) return false;
    if (filterVolunteer === "no" && d.isVolunteer) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleExport = () => {
    const csv = ["Devotee ID,Name,Phone,City,Total Donations,Total Sevas,Last Visit,Volunteer,Tags,Engagement", ...filtered.map(d => `${d.id},${d.name},${d.phone},${d.city},${d.totalDonations},${d.totalSevas},${d.lastVisit},${d.isVolunteer},${d.tags.join(";")},${d.engagementLevel}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devotees-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Devotees exported");
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Devotees</h1>
            <p className="text-muted-foreground">Manage all devotee records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} className="gap-2"><Download className="h-4 w-4" />Export</Button>
            <Button onClick={() => setShowAdd(true)} className="gap-2"><Plus className="h-4 w-4" />Add Devotee</Button>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Devotees", value: devotees.length.toString(), icon: Users },
            { label: "VIP Devotees", value: devotees.filter(d => d.tags.includes("VIP")).length.toString(), icon: UserCheck },
            { label: "Total Donations", value: `₹${devotees.reduce((a, d) => a + d.totalDonations, 0).toLocaleString()}`, icon: IndianRupee },
            { label: "Avg Sevas/Devotee", value: Math.round(devotees.reduce((a, d) => a + d.totalSevas, 0) / devotees.length).toString(), icon: Heart },
          ].map((kpi, i) => (
            <Card key={i} className="group hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted group-hover:bg-primary group-hover:shadow-lg transition-all duration-200 mb-2">
                  <kpi.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                </div>
                <p className="text-xl font-bold">{kpi.value}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{kpi.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search name, phone, email..." className="pl-9" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <Select value={filterTag} onValueChange={v => { setFilterTag(v); setPage(1); }}>
            <SelectTrigger className="w-[140px] bg-background"><SelectValue placeholder="Tag" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Tags</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Donor">Donor</SelectItem>
              <SelectItem value="Regular Devotee">Regular</SelectItem>
              <SelectItem value="Festival Participant">Festival</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterActivity} onValueChange={v => { setFilterActivity(v); setPage(1); }}>
            <SelectTrigger className="w-[160px] bg-background"><SelectValue placeholder="Activity" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Highly Active">Highly Active</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Occasional">Occasional</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterVolunteer} onValueChange={v => { setFilterVolunteer(v); setPage(1); }}>
            <SelectTrigger className="w-[150px] bg-background"><SelectValue placeholder="Volunteer" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="yes">Volunteers</SelectItem>
              <SelectItem value="no">Non-Volunteers</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="ml-auto">{filtered.length} devotees</Badge>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Devotee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Donations</TableHead>
                  <TableHead className="text-center">Sevas</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Volunteer</TableHead>
                  <TableHead>Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map(d => (
                  <TableRow key={d.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setViewing(d)}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{d.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{d.name}</p>
                        <div className="flex gap-1 mt-0.5">{d.tags.map(t => <Badge key={t} variant="outline" className="text-[9px] px-1 py-0">{t}</Badge>)}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{d.phone}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{d.city}</TableCell>
                    <TableCell className="text-right font-medium text-sm">₹{d.totalDonations.toLocaleString()}</TableCell>
                    <TableCell className="text-center text-sm">{d.totalSevas}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{d.lastVisit}</TableCell>
                    <TableCell>{d.isVolunteer ? <Badge variant="default" className="text-[10px]">Yes</Badge> : <span className="text-xs text-muted-foreground">—</span>}</TableCell>
                    <TableCell><Badge variant="outline" className={`text-[10px] ${levelColor(d.engagementLevel)}`}>{d.engagementLevel}</Badge></TableCell>
                  </TableRow>
                ))}
                {paged.length === 0 && (
                  <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">No devotees match filters</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={() => setPage(i + 1)}>{i + 1}</Button>
              ))}
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Devotee Profile Dialog */}
      <Dialog open={!!viewing} onOpenChange={() => setViewing(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-background">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-lg">{viewing?.name}</DialogTitle>
                <DialogDescription>{viewing?.id} · {viewing?.phone} · {viewing?.city}</DialogDescription>
              </div>
              <div className="flex gap-1.5">
                {viewing?.tags.map(t => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
                <Badge variant="outline" className={`text-[10px] ${levelColor(viewing?.engagementLevel || "")}`}>{viewing?.engagementLevel}</Badge>
              </div>
            </div>
          </DialogHeader>
          <Tabs defaultValue="overview" className="mt-2">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              {[
                { value: "overview", icon: Users, label: "Overview" },
                { value: "bookings", icon: BookOpen, label: "Bookings" },
                { value: "donations", icon: IndianRupee, label: "Donations" },
                ...(viewing?.isVolunteer ? [{ value: "volunteer", icon: HandHelping, label: "Volunteer" }] : []),
                { value: "notes", icon: StickyNote, label: "Notes" },
              ].map(t => (
                <TabsTrigger key={t.value} value={t.value} className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent gap-1.5 text-sm">
                  <t.icon className="h-3.5 w-3.5" />{t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Full Name", viewing?.name],
                  ["Phone", viewing?.phone],
                  ["Email", viewing?.email || "—"],
                  ["City", `${viewing?.city}, ${viewing?.state}`],
                  ["Gothram", viewing?.gothram || "—"],
                  ["Nakshatra", viewing?.nakshatra || "—"],
                  ["Preferred Deity", viewing?.preferredDeity || "—"],
                  ["Preferred Shrine", viewing?.preferredShrine || "—"],
                ].map(([label, value]) => (
                  <div key={label as string} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">{label as string}</p>
                    <p className="font-medium text-sm">{String(value)}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-xl font-bold">₹{viewing?.totalDonations.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Total Donated</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-xl font-bold">{viewing?.totalSevas}</p>
                  <p className="text-[10px] text-muted-foreground">Sevas</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-xl font-bold">{viewing?.totalDarshans}</p>
                  <p className="text-[10px] text-muted-foreground">Darshans</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <p className="text-xl font-bold">{viewing?.lastVisit}</p>
                  <p className="text-[10px] text-muted-foreground">Last Visit</p>
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-xs text-muted-foreground mb-2">Communication Preferences</p>
                <div className="flex gap-3">
                  {[
                    ["SMS", viewing?.smsAllowed],
                    ["WhatsApp", viewing?.whatsappAllowed],
                    ["Email", viewing?.emailAllowed],
                    ["Festival", viewing?.festivalNotifications],
                  ].map(([label, enabled]) => (
                    <Badge key={label as string} variant={enabled ? "default" : "outline"} className="text-[10px]">{label as string}</Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bookings" className="mt-4">
              {viewing?.bookings && viewing.bookings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Offering</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewing.bookings.map(b => (
                      <TableRow key={b.id}>
                        <TableCell className="font-mono text-xs">{b.id}</TableCell>
                        <TableCell className="font-medium text-sm">{b.offering}</TableCell>
                        <TableCell><Badge variant={b.type === "Ritual" ? "default" : "secondary"} className="text-[10px]">{b.type}</Badge></TableCell>
                        <TableCell className="text-sm text-muted-foreground">{b.date}</TableCell>
                        <TableCell><Badge variant="outline" className="text-[10px]">{b.status}</Badge></TableCell>
                        <TableCell className="text-right font-medium text-sm">{b.amount > 0 ? `₹${b.amount}` : "Free"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No bookings found</div>
              )}
            </TabsContent>

            <TabsContent value="donations" className="mt-4">
              {viewing?.donations && viewing.donations.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Structure</TableHead>
                      <TableHead>Purpose</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {viewing.donations.map((d, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-sm text-muted-foreground">{d.date}</TableCell>
                        <TableCell className="text-right font-medium text-sm">₹{d.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-sm">{d.structure}</TableCell>
                        <TableCell className="text-sm">{d.purpose}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No donations found</div>
              )}
            </TabsContent>

            {viewing?.isVolunteer && (
              <TabsContent value="volunteer" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Skills</p>
                    <div className="flex gap-1 mt-1">{viewing.volunteerData?.skills.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Availability</p>
                    <p className="font-medium text-sm">{viewing.volunteerData?.availability}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="text-xl font-bold">{viewing.volunteerData?.events}</p>
                    <p className="text-[10px] text-muted-foreground">Events Participated</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="text-xl font-bold">{viewing.volunteerData?.hours}h</p>
                    <p className="text-[10px] text-muted-foreground">Total Hours Served</p>
                  </div>
                </div>
              </TabsContent>
            )}

            <TabsContent value="notes" className="mt-4">
              {viewing?.notes && viewing.notes.length > 0 ? (
                <div className="space-y-2">
                  {viewing.notes.map((n, i) => (
                    <div key={i} className="p-3 bg-muted/50 rounded-lg text-sm">{n}</div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No notes added</div>
              )}
              <Button variant="outline" size="sm" className="mt-3 gap-2"><Plus className="h-3.5 w-3.5" />Add Note</Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Add Devotee Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto bg-background">
          <DialogHeader>
            <DialogTitle>Add New Devotee</DialogTitle>
            <DialogDescription>Register a new devotee profile</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {/* Section A – Basic Details */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-primary">Basic Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><Label className="text-xs">Full Name</Label><Input placeholder="Enter full name" className="mt-1" /></div>
                <div><Label className="text-xs">Mobile Number *</Label><Input placeholder="+91 XXXXX XXXXX" className="mt-1" /></div>
                <div><Label className="text-xs">Email</Label><Input placeholder="email@example.com" className="mt-1" /></div>
                <div className="col-span-2"><Label className="text-xs">Address</Label><Input placeholder="Street address" className="mt-1" /></div>
                <div><Label className="text-xs">City</Label><Input placeholder="City" className="mt-1" /></div>
                <div><Label className="text-xs">State</Label><Input placeholder="State" className="mt-1" /></div>
                <div><Label className="text-xs">Country</Label><Input placeholder="India" className="mt-1" /></div>
              </div>
            </div>
            {/* Section B – Spiritual Details */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-primary">Spiritual Details (Optional)</h3>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs">Gothram</Label><Input placeholder="Gothram" className="mt-1" /></div>
                <div><Label className="text-xs">Nakshatra</Label><Input placeholder="Nakshatra" className="mt-1" /></div>
                <div><Label className="text-xs">Preferred Deity</Label><Input placeholder="e.g. Lord Venkateswara" className="mt-1" /></div>
                <div><Label className="text-xs">Preferred Shrine</Label>
                  <Select><SelectTrigger className="mt-1 bg-background"><SelectValue placeholder="Select shrine" /></SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="main">Main Temple</SelectItem>
                      <SelectItem value="padmavathi">Padmavathi Shrine</SelectItem>
                      <SelectItem value="varadaraja">Varadaraja Shrine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {/* Section C – Tags */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-primary">Tags</h3>
              <div className="flex flex-wrap gap-4">
                {["VIP", "Regular Devotee", "Donor", "Festival Participant"].map(tag => (
                  <div key={tag} className="flex items-center gap-2">
                    <Checkbox id={tag} />
                    <Label htmlFor={tag} className="text-sm">{tag}</Label>
                  </div>
                ))}
              </div>
            </div>
            {/* Section D – Communication Preferences */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-primary">Communication Preferences</h3>
              <div className="grid grid-cols-2 gap-4">
                {[["SMS Allowed", "sms"], ["WhatsApp Allowed", "wa"], ["Email Allowed", "email"], ["Festival Notifications", "festival"]].map(([label, id]) => (
                  <div key={id as string} className="flex items-center justify-between p-3 border rounded-lg">
                    <Label className="text-sm">{label as string}</Label>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={() => { setShowAdd(false); toast.success("Devotee added successfully"); }}>Add Devotee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DevoteesList;

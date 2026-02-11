import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Pencil, Eye, List, Clock, IndianRupee, Image as ImageIcon, History, LayoutGrid } from "lucide-react";
import { toast } from "sonner";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Offering {
  id: string;
  name: string;
  type: "Ritual" | "Darshan";
  category: string;
  structure: string;
  defaultTime: string;
  basePrice: number;
  price: number;
  capacity: number;
  status: "Active" | "Inactive" | "Draft";
  description: string;
  endTime: string;
  frequency: string;
  dateRange: string;
  maxPerDevotee: number;
  groupBooking: boolean;
  free: boolean;
  refundable: boolean;
  priestRequired: boolean;
  sankalpam: boolean;
  gothram: boolean;
  nakshatra: boolean;
  walkinTracking: boolean;
  vipEnabled: boolean;
  images: string[];
  createdAt: string;
}

const mockOfferings: Offering[] = [
  { id: "1", name: "Suprabhatam", type: "Ritual", category: "Daily Seva", structure: "Main Temple", defaultTime: "5:30 AM", basePrice: 500, price: 500, capacity: 50, status: "Active", description: "Morning awakening ceremony for the deity", endTime: "6:00 AM", frequency: "Daily", dateRange: "All Year", maxPerDevotee: 2, groupBooking: false, free: false, refundable: true, priestRequired: true, sankalpam: true, gothram: true, nakshatra: false, walkinTracking: false, vipEnabled: false, images: ["https://images.unsplash.com/photo-1600693577615-9f3a0f7a16ba?w=400", "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=400"], createdAt: "2024-01-15" },
  { id: "2", name: "Archana", type: "Ritual", category: "Daily Seva", structure: "Padmavathi Shrine", defaultTime: "7:00 AM", basePrice: 100, price: 200, capacity: 30, status: "Active", description: "Chanting of 108 names", endTime: "7:30 AM", frequency: "Daily", dateRange: "All Year", maxPerDevotee: 5, groupBooking: true, free: false, refundable: false, priestRequired: true, sankalpam: true, gothram: true, nakshatra: true, walkinTracking: false, vipEnabled: false, images: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400"], createdAt: "2024-01-10" },
  { id: "3", name: "Abhishekam", type: "Ritual", category: "Special Seva", structure: "Main Temple", defaultTime: "9:00 AM", basePrice: 2000, price: 2000, capacity: 25, status: "Active", description: "Sacred bathing ceremony with milk, honey, and holy water", endTime: "10:00 AM", frequency: "Daily", dateRange: "All Year", maxPerDevotee: 1, groupBooking: false, free: false, refundable: true, priestRequired: true, sankalpam: true, gothram: true, nakshatra: true, walkinTracking: false, vipEnabled: false, images: ["https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=400"], createdAt: "2024-01-12" },
  { id: "4", name: "Morning Darshan", type: "Darshan", category: "Regular", structure: "Main Temple", defaultTime: "6:00 AM", basePrice: 0, price: 0, capacity: 500, status: "Active", description: "General morning darshan", endTime: "10:00 AM", frequency: "Daily", dateRange: "All Year", maxPerDevotee: 10, groupBooking: true, free: true, refundable: false, priestRequired: false, sankalpam: false, gothram: false, nakshatra: false, walkinTracking: true, vipEnabled: true, images: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400"], createdAt: "2024-01-08" },
  { id: "5", name: "VIP Darshan", type: "Darshan", category: "VIP", structure: "Main Temple", defaultTime: "8:00 AM", basePrice: 300, price: 150, capacity: 100, status: "Active", description: "Priority darshan with shorter wait", endTime: "10:00 AM", frequency: "Daily", dateRange: "All Year", maxPerDevotee: 4, groupBooking: true, free: false, refundable: true, priestRequired: false, sankalpam: false, gothram: false, nakshatra: false, walkinTracking: false, vipEnabled: true, images: [], createdAt: "2024-01-09" },
  { id: "6", name: "Sahasranama", type: "Ritual", category: "Special Seva", structure: "Varadaraja Shrine", defaultTime: "11:00 AM", basePrice: 1500, price: 1500, capacity: 40, status: "Inactive", description: "Recitation of 1000 names", endTime: "12:00 PM", frequency: "Weekly", dateRange: "All Year", maxPerDevotee: 2, groupBooking: false, free: false, refundable: true, priestRequired: true, sankalpam: true, gothram: true, nakshatra: false, walkinTracking: false, vipEnabled: false, images: [], createdAt: "2024-02-01" },
  { id: "7", name: "Special Puja", type: "Ritual", category: "Special Seva", structure: "Main Temple", defaultTime: "10:00 AM", basePrice: 1000, price: 500, capacity: 20, status: "Active", description: "Special puja with 50% discount", endTime: "11:00 AM", frequency: "Daily", dateRange: "All Year", maxPerDevotee: 3, groupBooking: true, free: false, refundable: true, priestRequired: true, sankalpam: true, gothram: true, nakshatra: true, walkinTracking: false, vipEnabled: false, images: [], createdAt: "2024-02-05" },
];

const structureOptions = [
  { value: "Main Temple", label: "Main Temple" },
  { value: "Padmavathi Shrine", label: "↳ Padmavathi Shrine" },
  { value: "Varadaraja Shrine", label: "↳ Varadaraja Shrine" },
  { value: "Lakshmi Shrine", label: "↳ Lakshmi Shrine" },
  { value: "Samadhi Hall", label: "↳ Samadhi Hall" },
];

const categoryOptions = [
  { value: "Daily Seva", label: "Daily Seva" },
  { value: "Special Seva", label: "Special Seva" },
  { value: "Festival Seva", label: "Festival Seva" },
  { value: "Regular", label: "Regular" },
  { value: "VIP", label: "VIP" },
];

const frequencyOptions = [
  { value: "Daily", label: "Daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Annual", label: "Annual" },
  { value: "On Demand", label: "On Demand" },
];

const OfferingsList = () => {
  const [offerings, setOfferings] = useState<Offering[]>(mockOfferings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editing, setEditing] = useState<Offering | null>(null);
  const [viewing, setViewing] = useState<Offering | null>(null);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStructure, setFilterStructure] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddStructureOpen, setIsAddStructureOpen] = useState(false);

  const [form, setForm] = useState({
    name: "", type: "Ritual" as "Ritual" | "Darshan", category: "", structure: "", description: "",
    defaultTime: "", endTime: "", frequency: "Daily", dateRange: "",
    capacity: 50, maxPerDevotee: 2, groupBooking: false,
    free: false, basePrice: 0, price: 0,
    priestRequired: true, sankalpam: true, gothram: true, nakshatra: false,
    walkinTracking: false, vipEnabled: false,
  });

  const resetForm = () => {
    setForm({ name: "", type: "Ritual", category: "", structure: "", description: "", defaultTime: "", endTime: "", frequency: "Daily", dateRange: "", capacity: 50, maxPerDevotee: 2, groupBooking: false, free: false, basePrice: 0, price: 0, priestRequired: true, sankalpam: true, gothram: true, nakshatra: false, walkinTracking: false, vipEnabled: false });
    setEditing(null);
    setCustomFields([]);
  };

  const getDiscount = () => {
    if (!form.basePrice || form.basePrice === 0) return { amount: 0, percent: 0 };
    const diff = form.price - form.basePrice;
    const amount = Math.abs(diff);
    const percent = Math.round((amount / form.basePrice) * 100);
    return { amount, percent, isIncrease: diff > 0 };
  };

  const openModal = (o?: Offering) => {
    if (o) {
      setEditing(o);
      setForm({ name: o.name, type: o.type, category: o.category, structure: o.structure, description: o.description, defaultTime: o.defaultTime, endTime: o.endTime, frequency: o.frequency, dateRange: o.dateRange, capacity: o.capacity, maxPerDevotee: o.maxPerDevotee, groupBooking: o.groupBooking, free: o.free, basePrice: o.basePrice, price: o.price || o.basePrice, priestRequired: o.priestRequired, sankalpam: o.sankalpam, gothram: o.gothram, nakshatra: o.nakshatra, walkinTracking: o.walkinTracking, vipEnabled: o.vipEnabled });
    } else resetForm();
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setOfferings(offerings.map(o => o.id === editing.id ? { ...o, ...form } : o));
      toast.success("Offering updated");
    } else {
      setOfferings([...offerings, { id: Date.now().toString(), ...form, status: "Active", images: [], createdAt: new Date().toISOString().split("T")[0] }]);
      toast.success("Offering created");
    }
    setIsModalOpen(false);
    resetForm();
  };

  const filtered = offerings.filter(o => {
    if (searchQuery && !o.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterType !== "all" && o.type !== filterType) return false;
    if (filterStructure !== "all" && o.structure !== filterStructure) return false;
    if (filterStatus !== "all" && o.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Offerings List</h1>
            <p className="text-muted-foreground">Create and manage Rituals and Darshan definitions</p>
          </div>
          <div className="flex gap-2">
            <div className="flex border rounded-lg overflow-hidden">
              <Button variant={viewMode === "table" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("table")} className="rounded-none gap-1"><List className="h-4 w-4" /></Button>
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="rounded-none gap-1"><LayoutGrid className="h-4 w-4" /></Button>
            </div>
            <Button onClick={() => openModal()} className="gap-2"><Plus className="h-4 w-4" />Add Offering</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search offerings..." className="pl-9" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px] bg-background"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent className="bg-popover"><SelectItem value="all">All Types</SelectItem><SelectItem value="Ritual">Ritual</SelectItem><SelectItem value="Darshan">Darshan</SelectItem></SelectContent>
          </Select>
          <Select value={filterStructure} onValueChange={setFilterStructure}>
            <SelectTrigger className="w-[160px] bg-background"><SelectValue placeholder="Structure" /></SelectTrigger>
            <SelectContent className="bg-popover"><SelectItem value="all">All Structures</SelectItem>{structureOptions.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[130px] bg-background"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent className="bg-popover"><SelectItem value="all">All Status</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="Inactive">Inactive</SelectItem><SelectItem value="Draft">Draft</SelectItem></SelectContent>
          </Select>
        </div>

        {viewMode === "table" ? (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><List className="h-5 w-5 text-primary" /></div>
                <div><CardTitle>All Offerings</CardTitle><CardDescription>{filtered.length} offerings configured</CardDescription></div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">Image</TableHead>
                    <TableHead>Offering Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Structure</TableHead>
                    <TableHead>Default Time</TableHead>
                    <TableHead className="text-right">Base Price</TableHead>
                    <TableHead className="text-center">Capacity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(o => (
                    <TableRow key={o.id} className="cursor-pointer hover:bg-muted/50" onClick={() => { setViewing(o); setIsViewOpen(true); }}>
                      <TableCell>
                        {o.images.length > 0 ? (
                          <img src={o.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><ImageIcon className="h-4 w-4 text-muted-foreground" /></div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{o.name}</TableCell>
                      <TableCell><Badge variant={o.type === "Ritual" ? "default" : "secondary"}>{o.type}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-sm">{o.structure}</TableCell>
                      <TableCell className="text-sm">{o.defaultTime}</TableCell>
                      <TableCell className="text-right">{o.free ? "Free" : `₹${o.basePrice}`}</TableCell>
                      <TableCell className="text-center">{o.capacity}</TableCell>
                      <TableCell><Badge variant={o.status === "Active" ? "default" : "secondary"}>{o.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); setViewing(o); setIsViewOpen(true); }}><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={e => { e.stopPropagation(); openModal(o); }}><Pencil className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">No offerings found</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(o => (
              <Card key={o.id} className="cursor-pointer hover:shadow-md transition-all overflow-hidden group" onClick={() => { setViewing(o); setIsViewOpen(true); }}>
                <div className="relative h-40 bg-muted">
                  {o.images.length > 0 ? (
                    <img src={o.images[0]} alt={o.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><ImageIcon className="h-10 w-10 text-muted-foreground opacity-40" /></div>
                  )}
                  {o.images.length > 1 && (
                    <Badge variant="secondary" className="absolute bottom-2 right-2 text-[10px]">+{o.images.length - 1} photos</Badge>
                  )}
                  <div className="absolute top-2 left-2 flex gap-1">
                    <Badge variant={o.type === "Ritual" ? "default" : "secondary"}>{o.type}</Badge>
                    <Badge variant={o.status === "Active" ? "default" : "secondary"}>{o.status}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{o.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{o.structure} · {o.defaultTime}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{o.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{o.free ? "Free" : `₹${o.basePrice}`}</span>
                    <span className="text-xs text-muted-foreground">Cap: {o.capacity}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-3 text-center py-12 text-muted-foreground">No offerings found</div>
            )}
          </div>
        )}
      </motion.div>

      {/* View Detail Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-background">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg"><List className="h-5 w-5 text-primary" /></div>
                <div>
                  <DialogTitle>{viewing?.name}</DialogTitle>
                  <DialogDescription>{viewing?.type} · {viewing?.structure}</DialogDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={viewing?.status === "Active" ? "default" : "secondary"}>{viewing?.status}</Badge>
                <Button size="sm" variant="outline" onClick={() => { setIsViewOpen(false); if (viewing) openModal(viewing); }}>Edit</Button>
              </div>
            </div>
          </DialogHeader>
          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              {["overview", "schedule", "pricing", "settings", "gallery", "history"].map(t => (
                <TabsTrigger key={t} value={t} className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent capitalize">{t}</TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview" className="mt-4 space-y-4">
              {viewing?.images && viewing.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {viewing.images.map((img, i) => (
                    <img key={i} src={img} alt={viewing.name} className={`w-full ${i === 0 && viewing.images.length === 1 ? "h-48 col-span-2" : "h-32"} object-cover rounded-lg`} />
                  ))}
                </div>
              )}
              <p className="text-sm text-muted-foreground">{viewing?.description}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Category</p><p className="font-medium">{viewing?.category}</p></div>
                <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Frequency</p><p className="font-medium">{viewing?.frequency}</p></div>
                <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Capacity</p><p className="font-medium">{viewing?.capacity}</p></div>
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Start Time</p><p className="font-medium">{viewing?.defaultTime}</p></div>
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">End Time</p><p className="font-medium">{viewing?.endTime}</p></div>
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Frequency</p><p className="font-medium">{viewing?.frequency}</p></div>
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Date Range</p><p className="font-medium">{viewing?.dateRange || "All Year"}</p></div>
              </div>
            </TabsContent>
            <TabsContent value="pricing" className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Price</p><p className="font-medium">{viewing?.free ? "Free" : `₹${viewing?.basePrice}`}</p></div>
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Refundable</p><p className="font-medium">{viewing?.refundable ? "Yes" : "No"}</p></div>
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Max per Devotee</p><p className="font-medium">{viewing?.maxPerDevotee}</p></div>
                <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Group Booking</p><p className="font-medium">{viewing?.groupBooking ? "Enabled" : "Disabled"}</p></div>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="mt-4 space-y-3">
              {viewing?.type === "Ritual" ? (
                <div className="grid grid-cols-2 gap-3">
                  {[["Priest Required", viewing.priestRequired], ["Sankalpam Required", viewing.sankalpam], ["Gothram Required", viewing.gothram], ["Nakshatra Required", viewing.nakshatra]].map(([l, v]) => (
                    <div key={l as string} className="p-4 border rounded-lg flex items-center justify-between"><p className="text-sm">{l as string}</p><Badge variant={(v as boolean) ? "default" : "secondary"}>{(v as boolean) ? "Yes" : "No"}</Badge></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 border rounded-lg flex items-center justify-between"><p className="text-sm">Walk-in Tracking</p><Badge variant={viewing?.walkinTracking ? "default" : "secondary"}>{viewing?.walkinTracking ? "Enabled" : "Disabled"}</Badge></div>
                  <div className="p-4 border rounded-lg flex items-center justify-between"><p className="text-sm">VIP Enabled</p><Badge variant={viewing?.vipEnabled ? "default" : "secondary"}>{viewing?.vipEnabled ? "Enabled" : "Disabled"}</Badge></div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="gallery" className="mt-4">
              {viewing?.images && viewing.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">{viewing.images.map((img, i) => <img key={i} src={img} alt="" className="w-full h-32 object-cover rounded-lg border" />)}</div>
              ) : (
                <div className="flex flex-col items-center py-8 text-muted-foreground"><ImageIcon className="h-12 w-12 mb-2 opacity-50" /><p>No images</p></div>
              )}
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <div className="p-4 border rounded-lg flex items-start gap-3"><History className="h-5 w-5 text-primary mt-0.5" /><div><p className="font-medium">Created</p><p className="text-sm text-muted-foreground">{viewing?.createdAt}</p></div></div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={() => { setIsModalOpen(false); resetForm(); }}>
        <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto bg-background">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Offering" : "Add Offering"}</DialogTitle>
            <DialogDescription>Configure ritual or darshan details</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Section A – Basic Details */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Basic Details</p>
              <div className="space-y-3">
                <div><Label>Offering Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Suprabhatam" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Offering Type</Label>
                    <Select value={form.type} onValueChange={v => setForm({ ...form, type: v as any })}>
                      <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-popover"><SelectItem value="Ritual">Ritual</SelectItem><SelectItem value="Darshan">Darshan</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <SearchableSelect options={categoryOptions} value={form.category} onValueChange={v => setForm({ ...form, category: v })} placeholder="Select category" onAddNew={() => setIsAddCategoryOpen(true)} addNewLabel="Add Category" />
                  </div>
                </div>
                <div>
                  <Label>Location (Structure)</Label>
                  <SearchableSelect options={structureOptions} value={form.structure} onValueChange={v => setForm({ ...form, structure: v })} placeholder="Select structure" onAddNew={() => setIsAddStructureOpen(true)} addNewLabel="Add Structure" />
                </div>
                <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe this offering" rows={2} /></div>
                <div>
                  <Label>Images</Label>
                  <p className="text-xs text-muted-foreground mb-2">Add multiple image URLs (one per line)</p>
                  <Textarea placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" rows={3} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Section B – Scheduling */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Scheduling</p>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Default Start Time</Label><Input type="time" value={form.defaultTime} onChange={e => setForm({ ...form, defaultTime: e.target.value })} /></div>
                <div><Label>Default End Time</Label><Input type="time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} /></div>
                <div>
                  <Label>Frequency</Label>
                  <SearchableSelect options={frequencyOptions} value={form.frequency} onValueChange={v => setForm({ ...form, frequency: v })} placeholder="Select frequency" />
                </div>
                <div><Label>Active Date Range</Label><Input value={form.dateRange} onChange={e => setForm({ ...form, dateRange: e.target.value })} placeholder="e.g. Jan – Dec" /></div>
              </div>
            </div>

            <Separator />

            {/* Section C – Capacity */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Capacity</p>
              <div className="grid grid-cols-3 gap-3">
                <div><Label>Default Capacity</Label><Input type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: +e.target.value })} /></div>
                <div><Label>Max per Devotee</Label><Input type="number" value={form.maxPerDevotee} onChange={e => setForm({ ...form, maxPerDevotee: +e.target.value })} /></div>
                <div className="flex items-end gap-2 pb-1"><Switch checked={form.groupBooking} onCheckedChange={v => setForm({ ...form, groupBooking: v })} /><Label>Group Booking</Label></div>
              </div>
            </div>

            <Separator />

            {/* Section D – Pricing */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Pricing</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2"><Switch checked={form.free} onCheckedChange={v => setForm({ ...form, free: v })} /><Label>Free</Label></div>
                {!form.free && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Base Price (₹)</Label><Input type="number" value={form.basePrice} onChange={e => setForm({ ...form, basePrice: +e.target.value })} /></div>
                      <div><Label>Price (₹)</Label><Input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} /></div>
                    </div>
                    {!form.free && form.basePrice > 0 && (
                      <div>
                        <Label>Discount</Label>
                        <Input
                          type="text"
                          value={
                            (() => {
                              const discount = getDiscount();
                              if (discount.amount === 0) return "No discount";
                              if (discount.isIncrease) {
                                return `₹${discount.amount} increase (${discount.percent}% increase)`;
                              }
                              return `₹${discount.amount} off (${discount.percent}% off)`;
                            })()
                          }
                          readOnly
                          className="bg-muted"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Section E – Type-Specific */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {form.type === "Ritual" ? "Ritual Settings" : "Darshan Settings"}
              </p>
              {form.type === "Ritual" ? (
                <div className="grid grid-cols-2 gap-3">
                  {[["Priest Required", "priestRequired"], ["Sankalpam Required", "sankalpam"], ["Gothram Required", "gothram"], ["Nakshatra Required", "nakshatra"]].map(([label, key]) => (
                    <div key={key} className="flex items-center gap-2 p-3 border rounded-lg">
                      <Switch checked={(form as any)[key]} onCheckedChange={v => setForm({ ...form, [key]: v })} />
                      <Label>{label}</Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 border rounded-lg"><Switch checked={form.walkinTracking} onCheckedChange={v => setForm({ ...form, walkinTracking: v })} /><Label>Walk-in Tracking</Label></div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg"><Switch checked={form.vipEnabled} onCheckedChange={v => setForm({ ...form, vipEnabled: v })} /><Label>VIP Enabled</Label></div>
                </div>
              )}
            </div>

            <Separator />
            <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsModalOpen(false); resetForm(); }}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Mini Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader><DialogTitle>Add Category</DialogTitle></DialogHeader>
          <Input placeholder="Category name" />
          <DialogFooter><Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>Cancel</Button><Button onClick={() => { setIsAddCategoryOpen(false); toast.success("Category added"); }}>Add</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Structure Mini Dialog */}
      <Dialog open={isAddStructureOpen} onOpenChange={setIsAddStructureOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader><DialogTitle>Add Structure</DialogTitle></DialogHeader>
          <Input placeholder="Structure name" />
          <DialogFooter><Button variant="outline" onClick={() => setIsAddStructureOpen(false)}>Cancel</Button><Button onClick={() => { setIsAddStructureOpen(false); toast.success("Structure added"); }}>Add</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OfferingsList;

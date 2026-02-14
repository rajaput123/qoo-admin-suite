import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Users, Heart, IndianRupee, Star, Phone, Mail, MapPin, FileDown, Calendar, Building2, Hash } from "lucide-react";
import { useDonations, useDonors } from "@/modules/donations/hooks";
import { createDonor } from "@/modules/donations/donationsStore";
import type { DonorCategory } from "@/modules/donations/types";
import SelectWithAddNew from "@/components/SelectWithAddNew";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

const formatCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val.toLocaleString()}`;
};

const categoryColor = (cat: string) => {
  switch (cat) {
    case "Patron": return "default";
    case "Trust": return "secondary";
    case "Regular": return "outline";
    default: return "outline" as const;
  }
};

const DonorRegistry = () => {
  const donors = useDonors();
  const donations = useDonations();
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<(typeof donors)[number] | null>(null);
  const [addForm, setAddForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    pan: "",
    category: "Regular" as DonorCategory,
  });
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>(["Patron", "Trust / Foundation", "Regular", "Organization", "Walk-in", "Anonymous"]);

  const filtered = donors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.donorId.toLowerCase().includes(search.toLowerCase()) ||
    d.city.toLowerCase().includes(search.toLowerCase()) ||
    d.phone.toLowerCase().includes(search.toLowerCase()) ||
    d.pan.toLowerCase().includes(search.toLowerCase())
  );

  const donorStats = new Map<string, { total: number; count: number; last: string }>();
  for (const don of donations) {
    const s = donorStats.get(don.donorId) ?? { total: 0, count: 0, last: "" };
    s.total += don.amount;
    s.count += 1;
    if (!s.last || don.date > s.last) s.last = don.date;
    donorStats.set(don.donorId, s);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Donor Registry</h1>
          <p className="text-sm text-muted-foreground mt-1">Central database of all donors with contribution history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><FileDown className="h-4 w-4 mr-1" /> Export</Button>
          <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-1" /> Add Donor</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">{donors.length}</p><p className="text-xs text-muted-foreground">Total Donors</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">3</p><p className="text-xs text-muted-foreground">Patrons</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">2</p><p className="text-xs text-muted-foreground">Trusts</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">₹2 Cr</p><p className="text-xs text-muted-foreground">Avg. Patron Donation</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, ID or city..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>City</TableHead>
                <TableHead>PAN</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(d => (
                <TableRow key={d.donorId} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedDonor(d)}>
                  <TableCell className="font-mono text-xs">{d.donorId}</TableCell>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="text-sm">{d.phone !== "-" ? d.phone : <span className="text-muted-foreground">—</span>}</TableCell>
                  <TableCell className="text-sm">{d.email !== "-" ? d.email : <span className="text-muted-foreground">—</span>}</TableCell>
                  <TableCell className="text-sm">{d.city !== "-" ? d.city : <span className="text-muted-foreground">—</span>}</TableCell>
                  <TableCell className="text-xs font-mono">{d.pan !== "-" ? d.pan : <span className="text-muted-foreground">—</span>}</TableCell>
                  <TableCell><Badge variant={categoryColor(d.category)} className="text-xs">{d.category}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Donor Detail Modal */}
      <Dialog open={!!selectedDonor} onOpenChange={() => setSelectedDonor(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedDonor?.name}</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">Donor ID: {selectedDonor?.donorId}</p>
          </DialogHeader>
          {selectedDonor && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-transparent">
                <TabsTrigger value="details" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Details</TabsTrigger>
                <TabsTrigger value="donations" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Donations</TabsTrigger>
                <TabsTrigger value="contact" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Contact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 mt-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Donor ID</p>
                      <p className="text-sm font-mono font-medium">{selectedDonor.donorId}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Category</p>
                      <p className="text-sm font-medium">{selectedDonor.category}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">PAN Number</p>
                      <p className="text-sm font-mono">{selectedDonor.pan !== "-" ? selectedDonor.pan : "—"}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">80G Eligible</p>
                      <p className="text-sm font-medium">{selectedDonor.eligible80G ? "Yes" : "No"}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Created At</p>
                      <p className="text-sm">{new Date(selectedDonor.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Donation Statistics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Total Donated</p>
                      <p className="text-2xl font-bold">{formatCurrency(donorStats.get(selectedDonor.donorId)?.total ?? 0)}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Donation Count</p>
                      <p className="text-2xl font-bold">{donorStats.get(selectedDonor.donorId)?.count ?? 0}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-xs text-muted-foreground mb-1">Last Donation</p>
                      <p className="text-sm font-medium">{donorStats.get(selectedDonor.donorId)?.last || "—"}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="donations" className="mt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Donation History</h3>
                    <Badge variant="secondary">{donorStats.get(selectedDonor.donorId)?.count ?? 0} donations</Badge>
                  </div>
                  {donorStats.get(selectedDonor.donorId)?.count ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Total Donated</span>
                        <span className="font-bold">{formatCurrency(donorStats.get(selectedDonor.donorId)?.total ?? 0)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Last Donation Date</span>
                        <span className="font-medium">{donorStats.get(selectedDonor.donorId)?.last || "—"}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">Full transaction history available in Reports & Governance.</p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      <Heart className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p>No donations recorded yet</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="mt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium">{selectedDonor.phone !== "-" ? selectedDonor.phone : "—"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{selectedDonor.email !== "-" ? selectedDonor.email : "—"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">City</p>
                        <p className="text-sm font-medium">{selectedDonor.city !== "-" ? selectedDonor.city : "—"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Donor Dialog */}
      <Dialog open={showAdd} onOpenChange={(open) => {
        setShowAdd(open);
        if (!open) {
          setAddForm({ name: "", phone: "", email: "", city: "", pan: "", category: "Regular" });
          setCustomFields([]);
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Donor</DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">Register a new donor in the system</p>
          </DialogHeader>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-transparent">
              <TabsTrigger value="basic" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Basic Info</TabsTrigger>
              <TabsTrigger value="custom" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Custom Fields</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 mt-6">
              <div>
                <Label className="text-xs">Full Name</Label>
                <Input placeholder="Donor name" value={addForm.name} onChange={e => setAddForm(p => ({ ...p, name: e.target.value }))} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Phone</Label>
                  <Input placeholder="+91 XXXXX XXXXX" value={addForm.phone} onChange={e => setAddForm(p => ({ ...p, phone: e.target.value }))} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Email</Label>
                  <Input type="email" placeholder="email@example.com" value={addForm.email} onChange={e => setAddForm(p => ({ ...p, email: e.target.value }))} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">City</Label>
                  <Input placeholder="City" value={addForm.city} onChange={e => setAddForm(p => ({ ...p, city: e.target.value }))} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs">PAN Number</Label>
                  <Input placeholder="ABCPA1234R" value={addForm.pan} onChange={e => setAddForm(p => ({ ...p, pan: e.target.value }))} className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="text-xs">Category</Label>
                <SelectWithAddNew
                  value={addForm.category}
                  onValueChange={(v) => setAddForm(p => ({ ...p, category: v as DonorCategory }))}
                  placeholder="Select category"
                  options={categoryOptions}
                  onAddNew={(v) => {
                    setCategoryOptions(p => [...p, v]);
                    setAddForm(prev => ({ ...prev, category: v as DonorCategory }));
                  }}
                  className="mt-1 bg-background"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="mt-6">
              <CustomFieldsSection
                fields={customFields}
                onFieldsChange={setCustomFields}
                editable={true}
              />
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => {
              setShowAdd(false);
              setAddForm({ name: "", phone: "", email: "", city: "", pan: "", category: "Regular" });
              setCustomFields([]);
            }}>Cancel</Button>
            <Button
              onClick={() => {
                if (!addForm.name.trim()) return;
                createDonor({
                  name: addForm.name.trim(),
                  phone: addForm.phone.trim() || "-",
                  email: addForm.email.trim() || "-",
                  city: addForm.city.trim() || "-",
                  pan: addForm.pan.trim() || "-",
                  category: addForm.category,
                  eligible80G: addForm.pan.trim().length >= 10,
                });
                setShowAdd(false);
                setAddForm({ name: "", phone: "", email: "", city: "", pan: "", category: "Regular" });
                setCustomFields([]);
              }}
            >
              Add Donor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonorRegistry;

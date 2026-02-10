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
import { Search, Plus, Users, Heart, IndianRupee, Star, Phone, Mail, MapPin, FileDown } from "lucide-react";

const donors = [
  { id: "DNR-001", name: "Sri Ramesh Agarwal", phone: "+91 98765 43210", email: "ramesh@email.com", city: "Hyderabad", totalDonations: 2500000, donationCount: 8, lastDonation: "2025-02-10", category: "Patron", pan: "ABCPA1234R", eligible80G: true },
  { id: "DNR-002", name: "Smt. Padma Foundation", phone: "+91 87654 32109", email: "info@padma.org", city: "Chennai", totalDonations: 10000000, donationCount: 3, lastDonation: "2025-01-28", category: "Trust", pan: "AAATA5678B", eligible80G: true },
  { id: "DNR-003", name: "Sri Venkatesh Trust", phone: "+91 76543 21098", email: "trust@venkatesh.org", city: "Tirupati", totalDonations: 5000000, donationCount: 12, lastDonation: "2025-02-05", category: "Trust", pan: "BBBTV9012C", eligible80G: true },
  { id: "DNR-004", name: "Karthik Reddy", phone: "+91 65432 10987", email: "karthik@email.com", city: "Bangalore", totalDonations: 350000, donationCount: 5, lastDonation: "2025-01-15", category: "Regular", pan: "CCCPK3456D", eligible80G: true },
  { id: "DNR-005", name: "Village Dev Committee", phone: "+91 54321 09876", email: "-", city: "Anantapur", totalDonations: 800000, donationCount: 4, lastDonation: "2025-02-01", category: "Organization", pan: "DDDPV7890E", eligible80G: false },
  { id: "DNR-006", name: "Anonymous Devotee", phone: "-", email: "-", city: "-", totalDonations: 150000, donationCount: 15, lastDonation: "2025-02-09", category: "Walk-in", pan: "-", eligible80G: false },
  { id: "DNR-007", name: "Lakshmi Narasimha Bhakta Mandali", phone: "+91 43210 98765", email: "lnbm@email.com", city: "Vijayawada", totalDonations: 1200000, donationCount: 6, lastDonation: "2025-01-20", category: "Patron", pan: "EEEPN1234F", eligible80G: true },
];

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
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<typeof donors[0] | null>(null);

  const filtered = donors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase()) || d.city.toLowerCase().includes(search.toLowerCase())
  );

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
                <TableHead>City</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Total Donated</TableHead>
                <TableHead className="text-right">Count</TableHead>
                <TableHead>Last Donation</TableHead>
                <TableHead>80G</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(d => (
                <TableRow key={d.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedDonor(d)}>
                  <TableCell className="font-mono text-xs">{d.id}</TableCell>
                  <TableCell className="font-medium">{d.name}</TableCell>
                  <TableCell className="text-sm">{d.city}</TableCell>
                  <TableCell><Badge variant={categoryColor(d.category)} className="text-xs">{d.category}</Badge></TableCell>
                  <TableCell className="text-right font-mono font-medium">{formatCurrency(d.totalDonations)}</TableCell>
                  <TableCell className="text-right">{d.donationCount}</TableCell>
                  <TableCell className="text-xs">{d.lastDonation}</TableCell>
                  <TableCell>{d.eligible80G ? <Badge variant="default" className="text-[10px]">Eligible</Badge> : <span className="text-xs text-muted-foreground">N/A</span>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Donor Detail Modal */}
      <Dialog open={!!selectedDonor} onOpenChange={() => setSelectedDonor(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{selectedDonor?.name}</DialogTitle></DialogHeader>
          {selectedDonor && (
            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
                <TabsTrigger value="contact" className="flex-1">Contact</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Total Donated</p>
                    <p className="text-xl font-bold">{formatCurrency(selectedDonor.totalDonations)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Donation Count</p>
                    <p className="text-xl font-bold">{selectedDonor.donationCount}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="text-sm font-medium">{selectedDonor.category}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">PAN</p>
                    <p className="text-sm font-mono">{selectedDonor.pan}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b"><span>Last Donation</span><span className="font-medium">{selectedDonor.lastDonation}</span></div>
                  <div className="flex justify-between py-2 border-b"><span>80G Eligible</span><span>{selectedDonor.eligible80G ? "Yes" : "No"}</span></div>
                  <p className="text-xs text-muted-foreground mt-3">Full transaction history available in Reports & Governance.</p>
                </div>
              </TabsContent>
              <TabsContent value="contact" className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" />{selectedDonor.phone}</div>
                <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" />{selectedDonor.email}</div>
                <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" />{selectedDonor.city}</div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Donor Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add New Donor</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div><Label>Full Name</Label><Input placeholder="Donor name" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Phone</Label><Input placeholder="+91 XXXXX XXXXX" /></div>
              <div><Label>Email</Label><Input type="email" placeholder="email@example.com" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>City</Label><Input placeholder="City" /></div>
              <div><Label>PAN Number</Label><Input placeholder="ABCPA1234R" /></div>
            </div>
            <div><Label>Category</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="patron">Patron</SelectItem>
                  <SelectItem value="trust">Trust / Foundation</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="walkin">Walk-in</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={() => setShowAdd(false)}>Add Donor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonorRegistry;

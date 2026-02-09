import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Star, Phone, Mail, MapPin, Building, IndianRupee, FileText, Truck, Clock } from "lucide-react";

const suppliers = [
  { id: "SUP-001", name: "Sri Lakshmi Flowers", category: "Flowers", contactPerson: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@srilakshmi.com", city: "Tirupati", status: "Active", rating: 4.8, gst: "37AABCU9603R1ZM", pan: "AABCU9603R", businessType: "Proprietorship", yearsInBusiness: 12, totalOrders: 24, totalSpend: 185000, lastOrder: "2026-02-06", address: "12, Flower Market, Tirupati", state: "Andhra Pradesh", bankName: "SBI", accountNumber: "****6789", ifsc: "SBIN0001234" },
  { id: "SUP-002", name: "Annapurna Grocery", category: "Grocery", contactPerson: "Lakshmi Devi", phone: "+91 87654 32109", email: "lakshmi@annapurna.com", city: "Tirumala", status: "Active", rating: 4.5, gst: "37BBCD1234R5ZN", pan: "BBCD1234R5", businessType: "Company", yearsInBusiness: 8, totalOrders: 18, totalSpend: 142000, lastOrder: "2026-02-04", address: "45, Main Road, Tirumala", state: "Andhra Pradesh", bankName: "HDFC", accountNumber: "****1234", ifsc: "HDFC0005678" },
  { id: "SUP-003", name: "Shiva Pooja Stores", category: "Pooja Materials", contactPerson: "Venkat Rao", phone: "+91 76543 21098", email: "venkat@shivapooja.com", city: "Tirupati", status: "Active", rating: 4.7, gst: "37CCDE2345R6ZO", pan: "CCDE2345R6", businessType: "Proprietorship", yearsInBusiness: 15, totalOrders: 15, totalSpend: 98000, lastOrder: "2026-02-07", address: "78, Bazaar St, Tirupati", state: "Andhra Pradesh", bankName: "ICICI", accountNumber: "****5678", ifsc: "ICIC0009012" },
  { id: "SUP-004", name: "Nandi Oil & Ghee", category: "Oil & Ghee", contactPerson: "Suresh Reddy", phone: "+91 65432 10987", email: "suresh@nandioil.com", city: "Chittoor", status: "Active", rating: 4.3, gst: "37DDEF3456R7ZP", pan: "DDEF3456R7", businessType: "Company", yearsInBusiness: 20, totalOrders: 12, totalSpend: 76000, lastOrder: "2026-01-28", address: "22, Industrial Area, Chittoor", state: "Andhra Pradesh", bankName: "Canara", accountNumber: "****9012", ifsc: "CNRB0003456" },
  { id: "SUP-005", name: "Devi Decorations", category: "Decoration", contactPerson: "Priya Sharma", phone: "+91 54321 09876", email: "priya@devideco.com", city: "Tirupati", status: "Active", rating: 4.6, gst: "37EEFG4567R8ZQ", pan: "EEFG4567R8", businessType: "Proprietorship", yearsInBusiness: 6, totalOrders: 8, totalSpend: 64000, lastOrder: "2026-02-01", address: "56, MG Road, Tirupati", state: "Andhra Pradesh", bankName: "Axis", accountNumber: "****3456", ifsc: "UTIB0007890" },
  { id: "SUP-006", name: "Ravi Electricals", category: "Electrical", contactPerson: "Ravi Shankar", phone: "+91 43210 98765", email: "ravi@ravielectricals.com", city: "Tirupati", status: "Inactive", rating: 3.8, gst: "37FFGH5678R9ZR", pan: "FFGH5678R9", businessType: "Individual", yearsInBusiness: 4, totalOrders: 5, totalSpend: 32000, lastOrder: "2025-11-15", address: "89, Tech Lane, Tirupati", state: "Andhra Pradesh", bankName: "PNB", accountNumber: "****7890", ifsc: "PUNB0001234" },
  { id: "SUP-007", name: "Surya Milk Dairy", category: "Milk & Dairy", contactPerson: "Ganesh Pillai", phone: "+91 32109 87654", email: "ganesh@suryadairy.com", city: "Chandragiri", status: "Active", rating: 4.4, gst: "37GGHI6789R0ZS", pan: "GGHI6789R0", businessType: "Company", yearsInBusiness: 10, totalOrders: 30, totalSpend: 55000, lastOrder: "2026-02-09", address: "10, Dairy Rd, Chandragiri", state: "Andhra Pradesh", bankName: "Indian Bank", accountNumber: "****2345", ifsc: "IDIB0005678" },
  { id: "SUP-008", name: "Balaji Print Works", category: "Printing", contactPerson: "Karthik S", phone: "+91 21098 76543", email: "karthik@balajiprint.com", city: "Tirupati", status: "Blacklisted", rating: 2.1, gst: "37HHIJ7890R1ZT", pan: "HHIJ7890R1", businessType: "Proprietorship", yearsInBusiness: 3, totalOrders: 4, totalSpend: 18000, lastOrder: "2025-08-20", address: "33, Print Lane, Tirupati", state: "Andhra Pradesh", bankName: "BOB", accountNumber: "****6789", ifsc: "BARB0009012" },
];

const statusColor = (status: string) => {
  if (status === "Active") return "text-green-700 border-green-300 bg-green-50";
  if (status === "Inactive") return "text-amber-700 border-amber-300 bg-amber-50";
  if (status === "Blacklisted") return "text-red-700 border-red-300 bg-red-50";
  return "text-muted-foreground border-border bg-muted";
};

const Registry = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<typeof suppliers[0] | null>(null);

  const filtered = suppliers.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()) || s.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Supplier Registry</h1>
            <p className="text-muted-foreground">Master list of all approved suppliers</p>
          </div>
          <Button size="sm"><Download className="h-4 w-4 mr-2" />Export</Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search suppliers..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]"><Filter className="h-4 w-4 mr-2" /><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Blacklisted">Blacklisted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(s => (
                  <TableRow key={s.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelected(s)}>
                    <TableCell className="font-mono text-xs">{s.id}</TableCell>
                    <TableCell className="font-medium text-sm">{s.name}</TableCell>
                    <TableCell className="text-sm">{s.category}</TableCell>
                    <TableCell>
                      <p className="text-sm">{s.contactPerson}</p>
                      <p className="text-xs text-muted-foreground">{s.phone}</p>
                    </TableCell>
                    <TableCell className="text-sm">{s.city}</TableCell>
                    <TableCell><Badge variant="outline" className={`text-[10px] ${statusColor(s.status)}`}>{s.status}</Badge></TableCell>
                    <TableCell className="text-center"><Badge variant="outline" className="text-xs">⭐ {s.rating}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {selected.name}
                  <Badge variant="outline" className={`text-xs ${statusColor(selected.status)}`}>{selected.status}</Badge>
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="overview">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="financial">Financial</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm"><Building className="h-4 w-4 text-muted-foreground" /><span>{selected.businessType}</span></div>
                    <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" /><span>{selected.phone}</span></div>
                    <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground" /><span>{selected.email}</span></div>
                    <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /><span>{selected.city}, {selected.state}</span></div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm"><strong>Address:</strong> {selected.address}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Category</p><p className="font-medium text-sm">{selected.category}</p></div>
                    <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Rating</p><p className="font-medium text-sm">⭐ {selected.rating} / 5.0</p></div>
                  </div>
                </TabsContent>
                <TabsContent value="business" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">GST Number</p><p className="font-medium text-sm font-mono">{selected.gst}</p></div>
                    <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">PAN Number</p><p className="font-medium text-sm font-mono">{selected.pan}</p></div>
                    <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Years in Business</p><p className="font-medium text-sm">{selected.yearsInBusiness} years</p></div>
                    <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Contact Person</p><p className="font-medium text-sm">{selected.contactPerson}</p></div>
                  </div>
                </TabsContent>
                <TabsContent value="financial" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Bank</p><p className="font-medium text-sm">{selected.bankName}</p></div>
                    <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Account</p><p className="font-medium text-sm font-mono">{selected.accountNumber}</p></div>
                    <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">IFSC</p><p className="font-medium text-sm font-mono">{selected.ifsc}</p></div>
                    <div className="p-3 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Total Spend</p><p className="font-medium text-sm">₹{selected.totalSpend.toLocaleString()}</p></div>
                  </div>
                </TabsContent>
                <TabsContent value="orders" className="space-y-4 mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg text-center"><p className="text-xs text-muted-foreground">Total Orders</p><p className="text-xl font-bold">{selected.totalOrders}</p></div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center"><p className="text-xs text-muted-foreground">Total Spend</p><p className="text-xl font-bold">₹{selected.totalSpend.toLocaleString()}</p></div>
                    <div className="p-3 bg-muted/50 rounded-lg text-center"><p className="text-xs text-muted-foreground">Last Order</p><p className="text-xl font-bold">{selected.lastOrder}</p></div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Registry;

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectWithAddNew from "@/components/SelectWithAddNew";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";
import { stockItems, StockItem, itemCategories, itemUnits, storageLocations, templeStructures } from "@/data/inventoryData";

const statusColor: Record<string, string> = {
  "In Stock": "bg-green-50 text-green-700 border-green-200",
  "Low Stock": "bg-amber-50 text-amber-700 border-amber-200",
  "Out of Stock": "bg-red-50 text-red-700 border-red-200",
};

const typeColor: Record<string, string> = {
  "Consumable": "bg-blue-50 text-blue-700 border-blue-200",
  "Perishable": "bg-orange-50 text-orange-700 border-orange-200",
  "Asset": "bg-purple-50 text-purple-700 border-purple-200",
  "Donation Item": "bg-pink-50 text-pink-700 border-pink-200",
};

const Items = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [detailItem, setDetailItem] = useState<StockItem | null>(null);
  const [categories, setCategories] = useState(itemCategories);
  const [units, setUnits] = useState(itemUnits);
  const [locations, setLocations] = useState(storageLocations);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  // Form state
  const [form, setForm] = useState({
    name: "", code: "", itemType: "Consumable" as StockItem["itemType"],
    category: "", unit: "", defaultStructure: "", reorderLevel: "",
    minimumLevel: "", storageLocation: "", ritualUse: false, expiryApplicable: false,
    batchNumber: "", expiryDate: "", serialNumber: "", condition: "Good",
    assignedLocation: "", pricePerUnit: "", supplier: "",
  });

  const filtered = stockItems.filter(i => {
    const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.code.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || i.itemType === typeFilter;
    const matchCat = categoryFilter === "all" || i.category === categoryFilter;
    return matchSearch && matchType && matchCat;
  });

  const uniqueCategories = [...new Set(stockItems.map(i => i.category))];

  const openAdd = () => {
    setForm({ name: "", code: "", itemType: "Consumable", category: "", unit: "", defaultStructure: "", reorderLevel: "", minimumLevel: "", storageLocation: "", ritualUse: false, expiryApplicable: false, batchNumber: "", expiryDate: "", serialNumber: "", condition: "Good", assignedLocation: "", pricePerUnit: "", supplier: "" });
    setCustomFields([]);
    setShowModal(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Items</h1>
          <p className="text-muted-foreground text-sm">Master data for all physical materials & assets</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1.5" />Import</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" />Export</Button>
          <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-1.5" />Add Item</Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search items..." className="pl-9 h-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40 h-9 bg-background"><SelectValue placeholder="Item Type" /></SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Consumable">Consumable</SelectItem>
            <SelectItem value="Perishable">Perishable</SelectItem>
            <SelectItem value="Asset">Asset</SelectItem>
            <SelectItem value="Donation Item">Donation Item</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-44 h-9 bg-background"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Categories</SelectItem>
            {uniqueCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Structure</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Reorder</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(item => (
              <TableRow key={item.id} className="cursor-pointer" onClick={() => setDetailItem(item)}>
                <TableCell>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.code}</p>
                </TableCell>
                <TableCell><Badge variant="outline" className={`text-xs ${typeColor[item.itemType]}`}>{item.itemType}</Badge></TableCell>
                <TableCell className="text-sm">{item.category}</TableCell>
                <TableCell className="text-sm">{item.defaultStructure}</TableCell>
                <TableCell className="text-right font-medium text-sm">{item.currentStock} {item.unit}</TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">{item.reorderLevel} {item.unit}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{item.storageLocation}</TableCell>
                <TableCell><Badge variant="outline" className={`text-xs ${statusColor[item.status]}`}>{item.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">Showing {filtered.length} of {stockItems.length} items</p>

      {/* Add Item Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add New Item</DialogTitle></DialogHeader>
          <Tabs defaultValue="basic">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="stock">Stock Settings</TabsTrigger>
              <TabsTrigger value="type">Type-Specific</TabsTrigger>
              <TabsTrigger value="custom">Custom Fields</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Item Name</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g., Rose Petals" /></div>
                <div><Label>Item Code</Label><Input value={form.code} onChange={e => setForm({...form, code: e.target.value})} placeholder="e.g., FLW-001" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Item Type</Label>
                  <Select value={form.itemType} onValueChange={v => setForm({...form, itemType: v as StockItem["itemType"]})}>
                    <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="Consumable">Consumable</SelectItem>
                      <SelectItem value="Perishable">Perishable</SelectItem>
                      <SelectItem value="Asset">Asset</SelectItem>
                      <SelectItem value="Donation Item">Donation Item</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <SelectWithAddNew value={form.category} onValueChange={v => setForm({...form, category: v})} options={categories} onAddNew={v => setCategories([...categories, v])} placeholder="Select category" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Unit</Label>
                  <SelectWithAddNew value={form.unit} onValueChange={v => setForm({...form, unit: v})} options={units} onAddNew={v => setUnits([...units, v])} placeholder="Select unit" />
                </div>
                <div>
                  <Label>Default Structure</Label>
                  <Select value={form.defaultStructure} onValueChange={v => setForm({...form, defaultStructure: v})}>
                    <SelectTrigger className="bg-background"><SelectValue placeholder="Select structure" /></SelectTrigger>
                    <SelectContent className="bg-popover">
                      {templeStructures.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Price Per Unit (₹)</Label><Input type="number" value={form.pricePerUnit} onChange={e => setForm({...form, pricePerUnit: e.target.value})} /></div>
                <div><Label>Supplier</Label><Input value={form.supplier} onChange={e => setForm({...form, supplier: e.target.value})} /></div>
              </div>
            </TabsContent>
            <TabsContent value="stock" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Reorder Level</Label><Input type="number" value={form.reorderLevel} onChange={e => setForm({...form, reorderLevel: e.target.value})} /></div>
                <div><Label>Minimum Level</Label><Input type="number" value={form.minimumLevel} onChange={e => setForm({...form, minimumLevel: e.target.value})} /></div>
              </div>
              <div>
                <Label>Storage Location</Label>
                <SelectWithAddNew value={form.storageLocation} onValueChange={v => setForm({...form, storageLocation: v})} options={locations} onAddNew={v => setLocations([...locations, v])} placeholder="Select location" />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={form.ritualUse} onCheckedChange={v => setForm({...form, ritualUse: v})} />
                  <Label>Ritual Use</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.expiryApplicable} onCheckedChange={v => setForm({...form, expiryApplicable: v})} />
                  <Label>Expiry Applicable</Label>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="type" className="space-y-4">
              {(form.itemType === "Perishable" || form.expiryApplicable) && (
                <div className="space-y-4 p-4 border rounded-lg bg-orange-50/30">
                  <p className="text-sm font-medium text-orange-700">Perishable Details</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Batch Number</Label><Input value={form.batchNumber} onChange={e => setForm({...form, batchNumber: e.target.value})} /></div>
                    <div><Label>Expiry Date</Label><Input type="date" value={form.expiryDate} onChange={e => setForm({...form, expiryDate: e.target.value})} /></div>
                  </div>
                </div>
              )}
              {form.itemType === "Asset" && (
                <div className="space-y-4 p-4 border rounded-lg bg-purple-50/30">
                  <p className="text-sm font-medium text-purple-700">Asset Details</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Serial Number</Label><Input value={form.serialNumber} onChange={e => setForm({...form, serialNumber: e.target.value})} /></div>
                    <div>
                      <Label>Condition</Label>
                      <Select value={form.condition} onValueChange={v => setForm({...form, condition: v})}>
                        <SelectTrigger className="bg-background"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-popover">
                          {["New", "Good", "Fair", "Poor", "Damaged"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div><Label>Assigned Location</Label><Input value={form.assignedLocation} onChange={e => setForm({...form, assignedLocation: e.target.value})} /></div>
                </div>
              )}
              {form.itemType !== "Asset" && form.itemType !== "Perishable" && !form.expiryApplicable && (
                <p className="text-sm text-muted-foreground py-8 text-center">No type-specific fields for {form.itemType}</p>
              )}
            </TabsContent>
            <TabsContent value="custom">
              <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={() => setShowModal(false)}>Save Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Item Detail Modal */}
      <Dialog open={!!detailItem} onOpenChange={() => setDetailItem(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {detailItem && (
            <>
              <DialogHeader>
                <DialogTitle>{detailItem.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge variant="outline" className={typeColor[detailItem.itemType]}>{detailItem.itemType}</Badge>
                  <Badge variant="outline" className={statusColor[detailItem.status]}>{detailItem.status}</Badge>
                  {detailItem.ritualUse && <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">🪔 Ritual Use</Badge>}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Code:</span> <span className="font-medium">{detailItem.code}</span></div>
                  <div><span className="text-muted-foreground">Category:</span> <span className="font-medium">{detailItem.category}</span></div>
                  <div><span className="text-muted-foreground">Unit:</span> <span className="font-medium">{detailItem.unit}</span></div>
                  <div><span className="text-muted-foreground">Current Stock:</span> <span className="font-medium">{detailItem.currentStock} {detailItem.unit}</span></div>
                  <div><span className="text-muted-foreground">Reorder Level:</span> <span className="font-medium">{detailItem.reorderLevel} {detailItem.unit}</span></div>
                  <div><span className="text-muted-foreground">Minimum Level:</span> <span className="font-medium">{detailItem.minimumLevel} {detailItem.unit}</span></div>
                  <div><span className="text-muted-foreground">Structure:</span> <span className="font-medium">{detailItem.defaultStructure}</span></div>
                  <div><span className="text-muted-foreground">Storage:</span> <span className="font-medium">{detailItem.storageLocation}</span></div>
                  <div><span className="text-muted-foreground">Price/Unit:</span> <span className="font-medium">₹{detailItem.pricePerUnit}</span></div>
                  <div><span className="text-muted-foreground">Supplier:</span> <span className="font-medium">{detailItem.supplier}</span></div>
                  <div><span className="text-muted-foreground">Last Restocked:</span> <span className="font-medium">{detailItem.lastRestocked}</span></div>
                  <div><span className="text-muted-foreground">Temple ID:</span> <span className="font-medium">{detailItem.templeId}</span></div>
                </div>
                {detailItem.batchNumber && (
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-sm">
                    <p className="font-medium text-orange-700 mb-1">Perishable Info</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div><span className="text-muted-foreground">Batch:</span> {detailItem.batchNumber}</div>
                      <div><span className="text-muted-foreground">Expiry:</span> {detailItem.expiryDate}</div>
                    </div>
                  </div>
                )}
                {detailItem.serialNumber && (
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-sm">
                    <p className="font-medium text-purple-700 mb-1">Asset Info</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div><span className="text-muted-foreground">Serial:</span> {detailItem.serialNumber}</div>
                      <div><span className="text-muted-foreground">Condition:</span> {detailItem.condition}</div>
                      <div><span className="text-muted-foreground">Location:</span> {detailItem.assignedLocation}</div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDetailItem(null)}>Close</Button>
                <Button>Edit Item</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Items;

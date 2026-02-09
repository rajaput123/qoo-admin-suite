import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle2, UtensilsCrossed, Boxes, Users, Shield, Plus } from "lucide-react";

const kitchenData = [
  { prasadam: "Laddu", qty: "50,000", annadanam: "-", batch: "BATCH-0312", stock: "Sufficient", alert: false },
  { prasadam: "Pulihora", qty: "30,000", annadanam: "-", batch: "BATCH-0313", stock: "Sufficient", alert: false },
  { prasadam: "Annadanam Meals", qty: "-", annadanam: "75,000", batch: "BATCH-0314", stock: "Low - Rice", alert: true },
  { prasadam: "Vada", qty: "20,000", annadanam: "-", batch: "BATCH-0315", stock: "Sufficient", alert: false },
];

const materialData = [
  { material: "Rice (25kg bags)", qty: "200", supplier: "Sri Lakshmi Traders", po: "PO-2025-112", status: "Ordered" },
  { material: "Ghee (15L cans)", qty: "50", supplier: "Nandini Dairy", po: "PO-2025-113", status: "Delivered" },
  { material: "Sugar (50kg bags)", qty: "80", supplier: "Sri Lakshmi Traders", po: "-", status: "Shortage" },
  { material: "Flowers - Marigold", qty: "500 garlands", supplier: "Temple Garden", po: "-", status: "Available" },
  { material: "Camphor (boxes)", qty: "100", supplier: "Pooja Stores Ltd", po: "PO-2025-114", status: "Ordered" },
];

const volunteerData = [
  { role: "Crowd Control", count: 120, shift: "6 AM – 2 PM", area: "Main Gate, Queue Lines" },
  { role: "Kitchen Assistants", count: 80, shift: "4 AM – 12 PM", area: "Main Kitchen, Annadanam Hall" },
  { role: "Ritual Support", count: 30, shift: "5 AM – 10 AM", area: "Main Temple, Shrines" },
  { role: "VIP Coordination", count: 15, shift: "8 AM – 6 PM", area: "VIP Entrance, Dharshan" },
  { role: "Medical Support", count: 10, shift: "6 AM – 10 PM", area: "First Aid Counters" },
];

const securityData = [
  { item: "Entry Gates Active", value: "8 / 10", status: "ok" },
  { item: "Barricade Sections", value: "24 segments", status: "ok" },
  { item: "Medical Teams", value: "4 teams", status: "ok" },
  { item: "Police Coordination", value: "Confirmed – SP Office", status: "ok" },
  { item: "Emergency Contacts", value: "12 registered", status: "ok" },
  { item: "Fire Safety", value: "2 engines standby", status: "warning" },
];

const ResourcePlanning = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resource Planning</h1>
          <p className="text-sm text-muted-foreground mt-1">Plan kitchen, inventory, volunteers, and logistics for the event</p>
        </div>
        <Select>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Select Event" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="evt-001">EVT-001 — Brahmotsavam 2025</SelectItem>
            <SelectItem value="evt-002">EVT-002 — Vaikuntha Ekadasi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Readiness Summary */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-green-200">
          <CardContent className="p-4 flex items-center gap-3">
            <UtensilsCrossed className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">Kitchen & Prasadam</p>
              <p className="text-xs text-amber-600">1 alert</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-200">
          <CardContent className="p-4 flex items-center gap-3">
            <Boxes className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm font-medium">Inventory</p>
              <p className="text-xs text-amber-600">1 shortage</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">Volunteers</p>
              <p className="text-xs text-green-600">All assigned</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium">Security & Logistics</p>
              <p className="text-xs text-green-600">Ready</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="kitchen" className="w-full">
        <TabsList>
          <TabsTrigger value="kitchen">Kitchen & Prasadam</TabsTrigger>
          <TabsTrigger value="inventory">Inventory & Materials</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="security">Security & Logistics</TabsTrigger>
        </TabsList>

        {/* Kitchen Tab */}
        <TabsContent value="kitchen">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Kitchen & Prasadam Plan</CardTitle>
                <Button size="sm"><Plus className="h-4 w-4 mr-2" />Add Item</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prasadam Type</TableHead>
                    <TableHead>Planned Qty</TableHead>
                    <TableHead>Annadanam Headcount</TableHead>
                    <TableHead>Linked Batch</TableHead>
                    <TableHead>Stock Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kitchenData.map((k, i) => (
                    <TableRow key={i} className={k.alert ? "bg-amber-50/50" : ""}>
                      <TableCell className="font-medium">{k.prasadam}</TableCell>
                      <TableCell>{k.qty}</TableCell>
                      <TableCell>{k.annadanam}</TableCell>
                      <TableCell className="font-mono text-xs">{k.batch}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs border-0 ${k.alert ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                          {k.alert && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {!k.alert && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {k.stock}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Inventory & Materials</CardTitle>
                <Button size="sm"><Plus className="h-4 w-4 mr-2" />Add Material</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>PO #</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materialData.map((m, i) => (
                    <TableRow key={i} className={m.status === "Shortage" ? "bg-red-50/50" : ""}>
                      <TableCell className="font-medium">{m.material}</TableCell>
                      <TableCell>{m.qty}</TableCell>
                      <TableCell className="text-sm">{m.supplier}</TableCell>
                      <TableCell className="font-mono text-xs">{m.po}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs border-0 ${
                          m.status === "Delivered" ? "bg-green-100 text-green-700" :
                          m.status === "Ordered" ? "bg-blue-100 text-blue-700" :
                          m.status === "Shortage" ? "bg-red-100 text-red-700" :
                          "bg-muted text-muted-foreground"
                        }`}>{m.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Volunteers Tab */}
        <TabsContent value="volunteers">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Volunteer Allocation</CardTitle>
                <Button size="sm"><Plus className="h-4 w-4 mr-2" />Add Role</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Shift Timing</TableHead>
                    <TableHead>Assigned Area</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {volunteerData.map((v, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{v.role}</TableCell>
                      <TableCell>{v.count}</TableCell>
                      <TableCell className="text-sm">{v.shift}</TableCell>
                      <TableCell className="text-sm">{v.area}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Security & Logistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {securityData.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="text-sm font-medium">{s.item}</p>
                      <p className="text-sm text-muted-foreground">{s.value}</p>
                    </div>
                    {s.status === "ok" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcePlanning;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Factory, Clock, AlertTriangle } from "lucide-react";

const batches = [
  { id: "BTH-2024-0891", prasadam: "Laddu Prasadam", date: "2024-12-15", time: "6:00 AM", qty: 5000, allocated: 3200, remaining: 1800, team: "Team A", expiry: "Today 6:00 PM", status: "Active" },
  { id: "BTH-2024-0890", prasadam: "Pulihora", date: "2024-12-15", time: "5:30 AM", qty: 3000, allocated: 2100, remaining: 900, team: "Team B", expiry: "Today 1:30 PM", status: "Active" },
  { id: "BTH-2024-0889", prasadam: "Sweet Pongal", date: "2024-12-15", time: "5:00 AM", qty: 2500, allocated: 1700, remaining: 800, team: "Team A", expiry: "Today 11:00 AM", status: "Expiring Soon" },
  { id: "BTH-2024-0888", prasadam: "Vada", date: "2024-12-15", time: "7:00 AM", qty: 4000, allocated: 1500, remaining: 2500, team: "Team C", expiry: "Today 3:00 PM", status: "Active" },
  { id: "BTH-2024-0887", prasadam: "Curd Rice", date: "2024-12-14", time: "5:00 PM", qty: 2000, allocated: 1800, remaining: 0, team: "Team B", expiry: "Today 5:00 AM", status: "Expired" },
  { id: "BTH-2024-0886", prasadam: "Laddu Prasadam", date: "2024-12-14", time: "6:00 AM", qty: 15000, allocated: 15000, remaining: 0, team: "Team A", expiry: "Yesterday 6:00 PM", status: "Closed" },
];

const batchIngredients = [
  { name: "Besan (Gram Flour)", required: "125 kg", consumed: "127 kg", variance: "+2 kg" },
  { name: "Sugar", required: "100 kg", consumed: "98 kg", variance: "-2 kg" },
  { name: "Ghee", required: "60 kg", consumed: "61 kg", variance: "+1 kg" },
  { name: "Cashew Nuts", required: "10 kg", consumed: "10 kg", variance: "0" },
];

const BatchProduction = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDetail, setShowDetail] = useState<typeof batches[0] | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filtered = batches.filter(b =>
    (statusFilter === "all" || b.status === statusFilter) &&
    (b.prasadam.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Batch Production</h2>
          <p className="text-sm text-muted-foreground mt-1">Every production creates a traceable batch</p>
        </div>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus className="h-4 w-4 mr-1" /> New Batch
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search batches..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Prasadam</TableHead>
                <TableHead>Date / Time</TableHead>
                <TableHead className="text-right">Produced</TableHead>
                <TableHead className="text-right">Allocated</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(b => (
                <TableRow key={b.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setShowDetail(b)}>
                  <TableCell className="font-mono text-xs">{b.id}</TableCell>
                  <TableCell className="font-medium">{b.prasadam}</TableCell>
                  <TableCell className="text-xs">{b.date} {b.time}</TableCell>
                  <TableCell className="text-right font-mono">{b.qty.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{b.allocated.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{b.remaining.toLocaleString()}</TableCell>
                  <TableCell className="text-xs">{b.expiry}</TableCell>
                  <TableCell>
                    <Badge variant={b.status === "Active" ? "default" : b.status === "Expired" ? "destructive" : b.status === "Expiring Soon" ? "secondary" : "outline"} className="text-xs">
                      {b.status === "Expiring Soon" && <Clock className="h-3 w-3 mr-1" />}
                      {b.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Batch Detail */}
      <Dialog open={!!showDetail} onOpenChange={() => setShowDetail(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-primary" />
              Batch {showDetail?.id}
            </DialogTitle>
          </DialogHeader>
          {showDetail && (
            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="ingredients" className="flex-1">Ingredients</TabsTrigger>
                <TabsTrigger value="allocation" className="flex-1">Allocation</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Prasadam:</span> {showDetail.prasadam}</div>
                  <div><span className="text-muted-foreground">Date:</span> {showDetail.date} {showDetail.time}</div>
                  <div><span className="text-muted-foreground">Produced:</span> {showDetail.qty.toLocaleString()}</div>
                  <div><span className="text-muted-foreground">Allocated:</span> {showDetail.allocated.toLocaleString()}</div>
                  <div><span className="text-muted-foreground">Remaining:</span> {showDetail.remaining.toLocaleString()}</div>
                  <div><span className="text-muted-foreground">Team:</span> {showDetail.team}</div>
                  <div><span className="text-muted-foreground">Expiry:</span> {showDetail.expiry}</div>
                  <div><span className="text-muted-foreground">Status:</span> {showDetail.status}</div>
                </div>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-3">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ingredient</TableHead>
                      <TableHead className="text-right">Required</TableHead>
                      <TableHead className="text-right">Consumed</TableHead>
                      <TableHead className="text-right">Variance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batchIngredients.map(i => (
                      <TableRow key={i.name}>
                        <TableCell className="font-medium">{i.name}</TableCell>
                        <TableCell className="text-right">{i.required}</TableCell>
                        <TableCell className="text-right">{i.consumed}</TableCell>
                        <TableCell className="text-right font-mono">{i.variance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="allocation" className="mt-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-muted rounded"><span>Counter C1 - Main Gate</span><span className="font-mono">1,200</span></div>
                  <div className="flex justify-between p-2 bg-muted rounded"><span>Counter C2 - East Wing</span><span className="font-mono">800</span></div>
                  <div className="flex justify-between p-2 bg-muted rounded"><span>Counter C3 - South Gate</span><span className="font-mono">600</span></div>
                  <div className="flex justify-between p-2 bg-muted rounded"><span>Online Reservations</span><span className="font-mono">600</span></div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Batch */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Create New Batch</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Prasadam Type</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laddu">Laddu Prasadam</SelectItem>
                    <SelectItem value="pulihora">Pulihora</SelectItem>
                    <SelectItem value="pongal">Sweet Pongal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Quantity</Label><Input type="number" placeholder="e.g. 5000" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Production Date</Label><Input type="date" /></div>
              <div><Label>Production Team</Label><Input placeholder="Team A" /></div>
            </div>
            <Card className="bg-amber-50/50 border-amber-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-amber-800 mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-xs font-semibold">Raw Stock Check</span>
                </div>
                <p className="text-xs text-amber-700">System will auto-deduct raw materials from inventory upon batch creation. Ensure sufficient stock.</p>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={() => setShowCreate(false)}>Create Batch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatchProduction;

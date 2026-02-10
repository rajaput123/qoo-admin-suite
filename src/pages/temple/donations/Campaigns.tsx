import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Megaphone, Target, Users, Calendar, IndianRupee, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const campaigns = [
  { id: "CMP-001", name: "Gopuram Gold Plating Fund", target: 50000000, raised: 32000000, donors: 245, startDate: "2024-08-01", endDate: "2025-06-30", linkedTo: "Gopuram Renovation", type: "Project", status: "Active" },
  { id: "CMP-002", name: "Annadanam 365 - Feed 1000 Daily", target: 12000000, raised: 8500000, donors: 892, startDate: "2024-04-01", endDate: "2025-03-31", linkedTo: "Daily Annadanam", type: "Kitchen", status: "Active" },
  { id: "CMP-003", name: "Brahmotsavam 2025 Grand Sponsorship", target: 5000000, raised: 3200000, donors: 156, startDate: "2025-01-01", endDate: "2025-03-15", linkedTo: "Brahmotsavam 2025", type: "Event", status: "Active" },
  { id: "CMP-004", name: "Digital Darshan Infrastructure", target: 2000000, raised: 2000000, donors: 89, startDate: "2024-01-01", endDate: "2024-12-31", linkedTo: "Digital Darshan System", type: "Project", status: "Completed" },
  { id: "CMP-005", name: "Prasadam for Festivals", target: 1500000, raised: 450000, donors: 67, startDate: "2025-01-15", endDate: "2025-12-31", linkedTo: "Festival Prasadam", type: "Prasadam", status: "Active" },
];

const formatCurrency = (val: number) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
  return `₹${val.toLocaleString()}`;
};

const Campaigns = () => {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);
  const { toast } = useToast();

  const filtered = campaigns.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalTarget = campaigns.reduce((s, c) => s + c.target, 0);
  const totalRaised = campaigns.reduce((s, c) => s + c.raised, 0);
  const totalDonors = campaigns.reduce((s, c) => s + c.donors, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage fundraising campaigns linked to projects, events, and temple operations</p>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-1" /> New Campaign</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted"><Megaphone className="h-4 w-4 text-primary" /></div><div><p className="text-xl font-bold">{campaigns.length}</p><p className="text-xs text-muted-foreground">Total Campaigns</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted"><Target className="h-4 w-4 text-primary" /></div><div><p className="text-xl font-bold">{formatCurrency(totalTarget)}</p><p className="text-xs text-muted-foreground">Total Target</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted"><IndianRupee className="h-4 w-4 text-green-600" /></div><div><p className="text-xl font-bold">{formatCurrency(totalRaised)}</p><p className="text-xs text-muted-foreground">Total Raised</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><div className="p-2 rounded-lg bg-muted"><Users className="h-4 w-4 text-primary" /></div><div><p className="text-xl font-bold">{totalDonors.toLocaleString()}</p><p className="text-xs text-muted-foreground">Total Donors</p></div></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search campaigns..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Linked To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead className="text-right">Raised</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Donors</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => {
                const pct = Math.round((c.raised / c.target) * 100);
                return (
                  <TableRow key={c.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedCampaign(c)}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{c.name}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{c.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{c.linkedTo}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{c.type}</Badge></TableCell>
                    <TableCell className="text-right font-mono text-sm">{formatCurrency(c.target)}</TableCell>
                    <TableCell className="text-right font-mono text-sm font-medium">{formatCurrency(c.raised)}</TableCell>
                    <TableCell>
                      <div className="w-20">
                        <div className="text-xs mb-1">{pct}%</div>
                        <Progress value={pct} className="h-1.5" />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{c.donors}</TableCell>
                    <TableCell className="text-xs">{c.startDate}<br />{c.endDate}</TableCell>
                    <TableCell><Badge variant={c.status === "Completed" ? "default" : "secondary"} className="text-[10px]">{c.status}</Badge></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Campaign Detail */}
      <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{selectedCampaign?.name}</DialogTitle></DialogHeader>
          {selectedCampaign && (
            <Tabs defaultValue="overview">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="donors" className="flex-1">Donors</TabsTrigger>
                <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Raised: {formatCurrency(selectedCampaign.raised)}</span>
                    <span>Target: {formatCurrency(selectedCampaign.target)}</span>
                  </div>
                  <Progress value={Math.round((selectedCampaign.raised / selectedCampaign.target) * 100)} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">{Math.round((selectedCampaign.raised / selectedCampaign.target) * 100)}% achieved</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["Type", selectedCampaign.type],
                    ["Linked To", selectedCampaign.linkedTo],
                    ["Donors", selectedCampaign.donors.toString()],
                    ["Status", selectedCampaign.status],
                  ].map(([l, v]) => (
                    <div key={l} className="p-2 rounded bg-muted/50">
                      <p className="text-[10px] text-muted-foreground">{l}</p>
                      <p className="text-sm font-medium">{v}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="donors" className="mt-4">
                <p className="text-sm text-muted-foreground">{selectedCampaign.donors} donors have contributed to this campaign. View full list in Donor Registry.</p>
              </TabsContent>
              <TabsContent value="timeline" className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b"><span>Start Date</span><span className="font-medium">{selectedCampaign.startDate}</span></div>
                <div className="flex justify-between py-2 border-b"><span>End Date</span><span className="font-medium">{selectedCampaign.endDate}</span></div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* New Campaign */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Create Campaign</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div><Label>Campaign Name</Label><Input placeholder="e.g. Gopuram Gold Plating Fund" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Target Amount (₹)</Label><Input type="number" placeholder="e.g. 5000000" /></div>
              <div><Label>Type</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="kitchen">Kitchen / Annadanam</SelectItem>
                    <SelectItem value="prasadam">Prasadam</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Linked Entity</Label><Input placeholder="e.g. Brahmotsavam 2025" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Start Date</Label><Input type="date" /></div>
              <div><Label>End Date</Label><Input type="date" /></div>
            </div>
            <div><Label>Description</Label><Textarea placeholder="Campaign description..." rows={2} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={() => { toast({ title: "Campaign Created" }); setShowAdd(false); }}>Create Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Campaigns;

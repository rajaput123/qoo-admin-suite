import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Bell, Calendar, Archive, Eye } from "lucide-react";
import { toast } from "sonner";

const announcements = [
  { id: "ANN-001", title: "Maha Shivaratri Festival Schedule", category: "Festival", status: "published", publishDate: "2024-02-08", expiryDate: "2024-02-15", linkedEvent: "EVT-045", views: 3420, author: "Ramesh Kumar" },
  { id: "ANN-002", title: "Temple Timing Change - Ekadashi", category: "Operations", status: "published", publishDate: "2024-02-06", expiryDate: "2024-02-12", linkedEvent: null, views: 1850, author: "Suresh P." },
  { id: "ANN-003", title: "New Prasadam Counter Opening", category: "Infrastructure", status: "draft", publishDate: "-", expiryDate: "-", linkedEvent: null, views: 0, author: "Ramesh Kumar" },
  { id: "ANN-004", title: "Annual Donor Appreciation Ceremony", category: "Events", status: "review", publishDate: "-", expiryDate: "2024-03-01", linkedEvent: "EVT-052", views: 0, author: "Lakshmi R." },
  { id: "ANN-005", title: "Parking Lot Renovation Notice", category: "Operations", status: "archived", publishDate: "2024-01-15", expiryDate: "2024-02-01", linkedEvent: null, views: 4210, author: "Suresh P." },
  { id: "ANN-006", title: "Volunteer Registration - Ugadi Utsavam", category: "Volunteer", status: "approved", publishDate: "2024-02-12", expiryDate: "2024-03-10", linkedEvent: "EVT-058", views: 0, author: "Ramesh Kumar" },
];

const statusColors: Record<string, string> = {
  published: "text-green-700 bg-green-50 border-green-200",
  draft: "text-muted-foreground bg-muted border-border",
  review: "text-amber-700 bg-amber-50 border-amber-200",
  approved: "text-blue-700 bg-blue-50 border-blue-200",
  archived: "text-muted-foreground bg-muted/50 border-border",
};

const Announcements = () => {
  const [search, setSearch] = useState("");
  const [selectedAnn, setSelectedAnn] = useState<typeof announcements[0] | null>(null);

  const filteredAnn = announcements.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Announcements", value: "12", icon: Bell },
          { label: "Pending Review", value: "3", icon: Eye },
          { label: "Scheduled", value: "5", icon: Calendar },
          { label: "Archived This Month", value: "8", icon: Archive },
        ].map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search announcements..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" />New Announcement</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Create Announcement</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input placeholder="Announcement title" /></div>
              <div><Label>Category</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="festival">Festival</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="volunteer">Volunteer</SelectItem>
                    <SelectItem value="policy">Policy Update</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Content</Label><Textarea rows={4} placeholder="Announcement content..." /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Publish Date</Label><Input type="date" /></div>
                <div><Label>Expiry Date</Label><Input type="date" /></div>
              </div>
              <div><Label>Link to Event (Optional)</Label><Input placeholder="Event ID" /></div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm">Save Draft</Button>
                <Button size="sm" onClick={() => toast.success("Announcement submitted for review")}>Submit for Review</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnn.map((ann) => (
              <TableRow key={ann.id} className="cursor-pointer" onClick={() => setSelectedAnn(ann)}>
                <TableCell className="font-mono text-xs">{ann.id}</TableCell>
                <TableCell className="font-medium">{ann.title}</TableCell>
                <TableCell><Badge variant="secondary">{ann.category}</Badge></TableCell>
                <TableCell><Badge variant="outline" className={statusColors[ann.status]}>{ann.status}</Badge></TableCell>
                <TableCell className="text-xs">{ann.publishDate}</TableCell>
                <TableCell className="text-xs">{ann.expiryDate}</TableCell>
                <TableCell>{ann.views.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!selectedAnn} onOpenChange={() => setSelectedAnn(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Announcement Details</DialogTitle></DialogHeader>
          {selectedAnn && (
            <Tabs defaultValue="overview">
              <TabsList className="w-full"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="history">Approval History</TabsTrigger></TabsList>
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">ID:</span> <span className="font-mono">{selectedAnn.id}</span></div>
                  <div><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={statusColors[selectedAnn.status]}>{selectedAnn.status}</Badge></div>
                  <div><span className="text-muted-foreground">Category:</span> {selectedAnn.category}</div>
                  <div><span className="text-muted-foreground">Author:</span> {selectedAnn.author}</div>
                  <div><span className="text-muted-foreground">Published:</span> {selectedAnn.publishDate}</div>
                  <div><span className="text-muted-foreground">Expiry:</span> {selectedAnn.expiryDate}</div>
                  <div><span className="text-muted-foreground">Views:</span> {selectedAnn.views.toLocaleString()}</div>
                  <div><span className="text-muted-foreground">Linked Event:</span> {selectedAnn.linkedEvent || "None"}</div>
                </div>
                {(selectedAnn.status === "review" || selectedAnn.status === "draft") && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => { toast.success("Announcement approved"); setSelectedAnn(null); }}>Approve</Button>
                    <Button variant="destructive" size="sm" onClick={() => { toast.error("Announcement rejected"); setSelectedAnn(null); }}>Reject</Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2"><span>Created by {selectedAnn.author}</span><span className="text-muted-foreground">2024-02-05</span></div>
                  <div className="flex justify-between border-b pb-2"><span>Submitted for review</span><span className="text-muted-foreground">2024-02-06</span></div>
                  {selectedAnn.status === "published" && <div className="flex justify-between"><span>Published</span><span className="text-muted-foreground">{selectedAnn.publishDate}</span></div>}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;

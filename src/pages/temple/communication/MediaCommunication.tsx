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
import { Plus, Search, Globe, Tv, Newspaper, Share2 } from "lucide-react";
import { toast } from "sonner";

const mediaRecords = [
  { id: "MED-001", title: "Press Release: Annual Festival", type: "Press Release", channel: "Conventional", status: "published", date: "2024-02-08", outlet: "Deccan Herald", spokesperson: "Sri Ramesh" },
  { id: "MED-002", title: "Social Media - Festival Highlight Reel", type: "Social Post", channel: "Social Media", status: "approved", date: "2024-02-09", outlet: "Instagram, Facebook", spokesperson: "-" },
  { id: "MED-003", title: "TV Interview Request - Temple Expansion", type: "Interview", channel: "Conventional", status: "pending", date: "2024-02-10", outlet: "Zee Kannada", spokesperson: "Pending Assignment" },
  { id: "MED-004", title: "Website Blog: Heritage Restoration Update", type: "Digital Content", channel: "Digital", status: "draft", date: "-", outlet: "Temple Website", spokesperson: "-" },
  { id: "MED-005", title: "Official Statement: Crowd Management Measures", type: "Statement", channel: "Conventional", status: "published", date: "2024-02-07", outlet: "All Media", spokesperson: "Sri Ramesh" },
  { id: "MED-006", title: "YouTube Documentary Collaboration", type: "Media Request", channel: "Digital", status: "review", date: "2024-02-10", outlet: "YouTube", spokesperson: "Pending Approval" },
];

const statusColors: Record<string, string> = {
  published: "text-green-700 bg-green-50 border-green-200",
  approved: "text-blue-700 bg-blue-50 border-blue-200",
  pending: "text-amber-700 bg-amber-50 border-amber-200",
  draft: "text-muted-foreground bg-muted border-border",
  review: "text-amber-700 bg-amber-50 border-amber-200",
};

const channelColors: Record<string, string> = {
  "Social Media": "text-blue-700 bg-blue-50",
  "Conventional": "text-orange-700 bg-orange-50",
  "Digital": "text-purple-700 bg-purple-50",
};

const MediaCommunication = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof mediaRecords[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Social Media Posts", value: "34", icon: Share2 },
          { label: "Press Releases", value: "8", icon: Newspaper },
          { label: "Media Requests", value: "5", icon: Tv },
          { label: "Digital Content", value: "12", icon: Globe },
        ].map((kpi) => (
          <Card key={kpi.label}><CardContent className="p-4">
            <kpi.icon className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
          </CardContent></Card>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Media</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="conventional">Conventional Media</TabsTrigger>
          <TabsTrigger value="digital">Digital Channels</TabsTrigger>
        </TabsList>

        {["all", "social", "conventional", "digital"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search media records..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" />New Record</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader><DialogTitle>Create Media Record</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div><Label>Title</Label><Input placeholder="Title" /></div>
                    <div><Label>Type</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="press">Press Release</SelectItem>
                          <SelectItem value="statement">Official Statement</SelectItem>
                          <SelectItem value="social">Social Post</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="digital">Digital Content</SelectItem>
                          <SelectItem value="request">Media Request</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label>Channel</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select channel" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="conventional">Conventional Media</SelectItem>
                          <SelectItem value="digital">Digital</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label>Content / Notes</Label><Textarea rows={3} placeholder="Content details..." /></div>
                    <div><Label>Spokesperson</Label><Input placeholder="Assigned spokesperson" /></div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">Save Draft</Button>
                      <Button size="sm" onClick={() => toast.success("Media record submitted for review")}>Submit for Review</Button>
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
                    <TableHead>Type</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Outlet</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mediaRecords
                    .filter(m => {
                      if (tab === "social") return m.channel === "Social Media";
                      if (tab === "conventional") return m.channel === "Conventional";
                      if (tab === "digital") return m.channel === "Digital";
                      return true;
                    })
                    .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
                    .map((rec) => (
                      <TableRow key={rec.id} className="cursor-pointer" onClick={() => setSelected(rec)}>
                        <TableCell className="font-mono text-xs">{rec.id}</TableCell>
                        <TableCell className="font-medium">{rec.title}</TableCell>
                        <TableCell><Badge variant="secondary">{rec.type}</Badge></TableCell>
                        <TableCell><Badge variant="outline" className={channelColors[rec.channel]}>{rec.channel}</Badge></TableCell>
                        <TableCell><Badge variant="outline" className={statusColors[rec.status]}>{rec.status}</Badge></TableCell>
                        <TableCell className="text-xs">{rec.date}</TableCell>
                        <TableCell className="text-xs">{rec.outlet}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Media Record Details</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">ID:</span> <span className="font-mono">{selected.id}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={statusColors[selected.status]}>{selected.status}</Badge></div>
                <div><span className="text-muted-foreground">Type:</span> {selected.type}</div>
                <div><span className="text-muted-foreground">Channel:</span> {selected.channel}</div>
                <div><span className="text-muted-foreground">Outlet:</span> {selected.outlet}</div>
                <div><span className="text-muted-foreground">Spokesperson:</span> {selected.spokesperson}</div>
                <div><span className="text-muted-foreground">Date:</span> {selected.date}</div>
              </div>
              {(selected.status === "pending" || selected.status === "review") && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => { toast.success("Record approved"); setSelected(null); }}>Approve</Button>
                  <Button variant="destructive" size="sm" onClick={() => { toast.error("Record rejected"); setSelected(null); }}>Reject</Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaCommunication;

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
import { Plus, Search, Video, Radio, Eye, Calendar, Users } from "lucide-react";
import { toast } from "sonner";

const broadcasts = [
  { id: "BRC-001", title: "Morning Abhishekam Live", type: "Live Darshana", status: "live", scheduled: "Daily 06:00", platform: "YouTube + App", viewers: "1,245", team: "Tech Team A", duration: "45 min" },
  { id: "BRC-002", title: "Maha Shivaratri Night Puja", type: "Event Stream", status: "scheduled", scheduled: "2024-02-13 20:00", platform: "YouTube + Facebook", viewers: "-", team: "Tech Team B", duration: "3 hrs" },
  { id: "BRC-003", title: "Evening Aarti", type: "Live Darshana", status: "completed", scheduled: "Daily 18:30", platform: "App", viewers: "856", team: "Tech Team A", duration: "20 min" },
  { id: "BRC-004", title: "Guru Discourse Series - Episode 12", type: "Discourse", status: "scheduled", scheduled: "2024-02-11 10:00", platform: "YouTube", viewers: "-", team: "Media Team", duration: "90 min" },
  { id: "BRC-005", title: "Temple Heritage Walk Virtual Tour", type: "Special Program", status: "completed", scheduled: "2024-02-05 11:00", platform: "YouTube + Facebook", viewers: "3,420", team: "Media Team", duration: "60 min" },
  { id: "BRC-006", title: "Sanctum Live View", type: "Live Darshana", status: "live", scheduled: "Continuous", platform: "App", viewers: "432", team: "Tech Team A", duration: "Ongoing" },
];

const statusColors: Record<string, string> = {
  live: "text-red-700 bg-red-50 border-red-200",
  scheduled: "text-blue-700 bg-blue-50 border-blue-200",
  completed: "text-green-700 bg-green-50 border-green-200",
  cancelled: "text-muted-foreground bg-muted border-border",
};

const LiveBroadcast = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof broadcasts[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Live Now", value: "2", icon: Radio, extra: "text-red-600" },
          { label: "Total Viewers", value: "1,677", icon: Eye },
          { label: "Scheduled Today", value: "4", icon: Calendar },
          { label: "Broadcasts This Month", value: "67", icon: Video },
        ].map((kpi) => (
          <Card key={kpi.label}><CardContent className="p-4">
            <kpi.icon className={`h-5 w-5 mb-2 ${kpi.extra || "text-muted-foreground"}`} />
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
          </CardContent></Card>
        ))}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Broadcasts</TabsTrigger>
          <TabsTrigger value="streaming">Live Streaming</TabsTrigger>
          <TabsTrigger value="darshana">Live Darshana</TabsTrigger>
        </TabsList>

        {["all", "streaming", "darshana"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search broadcasts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-1" />Schedule Broadcast</Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader><DialogTitle>Schedule Broadcast</DialogTitle></DialogHeader>
                  <div className="space-y-4">
                    <div><Label>Title</Label><Input placeholder="Broadcast title" /></div>
                    <div><Label>Type</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="darshana">Live Darshana</SelectItem>
                          <SelectItem value="event">Event Stream</SelectItem>
                          <SelectItem value="discourse">Discourse</SelectItem>
                          <SelectItem value="special">Special Program</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Date & Time</Label><Input type="datetime-local" /></div>
                      <div><Label>Duration</Label><Input placeholder="e.g. 60 min" /></div>
                    </div>
                    <div><Label>Platform</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="app">Temple App</SelectItem>
                          <SelectItem value="multi">Multi-Platform</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label>Technical Team</Label><Input placeholder="Assigned team" /></div>
                    <div><Label>Notes</Label><Textarea rows={2} placeholder="Broadcast notes..." /></div>
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" onClick={() => toast.success("Broadcast scheduled successfully")}>Schedule</Button>
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
                    <TableHead>Status</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Viewers</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {broadcasts
                    .filter(b => {
                      if (tab === "darshana") return b.type === "Live Darshana";
                      if (tab === "streaming") return b.type !== "Live Darshana";
                      return true;
                    })
                    .filter(b => b.title.toLowerCase().includes(search.toLowerCase()))
                    .map((b) => (
                      <TableRow key={b.id} className="cursor-pointer" onClick={() => setSelected(b)}>
                        <TableCell className="font-mono text-xs">{b.id}</TableCell>
                        <TableCell className="font-medium">{b.title}</TableCell>
                        <TableCell><Badge variant="secondary">{b.type}</Badge></TableCell>
                        <TableCell><Badge variant="outline" className={statusColors[b.status]}>{b.status === "live" ? "● LIVE" : b.status}</Badge></TableCell>
                        <TableCell className="text-xs">{b.scheduled}</TableCell>
                        <TableCell className="text-xs">{b.platform}</TableCell>
                        <TableCell>{b.viewers}</TableCell>
                        <TableCell className="text-xs">{b.duration}</TableCell>
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
          <DialogHeader><DialogTitle>Broadcast Details</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">ID:</span> <span className="font-mono">{selected.id}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={statusColors[selected.status]}>{selected.status}</Badge></div>
                <div><span className="text-muted-foreground">Type:</span> {selected.type}</div>
                <div><span className="text-muted-foreground">Platform:</span> {selected.platform}</div>
                <div><span className="text-muted-foreground">Schedule:</span> {selected.scheduled}</div>
                <div><span className="text-muted-foreground">Duration:</span> {selected.duration}</div>
                <div><span className="text-muted-foreground">Team:</span> {selected.team}</div>
                <div><span className="text-muted-foreground">Viewers:</span> {selected.viewers}</div>
              </div>
              {selected.status === "live" && (
                <Button variant="destructive" size="sm" onClick={() => { toast.info("Broadcast stopped"); setSelected(null); }}>Stop Broadcast</Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveBroadcast;

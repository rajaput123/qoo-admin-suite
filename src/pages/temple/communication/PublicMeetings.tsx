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
import { Plus, Search, Users, Calendar, Video, FileText } from "lucide-react";
import { toast } from "sonner";

const meetings = [
  { id: "MTG-001", title: "Quarterly Trustee Address", type: "Trustee Address", status: "completed", date: "2024-01-28 10:00", platform: "Zoom + YouTube", participants: 245, recording: true, minutes: true, moderator: "Sri Ramesh" },
  { id: "MTG-002", title: "Annual Summary Meeting 2024", type: "Annual Meeting", status: "scheduled", date: "2024-03-15 09:00", platform: "Zoom", participants: 0, recording: false, minutes: false, moderator: "Sri Govind" },
  { id: "MTG-003", title: "Temple Expansion Clarification", type: "Clarification Session", status: "completed", date: "2024-02-02 14:00", platform: "Google Meet", participants: 156, recording: true, minutes: true, moderator: "Lakshmi R." },
  { id: "MTG-004", title: "Devotee Q&A - Festival Planning", type: "Devotee Q&A", status: "scheduled", date: "2024-02-14 16:00", platform: "Zoom + YouTube", participants: 0, recording: false, minutes: false, moderator: "Suresh P." },
  { id: "MTG-005", title: "Volunteer Orientation Session", type: "Orientation", status: "completed", date: "2024-02-05 11:00", platform: "Google Meet", participants: 89, recording: true, minutes: true, moderator: "Lakshmi R." },
];

const statusColors: Record<string, string> = {
  scheduled: "text-blue-700 bg-blue-50 border-blue-200",
  completed: "text-green-700 bg-green-50 border-green-200",
  cancelled: "text-red-700 bg-red-50 border-red-200",
  live: "text-red-700 bg-red-50 border-red-200",
};

const PublicMeetings = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof meetings[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Meetings", value: String(meetings.length), icon: Video },
          { label: "Upcoming", value: String(meetings.filter(m => m.status === "scheduled").length), icon: Calendar },
          { label: "Total Participants", value: meetings.reduce((sum, m) => sum + m.participants, 0).toLocaleString(), icon: Users },
          { label: "Recordings Available", value: String(meetings.filter(m => m.recording).length), icon: FileText },
        ].map((kpi) => (
          <Card key={kpi.label}><CardContent className="p-4">
            <kpi.icon className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
          </CardContent></Card>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search meetings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" />Schedule Meeting</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Schedule Public Meeting</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input placeholder="Meeting title" /></div>
              <div><Label>Type</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trustee">Trustee Address</SelectItem>
                    <SelectItem value="annual">Annual Meeting</SelectItem>
                    <SelectItem value="clarification">Clarification Session</SelectItem>
                    <SelectItem value="qa">Devotee Q&A</SelectItem>
                    <SelectItem value="orientation">Orientation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Date & Time</Label><Input type="datetime-local" /></div>
                <div><Label>Platform</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Platform" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="gmeet">Google Meet</SelectItem>
                      <SelectItem value="zoom-yt">Zoom + YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Moderator</Label><Input placeholder="Assigned moderator" /></div>
              <div><Label>Agenda</Label><Textarea rows={3} placeholder="Meeting agenda..." /></div>
              <div className="flex gap-2 justify-end">
                <Button size="sm" onClick={() => toast.success("Meeting scheduled")}>Schedule</Button>
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
              <TableHead>Date</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Recording</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.filter(m => m.title.toLowerCase().includes(search.toLowerCase())).map((mtg) => (
              <TableRow key={mtg.id} className="cursor-pointer" onClick={() => setSelected(mtg)}>
                <TableCell className="font-mono text-xs">{mtg.id}</TableCell>
                <TableCell className="font-medium">{mtg.title}</TableCell>
                <TableCell><Badge variant="secondary">{mtg.type}</Badge></TableCell>
                <TableCell><Badge variant="outline" className={statusColors[mtg.status]}>{mtg.status}</Badge></TableCell>
                <TableCell className="text-xs">{mtg.date}</TableCell>
                <TableCell className="text-xs">{mtg.platform}</TableCell>
                <TableCell>{mtg.participants || "-"}</TableCell>
                <TableCell>{mtg.recording ? <Badge variant="outline" className="text-green-700 bg-green-50">Available</Badge> : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Meeting Details</DialogTitle></DialogHeader>
          {selected && (
            <Tabs defaultValue="overview">
              <TabsList className="w-full"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="minutes">Minutes</TabsTrigger></TabsList>
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">ID:</span> <span className="font-mono">{selected.id}</span></div>
                  <div><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={statusColors[selected.status]}>{selected.status}</Badge></div>
                  <div><span className="text-muted-foreground">Type:</span> {selected.type}</div>
                  <div><span className="text-muted-foreground">Platform:</span> {selected.platform}</div>
                  <div><span className="text-muted-foreground">Date:</span> {selected.date}</div>
                  <div><span className="text-muted-foreground">Moderator:</span> {selected.moderator}</div>
                  <div><span className="text-muted-foreground">Participants:</span> {selected.participants || "TBD"}</div>
                  <div><span className="text-muted-foreground">Recording:</span> {selected.recording ? "Available" : "Not Available"}</div>
                </div>
              </TabsContent>
              <TabsContent value="minutes" className="mt-4">
                {selected.minutes ? (
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">Meeting minutes archived for <strong>{selected.title}</strong></p>
                    <div className="border rounded-lg p-4 bg-muted/30 space-y-2">
                      <p>• Opening remarks by {selected.moderator}</p>
                      <p>• Key discussions and decisions recorded</p>
                      <p>• Action items assigned to respective teams</p>
                      <p>• Next meeting date confirmed</p>
                    </div>
                    <Button variant="outline" size="sm">Export Minutes (PDF)</Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Minutes not yet available for this meeting.</p>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublicMeetings;

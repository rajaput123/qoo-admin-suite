import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Star, MessageSquareText, QrCode, Globe, Phone, FileText, Eye, CheckCircle2 } from "lucide-react";

const feedbackEntries = [
  { id: "FB-1201", devotee: "Lakshmi Devi", phone: "98765xxxxx", channel: "Kiosk", category: "Darshan Experience", rating: 5, comment: "Wonderful arrangements", date: "2026-02-10 09:30", status: "Reviewed", reviewer: "Admin Priya" },
  { id: "FB-1200", devotee: "Anonymous", phone: "-", channel: "QR Code", category: "Queue Management", rating: 2, comment: "Waited 3 hours despite booking", date: "2026-02-10 08:45", status: "Escalated", reviewer: "-" },
  { id: "FB-1199", devotee: "Raghav Sharma", phone: "91234xxxxx", channel: "Online", category: "Prasadam Quality", rating: 4, comment: "Good taste, larger portions needed", date: "2026-02-09 16:20", status: "Acknowledged", reviewer: "Admin Suresh" },
  { id: "FB-1198", devotee: "Meera K", phone: "87654xxxxx", channel: "Counter", category: "Cleanliness", rating: 3, comment: "East gate restrooms need attention", date: "2026-02-09 14:10", status: "Action Taken", reviewer: "Admin Priya" },
  { id: "FB-1197", devotee: "Venkat Rao", phone: "90123xxxxx", channel: "App", category: "Staff Behaviour", rating: 5, comment: "Security staff very courteous", date: "2026-02-09 11:00", status: "Reviewed", reviewer: "Admin Suresh" },
  { id: "FB-1196", devotee: "Anonymous", phone: "-", channel: "Suggestion Box", category: "Facilities", rating: 2, comment: "Drinking water facility insufficient near south entrance", date: "2026-02-08 15:30", status: "Pending", reviewer: "-" },
];

const channels = [
  { name: "Kiosk", icon: MessageSquareText, count: 892, active: true },
  { name: "QR Code", icon: QrCode, count: 634, active: true },
  { name: "Online Portal", icon: Globe, count: 521, active: true },
  { name: "Phone/SMS", icon: Phone, count: 412, active: true },
  { name: "Suggestion Box", icon: FileText, count: 388, active: true },
];

const statusColor: Record<string, string> = {
  Reviewed: "bg-green-100 text-green-700",
  Escalated: "bg-red-100 text-red-700",
  Acknowledged: "bg-blue-100 text-blue-700",
  "Action Taken": "bg-purple-100 text-purple-700",
  Pending: "bg-amber-100 text-amber-700",
};

const FeedbackCollection = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [viewEntry, setViewEntry] = useState<typeof feedbackEntries[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Feedback Collection</h1>
          <p className="text-sm text-muted-foreground mt-1">Collect, review, and manage devotee feedback across all channels</p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="gap-1.5"><Plus className="h-4 w-4" /> Add Manual Entry</Button>
      </div>

      {/* Channel Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {channels.map((ch) => (
          <Card key={ch.name}>
            <CardContent className="p-3 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <ch.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{ch.count}</p>
                <p className="text-xs text-muted-foreground">{ch.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feedback Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">All Feedback Entries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Devotee</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbackEntries.map((entry) => (
                <TableRow key={entry.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setViewEntry(entry)}>
                  <TableCell className="font-mono text-xs">{entry.id}</TableCell>
                  <TableCell className="text-sm">{entry.devotee}</TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{entry.channel}</Badge></TableCell>
                  <TableCell className="text-sm">{entry.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < entry.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{entry.date}</TableCell>
                  <TableCell><Badge variant="outline" className={`text-[10px] ${statusColor[entry.status]}`}>{entry.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="h-3.5 w-3.5" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Detail Modal */}
      <Dialog open={!!viewEntry} onOpenChange={() => setViewEntry(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Feedback Detail — {viewEntry?.id}</DialogTitle>
          </DialogHeader>
          {viewEntry && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{viewEntry.devotee}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < viewEntry.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground">{viewEntry.comment}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-[10px]">{viewEntry.channel}</Badge>
                  <span>{viewEntry.category}</span>
                  <span>•</span>
                  <span>{viewEntry.date}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Status</Label>
                <Select defaultValue={viewEntry.status}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="Reviewed">Reviewed</SelectItem>
                    <SelectItem value="Escalated">Escalated</SelectItem>
                    <SelectItem value="Action Taken">Action Taken</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Admin Response</Label>
                <Textarea placeholder="Add response or internal notes..." rows={3} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setViewEntry(null)}>Close</Button>
                <Button className="gap-1"><CheckCircle2 className="h-4 w-4" /> Update</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Manual Entry Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Manual Feedback</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Devotee Name</Label>
              <Input placeholder="Enter name or 'Anonymous'" />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="darshan">Darshan Experience</SelectItem>
                  <SelectItem value="queue">Queue Management</SelectItem>
                  <SelectItem value="prasadam">Prasadam Quality</SelectItem>
                  <SelectItem value="cleanliness">Cleanliness</SelectItem>
                  <SelectItem value="staff">Staff Behaviour</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Rating</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select rating" /></SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((r) => <SelectItem key={r} value={String(r)}>{r} Star{r > 1 ? "s" : ""}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Comment</Label>
              <Textarea placeholder="Enter feedback..." rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label>Channel</Label>
              <Select defaultValue="counter">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="counter">Counter</SelectItem>
                  <SelectItem value="suggestion-box">Suggestion Box</SelectItem>
                  <SelectItem value="phone">Phone/SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button onClick={() => setShowAdd(false)}>Submit</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackCollection;

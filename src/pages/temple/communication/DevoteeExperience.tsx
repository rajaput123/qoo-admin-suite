import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, MessageSquare, AlertCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";

const feedbackEntries = [
  { id: "FBK-001", devotee: "Srinivas R.", event: "Morning Abhishekam", rating: 5, category: "Ritual", feedback: "Very well organized. Priest was very attentive and explained the significance beautifully.", status: "approved", date: "2024-02-10", moderated: true },
  { id: "FBK-002", devotee: "Lakshmi K.", event: "Maha Shivaratri", rating: 3, category: "Crowd", feedback: "Too crowded, queue management was poor. Waited 2+ hours beyond scheduled slot.", status: "flagged", date: "2024-02-09", moderated: true },
  { id: "FBK-003", devotee: "Anonymous", event: "General Visit", rating: 4, category: "Facilities", feedback: "Clean premises, good prasadam quality. Parking could be improved.", status: "pending", date: "2024-02-10", moderated: false },
  { id: "FBK-004", devotee: "Priya M.", event: "Special Puja Booking", rating: 2, category: "Booking", feedback: "Online booking system was confusing. Payment failed twice before succeeding.", status: "escalated", date: "2024-02-09", moderated: true },
  { id: "FBK-005", devotee: "Venkat S.", event: "Evening Aarti", rating: 5, category: "Ritual", feedback: "Beautiful experience. The new sound system makes a huge difference.", status: "approved", date: "2024-02-08", moderated: true },
  { id: "FBK-006", devotee: "Harish G.", event: "Annadanam", rating: 4, category: "Prasadam", feedback: "Good food quality, served with devotion. Seating area needs more shade.", status: "pending", date: "2024-02-10", moderated: false },
];

const statusColors: Record<string, string> = {
  approved: "text-green-700 bg-green-50 border-green-200",
  pending: "text-amber-700 bg-amber-50 border-amber-200",
  flagged: "text-red-700 bg-red-50 border-red-200",
  escalated: "text-orange-700 bg-orange-50 border-orange-200",
};

const DevoteeExperience = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof feedbackEntries[0] | null>(null);

  const avgRating = (feedbackEntries.reduce((sum, f) => sum + f.rating, 0) / feedbackEntries.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Feedback", value: String(feedbackEntries.length), icon: MessageSquare },
          { label: "Average Rating", value: avgRating, icon: Star },
          { label: "Pending Moderation", value: String(feedbackEntries.filter(f => !f.moderated).length), icon: AlertCircle },
          { label: "Escalated", value: String(feedbackEntries.filter(f => f.status === "escalated").length), icon: AlertCircle },
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
          <Input placeholder="Search feedback..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Devotee</TableHead>
              <TableHead>Event / Ritual</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbackEntries.filter(f => f.devotee.toLowerCase().includes(search.toLowerCase()) || f.feedback.toLowerCase().includes(search.toLowerCase())).map((fb) => (
              <TableRow key={fb.id} className="cursor-pointer" onClick={() => setSelected(fb)}>
                <TableCell className="font-mono text-xs">{fb.id}</TableCell>
                <TableCell className="font-medium">{fb.devotee}</TableCell>
                <TableCell>{fb.event}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < fb.rating ? "text-amber-500 fill-amber-500" : "text-muted"}`} />
                    ))}
                  </div>
                </TableCell>
                <TableCell><Badge variant="secondary">{fb.category}</Badge></TableCell>
                <TableCell><Badge variant="outline" className={statusColors[fb.status]}>{fb.status}</Badge></TableCell>
                <TableCell className="text-xs">{fb.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Feedback Details</DialogTitle></DialogHeader>
          {selected && (
            <Tabs defaultValue="overview">
              <TabsList className="w-full"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="moderation">Moderation</TabsTrigger></TabsList>
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">ID:</span> <span className="font-mono">{selected.id}</span></div>
                  <div><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={statusColors[selected.status]}>{selected.status}</Badge></div>
                  <div><span className="text-muted-foreground">Devotee:</span> {selected.devotee}</div>
                  <div><span className="text-muted-foreground">Category:</span> {selected.category}</div>
                  <div><span className="text-muted-foreground">Event:</span> {selected.event}</div>
                  <div><span className="text-muted-foreground">Date:</span> {selected.date}</div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < selected.rating ? "text-amber-500 fill-amber-500" : "text-muted"}`} />
                  ))}
                  <span className="text-sm ml-2">{selected.rating}/5</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Feedback</p>
                  <p className="text-sm">{selected.feedback}</p>
                </div>
              </TabsContent>
              <TabsContent value="moderation" className="space-y-4 mt-4">
                <p className="text-sm text-muted-foreground">Moderation Status: {selected.moderated ? "Reviewed" : "Pending Review"}</p>
                {!selected.moderated && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => { toast.success("Feedback approved"); setSelected(null); }}><ThumbsUp className="h-4 w-4 mr-1" />Approve</Button>
                    <Button variant="outline" size="sm" onClick={() => { toast.info("Feedback flagged"); setSelected(null); }}><ThumbsDown className="h-4 w-4 mr-1" />Flag</Button>
                    <Button variant="destructive" size="sm" onClick={() => { toast.error("Feedback escalated"); setSelected(null); }}>Escalate</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DevoteeExperience;

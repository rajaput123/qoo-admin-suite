import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Plus, ChevronLeft, ChevronRight, Star, ArrowLeft, Edit } from "lucide-react";
import { toast } from "sonner";
import SelectWithAddNew from "@/components/SelectWithAddNew";

type ReviewRow = {
  freelancerName: string;
  eventName: string;
  date: string;
  rating: number;
  reviewNotes: string;
  reviewedBy: string;
};

const reviews: ReviewRow[] = [
  { freelancerName: "Pixel Studio", eventName: "Brahmotsavam 2026", date: "2026-02-05", rating: 5, reviewNotes: "Excellent coverage, timely delivery", reviewedBy: "Temple Admin" },
  { freelancerName: "Decor Dreams", eventName: "Vaikunta Ekadasi", date: "2026-01-12", rating: 4, reviewNotes: "Good work, slight delay in setup", reviewedBy: "Event Manager" },
  { freelancerName: "Sound Waves Pro", eventName: "January Broadcasting", date: "2026-02-01", rating: 5, reviewNotes: "Flawless streaming, zero downtime", reviewedBy: "Temple Admin" },
  { freelancerName: "CreativeMinds Design", eventName: "Annual Calendar Design", date: "2026-01-18", rating: 4, reviewNotes: "Creative work, needed minor revisions", reviewedBy: "PR Head" },
  { freelancerName: "Vastu Consultancy", eventName: "New Shrine Consultation", date: "2026-01-25", rating: 5, reviewNotes: "Expert advice, well-documented report", reviewedBy: "Temple Trustee" },
  { freelancerName: "Digital Stream Co", eventName: "Pongal Celebration", date: "2026-01-16", rating: 3.5, reviewNotes: "Audio issues during stream, video quality was good", reviewedBy: "IT Head" },
];

const Performance = () => {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedReview, setSelectedReview] = useState<ReviewRow | null>(null);

  const [freelancerOptions, setFreelancerOptions] = useState(["Pixel Studio", "Decor Dreams", "Sound Waves Pro", "CreativeMinds Design", "Vastu Consultancy", "Digital Stream Co", "Heritage Electricals"]);
  const [eventOptions, setEventOptions] = useState(["Brahmotsavam 2026", "Vaikunta Ekadasi", "Daily Live Broadcast", "Ratha Yatra", "Ugadi Festival"]);

  const avgRating = reviews.length > 0 ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length) : 0;

  const filtered = reviews.filter(r => {
    if (search && !r.freelancerName.toLowerCase().includes(search.toLowerCase()) && !r.eventName.toLowerCase().includes(search.toLowerCase())) return false;
    if (ratingFilter !== "all" && Math.round(r.rating) !== Number(ratingFilter)) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const renderStars = (rating: number, interactive = false) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          className={`h-4 w-4 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"} ${interactive ? "cursor-pointer" : ""}`}
          onClick={interactive ? () => setSelectedRating(s) : undefined}
        />
      ))}
      {!interactive && <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>}
    </div>
  );

  // Inline detail view
  if (selectedReview) {
    const r = selectedReview;

    return (
      <div className="p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setSelectedReview(null)}><ArrowLeft className="h-4 w-4" /></Button>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{r.freelancerName}</h1>
                <p className="text-muted-foreground text-sm">{r.eventName} • {r.date}</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2"><Edit className="h-4 w-4" />Edit Review</Button>
          </div>

          {/* Review Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Review Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                <div>
                  <Label className="text-xs text-muted-foreground">Freelancer</Label>
                  <p className="text-sm font-medium mt-1">{r.freelancerName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Event/Assignment</Label>
                  <p className="text-sm font-medium mt-1">{r.eventName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Review Date</Label>
                  <p className="text-sm font-medium mt-1">{r.date}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Rating</Label>
                  <div className="mt-1">{renderStars(r.rating)}</div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Reviewed By</Label>
                  <p className="text-sm font-medium mt-1">{r.reviewedBy}</p>
                </div>
              </div>
            </div>

            <hr className="border-border" />

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Review Notes</h3>
              <div className="bg-muted/30 border rounded-lg p-4">
                <p className="text-sm">{r.reviewNotes}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Performance</h1>
            <p className="text-muted-foreground">Click on any row to view review details</p>
          </div>
        </div>

        <p className="text-sm font-medium mb-4">Overall Average Rating: <span className="text-lg font-bold">{avgRating.toFixed(1)} / 5</span></p>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search freelancer, event..." className="pl-9" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <Select value={ratingFilter} onValueChange={v => { setRatingFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[130px] bg-background"><SelectValue placeholder="Rating" /></SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="all">All Ratings</SelectItem>
              {[5, 4, 3, 2, 1].map(r => <SelectItem key={r} value={r.toString()}>{r} Star{r > 1 ? "s" : ""}</SelectItem>)}
            </SelectContent>
          </Select>
          <Badge variant="secondary" className="ml-auto">{filtered.length} reviews</Badge>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Freelancer</TableHead>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review Notes</TableHead>
                <TableHead>Reviewed By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No reviews found</TableCell></TableRow>
              ) : paged.map((r, i) => (
                <TableRow
                  key={i}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedReview(r)}
                >
                  <TableCell className="font-medium">{r.freelancerName}</TableCell>
                  <TableCell>{r.eventName}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{renderStars(r.rating)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{r.reviewNotes}</TableCell>
                  <TableCell>{r.reviewedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show</span>
            <Select value={perPage.toString()} onValueChange={v => { setPerPage(Number(v)); setPage(1); }}>
              <SelectTrigger className="w-[70px] h-8 bg-background"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-popover">{[10, 25, 50, 100].map(n => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}</SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">of {filtered.length} records</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-4 w-4" /></Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2).map(p => (
              <Button key={p} variant={p === page ? "default" : "outline"} size="icon" className="h-8 w-8" onClick={() => setPage(p)}>{p}</Button>
            ))}
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Review Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add/Edit Performance Review</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-xs">Freelancer</Label><SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select freelancer" options={freelancerOptions} onAddNew={v => setFreelancerOptions(p => [...p, v])} /></div>
            <div><Label className="text-xs">Event</Label><SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select event" options={eventOptions} onAddNew={v => setEventOptions(p => [...p, v])} /></div>
            <div>
              <Label className="text-xs">Rating</Label>
              <div className="mt-1">{renderStars(selectedRating, true)}</div>
            </div>
            <div><Label className="text-xs">Review Notes</Label><Textarea placeholder="Enter review notes" rows={3} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Review added"); setShowAdd(false); setSelectedRating(0); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Performance;

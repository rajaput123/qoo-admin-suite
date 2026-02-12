import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, Plus, AlertTriangle, CheckCircle2, Clock, Link2, Star, Package, ClipboardList, IndianRupee, Send, Archive, FileText, Download, Copy, TrendingUp, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import SelectWithAddNew from "@/components/SelectWithAddNew";
import {
  getEventExpenses, getEventSevas, getEventMaterials, getEventFreelancers,
  getEventVolunteers, getEventKitchenLinks, getEventBatches, getEventTasks,
  inventoryItems, freelancerRefs, structures, expenseCategories,
} from "@/data/eventData";
import { useEventById, eventActions } from "@/modules/events/hooks";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusColors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Published: "bg-green-100 text-green-700",
  Ongoing: "bg-green-100 text-green-700",
  Completed: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
  Archived: "bg-gray-200 text-gray-600",
};

// Auto-update event status based on dates
function getAutoStatus(event: { startDate: string; endDate: string; status: string }): string | null {
  const today = new Date().toISOString().slice(0, 10);
  const startDate = event.startDate;
  const endDate = event.endDate;

  // Don't auto-update if manually set to Cancelled or Archived
  if (event.status === "Cancelled" || event.status === "Archived") {
    return null;
  }

  // Auto-update to Ongoing if today is between start and end date
  if (today >= startDate && today <= endDate && event.status !== "Ongoing") {
    return "Ongoing";
  }

  // Auto-update to Completed if today is after end date
  if (today > endDate && event.status !== "Completed" && event.status !== "Archived") {
    return "Completed";
  }

  return null;
}

const priorityColors: Record<string, string> = {
  Low: "bg-muted text-muted-foreground",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-700",
  Critical: "bg-red-100 text-red-700",
};

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const event = useEventById(eventId || "");
  const [showSevaDialog, setShowSevaDialog] = useState(false);
  const [showFreelancerDialog, setShowFreelancerDialog] = useState(false);
  const [showVolunteerDialog, setShowVolunteerDialog] = useState(false);
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);

  const [freelancerOptions, setFreelancerOptions] = useState(freelancerRefs.map(f => f.businessName));
  const [roleOptions, setRoleOptions] = useState(["Photography", "Videography", "Sound Engineering", "Decoration", "Lighting", "Catering", "Live Streaming"]);
  const [volunteerRoleOptions, setVolunteerRoleOptions] = useState(["Crowd Control", "Kitchen Assistants", "Ritual Support", "VIP Coordination", "Medical Support", "Parking"]);
  const [areaOptions, setAreaOptions] = useState(["Main Gate", "Queue Lines", "Main Kitchen", "Annadanam Hall", "Main Temple", "Shrines", "VIP Entrance"]);
  const [sevaOptions, setSevaOptions] = useState(["Suprabhatam", "Abhishekam", "Archana", "Special Darshan", "Kalyanotsavam", "Sahasranama", "Rudra Abhishekam"]);
  const [expenseCatOptions, setExpenseCatOptions] = useState<string[]>([...expenseCategories]);

  if (!event) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate("/temple/events")}><ArrowLeft className="h-4 w-4 mr-2" />Back to Events</Button>
        <p className="text-muted-foreground">Event not found.</p>
      </div>
    );
  }

  const sevas = getEventSevas(event.id);
  const materials = getEventMaterials(event.id);
  const freelancers = getEventFreelancers(event.id);
  const volunteers = getEventVolunteers(event.id);
  const expenses = getEventExpenses(event.id);
  const kitchenLinks = getEventKitchenLinks(event.id);
  const batches = getEventBatches(event.id);
  const tasks = getEventTasks(event.id);

  const totalExpenses = expenses.reduce((a, e) => a + e.amount, 0);
  const totalFreelancerCost = freelancers.reduce((a, f) => a + f.agreedPayment, 0);
  const totalVolunteers = volunteers.reduce((a, v) => a + v.count, 0);
  const materialShortages = materials.filter(m => m.allocatedQty < m.requiredQty);
  const openTasks = tasks.filter(t => t.status === "Open" || t.status === "In Progress" || t.status === "Overdue");

  // Auto-update status on mount and when dates change
  useEffect(() => {
    if (!event) return;
    const autoStatus = getAutoStatus(event);
    if (autoStatus && autoStatus !== event.status) {
      eventActions.updateEvent(event.id, { status: autoStatus as any });
      if (autoStatus === "Ongoing") {
        toast.info("Event status updated to Ongoing (event has started)");
      } else if (autoStatus === "Completed") {
        toast.info("Event status updated to Completed (event has ended)");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.startDate, event?.endDate]);

  // Workflow phase detection
  const getWorkflowPhase = () => {
    if (event.status === "Draft") return "Phase 1: Event Creation";
    if (event.status === "Scheduled" || event.status === "Published") return "Phase 2: Operational Preparation";
    if (event.status === "Ongoing") return "Phase 4: Live Event Execution";
    if (event.status === "Completed") return "Phase 5: Event Completion";
    if (event.status === "Archived") return "Phase 7: Archived";
    return "Event Management";
  };

  const canPublish = event.status === "Draft" || event.status === "Scheduled";
  const canArchive = event.status === "Completed";
  const isReadOnly = event.status === "Archived";

  const handlePublish = () => {
    if (!canPublish) return;
    // Check for resource conflicts
    const hasConflicts = sevas.some(s => s.conflict);
    if (hasConflicts) {
      toast.warning("Resource conflicts detected. Please resolve before publishing.");
      return;
    }
    eventActions.updateEvent(event.id, { status: "Published" });
    toast.success("Event published! Now visible to devotees and registrations are open.");
  };

  const handleArchive = () => {
    if (!canArchive) return;
    if (confirm("Are you sure you want to archive this event? It will become read-only.")) {
      eventActions.updateEvent(event.id, { status: "Archived" });
      toast.success("Event archived");
    }
  };

  const handleDuplicate = () => {
    const newEvent = eventActions.createEvent({
      name: `${event.name} (Copy)`,
      type: event.type,
      templeId: event.templeId,
      structureId: event.structureId,
      structureName: event.structureName,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      estimatedBudget: event.estimatedBudget,
      actualSpend: 0,
      estimatedFootfall: event.estimatedFootfall,
      description: event.description,
      status: "Draft",
      organizer: event.organizer,
      capacity: event.capacity,
      linkedSeva: event.linkedSeva || [],
    });
    toast.success("Event duplicated");
    navigate(`/temple/events/${newEvent.id}`);
  };

  const handleExportReport = () => {
    // Mock data for report
    const reportData = {
      eventName: event.name,
      eventId: event.id,
      dates: `${event.startDate} to ${event.endDate}`,
      totalBookings: sevas.reduce((sum, s) => sum + (s.capacity || 0), 0),
      totalDonations: 0, // Would come from donation module
      totalRevenue: 0, // Would come from booking module
      totalExpenses: totalExpenses,
      netSurplus: 0 - totalExpenses,
      attendanceCount: 0, // Would come from attendance module
      feedbackSentiment: 85, // Would come from feedback module
      complaintCount: 0, // Would come from feedback module
    };

    // Generate CSV
    const csv = [
      ["Event Report", ""],
      ["Event Name", reportData.eventName],
      ["Event ID", reportData.eventId],
      ["Dates", reportData.dates],
      ["", ""],
      ["Financial Summary", ""],
      ["Total Bookings", reportData.totalBookings],
      ["Total Donations", reportData.totalDonations],
      ["Total Revenue", reportData.totalRevenue],
      ["Total Expenses", reportData.totalExpenses],
      ["Net Surplus/Deficit", reportData.netSurplus],
      ["", ""],
      ["Performance Metrics", ""],
      ["Attendance Count", reportData.attendanceCount],
      ["Feedback Sentiment %", reportData.feedbackSentiment],
      ["Complaint Count", reportData.complaintCount],
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `event-report-${event.id}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    toast.success("Report exported as CSV");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/temple/events")}><ArrowLeft className="h-4 w-4" /></Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{event.name}</h1>
                <Badge className={`${statusColors[event.status] || "bg-gray-100 text-gray-700"} border-0`}>{event.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {event.id} • {event.type} • {event.structureName} • {event.startDate}{event.startDate !== event.endDate ? ` → ${event.endDate}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {canPublish && (
              <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />Publish Event
              </Button>
            )}
            {canArchive && (
              <Button variant="outline" onClick={handleArchive}>
                <Archive className="h-4 w-4 mr-2" />Archive
              </Button>
            )}
            {event.status === "Completed" && (
              <Button variant="outline" onClick={handleDuplicate}>
                <Copy className="h-4 w-4 mr-2" />Duplicate
              </Button>
            )}
            {event.status === "Completed" || event.status === "Archived" ? (
              <Button variant="outline" onClick={handleExportReport}>
                <Download className="h-4 w-4 mr-2" />Export Report
              </Button>
            ) : null}
          </div>
        </div>

        {/* Workflow Phase Indicator */}
        <Card className="bg-muted/30">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{getWorkflowPhase()}</span>
              </div>
              {isReadOnly && (
                <Badge variant="outline" className="text-xs">Read-Only (Archived)</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {event.status !== "Completed" && event.status !== "Archived" && openTasks.length > 0 && (
          <div className="text-xs text-amber-600 flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-lg p-2">
            <AlertTriangle className="h-3 w-3" />{openTasks.length} open task(s) — complete tasks before closing event
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent flex-wrap">
          <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">Overview</TabsTrigger>
          <TabsTrigger value="sevas" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">Seva & Darshan</TabsTrigger>
          <TabsTrigger value="freelancers" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">Freelancers</TabsTrigger>
          <TabsTrigger value="volunteers" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">Volunteers</TabsTrigger>
          <TabsTrigger value="materials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">Materials</TabsTrigger>
          <TabsTrigger value="kitchen" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">Kitchen / Annadanam</TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">Tasks</TabsTrigger>
          <TabsTrigger value="expenses" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">Expenses</TabsTrigger>
          <TabsTrigger value="summary" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:font-medium px-4 py-2 text-sm text-muted-foreground">Reports</TabsTrigger>
        </TabsList>

        {/* ===== OVERVIEW ===== */}
        <TabsContent value="overview">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-sm">Basic Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-muted-foreground text-xs">Type</p><p>{event.type}</p></div>
                  <div><p className="text-muted-foreground text-xs">Structure</p><p>{event.structureName}</p></div>
                  <div><p className="text-muted-foreground text-xs">Start Date</p><p>{event.startDate}</p></div>
                  <div><p className="text-muted-foreground text-xs">End Date</p><p>{event.endDate}</p></div>
                  <div><p className="text-muted-foreground text-xs">Footfall</p><p>{event.estimatedFootfall}/day</p></div>
                  <div><p className="text-muted-foreground text-xs">Created By</p><p>{event.createdBy}</p></div>
                </div>
              </div>
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-sm">Description</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-sm">Budget Summary</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-muted-foreground text-xs">Estimated Budget</p><p className="text-lg font-bold">₹{(event.estimatedBudget / 100000).toFixed(1)}L</p></div>
                  <div><p className="text-muted-foreground text-xs">Actual Spend</p><p className="text-lg font-bold">₹{(totalExpenses / 100000).toFixed(1)}L</p></div>
                  <div><p className="text-muted-foreground text-xs">Remaining</p><p className={`text-lg font-bold ${event.estimatedBudget - totalExpenses < 0 ? "text-destructive" : "text-green-600"}`}>₹{((event.estimatedBudget - totalExpenses) / 100000).toFixed(1)}L</p></div>
                  <div><p className="text-muted-foreground text-xs">Utilization</p><p className="text-lg font-bold">{event.estimatedBudget > 0 ? ((totalExpenses / event.estimatedBudget) * 100).toFixed(0) : 0}%</p></div>
                </div>
              </div>
              <div className="border rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-sm">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-muted-foreground text-xs">Sevas Linked</p><p className="font-medium">{sevas.length}</p></div>
                  <div><p className="text-muted-foreground text-xs">Freelancers</p><p className="font-medium">{freelancers.length}</p></div>
                  <div><p className="text-muted-foreground text-xs">Volunteers</p><p className="font-medium">{totalVolunteers}</p></div>
                  <div><p className="text-muted-foreground text-xs">Open Tasks</p><p className="font-medium">{openTasks.length}</p></div>
                  <div><p className="text-muted-foreground text-xs">Material Shortages</p><p className={`font-medium ${materialShortages.length > 0 ? "text-amber-600" : "text-green-600"}`}>{materialShortages.length}</p></div>
                  <div><p className="text-muted-foreground text-xs">Kitchen Batches</p><p className="font-medium">{batches.length}</p></div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ===== SEVA & DARSHAN ===== */}
        <TabsContent value="sevas">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Seva & Darshan Schedule</h3>
                <p className="text-xs text-muted-foreground mt-1">Phase 2.1: Attach Sevas to enable booking</p>
              </div>
              {!isReadOnly && (
                <Button size="sm" onClick={() => setShowSevaDialog(true)}><Plus className="h-4 w-4 mr-2" />Attach Seva</Button>
              )}
            </div>
            {sevas.some(s => s.conflict) && (
              <div className="border border-amber-200 bg-amber-50 rounded-lg p-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-800">Schedule conflict detected — review overlapping sevas.</span>
              </div>
            )}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Seva / Darshan</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Booking</TableHead>
                    <TableHead>Priest</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sevas.length === 0 ? (
                    <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No sevas attached yet</TableCell></TableRow>
                  ) : sevas.map(s => (
                    <TableRow key={s.id} className={s.conflict ? "bg-amber-50/50" : ""}>
                      <TableCell className="font-medium flex items-center gap-2">
                        {s.conflict && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                        {s.sevaName}
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{s.sevaType}</Badge></TableCell>
                      <TableCell className="text-sm">{s.date}</TableCell>
                      <TableCell className="text-sm">{s.time}</TableCell>
                      <TableCell className="text-sm">{s.capacity.toLocaleString()}</TableCell>
                      <TableCell><Badge variant={s.bookingRequired ? "default" : "secondary"} className="text-xs">{s.bookingRequired ? "Required" : "Open"}</Badge></TableCell>
                      <TableCell className="text-sm">{s.priest}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs border-0 ${s.status === "Confirmed" ? "bg-green-100 text-green-700" : s.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                          {s.status === "Confirmed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {s.status === "Pending" && <Clock className="h-3 w-3 mr-1" />}
                          {s.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* ===== FREELANCERS ===== */}
        <TabsContent value="freelancers">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Freelancer Assignments</h3>
                <p className="text-xs text-muted-foreground">Each assignment auto-generates a linked Task</p>
              </div>
              <Button size="sm" onClick={() => setShowFreelancerDialog(true)}><Plus className="h-4 w-4 mr-2" />Assign Freelancer</Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead className="text-right">Payment</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Linked Task</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {freelancers.length === 0 ? (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No freelancers assigned</TableCell></TableRow>
                  ) : freelancers.map((f, i) => {
                    const ref = freelancerRefs.find(r => r.id === f.freelancerId);
                    return (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{f.freelancerName}</TableCell>
                        <TableCell className="text-sm">{f.role}</TableCell>
                        <TableCell className="text-sm">{f.dates}</TableCell>
                        <TableCell className="text-right font-medium">₹{f.agreedPayment.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star key={s} className={`h-3 w-3 ${s <= Math.round(ref?.rating ?? 0) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell><Badge variant={f.status === "Confirmed" ? "default" : "secondary"} className="text-xs">{f.status}</Badge></TableCell>
                        <TableCell>{f.taskId ? <span className="text-xs font-mono text-primary flex items-center gap-1"><Link2 className="h-3 w-3" />{f.taskId}</span> : "—"}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-muted-foreground">Total Cost: <strong>₹{totalFreelancerCost.toLocaleString()}</strong> • {freelancers.length} freelancers</p>
          </div>
        </TabsContent>

        {/* ===== VOLUNTEERS ===== */}
        <TabsContent value="volunteers">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Volunteer Allocation</h3>
              <Button size="sm" onClick={() => setShowVolunteerDialog(true)}><Plus className="h-4 w-4 mr-2" />Add Role</Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-center">Count</TableHead>
                    <TableHead>Shift Timing</TableHead>
                    <TableHead>Assigned Area</TableHead>
                    <TableHead>Linked Task</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {volunteers.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No volunteers assigned</TableCell></TableRow>
                  ) : volunteers.map((v, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{v.role}</TableCell>
                      <TableCell className="text-center font-medium">{v.count}</TableCell>
                      <TableCell className="text-sm">{v.shift}</TableCell>
                      <TableCell className="text-sm">{v.area}</TableCell>
                      <TableCell>{v.taskId ? <span className="text-xs font-mono text-primary flex items-center gap-1"><Link2 className="h-3 w-3" />{v.taskId}</span> : "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs text-muted-foreground">Total: <strong>{totalVolunteers}</strong> volunteers across {volunteers.length} roles</p>
          </div>
        </TabsContent>

        {/* ===== MATERIALS ===== */}
        <TabsContent value="materials">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Material Allocation from Inventory</h3>
              <Button size="sm" onClick={() => setShowMaterialDialog(true)}><Plus className="h-4 w-4 mr-2" />Allocate Material</Button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead className="text-right">Required</TableHead>
                    <TableHead className="text-right">In Stock</TableHead>
                    <TableHead className="text-right">Allocated</TableHead>
                    <TableHead className="text-right">Deficit</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.length === 0 ? (
                    <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No materials allocated</TableCell></TableRow>
                  ) : materials.map((m, i) => {
                    const inv = inventoryItems.find(inv => inv.id === m.inventoryId);
                    const deficit = m.requiredQty - m.allocatedQty;
                    return (
                      <TableRow key={i} className={deficit > 0 ? "bg-amber-50/50" : ""}>
                        <TableCell className="font-medium">{m.inventoryName}</TableCell>
                        <TableCell className="text-right">{m.requiredQty.toLocaleString()} {m.unit}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{inv?.currentStock.toLocaleString() ?? "—"} {m.unit}</TableCell>
                        <TableCell className="text-right font-medium">{m.allocatedQty.toLocaleString()} {m.unit}</TableCell>
                        <TableCell className="text-right">
                          {deficit > 0 ? <span className="text-amber-600 font-medium">{deficit.toLocaleString()} {m.unit}</span> : <span className="text-green-600">✓</span>}
                        </TableCell>
                        <TableCell><Badge variant={m.source === "Stock" ? "default" : "secondary"} className="text-xs">{m.source}</Badge></TableCell>
                        <TableCell>
                          <Badge className={`text-xs border-0 ${deficit > 0 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                            {deficit > 0 ? "Shortage" : "Ready"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            {materialShortages.length > 0 && (
              <div className="border border-amber-200 rounded-lg p-3 bg-amber-50/50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-800">Shortage Alerts → Tasks Auto-Generated</span>
                </div>
                <div className="space-y-1 text-sm text-amber-700">
                  {materialShortages.map((m, i) => (
                    <p key={i}>• {m.inventoryName}: Need {(m.requiredQty - m.allocatedQty).toLocaleString()} {m.unit} more</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* ===== KITCHEN / ANNADANAM ===== */}
        <TabsContent value="kitchen">
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Kitchen / Annadanam</h3>
            {kitchenLinks.length > 0 && (
              <div className="border rounded-lg p-4 space-y-3">
                {kitchenLinks.map(k => (
                  <div key={k.id} className="grid grid-cols-2 gap-3 text-sm">
                    <div><p className="text-muted-foreground text-xs">Est. Beneficiaries</p><p className="font-medium">{k.estimatedBeneficiaries.toLocaleString()}</p></div>
                    <div><p className="text-muted-foreground text-xs">Menu</p><p>{k.menu}</p></div>
                    <div><p className="text-muted-foreground text-xs">Ingredient Request</p><Badge variant={k.ingredientRequestStatus === "Fulfilled" ? "default" : "secondary"} className="text-xs">{k.ingredientRequestStatus}</Badge></div>
                  </div>
                ))}
              </div>
            )}
            {batches.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Prasadam</TableHead>
                      <TableHead>Date/Time</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Allocated</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batches.map(b => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.prasadam}</TableCell>
                        <TableCell className="text-sm">{b.date} {b.time}</TableCell>
                        <TableCell className="text-right">{b.qty.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{b.allocated.toLocaleString()}</TableCell>
                        <TableCell><Badge variant={b.status === "Active" ? "default" : "secondary"} className="text-xs">{b.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-8 text-center border rounded-lg">No kitchen batches linked yet</p>
            )}
          </div>
        </TabsContent>

        {/* ===== TASKS ===== */}
        <TabsContent value="tasks">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Linked Tasks</h3>
                <p className="text-xs text-muted-foreground">Auto-generated + manual tasks linked to this event</p>
              </div>
              {openTasks.length > 0 && (
                <Badge variant="outline" className="text-amber-600 border-amber-200">{openTasks.length} open — cannot close event</Badge>
              )}
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No tasks linked</TableCell></TableRow>
                  ) : tasks.map(t => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium text-sm">{t.title}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{t.sourceModule}</Badge></TableCell>
                      <TableCell className="text-sm">{t.assignedTo}</TableCell>
                      <TableCell className="text-sm">{t.dueDate}</TableCell>
                      <TableCell><Badge className={`text-xs border-0 ${priorityColors[t.priority]}`}>{t.priority}</Badge></TableCell>
                      <TableCell>
                        <Badge className={`text-xs border-0 ${t.status === "Completed" ? "bg-green-100 text-green-700" :
                            status === "In Progress" ? "bg-blue-100 text-blue-700" :
                              t.atus === "Overdue" ? "bg-red-100 text-red-700" :
                                "bg-ted text-muted-foreground"
                          }`}>{t.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* ===== EXPENSES ===== */}
        <TabsContent value="expenses">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">Event Expenses</h3>
                <p className="text-xs text-muted-foreground mt-1">Phase 3.2: Track all event expenses</p>
              </div>
              {!isReadOnly && event.status !== "Completed" && (
                <Button size="sm" onClick={() => setShowExpenseDialog(true)}><Plus className="h-4 w-4 mr-2" />Add Expense</Button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="text-lg font-bold">₹{(event.estimatedBudget / 100000).toFixed(1)}L</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Actual Spend</p>
                <p className="text-lg font-bold">₹{(totalExpenses / 100000).toFixed(1)}L</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Variance</p>
                <p className={`text-lg font-bold ${totalExpenses > event.estimatedBudget ? "text-destructive" : "text-green-600"}`}>
                  {totalExpenses > event.estimatedBudget ? "-" : "+"}₹{(Math.abs(event.estimatedBudget - totalExpenses) / 100000).toFixed(1)}L
                </p>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No expenses recorded</TableCell></TableRow>
                  ) : expenses.map(e => (
                    <TableRow key={e.id}>
                      <TableCell><Badge variant="outline" className="text-xs">{e.category}</Badge></TableCell>
                      <TableCell className="text-sm">{e.description}</TableCell>
                      <TableCell className="text-sm">{e.vendor}</TableCell>
                      <TableCell className="text-right font-medium">₹{e.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-sm">{e.date}</TableCell>
                      <TableCell>
                        <Badge className={`text-xs border-0 ${e.status === "Paid" ? "bg-green-100 text-green-700" : e.status === "Approved" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{e.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* ===== REPORTS / SUMMARY ===== */}
        <TabsContent value="summary">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">Event Performance Report</h3>
              <Button onClick={handleExportReport} variant="outline">
                <Download className="h-4 w-4 mr-2" />Export Report (CSV)
              </Button>
            </div>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold">{sevas.reduce((sum, s) => sum + (s.capacity || 0), 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Seva slots</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Donations</p>
                    <p className="text-2xl font-bold text-green-600">₹0</p>
                    <p className="text-xs text-muted-foreground">From donation module</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">₹0</p>
                    <p className="text-xs text-muted-foreground">From booking module</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{expenses.length} expense(s)</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Net Surplus / Deficit</span>
                  <span className={`text-2xl font-bold ${totalExpenses > 0 ? "text-red-600" : "text-green-600"}`}>
                    ₹{(0 - totalExpenses).toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Attendance Count</p>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-xs text-muted-foreground">From attendance module</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Feedback Sentiment %</p>
                    <p className="text-2xl font-bold text-green-600">85%</p>
                    <p className="text-xs text-muted-foreground">From feedback module</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Complaint Count</p>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-xs text-muted-foreground">From feedback module</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Utilization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />Resource Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Sevas Linked</p>
                    <p className="text-xl font-bold">{sevas.length}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Freelancers Assigned</p>
                    <p className="text-xl font-bold">{freelancers.length}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Volunteers</p>
                    <p className="text-xl font-bold">{totalVolunteers}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Materials Allocated</p>
                    <p className="text-xl font-bold">{materials.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Event Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="font-medium">Event Created</p>
                      <p className="text-xs text-muted-foreground">{event.createdAt} by {event.createdBy}</p>
                    </div>
                  </div>
                  {event.status !== "Draft" && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="font-medium">Event Published</p>
                        <p className="text-xs text-muted-foreground">Status: {event.status}</p>
                      </div>
                    </div>
                  )}
                  {event.status === "Ongoing" && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <div className="flex-1">
                        <p className="font-medium">Event Started</p>
                        <p className="text-xs text-muted-foreground">Currently ongoing</p>
                      </div>
                    </div>
                  )}
                  {event.status === "Completed" && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <div className="flex-1">
                        <p className="font-medium">Event Completed</p>
                        <p className="text-xs text-muted-foreground">Ended on {event.endDate}</p>
                      </div>
                    </div>
                  )}
                  {event.status === "Archived" && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                      <div className="flex-1">
                        <p className="font-medium">Event Archived</p>
                        <p className="text-xs text-muted-foreground">Read-only access</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* ===== DIALOGS ===== */}
      {/* Attach Seva Dialog */}
      <Dialog open={showSevaDialog} onOpenChange={setShowSevaDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Attach Seva / Darshan</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-xs">Seva / Darshan</Label><SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select from master" options={sevaOptions} onAddNew={v => setSevaOptions(p => [...p, v])} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Date</Label><Input type="date" /></div>
              <div><Label className="text-xs">Time</Label><Input type="time" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Capacity</Label><Input type="number" placeholder="e.g. 500" /></div>
              <div><Label className="text-xs">Booking Required</Label><SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select" options={["Yes", "No"]} onAddNew={() => { }} /></div>
            </div>
            <div><Label className="text-xs">Assigned Priest</Label><Input placeholder="Priest name" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSevaDialog(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Seva attached"); setShowSevaDialog(false); }}>Attach</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Freelancer Dialog */}
      <Dialog open={showFreelancerDialog} onOpenChange={setShowFreelancerDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Assign Freelancer</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-xs">Freelancer</Label><SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select freelancer" options={freelancerOptions} onAddNew={v => setFreelancerOptions(p => [...p, v])} /></div>
            <div><Label className="text-xs">Role / Service</Label><SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select role" options={roleOptions} onAddNew={v => setRoleOptions(p => [...p, v])} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Start Date</Label><Input type="date" /></div>
              <div><Label className="text-xs">End Date</Label><Input type="date" /></div>
            </div>
            <div><Label className="text-xs">Agreed Payment (₹)</Label><Input type="number" placeholder="Amount" /></div>
            <div className="border rounded-lg p-3 bg-muted/30 text-xs text-muted-foreground">
              <ClipboardList className="h-4 w-4 inline mr-1" /> A task will be auto-generated for this assignment.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFreelancerDialog(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Freelancer assigned & task generated"); setShowFreelancerDialog(false); }}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Volunteer Dialog */}
      <Dialog open={showVolunteerDialog} onOpenChange={setShowVolunteerDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add Volunteer Role</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-xs">Role</Label><SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select role" options={volunteerRoleOptions} onAddNew={v => setVolunteerRoleOptions(p => [...p, v])} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Count</Label><Input type="number" placeholder="e.g. 50" /></div>
              <div><Label className="text-xs">Shift</Label><Input placeholder="e.g. 6 AM – 2 PM" /></div>
            </div>
            <div><Label className="text-xs">Structure</Label><SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select structure" options={structures.map(s => s.name)} onAddNew={() => { }} /></div>
            <div><Label className="text-xs">Assigned Area</Label><SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select area" options={areaOptions} onAddNew={v => setAreaOptions(p => [...p, v])} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVolunteerDialog(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Volunteer role added & task generated"); setShowVolunteerDialog(false); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Allocate Material Dialog */}
      <Dialog open={showMaterialDialog} onOpenChange={setShowMaterialDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Allocate Material from Inventory</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-xs">Material (from Inventory)</Label>
              <SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select inventory item" options={inventoryItems.map(i => `${i.id} – ${i.name} (${i.currentStock} ${i.unit})`)} onAddNew={() => { }} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Required Qty</Label><Input type="number" placeholder="e.g., 200" /></div>
              <div><Label className="text-xs">Unit</Label><Input placeholder="kg / ltr / pcs" /></div>
            </div>
            <div className="border rounded-lg p-3 bg-muted/30 text-xs text-muted-foreground">
              <Package className="h-4 w-4 inline mr-1" /> If stock insufficient, a procurement task will be auto-generated.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMaterialDialog(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Material allocated & stock checked"); setShowMaterialDialog(false); }}>Allocate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Expense Dialog */}
      <Dialog open={showExpenseDialog} onOpenChange={setShowExpenseDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add Expense</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><Label className="text-xs">Category</Label><SelectWithAddNew value="" onValueChange={() => { }} placeholder="Select category" options={expenseCatOptions} onAddNew={v => setExpenseCatOptions(p => [...p, v])} /></div>
            <div><Label className="text-xs">Description</Label><Input placeholder="Expense description" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Amount (₹)</Label><Input type="number" placeholder="Amount" /></div>
              <div><Label className="text-xs">Vendor</Label><Input placeholder="Vendor name" /></div>
            </div>
            <div><Label className="text-xs">Date</Label><Input type="date" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExpenseDialog(false)}>Cancel</Button>
            <Button onClick={() => { toast.success("Expense recorded"); setShowExpenseDialog(false); }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetails;

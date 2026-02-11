import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Eye } from "lucide-react";
import { eventTypes, structures } from "@/data/eventData";
import SelectWithAddNew from "@/components/SelectWithAddNew";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";
import { eventActions, useEvents } from "@/modules/events/hooks";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Ongoing: "bg-green-100 text-green-700",
  Completed: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
  Archived: "bg-gray-200 text-gray-600",
};

const AllEvents = () => {
  const navigate = useNavigate();
  const events = useEvents();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [typeOptions, setTypeOptions] = useState<string[]>([...eventTypes]);
  const [structureOptions, setStructureOptions] = useState(structures.map(s => s.name));
  const [formType, setFormType] = useState("");
  const [formStructure, setFormStructure] = useState("");
  const [formName, setFormName] = useState("");
  const [formStartDate, setFormStartDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formBudget, setFormBudget] = useState("");
  const [formFootfall, setFormFootfall] = useState("");
  const [formOrganizer, setFormOrganizer] = useState("");
  const [formCapacity, setFormCapacity] = useState("");
  const [formDescription, setFormDescription] = useState("");

  const filtered = events.filter(e => {
    if (e.status === "Archived") return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter && e.type !== typeFilter) return false;
    if (statusFilter && e.status !== statusFilter) return false;
    return true;
  });

  const stats = [
    { label: "Total Events", value: events.filter(e => e.status !== "Archived").length.toString(), sub: "This year" },
    { label: "Ongoing", value: events.filter(e => e.status === "Ongoing").length.toString(), sub: "Currently active" },
    { label: "Scheduled", value: events.filter(e => e.status === "Scheduled").length.toString(), sub: "Upcoming" },
    { label: "Total Budget", value: `₹${(events.reduce((a, e) => a + e.estimatedBudget, 0) / 100000).toFixed(1)}L`, sub: "All events" },
  ];

  const structureId = useMemo(() => {
    const s = structures.find((x) => x.name === formStructure);
    return s?.id ?? "STR-001";
  }, [formStructure]);

  function resetForm() {
    setFormName("");
    setFormType("");
    setFormStructure("");
    setFormStartDate("");
    setFormEndDate("");
    setFormBudget("");
    setFormFootfall("");
    setFormOrganizer("");
    setFormCapacity("");
    setFormDescription("");
    setCustomFields([]);
  }

  function onCreateEvent() {
    if (!formName.trim()) {
      toast.error("Event name is required");
      return;
    }
    if (!formType) {
      toast.error("Event type is required");
      return;
    }
    if (!formStructure) {
      toast.error("Structure is required");
      return;
    }
    if (!formStartDate) {
      toast.error("Start date is required");
      return;
    }

    const ev = eventActions.createEvent({
      name: formName.trim(),
      type: formType as any,
      templeId: "TMP-001",
      structureId,
      structureName: formStructure,
      startDate: formStartDate,
      endDate: formEndDate || formStartDate,
      estimatedBudget: Number(formBudget || 0),
      actualSpend: 0,
      estimatedFootfall: formFootfall || "—",
      description: formDescription || "",
      status: "Draft",
      organizer: formOrganizer || "—",
      capacity: Number(formCapacity || 0),
      linkedSeva: [],
    });

    setDialogOpen(false);
    resetForm();
    toast.success("Event created");
    navigate(`/temple/events/${ev.id}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Events</h1>
          <p className="text-sm text-muted-foreground mt-1">Create, configure, and manage temple events</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Create Event</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>Event Name</Label>
                <Input placeholder="e.g. Brahmotsavam 2026" value={formName} onChange={(e) => setFormName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Event Type</Label>
                <SelectWithAddNew value={formType} onValueChange={setFormType} placeholder="Select type" options={typeOptions} onAddNew={v => setTypeOptions(p => [...p, v])} />
              </div>
              <div className="space-y-2">
                <Label>Temple ID</Label>
                <Input value="TMP-001" readOnly className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Structure</Label>
                <SelectWithAddNew value={formStructure} onValueChange={setFormStructure} placeholder="Select structure" options={structureOptions} onAddNew={v => setStructureOptions(p => [...p, v])} />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="date" value={formStartDate} onChange={(e) => setFormStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input type="date" value={formEndDate} onChange={(e) => setFormEndDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Estimated Budget (₹)</Label>
                <Input type="number" placeholder="e.g. 500000" value={formBudget} onChange={(e) => setFormBudget(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Estimated Daily Footfall</Label>
                <Input type="number" placeholder="e.g. 50000" value={formFootfall} onChange={(e) => setFormFootfall(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Organizer</Label>
                <Input placeholder="e.g. Festival Committee" value={formOrganizer} onChange={(e) => setFormOrganizer(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Input type="number" placeholder="e.g. 100000" value={formCapacity} onChange={(e) => setFormCapacity(e.target.value)} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Event description and objectives..." rows={3} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} />
              </div>
              <div className="col-span-2">
                <CustomFieldsSection fields={customFields} onFieldsChange={setCustomFields} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => { setDialogOpen(false); resetForm(); }}>Cancel</Button>
              <Button onClick={onCreateEvent}>Create Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Events</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search events..." className="pl-9 h-9 w-64" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <SelectWithAddNew value={typeFilter} onValueChange={setTypeFilter} placeholder="All Types" options={["All Types", ...eventTypes]} onAddNew={() => { }} className="h-9 w-36" />
              <SelectWithAddNew value={statusFilter} onValueChange={setStatusFilter} placeholder="All Status" options={["All Status", "Draft", "Scheduled", "Ongoing", "Completed", "Cancelled"]} onAddNew={() => { }} className="h-9 w-36" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Structure</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Footfall</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((event) => (
                <TableRow key={event.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/temple/events/${event.id}`)}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{event.type}</Badge></TableCell>
                  <TableCell className="text-sm">{event.structureName}</TableCell>
                  <TableCell className="text-sm">
                    {event.startDate !== event.endDate ? `${event.startDate} → ${event.endDate}` : event.startDate}
                  </TableCell>
                  <TableCell className="text-sm">₹{(event.estimatedBudget / 100000).toFixed(1)}L</TableCell>
                  <TableCell className="text-sm">{event.estimatedFootfall}/day</TableCell>
                  <TableCell>
                    <Badge className={`${statusColors[event.status]} border-0 text-xs`}>{event.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/temple/events/${event.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllEvents;

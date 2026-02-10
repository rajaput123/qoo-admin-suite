import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileStack, Play, Copy, Pencil, Clock, List, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialTemplates = [
  {
    id: "TPL-001",
    name: "Morning Temple Opening",
    category: "Ritual",
    defaultRole: "Temple Priest",
    timeline: "Daily 4:00–6:00 AM",
    taskCount: 8,
    tasks: ["Unlock main doors", "Light main lamp", "Clean sanctum", "Prepare flowers", "Sound conch", "Abhishekam setup", "Bell ringing ceremony", "Open devotee entry"],
    lastUsed: "Today",
    usageCount: 365,
  },
  {
    id: "TPL-002",
    name: "Daily Annadanam Preparation",
    category: "Kitchen",
    defaultRole: "Head Cook",
    timeline: "Daily 8:00–11:00 AM",
    taskCount: 6,
    tasks: ["Ingredient check & requisition", "Kitchen cleaning", "Cooking start", "Quality check", "Serving counter setup", "Vessel washing allocation"],
    lastUsed: "Today",
    usageCount: 340,
  },
  {
    id: "TPL-003",
    name: "Festival Setup",
    category: "Event",
    defaultRole: "Event Coordinator",
    timeline: "D-2 to D-Day",
    taskCount: 12,
    tasks: ["Venue decoration", "Sound system setup", "Barricade placement", "Volunteer briefing", "Kitchen scaling", "Prasadam batch planning", "Security deployment", "VIP arrangement", "Medical setup", "Crowd control points", "Parking arrangement", "Emergency exits check"],
    lastUsed: "Feb 05",
    usageCount: 24,
  },
  {
    id: "TPL-004",
    name: "Event Cleanup",
    category: "Event",
    defaultRole: "Maintenance Team",
    timeline: "D+1, 6:00 AM–12:00 PM",
    taskCount: 7,
    tasks: ["Decoration removal", "Venue cleaning", "Waste disposal", "Equipment return", "Inventory reconciliation", "Damage assessment", "Report submission"],
    lastUsed: "Feb 06",
    usageCount: 22,
  },
  {
    id: "TPL-005",
    name: "Weekly Maintenance Inspection",
    category: "Maintenance",
    defaultRole: "Maintenance Supervisor",
    timeline: "Every Monday 7:00–10:00 AM",
    taskCount: 9,
    tasks: ["Electrical systems check", "Plumbing inspection", "CCTV verification", "Fire safety check", "AC/ventilation check", "Water quality test", "Pest control review", "Garden maintenance", "Report filing"],
    lastUsed: "Feb 03",
    usageCount: 52,
  },
];

const TaskTemplates = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof initialTemplates[0] | null>(null);
  const { toast } = useToast();

  const handleGenerateTasks = (e: React.MouseEvent, tpl: typeof initialTemplates[0]) => {
    e.stopPropagation();
    toast({
      title: `${tpl.taskCount} tasks generated`,
      description: `Created from "${tpl.name}" template and added to Task List`,
    });
  };

  const handleGenerateFromDetail = () => {
    if (!selectedTemplate) return;
    toast({
      title: `${selectedTemplate.taskCount} tasks generated`,
      description: `Created from "${selectedTemplate.name}" template and added to Task List`,
    });
    setSelectedTemplate(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Task Templates</h1>
          <p className="text-muted-foreground text-sm mt-1">Reusable task patterns for recurring operations</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> New Template</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Task Template</DialogTitle>
                <DialogDescription>Define a reusable task pattern for recurring operations</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5"><Label>Template Name</Label><Input placeholder="e.g., Morning Temple Opening" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Default Category</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {["Ritual", "Kitchen", "Event", "Maintenance", "Admin", "Security"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Default Role (from HR)</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {["Temple Priest", "Head Cook", "Event Coordinator", "Maintenance Supervisor", "Security Officer"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5"><Label>Default Timeline</Label><Input placeholder="e.g., Daily 4:00–6:00 AM" /></div>
                <div className="space-y-1.5">
                  <Label>Task Items</Label>
                  <p className="text-xs text-muted-foreground">Add individual tasks that this template generates</p>
                  <div className="border rounded-lg p-3 bg-muted/30 space-y-2">
                    {["Task 1", "Task 2", "Task 3"].map((_, i) => (
                      <Input key={i} placeholder={`Task ${i + 1} title`} />
                    ))}
                    <Button variant="outline" size="sm" className="w-full gap-1"><Plus className="h-3 w-3" /> Add Task</Button>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                  <Button onClick={() => { setCreateOpen(false); toast({ title: "Template created", description: "New task template has been saved" }); }}>Create Template</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Template Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialTemplates.map((tpl) => (
          <Card key={tpl.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedTemplate(tpl)}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileStack className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm font-semibold">{tpl.name}</CardTitle>
                </div>
                <Badge variant="outline" className="text-[10px]">{tpl.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><List className="h-3 w-3" /> {tpl.taskCount} tasks</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {tpl.timeline}</span>
              </div>
              <p className="text-xs text-muted-foreground">Default: {tpl.defaultRole}</p>
              <div className="flex items-center justify-between pt-1 border-t">
                <span className="text-[10px] text-muted-foreground">Used {tpl.usageCount} times • Last: {tpl.lastUsed}</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" title="Generate Tasks" onClick={(e) => handleGenerateTasks(e, tpl)}>
                    <Play className="h-3.5 w-3.5 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" title="Duplicate" onClick={(e) => { e.stopPropagation(); toast({ title: "Template duplicated" }); }}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Detail Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileStack className="h-5 w-5 text-primary" />
              {selectedTemplate?.name}
            </DialogTitle>
            <DialogDescription>Template details and task checklist</DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{selectedTemplate.category}</Badge>
                <Badge variant="secondary">{selectedTemplate.defaultRole}</Badge>
                <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />{selectedTemplate.timeline}</Badge>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Task Checklist ({selectedTemplate.taskCount} items)</h4>
                <div className="border rounded-lg divide-y">
                  {selectedTemplate.tasks.map((task, i) => (
                    <div key={i} className="px-3 py-2 flex items-center gap-2 text-sm">
                      <span className="text-xs font-mono text-muted-foreground w-5">{i + 1}.</span>
                      {task}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" className="gap-1"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                <Button onClick={handleGenerateFromDetail} className="gap-1"><Play className="h-3.5 w-3.5" /> Generate Tasks</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskTemplates;

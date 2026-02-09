import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Play, AlertOctagon, Clock, ArrowRight, User, StickyNote, Paperclip } from "lucide-react";

type TaskStatus = "Open" | "In Progress" | "Completed" | "Blocked";

interface Task {
  id: string;
  title: string;
  category: string;
  priority: string;
  assignee: string;
  status: TaskStatus;
  dueDate: string;
  notes: string;
  completedBy?: string;
  completionDate?: string;
  completionNotes?: string;
}

const initialTasks: Task[] = [
  { id: "TSK-001", title: "Morning Abhishekam Preparation", category: "Ritual", priority: "High", assignee: "Pandit Sharma", status: "In Progress", dueDate: "2026-02-09", notes: "Ensure all vessels are ready by 4:30 AM" },
  { id: "TSK-002", title: "Annadanam Kitchen Setup", category: "Kitchen", priority: "Critical", assignee: "Head Cook Team", status: "Open", dueDate: "2026-02-09", notes: "Prepare for 5000 devotees" },
  { id: "TSK-003", title: "Main Hall Flower Decoration", category: "Event", priority: "High", assignee: "Decoration Volunteers", status: "In Progress", dueDate: "2026-02-09", notes: "Maha Shivaratri decoration" },
  { id: "TSK-004", title: "Security Gate Check", category: "Security", priority: "Medium", assignee: "Security Team A", status: "Completed", dueDate: "2026-02-09", notes: "", completedBy: "Rajesh K", completionDate: "2026-02-09 06:30", completionNotes: "All 4 gates checked and cleared." },
  { id: "TSK-005", title: "Generator Maintenance", category: "Maintenance", priority: "High", assignee: "Electrical Team", status: "Blocked", dueDate: "2026-02-07", notes: "Spare parts awaited from supplier" },
  { id: "TSK-006", title: "Prasadam Counter Restock", category: "Kitchen", priority: "Medium", assignee: "Counter Staff", status: "Open", dueDate: "2026-02-09", notes: "" },
  { id: "TSK-010", title: "Evening Aarti Sound System Test", category: "Ritual", priority: "Medium", assignee: "AV Volunteer", status: "Completed", dueDate: "2026-02-09", notes: "", completedBy: "Venkat S", completionDate: "2026-02-09 15:00", completionNotes: "All speakers working. Mic replaced." },
];

const statusFlow: Record<string, { next: TaskStatus[]; color: string; icon: typeof Clock }> = {
  Open: { next: ["In Progress"], color: "bg-blue-100 text-blue-700", icon: Clock },
  "In Progress": { next: ["Completed", "Blocked"], color: "bg-amber-100 text-amber-700", icon: Play },
  Completed: { next: [], color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  Blocked: { next: ["In Progress"], color: "bg-red-100 text-red-700", icon: AlertOctagon },
};

const priorityColor: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const TaskExecution = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [completeDialog, setCompleteDialog] = useState<Task | null>(null);
  const [statusTab, setStatusTab] = useState("all");

  const counts = {
    all: tasks.length,
    Open: tasks.filter((t) => t.status === "Open").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
    Blocked: tasks.filter((t) => t.status === "Blocked").length,
  };

  const filteredTasks = statusTab === "all" ? tasks : tasks.filter((t) => t.status === statusTab);

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    if (newStatus === "Completed") {
      const task = tasks.find((t) => t.id === taskId);
      if (task) setCompleteDialog(task);
      return;
    }
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  const handleComplete = () => {
    if (!completeDialog) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === completeDialog.id
          ? { ...t, status: "Completed" as TaskStatus, completedBy: t.assignee, completionDate: new Date().toISOString().slice(0, 16).replace("T", " "), completionNotes: "Marked complete" }
          : t
      )
    );
    setCompleteDialog(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Execution & Status</h1>
        <p className="text-muted-foreground text-sm mt-1">Track task progress: Open → In Progress → Completed (or Blocked)</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {(["all", "Open", "In Progress", "Completed", "Blocked"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusTab(s)}
            className={`p-3 rounded-lg border text-left transition-colors ${statusTab === s ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
          >
            <p className="text-lg font-bold text-foreground">{counts[s]}</p>
            <p className="text-xs text-muted-foreground">{s === "all" ? "All Tasks" : s}</p>
          </button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const flow = statusFlow[task.status];
          const isCompleted = task.status === "Completed";
          return (
            <Card key={task.id} className={`${isCompleted ? "opacity-70" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{task.id}</span>
                      <Badge variant="outline" className={`text-[10px] ${priorityColor[task.priority]}`}>{task.priority}</Badge>
                      <Badge variant="outline" className="text-[10px]">{task.category}</Badge>
                    </div>
                    <p className="font-medium text-foreground">{task.title}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {task.assignee}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Due: {task.dueDate}</span>
                    </div>
                    {task.notes && (
                      <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                        <StickyNote className="h-3 w-3" /> {task.notes}
                      </p>
                    )}
                    {isCompleted && task.completedBy && (
                      <div className="mt-2 p-2 rounded bg-green-50 border border-green-100 text-xs text-green-800">
                        <p><strong>Completed by:</strong> {task.completedBy} on {task.completionDate}</p>
                        {task.completionNotes && <p className="mt-0.5">{task.completionNotes}</p>}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`${flow.color} border-0`}>{task.status}</Badge>
                    {!isCompleted && flow.next.length > 0 && (
                      <div className="flex gap-1.5">
                        {flow.next.map((next) => (
                          <Button
                            key={next}
                            size="sm"
                            variant={next === "Completed" ? "default" : "outline"}
                            className="text-xs h-7 gap-1"
                            onClick={() => handleStatusChange(task.id, next)}
                          >
                            {next === "Completed" && <CheckCircle2 className="h-3 w-3" />}
                            {next === "In Progress" && <Play className="h-3 w-3" />}
                            {next === "Blocked" && <AlertOctagon className="h-3 w-3" />}
                            {next}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Complete Dialog */}
      <Dialog open={!!completeDialog} onOpenChange={() => setCompleteDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Complete Task
            </DialogTitle>
          </DialogHeader>
          {completeDialog && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50 border">
                <p className="font-medium text-sm">{completeDialog.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{completeDialog.id} • {completeDialog.assignee}</p>
              </div>
              <div className="space-y-1.5">
                <Label>Completed By (from HR)</Label>
                <Select defaultValue={completeDialog.assignee}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value={completeDialog.assignee}>{completeDialog.assignee}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Completion Notes {completeDialog.priority === "Critical" && <span className="text-red-500">*</span>}</Label>
                <Textarea placeholder="Describe what was done..." rows={3} />
                {completeDialog.priority === "Critical" && (
                  <p className="text-[10px] text-red-500">Critical tasks require completion notes</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label>Attachment (optional)</Label>
                <Button variant="outline" size="sm" className="w-full gap-1"><Paperclip className="h-3.5 w-3.5" /> Attach File</Button>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setCompleteDialog(null)}>Cancel</Button>
                <Button onClick={handleComplete} className="gap-1"><CheckCircle2 className="h-4 w-4" /> Mark Complete</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskExecution;

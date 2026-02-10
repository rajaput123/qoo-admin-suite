import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Play, AlertOctagon, Clock, User, Camera, Video, Image, Eye, X, ShieldCheck } from "lucide-react";
import TaskDetailModal, { type TaskDetail } from "@/components/tasks/TaskDetailModal";

type TaskStatus = "Open" | "In Progress" | "Completed" | "Blocked" | "Pending Review";

interface EvidenceFile {
  name: string;
  type: "photo" | "video";
  timestamp: string;
  url: string;
}

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
  evidence?: EvidenceFile[];
  reviewStatus?: "Pending" | "Approved" | "Rejected";
  reviewedBy?: string;
  reviewNotes?: string;
}

const initialTasks: Task[] = [
  { id: "TSK-001", title: "Morning Abhishekam Preparation", category: "Ritual", priority: "High", assignee: "Pandit Sharma", status: "In Progress", dueDate: "2026-02-09", notes: "Ensure all vessels are ready by 4:30 AM" },
  { id: "TSK-002", title: "Annadanam Kitchen Setup", category: "Kitchen", priority: "Critical", assignee: "Head Cook Team", status: "Open", dueDate: "2026-02-09", notes: "Prepare for 5000 devotees" },
  { id: "TSK-003", title: "Main Hall Flower Decoration", category: "Event", priority: "High", assignee: "Decoration Volunteers", status: "In Progress", dueDate: "2026-02-09", notes: "Maha Shivaratri decoration" },
  {
    id: "TSK-004", title: "Security Gate Check", category: "Security", priority: "Medium", assignee: "Security Team A", status: "Completed", dueDate: "2026-02-09", notes: "",
    completedBy: "Rajesh K", completionDate: "2026-02-09 06:30", completionNotes: "All 4 gates checked and cleared.",
    evidence: [
      { name: "gate1_check.jpg", type: "photo", timestamp: "2026-02-09 06:15", url: "#" },
      { name: "gate4_check.jpg", type: "photo", timestamp: "2026-02-09 06:28", url: "#" },
    ],
    reviewStatus: "Approved", reviewedBy: "Manager Suresh",
  },
  { id: "TSK-005", title: "Generator Maintenance", category: "Maintenance", priority: "High", assignee: "Electrical Team", status: "Blocked", dueDate: "2026-02-07", notes: "Spare parts awaited from supplier" },
  { id: "TSK-006", title: "Prasadam Counter Restock", category: "Kitchen", priority: "Medium", assignee: "Counter Staff", status: "Open", dueDate: "2026-02-09", notes: "" },
  {
    id: "TSK-010", title: "Evening Aarti Sound System Test", category: "Ritual", priority: "Medium", assignee: "AV Volunteer", status: "Pending Review", dueDate: "2026-02-09", notes: "",
    completedBy: "Venkat S", completionDate: "2026-02-09 15:00", completionNotes: "All speakers working. Mic replaced.",
    evidence: [
      { name: "sound_test.mp4", type: "video", timestamp: "2026-02-09 14:55", url: "#" },
      { name: "mic_replaced.jpg", type: "photo", timestamp: "2026-02-09 14:58", url: "#" },
    ],
    reviewStatus: "Pending",
  },
];

const statusColor: Record<string, string> = {
  Open: "bg-blue-100 text-blue-700",
  "In Progress": "bg-amber-100 text-amber-700",
  "Pending Review": "bg-purple-100 text-purple-700",
  Completed: "bg-green-100 text-green-700",
  Blocked: "bg-red-100 text-red-700",
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
  const [reviewDialog, setReviewDialog] = useState<Task | null>(null);
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [statusTab, setStatusTab] = useState("all");
  const [uploadedEvidence, setUploadedEvidence] = useState<EvidenceFile[]>([]);

  const counts: Record<string, number> = {
    all: tasks.length,
    Open: tasks.filter((t) => t.status === "Open").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    "Pending Review": tasks.filter((t) => t.status === "Pending Review").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
    Blocked: tasks.filter((t) => t.status === "Blocked").length,
  };

  const filteredTasks = statusTab === "all" ? tasks : tasks.filter((t) => t.status === statusTab);

  const handleStatusChange = (e: React.MouseEvent, taskId: string, newStatus: TaskStatus) => {
    e.stopPropagation();
    if (newStatus === "Completed") {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        setUploadedEvidence([]);
        setCompleteDialog(task);
      }
      return;
    }
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  };

  const handleSimulateUpload = (type: "photo" | "video") => {
    const file: EvidenceFile = {
      name: type === "photo" ? `evidence_${Date.now()}.jpg` : `evidence_${Date.now()}.mp4`,
      type,
      timestamp: new Date().toISOString().slice(0, 16).replace("T", " "),
      url: "#",
    };
    setUploadedEvidence((prev) => [...prev, file]);
  };

  const handleComplete = () => {
    if (!completeDialog) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === completeDialog.id
          ? {
              ...t,
              status: "Pending Review" as TaskStatus,
              completedBy: t.assignee,
              completionDate: new Date().toISOString().slice(0, 16).replace("T", " "),
              completionNotes: "Marked complete with evidence",
              evidence: uploadedEvidence,
              reviewStatus: "Pending" as const,
            }
          : t
      )
    );
    setUploadedEvidence([]);
    setCompleteDialog(null);
  };

  const handleReview = (e: React.MouseEvent, approved: boolean) => {
    e.stopPropagation();
    if (!reviewDialog) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === reviewDialog.id
          ? {
              ...t,
              status: approved ? ("Completed" as TaskStatus) : ("In Progress" as TaskStatus),
              reviewStatus: approved ? ("Approved" as const) : ("Rejected" as const),
              reviewedBy: "Manager Suresh",
              reviewNotes: approved ? "Evidence verified and approved" : "Insufficient evidence, redo required",
            }
          : t
      )
    );
    setReviewDialog(null);
  };

  const statusFlow: Record<string, { next: TaskStatus[] }> = {
    Open: { next: ["In Progress"] },
    "In Progress": { next: ["Completed", "Blocked"] },
    "Pending Review": { next: [] },
    Completed: { next: [] },
    Blocked: { next: ["In Progress"] },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Execution & Status</h1>
        <p className="text-muted-foreground text-sm mt-1">Track task progress with photo/video evidence for manager review</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {(["all", "Open", "In Progress", "Pending Review", "Completed", "Blocked"] as const).map((s) => (
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

      {/* Task Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Evidence</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => {
                const flow = statusFlow[task.status];
                const isCompleted = task.status === "Completed";
                const isPendingReview = task.status === "Pending Review";
                return (
                  <TableRow
                    key={task.id}
                    className={`cursor-pointer hover:bg-muted/50 ${isCompleted ? "opacity-70" : ""}`}
                    onClick={() => setDetailTask(task)}
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">{task.id}</TableCell>
                    <TableCell>
                      <p className="font-medium text-sm">{task.title}</p>
                      {task.notes && <p className="text-xs text-muted-foreground truncate max-w-[200px]">{task.notes}</p>}
                    </TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{task.category}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className={`text-[10px] ${priorityColor[task.priority]}`}>{task.priority}</Badge></TableCell>
                    <TableCell className="text-sm">{task.assignee}</TableCell>
                    <TableCell className="text-xs">{task.dueDate}</TableCell>
                    <TableCell>
                      {task.evidence && task.evidence.length > 0 ? (
                        <Badge variant="secondary" className="text-[10px] gap-1">
                          <Image className="h-2.5 w-2.5" /> {task.evidence.length} files
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${statusColor[task.status]}`}>{task.status}</Badge>
                      {task.reviewStatus && (
                        <Badge variant="outline" className={`text-[10px] ml-1 ${
                          task.reviewStatus === "Approved" ? "bg-green-50 text-green-700" :
                          task.reviewStatus === "Rejected" ? "bg-red-50 text-red-700" :
                          "bg-purple-50 text-purple-700"
                        }`}>{task.reviewStatus}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        {isPendingReview && (
                          <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={(e) => { e.stopPropagation(); setReviewDialog(task); }}>
                            <Eye className="h-3 w-3" /> Review
                          </Button>
                        )}
                        {!isCompleted && !isPendingReview && flow.next.map((next) => (
                          <Button
                            key={next}
                            size="sm"
                            variant={next === "Completed" ? "default" : "outline"}
                            className="text-xs h-7 gap-1"
                            onClick={(e) => handleStatusChange(e, task.id, next)}
                          >
                            {next === "Completed" && <CheckCircle2 className="h-3 w-3" />}
                            {next === "In Progress" && <Play className="h-3 w-3" />}
                            {next === "Blocked" && <AlertOctagon className="h-3 w-3" />}
                            {next}
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredTasks.length === 0 && (
                <TableRow><TableCell colSpan={9} className="text-center py-8 text-muted-foreground">No tasks found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <TaskDetailModal
        task={detailTask as TaskDetail | null}
        open={!!detailTask}
        onOpenChange={() => setDetailTask(null)}
      />

      {/* Complete Dialog with Evidence Upload */}
      <Dialog open={!!completeDialog} onOpenChange={() => { setCompleteDialog(null); setUploadedEvidence([]); }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Complete Task with Evidence
            </DialogTitle>
            <DialogDescription>Upload photo/video evidence before submitting for manager review</DialogDescription>
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

              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  <Camera className="h-3.5 w-3.5" /> Photo / Video Evidence
                  {completeDialog.priority === "Critical" && <span className="text-red-500">*</span>}
                </Label>
                <p className="text-[10px] text-muted-foreground">Upload photos or videos as proof of task completion for manager review</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleSimulateUpload("photo")}>
                    <Camera className="h-3.5 w-3.5" /> Capture Photo
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleSimulateUpload("video")}>
                    <Video className="h-3.5 w-3.5" /> Record Video
                  </Button>
                </div>
                {uploadedEvidence.length > 0 && (
                  <div className="space-y-1.5 mt-2">
                    {uploadedEvidence.map((ev, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded border bg-muted/30">
                        <div className="flex items-center gap-2 text-xs">
                          {ev.type === "photo" ? <Image className="h-3.5 w-3.5 text-blue-600" /> : <Video className="h-3.5 w-3.5 text-purple-600" />}
                          <span className="font-medium">{ev.name}</span>
                          <span className="text-muted-foreground">{ev.timestamp}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setUploadedEvidence((prev) => prev.filter((_, idx) => idx !== i))}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-2 rounded bg-amber-50 border border-amber-100 text-xs text-amber-800">
                <p className="flex items-center gap-1"><Eye className="h-3 w-3" /> Task will be sent for <strong>Manager Review</strong> before final completion</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => { setCompleteDialog(null); setUploadedEvidence([]); }}>Cancel</Button>
                <Button onClick={handleComplete} className="gap-1"><CheckCircle2 className="h-4 w-4" /> Submit for Review</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Manager Review Dialog */}
      <Dialog open={!!reviewDialog} onOpenChange={() => setReviewDialog(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Manager Review
            </DialogTitle>
            <DialogDescription>Review submitted evidence and approve or reject the task</DialogDescription>
          </DialogHeader>
          {reviewDialog && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/50 border">
                <p className="font-medium text-sm">{reviewDialog.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{reviewDialog.id} • Completed by {reviewDialog.completedBy} on {reviewDialog.completionDate}</p>
                {reviewDialog.completionNotes && <p className="text-xs mt-1">{reviewDialog.completionNotes}</p>}
              </div>

              {reviewDialog.evidence && reviewDialog.evidence.length > 0 ? (
                <div className="space-y-2">
                  <Label>Submitted Evidence ({reviewDialog.evidence.length} files)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {reviewDialog.evidence.map((ev, i) => (
                      <div key={i} className="p-3 rounded-lg border bg-muted/20 text-center">
                        <div className="h-16 flex items-center justify-center mb-2 bg-muted rounded">
                          {ev.type === "photo" ? <Image className="h-8 w-8 text-blue-400" /> : <Video className="h-8 w-8 text-purple-400" />}
                        </div>
                        <p className="text-xs font-medium truncate">{ev.name}</p>
                        <p className="text-[10px] text-muted-foreground">{ev.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg border border-amber-200 bg-amber-50 text-xs text-amber-700">
                  No evidence files submitted
                </div>
              )}

              <div className="space-y-1.5">
                <Label>Review Notes</Label>
                <Textarea placeholder="Add review comments..." rows={2} />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setReviewDialog(null)}>Cancel</Button>
                <Button variant="destructive" onClick={(e) => handleReview(e, false)} className="gap-1">
                  <AlertOctagon className="h-4 w-4" /> Reject
                </Button>
                <Button onClick={(e) => handleReview(e, true)} className="gap-1">
                  <ShieldCheck className="h-4 w-4" /> Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskExecution;

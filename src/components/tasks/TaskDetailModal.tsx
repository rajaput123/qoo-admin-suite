import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, User, StickyNote, Paperclip, Image, Video, ShieldCheck, Eye, AlertOctagon, Flag, Link2, Calendar, Play } from "lucide-react";

interface EvidenceFile {
  name: string;
  type: "photo" | "video";
  timestamp: string;
  url: string;
}

export interface TaskDetail {
  id: string;
  title: string;
  category: string;
  priority: string;
  assignee: string;
  assigneeType?: string;
  status: string;
  dueDate: string;
  notes: string;
  linkedModule?: string;
  completedBy?: string;
  completionDate?: string;
  completionNotes?: string;
  evidence?: EvidenceFile[];
  reviewStatus?: "Pending" | "Approved" | "Rejected";
  reviewedBy?: string;
  reviewNotes?: string;
}

const priorityColor: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusColor: Record<string, string> = {
  Open: "bg-blue-100 text-blue-700",
  "In Progress": "bg-amber-100 text-amber-700",
  "Pending Review": "bg-purple-100 text-purple-700",
  Completed: "bg-green-100 text-green-700",
  Blocked: "bg-red-100 text-red-700",
};

interface TaskDetailModalProps {
  task: TaskDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TaskDetailModal = ({ task, open, onOpenChange }: TaskDetailModalProps) => {
  if (!task) return null;

  const hasEvidence = task.evidence && task.evidence.length > 0;
  const hasReview = !!task.reviewStatus;
  const hasCompletion = !!task.completedBy;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">{task.id}</span>
            <Badge variant="outline" className={`text-[10px] ${statusColor[task.status] || ""}`}>{task.status}</Badge>
            <Badge variant="outline" className={`text-[10px] ${priorityColor[task.priority] || ""}`}>{task.priority}</Badge>
          </div>
          <DialogTitle className="text-lg">{task.title}</DialogTitle>
          <DialogDescription>Task details, evidence, and review history</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-2">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="evidence" disabled={!hasEvidence && !hasCompletion}>
              Evidence {hasEvidence && <Badge variant="secondary" className="ml-1 text-[10px] h-4 px-1">{task.evidence!.length}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="review" disabled={!hasReview}>Review</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-medium">Category</p>
                  <p className="text-sm font-medium">{task.category}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-medium">Priority</p>
                  <Badge variant="outline" className={`text-xs ${priorityColor[task.priority] || ""}`}>{task.priority}</Badge>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-medium">Status</p>
                  <Badge variant="outline" className={`text-xs ${statusColor[task.status] || ""}`}>{task.status}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-medium">Assignee</p>
                  <div className="flex items-center gap-1.5 text-sm">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{task.assignee}</span>
                    {task.assigneeType && <Badge variant="outline" className="text-[10px] ml-1">{task.assigneeType}</Badge>}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-medium">Due Date</p>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
                {task.linkedModule && task.linkedModule !== "—" && (
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground font-medium">Linked Module</p>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{task.linkedModule}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {task.notes && (
              <>
                <Separator />
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-medium mb-1">Notes</p>
                  <div className="flex items-start gap-1.5 text-sm p-2.5 rounded-lg bg-muted/50 border">
                    <StickyNote className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                    <span>{task.notes}</span>
                  </div>
                </div>
              </>
            )}

            {hasCompletion && (
              <>
                <Separator />
                <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                  <p className="text-xs font-semibold text-green-800 mb-1">Completion Details</p>
                  <div className="space-y-1 text-xs text-green-700">
                    <p><strong>Completed by:</strong> {task.completedBy}</p>
                    <p><strong>Date:</strong> {task.completionDate}</p>
                    {task.completionNotes && <p><strong>Notes:</strong> {task.completionNotes}</p>}
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="evidence" className="mt-4 space-y-4">
            {hasCompletion && (
              <div className="p-3 rounded-lg bg-muted/50 border text-sm">
                <p><strong>Completed by:</strong> {task.completedBy} on {task.completionDate}</p>
                {task.completionNotes && <p className="mt-1 text-muted-foreground">{task.completionNotes}</p>}
              </div>
            )}

            {hasEvidence ? (
              <div className="space-y-3">
                <p className="text-sm font-medium">Submitted Evidence ({task.evidence!.length} files)</p>
                <div className="grid grid-cols-2 gap-3">
                  {task.evidence!.map((ev, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-card text-center hover:shadow-sm transition-shadow">
                      <div className="h-20 flex items-center justify-center mb-2 bg-muted rounded-lg">
                        {ev.type === "photo" ? <Image className="h-10 w-10 text-blue-400" /> : <Video className="h-10 w-10 text-purple-400" />}
                      </div>
                      <p className="text-xs font-medium truncate">{ev.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{ev.timestamp}</p>
                      <Badge variant="outline" className="text-[10px] mt-1.5">
                        {ev.type === "photo" ? "Photo" : "Video"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-muted-foreground">
                <Paperclip className="h-8 w-8 mx-auto mb-2 opacity-30" />
                No evidence files attached
              </div>
            )}
          </TabsContent>

          <TabsContent value="review" className="mt-4 space-y-4">
            {hasReview ? (
              <div className={`p-4 rounded-lg border ${
                task.reviewStatus === "Approved" ? "bg-green-50 border-green-200" :
                task.reviewStatus === "Rejected" ? "bg-red-50 border-red-200" :
                "bg-purple-50 border-purple-200"
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  {task.reviewStatus === "Approved" && <ShieldCheck className="h-5 w-5 text-green-600" />}
                  {task.reviewStatus === "Rejected" && <AlertOctagon className="h-5 w-5 text-red-600" />}
                  {task.reviewStatus === "Pending" && <Eye className="h-5 w-5 text-purple-600" />}
                  <span className="font-semibold text-sm">
                    Review Status: {task.reviewStatus}
                  </span>
                </div>
                <div className="space-y-1.5 text-sm">
                  {task.reviewedBy && <p><strong>Reviewed by:</strong> {task.reviewedBy}</p>}
                  {task.reviewNotes && <p><strong>Review notes:</strong> {task.reviewNotes}</p>}
                  {task.completedBy && <p><strong>Completed by:</strong> {task.completedBy} on {task.completionDate}</p>}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-muted-foreground">
                No review information available
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailModal;

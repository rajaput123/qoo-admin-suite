import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import TaskDetailModal from "@/components/tasks/TaskDetailModal";
import { templeTasks, type TempleTask } from "@/data/taskData";

const priorityColor: Record<string, string> = { Critical: "bg-red-50 text-red-700 border-red-200", High: "bg-orange-50 text-orange-700 border-orange-200", Medium: "bg-amber-50 text-amber-700 border-amber-200", Low: "bg-green-50 text-green-700 border-green-200" };

const OverdueTasks = () => {
  const [selectedTask, setSelectedTask] = useState<TempleTask | null>(null);
  const overdue = templeTasks.filter(t => t.status === "Overdue");

  // Calculate days overdue from 2026-02-10
  const daysOverdue = (dueDate: string) => {
    const diff = new Date("2026-02-10").getTime() - new Date(dueDate).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />Overdue Tasks
        </h1>
        <p className="text-muted-foreground text-sm">{overdue.length} tasks past due date</p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Structure</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Days Overdue</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {overdue.sort((a, b) => daysOverdue(b.dueDate) - daysOverdue(a.dueDate)).map(t => (
              <TableRow key={t.id} className="cursor-pointer" onClick={() => setSelectedTask(t)}>
                <TableCell className="font-mono text-xs">{t.id}</TableCell>
                <TableCell>
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.description.substring(0, 60)}...</p>
                </TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">{t.sourceModule}</Badge></TableCell>
                <TableCell className="text-sm">{t.structureName}</TableCell>
                <TableCell>
                  <p className="text-sm">{t.assignedTo}</p>
                  <p className="text-[10px] text-muted-foreground">{t.assigneeType}</p>
                </TableCell>
                <TableCell className="text-sm text-destructive font-medium">{t.dueDate}</TableCell>
                <TableCell><Badge variant="destructive" className="text-xs">{daysOverdue(t.dueDate)} days</Badge></TableCell>
                <TableCell><Badge variant="outline" className={`text-[10px] ${priorityColor[t.priority]}`}>{t.priority}</Badge></TableCell>
              </TableRow>
            ))}
            {overdue.length === 0 && <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No overdue tasks 🎉</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      <TaskDetailModal task={selectedTask} open={!!selectedTask} onOpenChange={() => setSelectedTask(null)} />
    </motion.div>
  );
};

export default OverdueTasks;

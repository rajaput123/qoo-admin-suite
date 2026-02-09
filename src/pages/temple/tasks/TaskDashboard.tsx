import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, AlertTriangle, CalendarDays, Clock, ArrowRight, CheckCircle2, Timer, Flag } from "lucide-react";

const stats = [
  { label: "Due Today", value: 24, icon: Clock, color: "text-blue-600 bg-blue-50" },
  { label: "Overdue", value: 7, icon: AlertTriangle, color: "text-red-600 bg-red-50" },
  { label: "High Priority", value: 12, icon: Flag, color: "text-orange-600 bg-orange-50" },
  { label: "Event-Linked", value: 18, icon: CalendarDays, color: "text-purple-600 bg-purple-50" },
];

const dueTodayTasks = [
  { id: "TSK-001", title: "Morning Abhishekam Preparation", category: "Ritual", priority: "High", assignee: "Pandit Sharma", status: "In Progress" },
  { id: "TSK-002", title: "Annadanam Kitchen Setup", category: "Kitchen", priority: "Critical", assignee: "Head Cook Team", status: "Open" },
  { id: "TSK-003", title: "Main Hall Flower Decoration", category: "Event", priority: "High", assignee: "Decoration Volunteers", status: "In Progress" },
  { id: "TSK-004", title: "Security Gate Check", category: "Security", priority: "Medium", assignee: "Security Team A", status: "Completed" },
  { id: "TSK-005", title: "Prasadam Counter Restock", category: "Kitchen", priority: "Medium", assignee: "Counter Staff", status: "Open" },
];

const overdueTasks = [
  { id: "TSK-098", title: "Generator Maintenance Check", category: "Maintenance", priority: "High", assignee: "Electrical Team", dueDate: "Feb 07", daysOverdue: 2 },
  { id: "TSK-091", title: "Fire Extinguisher Inspection", category: "Security", priority: "Critical", assignee: "Safety Officer", dueDate: "Feb 06", daysOverdue: 3 },
  { id: "TSK-088", title: "Water Tank Cleaning", category: "Maintenance", priority: "Medium", assignee: "Maintenance Crew", dueDate: "Feb 05", daysOverdue: 4 },
];

const categoryBreakdown = [
  { category: "Ritual", total: 32, completed: 20, color: "bg-amber-500" },
  { category: "Kitchen", total: 28, completed: 18, color: "bg-orange-500" },
  { category: "Event", total: 22, completed: 10, color: "bg-purple-500" },
  { category: "Maintenance", total: 15, completed: 8, color: "bg-blue-500" },
  { category: "Admin", total: 12, completed: 9, color: "bg-green-500" },
  { category: "Security", total: 10, completed: 7, color: "bg-red-500" },
];

const priorityColor: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusColor: Record<string, string> = {
  Open: "bg-blue-100 text-blue-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Completed: "bg-green-100 text-green-700",
  Blocked: "bg-red-100 text-red-700",
};

const TaskDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Task Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Operational task overview for today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Due Today */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                Tasks Due Today
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {dueTodayTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-2.5 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{task.id}</span>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${priorityColor[task.priority]}`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.assignee}</p>
                </div>
                <Badge variant="outline" className={`text-[10px] ${statusColor[task.status]}`}>
                  {task.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Overdue */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                Overdue Tasks
              </CardTitle>
              <Badge variant="destructive" className="text-xs">{overdueTasks.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {overdueTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-2.5 rounded-lg border border-red-100 bg-red-50/30 hover:bg-red-50/60 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{task.id}</span>
                    <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${priorityColor[task.priority]}`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.assignee}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-red-600">{task.daysOverdue}d overdue</p>
                  <p className="text-[10px] text-muted-foreground">Due {task.dueDate}</p>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                Tasks by Category
              </h4>
              <div className="space-y-2.5">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.category} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-24">{cat.category}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${cat.color}`}
                        style={{ width: `${(cat.completed / cat.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground w-12 text-right">
                      {cat.completed}/{cat.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskDashboard;

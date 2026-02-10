import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CheckCircle2, Clock, AlertTriangle, Users, Calendar, TrendingUp } from "lucide-react";
import TaskDetailModal, { type TaskDetail } from "@/components/tasks/TaskDetailModal";

const dailySummary = {
  date: "Feb 09, 2026",
  totalTasks: 24,
  completed: 14,
  inProgress: 5,
  open: 3,
  blocked: 2,
  completionRate: "58%",
};

const categoryDistribution = [
  { category: "Ritual", total: 6, completed: 4, overdue: 0, color: "bg-amber-500" },
  { category: "Kitchen", total: 5, completed: 3, overdue: 1, color: "bg-orange-500" },
  { category: "Event", total: 5, completed: 2, overdue: 0, color: "bg-purple-500" },
  { category: "Maintenance", total: 4, completed: 2, overdue: 2, color: "bg-blue-500" },
  { category: "Admin", total: 2, completed: 2, overdue: 0, color: "bg-green-500" },
  { category: "Security", total: 2, completed: 1, overdue: 0, color: "bg-red-500" },
];

const eventWiseTasks = [
  { event: "Maha Shivaratri 2026", totalTasks: 42, completed: 28, pending: 10, blocked: 4, completion: "67%" },
  { event: "Weekly Sahasranamam", totalTasks: 8, completed: 8, pending: 0, blocked: 0, completion: "100%" },
  { event: "Monthly Abhishekam Special", totalTasks: 12, completed: 9, pending: 3, blocked: 0, completion: "75%" },
];

const overdueTasks = [
  { id: "TSK-098", title: "Generator Maintenance Check", category: "Maintenance", assignee: "Electrical Team", dueDate: "2026-02-07", daysOverdue: 2, priority: "High", status: "Blocked", notes: "Spare parts awaited" },
  { id: "TSK-091", title: "Fire Extinguisher Inspection", category: "Security", assignee: "Safety Officer", dueDate: "2026-02-06", daysOverdue: 3, priority: "Critical", status: "Open", notes: "Quarterly inspection overdue" },
  { id: "TSK-088", title: "Water Tank Cleaning", category: "Maintenance", assignee: "Maintenance Crew", dueDate: "2026-02-05", daysOverdue: 4, priority: "Medium", status: "Open", notes: "" },
  { id: "TSK-085", title: "CCTV Storage Review", category: "Security", assignee: "IT Admin", dueDate: "2026-02-04", daysOverdue: 5, priority: "Low", status: "Open", notes: "" },
];

const hrParticipation = [
  { type: "Employees", totalAssigned: 32, completed: 22, completionRate: "69%", avgTasksPerPerson: 2.1 },
  { type: "Volunteers", totalAssigned: 18, completed: 10, completionRate: "56%", avgTasksPerPerson: 1.4 },
  { type: "Freelancers", totalAssigned: 6, completed: 5, completionRate: "83%", avgTasksPerPerson: 1.0 },
];

const TaskReports = () => {
  const [selectedTask, setSelectedTask] = useState<TaskDetail | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Task Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Task analytics and completion summaries</p>
        </div>
        <Select defaultValue="today">
          <SelectTrigger className="w-[150px]">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Daily Summary</TabsTrigger>
          <TabsTrigger value="event">Event-wise</TabsTrigger>
          <TabsTrigger value="overdue">Overdue Report</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
          <TabsTrigger value="hr">HR Participation</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Total", value: dailySummary.totalTasks, icon: BarChart3, color: "text-blue-600 bg-blue-50" },
              { label: "Completed", value: dailySummary.completed, icon: CheckCircle2, color: "text-green-600 bg-green-50" },
              { label: "In Progress", value: dailySummary.inProgress, icon: Clock, color: "text-amber-600 bg-amber-50" },
              { label: "Open", value: dailySummary.open, icon: Clock, color: "text-blue-600 bg-blue-50" },
              { label: "Blocked", value: dailySummary.blocked, icon: AlertTriangle, color: "text-red-600 bg-red-50" },
              { label: "Completion", value: dailySummary.completionRate, icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-3 text-center">
                  <div className={`mx-auto mb-2 p-2 rounded-lg w-fit ${s.color}`}>
                    <s.icon className="h-4 w-4" />
                  </div>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Category-wise Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryDistribution.map((cat) => (
                <div key={cat.category} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-28">{cat.category}</span>
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${(cat.completed / cat.total) * 100}%` }} />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">{cat.completed}/{cat.total}</span>
                  {cat.overdue > 0 && <Badge variant="destructive" className="text-[10px]">{cat.overdue} overdue</Badge>}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="event" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead className="text-center">Total Tasks</TableHead>
                    <TableHead className="text-center">Completed</TableHead>
                    <TableHead className="text-center">Pending</TableHead>
                    <TableHead className="text-center">Blocked</TableHead>
                    <TableHead className="text-center">Completion %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventWiseTasks.map((e) => (
                    <TableRow key={e.event}>
                      <TableCell className="font-medium">{e.event}</TableCell>
                      <TableCell className="text-center">{e.totalTasks}</TableCell>
                      <TableCell className="text-center text-green-700">{e.completed}</TableCell>
                      <TableCell className="text-center text-amber-700">{e.pending}</TableCell>
                      <TableCell className="text-center text-red-700">{e.blocked}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`${e.completion === "100%" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                          {e.completion}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overdueTasks.map((t) => (
                    <TableRow
                      key={t.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedTask(t as TaskDetail)}
                    >
                      <TableCell className="font-mono text-xs text-muted-foreground">{t.id}</TableCell>
                      <TableCell className="font-medium text-sm">{t.title}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{t.category}</Badge></TableCell>
                      <TableCell className="text-sm">{t.assignee}</TableCell>
                      <TableCell className="text-sm">{t.dueDate}</TableCell>
                      <TableCell><Badge variant="destructive" className="text-xs">{t.daysOverdue} days</Badge></TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${t.priority === "Critical" ? "bg-red-100 text-red-700" : t.priority === "High" ? "bg-orange-100 text-orange-700" : t.priority === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                          {t.priority}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category" className="mt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryDistribution.map((cat) => (
              <Card key={cat.category}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{cat.category}</h3>
                    <Badge variant="outline">{cat.total} tasks</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="font-medium text-green-700">{cat.completed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium text-amber-700">{cat.total - cat.completed - cat.overdue}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Overdue</span>
                      <span className="font-medium text-red-700">{cat.overdue}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                      <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${(cat.completed / cat.total) * 100}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground text-right">{Math.round((cat.completed / cat.total) * 100)}% complete</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hr" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" /> HR Participation Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-center">Tasks Assigned</TableHead>
                    <TableHead className="text-center">Completed</TableHead>
                    <TableHead className="text-center">Completion Rate</TableHead>
                    <TableHead className="text-center">Avg Tasks/Person</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hrParticipation.map((h) => (
                    <TableRow key={h.type}>
                      <TableCell className="font-medium">{h.type}</TableCell>
                      <TableCell className="text-center">{h.totalAssigned}</TableCell>
                      <TableCell className="text-center text-green-700">{h.completed}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`${parseInt(h.completionRate) >= 70 ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                          {h.completionRate}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{h.avgTasksPerPerson}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <TaskDetailModal
        task={selectedTask}
        open={!!selectedTask}
        onOpenChange={() => setSelectedTask(null)}
      />
    </div>
  );
};

export default TaskReports;

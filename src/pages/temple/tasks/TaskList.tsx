import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, List, Link2, Calendar, User, Flag, StickyNote } from "lucide-react";

const allTasks = [
  { id: "TSK-001", title: "Morning Abhishekam Preparation", category: "Ritual", linkedModule: "Rituals & Sevas", priority: "High", dueDate: "2026-02-09", assignee: "Pandit Sharma", assigneeType: "Employee", status: "In Progress", notes: "Ensure all vessels are ready by 4:30 AM" },
  { id: "TSK-002", title: "Annadanam Kitchen Setup", category: "Kitchen", linkedModule: "Kitchen & Prasadam", priority: "Critical", dueDate: "2026-02-09", assignee: "Head Cook Team", assigneeType: "Role", status: "Open", notes: "Prepare for 5000 devotees" },
  { id: "TSK-003", title: "Main Hall Flower Decoration", category: "Event", linkedModule: "Event Management", priority: "High", dueDate: "2026-02-09", assignee: "Decoration Volunteers", assigneeType: "Volunteer", status: "In Progress", notes: "Maha Shivaratri decoration" },
  { id: "TSK-004", title: "Security Gate Check", category: "Security", linkedModule: "—", priority: "Medium", dueDate: "2026-02-09", assignee: "Security Team A", assigneeType: "Team", status: "Completed", notes: "" },
  { id: "TSK-005", title: "Generator Maintenance", category: "Maintenance", linkedModule: "Asset & Maintenance", priority: "High", dueDate: "2026-02-07", assignee: "Electrical Team", assigneeType: "Team", status: "Blocked", notes: "Spare parts awaited from supplier" },
  { id: "TSK-006", title: "Prasadam Counter Restock", category: "Kitchen", linkedModule: "Kitchen & Prasadam", priority: "Medium", dueDate: "2026-02-09", assignee: "Counter Staff", assigneeType: "Role", status: "Open", notes: "" },
  { id: "TSK-007", title: "VIP Lounge Preparation", category: "Admin", linkedModule: "Event Management", priority: "High", dueDate: "2026-02-10", assignee: "Admin Team", assigneeType: "Team", status: "Open", notes: "Governor visit expected" },
  { id: "TSK-008", title: "Fire Extinguisher Inspection", category: "Security", linkedModule: "Asset & Maintenance", priority: "Critical", dueDate: "2026-02-06", assignee: "Safety Officer", assigneeType: "Employee", status: "Open", notes: "Quarterly inspection overdue" },
  { id: "TSK-009", title: "Inventory Audit - Pooja Items", category: "Admin", linkedModule: "Inventory & Supplier", priority: "Low", dueDate: "2026-02-12", assignee: "Store Manager", assigneeType: "Employee", status: "Open", notes: "" },
  { id: "TSK-010", title: "Evening Aarti Sound System Test", category: "Ritual", linkedModule: "Rituals & Sevas", priority: "Medium", dueDate: "2026-02-09", assignee: "AV Volunteer", assigneeType: "Volunteer", status: "Completed", notes: "" },
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

const TaskList = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = allTasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || t.category === categoryFilter;
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Task List</h1>
          <p className="text-muted-foreground text-sm mt-1">All operational tasks across categories</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" /> Create Task</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label>Task Title</Label>
                <Input placeholder="Enter task title" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["Ritual", "Kitchen", "Event", "Maintenance", "Admin", "Security"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Priority</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["Low", "Medium", "High", "Critical"].map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Linked Module</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["Event Management", "Rituals & Sevas", "Kitchen & Prasadam", "Inventory & Supplier", "Asset & Maintenance", "None"].map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Assign To (from HR)</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select person/role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pandit-sharma">Pandit Sharma (Employee)</SelectItem>
                      <SelectItem value="head-cook">Head Cook (Role)</SelectItem>
                      <SelectItem value="security-a">Security Team A (Team)</SelectItem>
                      <SelectItem value="decoration-vol">Decoration Volunteers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Assignee Type</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["Employee", "Volunteer", "Freelancer", "Role", "Team"].map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Notes</Label>
                <Textarea placeholder="Additional instructions..." rows={2} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                <Button onClick={() => setCreateOpen(false)}>Create Task</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]"><Filter className="h-3.5 w-3.5 mr-1.5" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {["Ritual", "Kitchen", "Event", "Maintenance", "Admin", "Security"].map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {["Open", "In Progress", "Completed", "Blocked"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Linked Module</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((task) => (
                <TableRow key={task.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-mono text-xs text-muted-foreground">{task.id}</TableCell>
                  <TableCell>
                    <p className="font-medium text-sm">{task.title}</p>
                    {task.notes && <p className="text-xs text-muted-foreground truncate max-w-[250px]">{task.notes}</p>}
                  </TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{task.category}</Badge></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{task.linkedModule}</TableCell>
                  <TableCell><Badge variant="outline" className={`text-xs ${priorityColor[task.priority]}`}>{task.priority}</Badge></TableCell>
                  <TableCell className="text-xs">{task.dueDate}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{task.assignee}</p>
                      <p className="text-[10px] text-muted-foreground">{task.assigneeType}</p>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className={`text-xs ${statusColor[task.status]}`}>{task.status}</Badge></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No tasks found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskList;

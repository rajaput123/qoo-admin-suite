import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, UserCheck, Briefcase, ShieldCheck, ArrowRight, Clock, AlertTriangle } from "lucide-react";

const hrSummary = [
  { type: "Employees", count: 45, available: 38, icon: UserCheck, color: "text-blue-600 bg-blue-50" },
  { type: "Volunteers", count: 120, available: 85, icon: Users, color: "text-green-600 bg-green-50" },
  { type: "Freelancers", count: 18, available: 12, icon: Briefcase, color: "text-purple-600 bg-purple-50" },
];

const assignments = [
  { id: "TSK-001", title: "Morning Abhishekam Preparation", primaryOwner: "Pandit Sharma", ownerType: "Employee", helpers: ["Acolyte Ravi", "Acolyte Sujith"], status: "In Progress", available: true },
  { id: "TSK-002", title: "Annadanam Kitchen Setup", primaryOwner: "Head Cook", ownerType: "Role", helpers: ["Kitchen Helper 1", "Kitchen Helper 2", "Kitchen Helper 3"], status: "Open", available: true },
  { id: "TSK-003", title: "Main Hall Flower Decoration", primaryOwner: "Latha (Volunteer)", ownerType: "Volunteer", helpers: ["Meena", "Saroja", "Kavitha"], status: "In Progress", available: true },
  { id: "TSK-005", title: "Generator Maintenance", primaryOwner: "Suresh Kumar", ownerType: "Employee", helpers: [], status: "Blocked", available: false },
  { id: "TSK-007", title: "VIP Lounge Preparation", primaryOwner: "Admin Team", ownerType: "Team", helpers: ["Reception Staff", "Housekeeping"], status: "Open", available: true },
  { id: "TSK-008", title: "Fire Extinguisher Inspection", primaryOwner: "Rajesh (Safety)", ownerType: "Employee", helpers: [], status: "Open", available: true },
];

const availablePeople = [
  { name: "Pandit Sharma", role: "Senior Priest", type: "Employee", department: "Rituals", shift: "Morning (4-12)", tasksToday: 3, status: "Available" },
  { name: "Murugan K", role: "Junior Priest", type: "Employee", department: "Rituals", shift: "Morning (4-12)", tasksToday: 2, status: "Available" },
  { name: "Lakshmi R", role: "Head Cook", type: "Employee", department: "Kitchen", shift: "Morning (6-14)", tasksToday: 4, status: "Busy" },
  { name: "Suresh Kumar", role: "Electrician", type: "Employee", department: "Maintenance", shift: "General (8-17)", tasksToday: 1, status: "On Leave" },
  { name: "Latha M", role: "Decoration", type: "Volunteer", department: "Events", shift: "Flexible", tasksToday: 2, status: "Available" },
  { name: "Rajan P", role: "Security Guard", type: "Employee", department: "Security", shift: "Night (18-6)", tasksToday: 0, status: "Off Shift" },
  { name: "Venkat S", role: "Sound Engineer", type: "Freelancer", department: "Events", shift: "On-call", tasksToday: 1, status: "Available" },
];

const statusBadge: Record<string, string> = {
  Available: "bg-green-100 text-green-700",
  Busy: "bg-amber-100 text-amber-700",
  "On Leave": "bg-red-100 text-red-700",
  "Off Shift": "bg-gray-100 text-gray-600",
};

const TaskAssignment = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Task Assignment</h1>
        <p className="text-muted-foreground text-sm mt-1">Assign tasks using HR-managed people data (read-only)</p>
      </div>

      {/* HR Availability Summary */}
      <div className="grid grid-cols-3 gap-4">
        {hrSummary.map((s) => (
          <Card key={s.type}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{s.type}</p>
                <p className="text-xs text-muted-foreground">{s.available}/{s.count} available today</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-amber-200 bg-amber-50/30">
        <CardContent className="p-3 flex items-center gap-2 text-sm text-amber-800">
          <ShieldCheck className="h-4 w-4 flex-shrink-0" />
          <span>People data is read-only from People & HR module. Tasks cannot modify HR records.</span>
        </CardContent>
      </Card>

      <Tabs defaultValue="assignments">
        <TabsList>
          <TabsTrigger value="assignments">Current Assignments</TabsTrigger>
          <TabsTrigger value="people">Available People (HR)</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Task ID</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Primary Owner</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Helpers</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((a) => (
                    <TableRow key={a.id} className="cursor-pointer">
                      <TableCell className="font-mono text-xs text-muted-foreground">{a.id}</TableCell>
                      <TableCell className="font-medium text-sm">{a.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{a.primaryOwner.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{a.primaryOwner}</span>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{a.ownerType}</Badge></TableCell>
                      <TableCell>
                        {a.helpers.length > 0 ? (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">{a.helpers.length} helper{a.helpers.length > 1 ? "s" : ""}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {a.available ? (
                          <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700">Available</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] bg-red-50 text-red-700 gap-1">
                            <AlertTriangle className="h-2.5 w-2.5" /> Unavailable
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] ${a.status === "Blocked" ? "bg-red-100 text-red-700" : a.status === "In Progress" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                          {a.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="people" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground font-medium">
                People available today (sourced from People & HR module)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Shift</TableHead>
                    <TableHead>Tasks Today</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availablePeople.map((p) => (
                    <TableRow key={p.name}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{p.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{p.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{p.role}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[10px]">{p.type}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{p.department}</TableCell>
                      <TableCell className="text-xs">{p.shift}</TableCell>
                      <TableCell className="text-center">{p.tasksToday}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] ${statusBadge[p.status]}`}>{p.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskAssignment;

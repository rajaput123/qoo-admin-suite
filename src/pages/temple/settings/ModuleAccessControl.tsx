import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface Module {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  defaultRole: string;
  accessLevel: "Full Access" | "View Only" | "Restricted";
}

const ModuleAccessControl = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: "MOD-001",
      name: "Temple Structure",
      description: "Manage zones, halls, counters, and temple hierarchy",
      enabled: true,
      defaultRole: "Temple Admin",
      accessLevel: "Full Access",
    },
    {
      id: "MOD-002",
      name: "Booking & Seva",
      description: "Manage seva bookings, slots, and reservations",
      enabled: true,
      defaultRole: "Temple Admin",
      accessLevel: "Full Access",
    },
    {
      id: "MOD-003",
      name: "Donations",
      description: "Track donations, donor registry, and 80G certificates",
      enabled: true,
      defaultRole: "Finance Manager",
      accessLevel: "Full Access",
    },
    {
      id: "MOD-004",
      name: "Events",
      description: "Plan and manage temple events and festivals",
      enabled: true,
      defaultRole: "Event Manager",
      accessLevel: "Full Access",
    },
    {
      id: "MOD-005",
      name: "Finance",
      description: "Financial operations, accounts, and reports",
      enabled: true,
      defaultRole: "Finance Manager",
      accessLevel: "Full Access",
    },
    {
      id: "MOD-006",
      name: "Crowd Management",
      description: "Monitor and manage crowd capacity and flow",
      enabled: false,
      defaultRole: "Temple Admin",
      accessLevel: "View Only",
    },
    {
      id: "MOD-007",
      name: "Volunteers",
      description: "Manage volunteer assignments and schedules",
      enabled: true,
      defaultRole: "Volunteer Manager",
      accessLevel: "Full Access",
    },
    {
      id: "MOD-008",
      name: "Freelancers",
      description: "Manage freelancer services and assignments",
      enabled: true,
      defaultRole: "Temple Admin",
      accessLevel: "Full Access",
    },
    {
      id: "MOD-009",
      name: "Communication",
      description: "Send notifications, announcements, and messages",
      enabled: true,
      defaultRole: "Temple Admin",
      accessLevel: "Full Access",
    },
    {
      id: "MOD-010",
      name: "Reports",
      description: "Generate and view system reports and analytics",
      enabled: true,
      defaultRole: "Super Admin",
      accessLevel: "Full Access",
    },
    {
      id: "MOD-011",
      name: "Inventory",
      description: "Manage temple inventory and stock",
      enabled: true,
      defaultRole: "Inventory Manager",
      accessLevel: "Full Access",
    },
    {
      id: "MOD-012",
      name: "Projects",
      description: "Track temple projects and funding",
      enabled: true,
      defaultRole: "Project Manager",
      accessLevel: "Full Access",
    },
  ]);

  const roles = ["Super Admin", "Temple Admin", "Finance Manager", "Event Manager", "Volunteer Manager", "Inventory Manager", "Project Manager"];

  const handleToggleModule = (id: string) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, enabled: !module.enabled } : module
    ));
    const module = modules.find(m => m.id === id);
    toast.success(`${module?.name} ${module?.enabled ? "disabled" : "enabled"}`);
  };

  const handleUpdateDefaultRole = (id: string, role: string) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, defaultRole: role } : module
    ));
    toast.success("Default role updated");
  };

  const handleUpdateAccessLevel = (id: string, level: string) => {
    setModules(modules.map(module => 
      module.id === id ? { ...module, accessLevel: level as Module["accessLevel"] } : module
    ));
    toast.success("Access level updated");
  };

  const enabledCount = modules.filter(m => m.enabled).length;
  const disabledCount = modules.filter(m => !m.enabled).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Module Access Control</h1>
        <p className="text-sm text-muted-foreground mt-1">Enable/disable modules and configure default access levels</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{modules.length}</p>
                <p className="text-xs text-muted-foreground">Total Modules</p>
              </div>
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">{enabledCount}</p>
                <p className="text-xs text-muted-foreground">Enabled</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">{disabledCount}</p>
                <p className="text-xs text-muted-foreground">Disabled</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modules Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Default Role</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modules.map(module => (
                <TableRow key={module.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{module.name}</p>
                      <p className="text-xs text-muted-foreground">{module.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={module.enabled}
                        onCheckedChange={() => handleToggleModule(module.id)}
                      />
                      {module.enabled ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Enabled
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <XCircle className="h-3 w-3" /> Disabled
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={module.defaultRole}
                      onValueChange={(value) => handleUpdateDefaultRole(module.id, value)}
                      disabled={!module.enabled}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(role => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={module.accessLevel}
                      onValueChange={(value) => handleUpdateAccessLevel(module.id, value)}
                      disabled={!module.enabled}
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Access">Full Access</SelectItem>
                        <SelectItem value="View Only">View Only</SelectItem>
                        <SelectItem value="Restricted">Restricted</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info(`Configure ${module.name} permissions in Roles & Permissions`)}
                    >
                      Configure
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Settings className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium mb-1">Module Access Control</p>
              <p className="text-xs text-muted-foreground">
                Disabled modules will be hidden from all users. Default roles determine which role has primary access to each module.
                For detailed permission configuration, use the Roles & Permissions section.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleAccessControl;

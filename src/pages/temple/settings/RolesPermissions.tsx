import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Shield, Copy } from "lucide-react";
import { toast } from "sonner";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
  }>;
}

const RolesPermissions = () => {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "ROLE-001",
      name: "Super Admin",
      description: "Full access to all modules and settings",
      permissions: {
        "Donations": { view: true, create: true, edit: true, delete: true, approve: true },
        "Events": { view: true, create: true, edit: true, delete: true, approve: true },
        "Finance": { view: true, create: true, edit: true, delete: true, approve: true },
        "Inventory": { view: true, create: true, edit: true, delete: true, approve: true },
        "Settings": { view: true, create: true, edit: true, delete: true, approve: true },
      },
    },
    {
      id: "ROLE-002",
      name: "Temple Admin",
      description: "Manage temple operations and daily activities",
      permissions: {
        "Donations": { view: true, create: true, edit: true, delete: false, approve: false },
        "Events": { view: true, create: true, edit: true, delete: true, approve: true },
        "Finance": { view: true, create: false, edit: false, delete: false, approve: false },
        "Inventory": { view: true, create: true, edit: true, delete: false, approve: false },
        "Settings": { view: true, create: false, edit: false, delete: false, approve: false },
      },
    },
    {
      id: "ROLE-003",
      name: "Finance Manager",
      description: "Manage financial operations and reports",
      permissions: {
        "Donations": { view: true, create: true, edit: true, delete: false, approve: true },
        "Events": { view: true, create: false, edit: false, delete: false, approve: false },
        "Finance": { view: true, create: true, edit: true, delete: true, approve: true },
        "Inventory": { view: true, create: false, edit: false, delete: false, approve: false },
        "Settings": { view: true, create: false, edit: false, delete: false, approve: false },
      },
    },
  ]);

  const [showAddRole, setShowAddRole] = useState(false);
  const [roleForm, setRoleForm] = useState({
    name: "",
    description: "",
  });

  const modules = ["Donations", "Events", "Finance", "Inventory", "Settings", "Crowd Management", "Freelancers", "Reports"];
  const actions = ["view", "create", "edit", "delete", "approve"];

  const handleAddRole = () => {
    if (!roleForm.name || !roleForm.description) {
      toast.error("Please fill required fields");
      return;
    }
    const newRole: Role = {
      id: `ROLE-${String(roles.length + 1).padStart(3, "0")}`,
      ...roleForm,
      permissions: {},
    };
    // Initialize permissions for all modules
    modules.forEach(module => {
      newRole.permissions[module] = { view: false, create: false, edit: false, delete: false, approve: false };
    });
    setRoles([...roles, newRole]);
    setRoleForm({ name: "", description: "" });
    setShowAddRole(false);
    toast.success("Role created successfully");
  };

  const handleCloneRole = (role: Role) => {
    const clonedRole: Role = {
      ...role,
      id: `ROLE-${String(roles.length + 1).padStart(3, "0")}`,
      name: `${role.name} (Copy)`,
    };
    setRoles([...roles, clonedRole]);
    toast.success("Role cloned successfully");
  };

  const handleTogglePermission = (roleId: string, module: string, action: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [module]: {
              ...role.permissions[module],
              [action]: !role.permissions[module]?.[action as keyof typeof role.permissions[string]] || false,
            },
          },
        };
      }
      return role;
    }));
  };

  const handleSetDefaultRole = (module: string, roleName: string) => {
    toast.success(`Default role for ${module} set to ${roleName}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Roles & Permissions</h1>
        <p className="text-sm text-muted-foreground mt-1">Create roles and configure module permissions</p>
      </div>

      {/* Roles List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" /> Roles
            </CardTitle>
            <Dialog open={showAddRole} onOpenChange={setShowAddRole}>
              <DialogTrigger asChild>
                <Button size="sm" onClick={() => setRoleForm({ name: "", description: "" })}>
                  <Plus className="h-4 w-4 mr-2" /> Create Role
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Custom Role</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Role Name *</Label>
                    <Input
                      value={roleForm.name}
                      onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                      placeholder="e.g., Event Manager"
                    />
                  </div>
                  <div>
                    <Label>Description *</Label>
                    <Input
                      value={roleForm.description}
                      onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                      placeholder="Describe the role's responsibilities"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowAddRole(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleAddRole}>
                    Create Role
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roles.map(role => (
              <div key={role.id} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{role.name}</h3>
                    <p className="text-xs text-muted-foreground">{role.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleCloneRole(role)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Permission Matrix</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">Configure module permissions for each role</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  {roles.map(role => (
                    <TableHead key={role.id} className="text-center min-w-[200px]">{role.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            <TableBody>
              {modules.map(module => (
                <TableRow key={module}>
                  <TableCell className="font-medium">{module}</TableCell>
                  {roles.map(role => (
                    <TableCell key={role.id}>
                      <div className="space-y-2">
                        {actions.map(action => (
                          <div key={action} className="flex items-center justify-between">
                            <Label className="text-xs capitalize">{action}</Label>
                            <Switch
                              checked={role.permissions[module]?.[action as keyof typeof role.permissions[string]] || false}
                              onCheckedChange={() => handleTogglePermission(role.id, module, action)}
                              size="sm"
                            />
                          </div>
                        ))}
                        <div className="pt-2 border-t">
                          <Select
                            value=""
                            onValueChange={(value) => handleSetDefaultRole(module, value)}
                          >
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue placeholder="Default role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map(r => (
                                <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      <Button onClick={() => toast.success("Permissions saved successfully")}>
        Save All Permissions
      </Button>
    </div>
  );
};

export default RolesPermissions;

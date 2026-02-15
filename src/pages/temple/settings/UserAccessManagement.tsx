import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Users, Shield, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  loginAccess: boolean;
  status: "active" | "inactive";
  lastLogin?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, string>;
}

const UserAccessManagement = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "USR-001",
      name: "Swami Prasad",
      email: "admin@temple.org",
      role: "Super Admin",
      phone: "+91 877 123 4567",
      loginAccess: true,
      status: "active",
      lastLogin: "2024-01-15 10:30",
    },
    {
      id: "USR-002",
      name: "Priest Kumar",
      email: "priest@temple.org",
      role: "Temple Admin",
      phone: "+91 877 123 4568",
      loginAccess: true,
      status: "active",
      lastLogin: "2024-01-15 09:15",
    },
    {
      id: "USR-003",
      name: "Finance Manager",
      email: "finance@temple.org",
      role: "Finance Manager",
      phone: "+91 877 123 4569",
      loginAccess: true,
      status: "active",
      lastLogin: "2024-01-14 16:45",
    },
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "ROLE-001",
      name: "Super Admin",
      description: "Full access to all modules and settings",
      permissions: {
        "Donations": "Full Access",
        "Events": "Full Access",
        "Finance": "Full Access",
        "Inventory": "Full Access",
        "Settings": "Full Access",
      },
    },
    {
      id: "ROLE-002",
      name: "Temple Admin",
      description: "Manage temple operations and daily activities",
      permissions: {
        "Donations": "View & Edit",
        "Events": "Full Access",
        "Finance": "View Only",
        "Inventory": "View & Edit",
        "Settings": "View Only",
      },
    },
    {
      id: "ROLE-003",
      name: "Finance Manager",
      description: "Manage financial operations and reports",
      permissions: {
        "Donations": "View & Edit",
        "Events": "View Only",
        "Finance": "Full Access",
        "Inventory": "View Only",
        "Settings": "View Only",
      },
    },
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    loginAccess: true,
  });
  const [roleForm, setRoleForm] = useState({
    name: "",
    description: "",
  });

  const modules = ["Donations", "Events", "Finance", "Inventory", "Settings", "Crowd Management", "Freelancers"];
  const accessLevels = ["No Access", "View Only", "View & Edit", "Full Access"];

  const handleAddUser = () => {
    if (!userForm.name || !userForm.email || !userForm.role) {
      toast.error("Please fill required fields");
      return;
    }
    const newUser: User = {
      id: `USR-${String(users.length + 1).padStart(3, "0")}`,
      ...userForm,
      status: "active",
    };
    setUsers([...users, newUser]);
    setUserForm({ name: "", email: "", phone: "", role: "", loginAccess: true });
    setShowAddUser(false);
    toast.success("User added successfully");
  };

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
    ));
    toast.success("User status updated");
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
      toast.success("User deleted");
    }
  };

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
    setRoles([...roles, newRole]);
    setRoleForm({ name: "", description: "" });
    setShowAddRole(false);
    toast.success("Role created successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">User & Access Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage system users, roles, and permissions</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-transparent">
          <TabsTrigger value="users" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700">
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700">
            Roles & Permissions
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" /> Users
                </CardTitle>
                <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => setUserForm({ name: "", email: "", phone: "", role: "", loginAccess: true })}>
                      <Plus className="h-4 w-4 mr-2" /> Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label>Name *</Label>
                        <Input
                          value={userForm.name}
                          onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                          placeholder="Enter user name"
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={userForm.email}
                          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                          placeholder="user@temple.org"
                        />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input
                          type="tel"
                          value={userForm.phone}
                          onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <Label>Role *</Label>
                        <Select value={userForm.role} onValueChange={(value) => setUserForm({ ...userForm, role: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Login Access</Label>
                        <Switch
                          checked={userForm.loginAccess}
                          onCheckedChange={(checked) => setUserForm({ ...userForm, loginAccess: checked })}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setShowAddUser(false)}>
                        Cancel
                      </Button>
                      <Button className="flex-1" onClick={handleAddUser}>
                        Add User
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Login Access</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        {user.loginAccess ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Enabled
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <XCircle className="h-3 w-3" /> Disabled
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(user.id)}
                          >
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-4 mt-6">
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
              <p className="text-sm text-muted-foreground mt-2">Modules vs Access Level by Role</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      {roles.map(role => (
                        <TableHead key={role.id} className="text-center">{role.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map(module => (
                      <TableRow key={module}>
                        <TableCell className="font-medium">{module}</TableCell>
                        {roles.map(role => (
                          <TableCell key={role.id} className="text-center">
                            <Select
                              value={role.permissions[module] || "No Access"}
                              onValueChange={(value) => {
                                setRoles(roles.map(r => 
                                  r.id === role.id 
                                    ? { ...r, permissions: { ...r.permissions, [module]: value } }
                                    : r
                                ));
                              }}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {accessLevels.map(level => (
                                  <SelectItem key={level} value={level}>{level}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button className="mt-4" onClick={() => toast.success("Permissions saved successfully")}>
                Save Permissions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAccessManagement;

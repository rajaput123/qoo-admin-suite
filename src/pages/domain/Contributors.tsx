import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, MoreHorizontal, Mail, Calendar, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Contributor {
  id: string;
  name: string;
  email: string;
  role: "Editor" | "Viewer" | "Moderator";
  submissions: number;
  status: "Active" | "Inactive" | "Pending";
  joinedDate: string;
}

const mockData: Contributor[] = [
  { id: "1", name: "Harpreet Singh", email: "harpreet@example.com", role: "Editor", submissions: 24, status: "Active", joinedDate: "Jan 2026" },
  { id: "2", name: "Priya Patel", email: "priya@example.com", role: "Moderator", submissions: 56, status: "Active", joinedDate: "Dec 2025" },
  { id: "3", name: "Amit Kumar", email: "amit@example.com", role: "Editor", submissions: 12, status: "Active", joinedDate: "Jan 2026" },
  { id: "4", name: "Suresh Menon", email: "suresh@example.com", role: "Viewer", submissions: 3, status: "Inactive", joinedDate: "Nov 2025" },
  { id: "5", name: "Lakshmi Rajan", email: "lakshmi@example.com", role: "Editor", submissions: 31, status: "Active", joinedDate: "Oct 2025" },
  { id: "6", name: "Ravi Desai", email: "ravi@example.com", role: "Editor", submissions: 8, status: "Pending", joinedDate: "Feb 2026" },
  { id: "7", name: "Deepa Murthy", email: "deepa@example.com", role: "Moderator", submissions: 42, status: "Active", joinedDate: "Sep 2025" },
  { id: "8", name: "Ananya Sharma", email: "ananya@example.com", role: "Viewer", submissions: 0, status: "Pending", joinedDate: "Feb 2026" },
];

const statusColors: Record<string, string> = {
  Active: "bg-success/10 text-success",
  Inactive: "bg-muted text-muted-foreground",
  Pending: "bg-warning/10 text-warning",
};

const roleColors: Record<string, string> = {
  Editor: "bg-info/10 text-info",
  Viewer: "bg-muted text-muted-foreground",
  Moderator: "bg-accent/10 text-accent",
};

const Contributors = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filtered = mockData
    .filter((c) => statusFilter === "all" || c.status === statusFilter)
    .filter((c) => roleFilter === "all" || c.role === roleFilter);

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Contributors</h1>
            <p className="text-sm text-muted-foreground">Manage users who contribute to the directory</p>
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Invite Contributor
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 h-9 text-sm bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-32 h-9 text-sm bg-card">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Editor">Editor</SelectItem>
            <SelectItem value="Viewer">Viewer</SelectItem>
            <SelectItem value="Moderator">Moderator</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contributors..." className="h-9 pl-9 text-sm bg-card" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Contributor</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Email</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Role</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Submissions</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Joined</th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gold-light text-accent text-xs font-medium">
                          {row.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{row.email}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", roleColors[row.role])}>
                      {row.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{row.submissions}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", statusColors[row.status])}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{row.joinedDate}</td>
                  <td className="px-4 py-3">
                    <button className="p-1 rounded hover:bg-muted transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contributors;

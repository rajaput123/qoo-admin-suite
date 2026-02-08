import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, MoreHorizontal, Eye, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Submission {
  id: string;
  temple: string;
  location: string;
  submittedBy: string;
  source: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected" | "Under Review";
}

const mockData: Submission[] = [
  { id: "1", temple: "Sri Meenakshi Temple", location: "Madurai, TN", submittedBy: "Lakshmi R.", source: "Portal", date: "Feb 6, 2026", status: "Pending" },
  { id: "2", temple: "Jagannath Temple", location: "Puri, OD", submittedBy: "Suresh M.", source: "API", date: "Feb 5, 2026", status: "Approved" },
  { id: "3", temple: "Kashi Vishwanath", location: "Varanasi, UP", submittedBy: "Amit K.", source: "Portal", date: "Feb 5, 2026", status: "Rejected" },
  { id: "4", temple: "Tirupati Balaji", location: "Tirupati, AP", submittedBy: "Priya P.", source: "Bulk Import", date: "Feb 4, 2026", status: "Under Review" },
  { id: "5", temple: "Golden Temple", location: "Amritsar, PB", submittedBy: "Harpreet S.", source: "Portal", date: "Feb 4, 2026", status: "Pending" },
  { id: "6", temple: "Somnath Temple", location: "Gir Somnath, GJ", submittedBy: "Ravi D.", source: "API", date: "Feb 3, 2026", status: "Approved" },
  { id: "7", temple: "Kedarnath Temple", location: "Rudraprayag, UK", submittedBy: "Ananya S.", source: "Portal", date: "Feb 3, 2026", status: "Pending" },
  { id: "8", temple: "Ramanathaswamy", location: "Rameswaram, TN", submittedBy: "Deepa M.", source: "Portal", date: "Feb 2, 2026", status: "Approved" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning",
  Approved: "bg-success/10 text-success",
  Rejected: "bg-destructive/10 text-destructive",
  "Under Review": "bg-info/10 text-info",
};

const Submissions = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = statusFilter === "all"
    ? mockData
    : mockData.filter((s) => s.status === statusFilter);

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((s) => s.id)));
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Submissions</h1>
            <p className="text-sm text-muted-foreground">Review and manage temple submissions</p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 h-9 text-sm bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-36 h-9 text-sm bg-card">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Portal">Portal</SelectItem>
            <SelectItem value="API">API</SelectItem>
            <SelectItem value="Bulk Import">Bulk Import</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search temples..." className="h-9 pl-9 text-sm bg-card" />
        </div>

        {selected.size > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-muted-foreground">{selected.size} selected</span>
            <Button size="sm" className="h-8 gap-1 text-xs">
              <Check className="h-3 w-3" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1 text-xs text-destructive border-destructive/30">
              <X className="h-3 w-3" />
              Reject
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="w-10 px-4 py-3">
                  <Checkbox
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Temple Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Location</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Submitted By</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Source</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="w-10 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "hover:bg-muted/20 transition-colors",
                    selected.has(row.id) && "bg-gold-light/30"
                  )}
                >
                  <td className="px-4 py-3">
                    <Checkbox checked={selected.has(row.id)} onCheckedChange={() => toggleOne(row.id)} />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{row.temple}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{row.location}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{row.submittedBy}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{row.source}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{row.date}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", statusColors[row.status])}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1 rounded hover:bg-muted transition-colors">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex items-center justify-between text-sm">
          <span className="text-muted-foreground text-xs">
            Showing {filtered.length} of {mockData.length} submissions
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submissions;

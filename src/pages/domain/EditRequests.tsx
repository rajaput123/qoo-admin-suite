import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Check, X, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface EditRequest {
  id: string;
  temple: string;
  field: string;
  requestedBy: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

const mockData: EditRequest[] = [
  { id: "1", temple: "Golden Temple", field: "Contact Info", requestedBy: "Harpreet S.", date: "Feb 6, 2026", status: "Pending" },
  { id: "2", temple: "Tirupati Balaji", field: "Photos", requestedBy: "Priya P.", date: "Feb 5, 2026", status: "Pending" },
  { id: "3", temple: "Kedarnath Temple", field: "Timings", requestedBy: "Amit K.", date: "Feb 5, 2026", status: "Approved" },
  { id: "4", temple: "Jagannath Temple", field: "Description", requestedBy: "Suresh M.", date: "Feb 4, 2026", status: "Rejected" },
  { id: "5", temple: "Somnath Temple", field: "Address", requestedBy: "Ravi D.", date: "Feb 4, 2026", status: "Pending" },
  { id: "6", temple: "Kashi Vishwanath", field: "History", requestedBy: "Deepa M.", date: "Feb 3, 2026", status: "Approved" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning",
  Approved: "bg-success/10 text-success",
  Rejected: "bg-destructive/10 text-destructive",
};

const EditRequests = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = statusFilter === "all"
    ? mockData
    : mockData.filter((s) => s.status === statusFilter);

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Edit Requests</h1>
        <p className="text-sm text-muted-foreground mb-6">Review proposed changes to published temples</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9 text-sm bg-card">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search requests..." className="h-9 pl-9 text-sm bg-card" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Temple</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Field Changed</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden md:table-cell">Requested By</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Status</th>
                <th className="w-32 px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{row.temple}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{row.field}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{row.requestedBy}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{row.date}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", statusColors[row.status])}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-muted transition-colors" title="View">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      {row.status === "Pending" && (
                        <>
                          <button className="p-1.5 rounded hover:bg-success/10 transition-colors" title="Approve">
                            <Check className="h-4 w-4 text-success" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-destructive/10 transition-colors" title="Reject">
                            <X className="h-4 w-4 text-destructive" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-muted transition-colors" title="Request Clarification">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </>
                      )}
                    </div>
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

export default EditRequests;

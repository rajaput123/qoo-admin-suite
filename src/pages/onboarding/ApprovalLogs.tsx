import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download,
  Calendar,
  User,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const auditLogs = [
  { 
    id: "LOG-10521", 
    caseId: "REG-4521",
    templeName: "Sri Lakshmi Narasimha Temple",
    previousStatus: "Submitted",
    newStatus: "Under Review",
    action: "Status Changed",
    user: "Reviewer A",
    role: "Reviewer",
    timestamp: "2024-01-15 09:35:22",
    region: "Tamil Nadu",
    notes: "Initial review started"
  },
  { 
    id: "LOG-10520", 
    caseId: "REG-4520",
    templeName: "Kashi Vishwanath Mandir",
    previousStatus: "Under Review",
    newStatus: "Verification Pending",
    action: "Moved to Verification",
    user: "Reviewer A",
    role: "Reviewer",
    timestamp: "2024-01-15 09:30:15",
    region: "Uttar Pradesh",
    notes: "Documents require verification"
  },
  { 
    id: "LOG-10519", 
    caseId: "REG-4518",
    templeName: "Tirupati Balaji Temple",
    previousStatus: "Verification Pending",
    newStatus: "Approved",
    action: "Approved",
    user: "Approver C",
    role: "Approver",
    timestamp: "2024-01-15 09:25:48",
    region: "Andhra Pradesh",
    notes: "All documents verified, ready for tenant creation"
  },
  { 
    id: "LOG-10518", 
    caseId: "REG-4517",
    templeName: "Shirdi Sai Sansthan",
    previousStatus: "Approved",
    newStatus: "Tenant Created",
    action: "Tenant Created",
    user: "System",
    role: "System",
    timestamp: "2024-01-15 09:20:33",
    region: "Maharashtra",
    notes: "Tenant ID: TEN-4999 created automatically"
  },
  { 
    id: "LOG-10517", 
    caseId: "REG-4515",
    templeName: "Unknown Temple",
    previousStatus: "Under Review",
    newStatus: "Rejected",
    action: "Rejected",
    user: "Reviewer B",
    role: "Reviewer",
    timestamp: "2024-01-15 09:15:10",
    region: "Delhi",
    notes: "Invalid trust registration documents"
  },
  { 
    id: "LOG-10516", 
    caseId: "REG-4514",
    templeName: "ISKCON Mumbai",
    previousStatus: "Tenant Created",
    newStatus: "Activated",
    action: "Activated",
    user: "Admin A",
    role: "Super Admin",
    timestamp: "2024-01-15 09:10:05",
    region: "Maharashtra",
    notes: "Full SaaS access enabled"
  },
  { 
    id: "LOG-10515", 
    caseId: "VER-1019",
    templeName: "Meenakshi Temple",
    previousStatus: "Pending",
    newStatus: "Verified",
    action: "Document Verified",
    user: "Verifier A",
    role: "Verifier",
    timestamp: "2024-01-15 09:05:22",
    region: "Tamil Nadu",
    notes: "Trust registration certificate verified"
  },
];

const actionColors: Record<string, string> = {
  "Status Changed": "bg-gray-100 text-gray-700",
  "Moved to Verification": "bg-blue-100 text-blue-700",
  "Approved": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700",
  "Tenant Created": "bg-primary/10 text-primary",
  "Activated": "bg-emerald-100 text-emerald-700",
  "Document Verified": "bg-cyan-100 text-cyan-700",
};

const roleColors: Record<string, string> = {
  "Reviewer": "bg-blue-100 text-blue-700",
  "Verifier": "bg-purple-100 text-purple-700",
  "Approver": "bg-green-100 text-green-700",
  "Super Admin": "bg-primary/10 text-primary",
  "System": "bg-gray-100 text-gray-700",
};

const ApprovalLogs = () => {
  const [selectedLog, setSelectedLog] = useState<typeof auditLogs[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="p-4 lg:px-8 lg:pt-4 lg:pb-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Approval Logs</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Complete audit trail of all onboarding actions
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <FileText className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12,847</p>
                <p className="text-xs text-muted-foreground">Total Logs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3,421</p>
                <p className="text-xs text-muted-foreground">Approvals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">456</p>
                <p className="text-xs text-muted-foreground">Rejections</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-xs text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">847</p>
                <p className="text-xs text-muted-foreground">Today's Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by case ID, temple, or user..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="verification">Verification</SelectItem>
                <SelectItem value="tenant">Tenant Created</SelectItem>
                <SelectItem value="activated">Activated</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="User Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="reviewer">Reviewer</SelectItem>
                <SelectItem value="verifier">Verifier</SelectItem>
                <SelectItem value="approver">Approver</SelectItem>
                <SelectItem value="admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="tn">Tamil Nadu</SelectItem>
                <SelectItem value="up">Uttar Pradesh</SelectItem>
                <SelectItem value="mh">Maharashtra</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Log ID</TableHead>
              <TableHead className="w-[100px]">Case ID</TableHead>
              <TableHead>Temple</TableHead>
              <TableHead>Status Change</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-mono text-xs">{log.id}</TableCell>
                <TableCell className="font-mono text-xs">{log.caseId}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{log.templeName}</p>
                    <p className="text-xs text-muted-foreground">{log.region}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{log.previousStatus}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{log.newStatus}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={actionColors[log.action]} variant="secondary">
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{log.user}</span>
                    <Badge className={`${roleColors[log.role]} text-xs`} variant="secondary">
                      {log.role}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{log.timestamp}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => { setSelectedLog(log); setDetailOpen(true); }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 1-10 of 12,847 logs
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>

      {/* Log Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Audit Log Details</DialogTitle>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Log ID</p>
                  <p className="font-mono text-sm">{selectedLog.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Case ID</p>
                  <p className="font-mono text-sm">{selectedLog.caseId}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Temple</p>
                <p className="font-medium">{selectedLog.templeName}</p>
                <p className="text-sm text-muted-foreground">{selectedLog.region}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-2">Status Transition</p>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{selectedLog.previousStatus}</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge className={actionColors[selectedLog.action]}>{selectedLog.newStatus}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Action</p>
                  <Badge className={actionColors[selectedLog.action]} variant="secondary">
                    {selectedLog.action}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Performed By</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{selectedLog.user}</span>
                    <Badge className={`${roleColors[selectedLog.role]} text-xs`} variant="secondary">
                      {selectedLog.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Timestamp</p>
                <p className="text-sm">{selectedLog.timestamp}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Notes</p>
                <p className="text-sm p-3 rounded-lg bg-muted/50">{selectedLog.notes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApprovalLogs;

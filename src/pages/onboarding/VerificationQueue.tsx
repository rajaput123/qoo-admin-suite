import { useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal,
  FileCheck,
  FileX,
  AlertTriangle,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  Upload,
  ExternalLink
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const verificationQueue = [
  { 
    id: "VER-1021", 
    registrationId: "REG-4520",
    templeName: "Kashi Vishwanath Mandir", 
    documentsSubmitted: 10,
    documentsVerified: 7,
    documentsPending: 3,
    verificationStatus: "In Progress",
    assignedVerifier: "Verifier A",
    slaRemaining: "1d 2h",
    riskLevel: "Medium",
    region: "Uttar Pradesh",
    submittedAt: "2024-01-15"
  },
  { 
    id: "VER-1020", 
    registrationId: "REG-4519",
    templeName: "ISKCON Bangalore", 
    documentsSubmitted: 12,
    documentsVerified: 0,
    documentsPending: 12,
    verificationStatus: "Pending",
    assignedVerifier: "Unassigned",
    slaRemaining: "2d 4h",
    riskLevel: "Low",
    region: "Karnataka",
    submittedAt: "2024-01-15"
  },
  { 
    id: "VER-1019", 
    registrationId: "REG-4518",
    templeName: "Tirupati Balaji Temple", 
    documentsSubmitted: 15,
    documentsVerified: 15,
    documentsPending: 0,
    verificationStatus: "Completed",
    assignedVerifier: "Verifier B",
    slaRemaining: "—",
    riskLevel: "Low",
    region: "Andhra Pradesh",
    submittedAt: "2024-01-14"
  },
  { 
    id: "VER-1018", 
    registrationId: "REG-4521",
    templeName: "Sri Lakshmi Narasimha Temple", 
    documentsSubmitted: 8,
    documentsVerified: 5,
    documentsPending: 3,
    verificationStatus: "Issues Found",
    assignedVerifier: "Verifier A",
    slaRemaining: "4h",
    riskLevel: "High",
    region: "Tamil Nadu",
    submittedAt: "2024-01-15"
  },
];

const documents = [
  { name: "Trust Registration Certificate", status: "Verified", verifiedBy: "Verifier A", verifiedAt: "2024-01-15 10:30" },
  { name: "PAN Card", status: "Verified", verifiedBy: "Verifier A", verifiedAt: "2024-01-15 10:35" },
  { name: "Bank Statement", status: "Pending", verifiedBy: null, verifiedAt: null },
  { name: "Authorized Signatory ID", status: "Rejected", verifiedBy: "Verifier A", verifiedAt: "2024-01-15 11:00", remarks: "Image unclear, please resubmit" },
  { name: "Address Proof", status: "Pending", verifiedBy: null, verifiedAt: null },
  { name: "GST Certificate", status: "Verified", verifiedBy: "Verifier A", verifiedAt: "2024-01-15 10:45" },
];

const statusColors: Record<string, string> = {
  "Pending": "bg-gray-100 text-gray-700",
  "In Progress": "bg-amber-100 text-amber-700",
  "Completed": "bg-green-100 text-green-700",
  "Issues Found": "bg-red-100 text-red-700",
};

const docStatusColors: Record<string, string> = {
  "Pending": "bg-gray-100 text-gray-700",
  "Verified": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700",
};

const riskColors: Record<string, string> = {
  "Low": "bg-green-100 text-green-700",
  "Medium": "bg-amber-100 text-amber-700",
  "High": "bg-red-100 text-red-700",
};

const VerificationQueue = () => {
  const [selectedItem, setSelectedItem] = useState<typeof verificationQueue[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="p-4 lg:px-8 lg:pt-4 lg:pb-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Verification Queue</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Document verification and compliance validation
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <Clock className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">67</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100">
                <FileCheck className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
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
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Issues Found</p>
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
              <Input placeholder="Search by temple or ID..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="issues">Issues Found</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Verifier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Verifiers</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="a">Verifier A</SelectItem>
                <SelectItem value="b">Verifier B</SelectItem>
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
                <SelectItem value="ka">Karnataka</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Temple</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Verifier</TableHead>
              <TableHead>SLA</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verificationQueue.map((item) => (
              <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{item.templeName}</p>
                    <p className="text-xs text-muted-foreground">{item.registrationId} • {item.region}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(item.documentsVerified / item.documentsSubmitted) * 100} 
                      className="w-20 h-1.5" 
                    />
                    <span className="text-xs text-muted-foreground">
                      {item.documentsVerified}/{item.documentsSubmitted}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[item.verificationStatus]} variant="secondary">
                    {item.verificationStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={riskColors[item.riskLevel]} variant="secondary">
                    {item.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{item.assignedVerifier}</TableCell>
                <TableCell>
                  <span className={`text-xs font-medium ${
                    item.slaRemaining === "—" ? "text-muted-foreground" :
                    item.slaRemaining.includes("h") && !item.slaRemaining.includes("d") 
                      ? "text-amber-600" 
                      : "text-foreground"
                  }`}>
                    {item.slaRemaining}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem onClick={() => { setSelectedItem(item); setDetailOpen(true); }}>
                        <Eye className="h-4 w-4 mr-2" />
                        Verify Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="h-4 w-4 mr-2" />
                        Assign Verifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Escalate Case
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Verification Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Document Verification: {selectedItem?.templeName}
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6 mt-4">
              {/* Summary */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="border">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedItem.documentsVerified}</p>
                    <p className="text-xs text-muted-foreground">Verified</p>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold text-amber-600">{selectedItem.documentsPending}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </CardContent>
                </Card>
                <Card className="border">
                  <CardContent className="p-3 text-center">
                    <p className="text-2xl font-bold">{selectedItem.documentsSubmitted}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </CardContent>
                </Card>
              </div>

              {/* Documents List */}
              <Card className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          doc.status === "Verified" ? "bg-green-100" :
                          doc.status === "Rejected" ? "bg-red-100" : "bg-gray-100"
                        }`}>
                          {doc.status === "Verified" ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : doc.status === "Rejected" ? (
                            <XCircle className="h-4 w-4 text-red-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          {doc.verifiedBy && (
                            <p className="text-xs text-muted-foreground">
                              {doc.verifiedBy} • {doc.verifiedAt}
                            </p>
                          )}
                          {doc.remarks && (
                            <p className="text-xs text-red-600 mt-1">{doc.remarks}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={docStatusColors[doc.status]} variant="secondary">
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        {doc.status === "Pending" && (
                          <>
                            <Button variant="outline" size="sm" className="h-8">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 text-destructive">
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Remarks */}
              <Card className="border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Verification Remarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea placeholder="Add verification remarks..." className="min-h-[80px]" />
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button className="flex-1">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Complete Verification
                </Button>
                <Button variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Escalate
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerificationQueue;

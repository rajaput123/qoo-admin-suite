import { useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Building2,
  MapPin,
  Calendar,
  User,
  FileText,
  Shield
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
  DropdownMenuSeparator,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const registrations = [
  { 
    id: "REG-4521", 
    templeName: "Sri Lakshmi Narasimha Temple", 
    trustName: "Sri Lakshmi Trust",
    region: "Tamil Nadu",
    city: "Chennai",
    submittedAt: "2024-01-15 09:30",
    status: "Under Review",
    riskScore: "High",
    duplicateScore: 85,
    assignedTo: "Reviewer A",
    slaRemaining: "4h 30m",
    documents: 8,
    verified: 5
  },
  { 
    id: "REG-4520", 
    templeName: "Kashi Vishwanath Mandir", 
    trustName: "Kashi Trust Board",
    region: "Uttar Pradesh",
    city: "Varanasi",
    submittedAt: "2024-01-15 08:45",
    status: "Verification Pending",
    riskScore: "Medium",
    duplicateScore: 23,
    assignedTo: "Verifier B",
    slaRemaining: "1d 2h",
    documents: 10,
    verified: 10
  },
  { 
    id: "REG-4519", 
    templeName: "ISKCON Bangalore", 
    trustName: "ISKCON Foundation",
    region: "Karnataka",
    city: "Bangalore",
    submittedAt: "2024-01-15 07:20",
    status: "Submitted",
    riskScore: "Low",
    duplicateScore: 5,
    assignedTo: "Unassigned",
    slaRemaining: "5h 45m",
    documents: 12,
    verified: 0
  },
  { 
    id: "REG-4518", 
    templeName: "Tirupati Balaji Temple", 
    trustName: "TTD Board",
    region: "Andhra Pradesh",
    city: "Tirupati",
    submittedAt: "2024-01-14 16:30",
    status: "Under Review",
    riskScore: "Low",
    duplicateScore: 12,
    assignedTo: "Reviewer A",
    slaRemaining: "2h 15m",
    documents: 15,
    verified: 8
  },
  { 
    id: "REG-4517", 
    templeName: "Shirdi Sai Sansthan", 
    trustName: "Sai Baba Trust",
    region: "Maharashtra",
    city: "Shirdi",
    submittedAt: "2024-01-14 14:00",
    status: "Approved",
    riskScore: "Low",
    duplicateScore: 0,
    assignedTo: "Approver C",
    slaRemaining: "—",
    documents: 11,
    verified: 11
  },
];

const statusColors: Record<string, string> = {
  "Draft": "bg-gray-100 text-gray-700",
  "Submitted": "bg-blue-100 text-blue-700",
  "Under Review": "bg-amber-100 text-amber-700",
  "Verification Pending": "bg-orange-100 text-orange-700",
  "Approved": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700",
  "Tenant Created": "bg-primary/10 text-primary",
  "Activated": "bg-emerald-100 text-emerald-700",
};

const riskColors: Record<string, string> = {
  "Low": "bg-green-100 text-green-700",
  "Medium": "bg-amber-100 text-amber-700",
  "High": "bg-red-100 text-red-700",
};

const RegistrationPipeline = () => {
  const [selectedRegistration, setSelectedRegistration] = useState<typeof registrations[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleViewDetails = (registration: typeof registrations[0]) => {
    setSelectedRegistration(registration);
    setDetailOpen(true);
  };

  return (
    <div className="p-4 lg:px-8 lg:pt-4 lg:pb-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Registration Pipeline</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage temple self-registration submissions and workflow
          </p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: "All", count: 2847, active: true },
          { label: "Submitted", count: 156, active: false },
          { label: "Under Review", count: 89, active: false },
          { label: "Verification", count: 67, active: false },
          { label: "Approved", count: 2341, active: false },
          { label: "Rejected", count: 261, active: false },
          { label: "Activated", count: 2089, active: false },
        ].map((status) => (
          <button
            key={status.label}
            className={`p-3 rounded-lg border text-left transition-all ${
              status.active 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            }`}
          >
            <p className="text-lg font-bold">{status.count}</p>
            <p className="text-xs text-muted-foreground">{status.label}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <Card className="border shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by temple, trust, or ID..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="verification">Verification Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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
                <SelectItem value="ka">Karnataka</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
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
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Duplicate</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead>SLA</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((reg) => (
              <TableRow key={reg.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-mono text-xs">{reg.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{reg.templeName}</p>
                    <p className="text-xs text-muted-foreground">{reg.trustName}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{reg.region}</p>
                    <p className="text-xs text-muted-foreground">{reg.city}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[reg.status]} variant="secondary">
                    {reg.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={riskColors[reg.riskScore]} variant="secondary">
                    {reg.riskScore}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={reg.duplicateScore} className="w-16 h-1.5" />
                    <span className="text-xs text-muted-foreground">{reg.duplicateScore}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{reg.assignedTo}</TableCell>
                <TableCell>
                  <span className={`text-xs font-medium ${
                    reg.slaRemaining === "—" ? "text-muted-foreground" :
                    reg.slaRemaining.includes("h") && !reg.slaRemaining.includes("d") 
                      ? "text-amber-600" 
                      : "text-foreground"
                  }`}>
                    {reg.slaRemaining}
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
                      <DropdownMenuItem onClick={() => handleViewDetails(reg)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="h-4 w-4 mr-2" />
                        Assign Reviewer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Move to Verification
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="h-4 w-4 mr-2" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Registration Review: {selectedRegistration?.templeName}
            </DialogTitle>
          </DialogHeader>
          
          {selectedRegistration && (
            <Tabs defaultValue="data" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="data">Submitted Data</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="risk">Risk & Duplicates</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="data" className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Temple Name</span>
                        <span className="font-medium">{selectedRegistration.templeName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trust Name</span>
                        <span className="font-medium">{selectedRegistration.trustName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Registration ID</span>
                        <span className="font-mono">{selectedRegistration.id}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Location</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Region</span>
                        <span className="font-medium">{selectedRegistration.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">City</span>
                        <span className="font-medium">{selectedRegistration.city}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Documents ({selectedRegistration.verified}/{selectedRegistration.documents} Verified)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={(selectedRegistration.verified / selectedRegistration.documents) * 100} className="h-2" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-4 mt-4">
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Compliance Checklist</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: "Legal Documents Verified", checked: true },
                      { label: "Bank Details Verified", checked: true },
                      { label: "KYC Completed", checked: false },
                      { label: "Trust Registration Valid", checked: true },
                      { label: "Address Proof Verified", checked: false },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <Checkbox checked={item.checked} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risk" className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Risk Score</span>
                        <Badge className={riskColors[selectedRegistration.riskScore]}>
                          {selectedRegistration.riskScore}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Duplicate Confidence</span>
                        <span className="text-sm font-medium">{selectedRegistration.duplicateScore}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Assignment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Assigned Reviewer</span>
                        <span className="text-sm font-medium">{selectedRegistration.assignedTo}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">SLA Remaining</span>
                        <span className="text-sm font-medium">{selectedRegistration.slaRemaining}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="actions" className="space-y-4 mt-4">
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Internal Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="Add internal notes for this registration..." className="min-h-[100px]" />
                  </CardContent>
                </Card>

                <div className="flex items-center gap-3">
                  <Button className="flex-1">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Move to Verification
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Request More Info
                  </Button>
                  <Button variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrationPipeline;

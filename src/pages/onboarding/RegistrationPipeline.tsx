import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  User,
  FileText,
  Shield,
  Download,
  Upload,
  Trash2,
  Send,
  MessageSquare
} from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SearchableSelect from "@/components/SearchableSelect";
import CustomFieldsSection, { CustomField } from "@/components/CustomFieldsSection";

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
  "Draft": "bg-muted text-muted-foreground",
  "Submitted": "bg-info/10 text-info",
  "Under Review": "bg-warning/10 text-warning",
  "Verification Pending": "bg-orange-100 text-orange-700",
  "Approved": "bg-success/10 text-success",
  "Rejected": "bg-destructive/10 text-destructive",
  "Tenant Created": "bg-primary/10 text-primary",
  "Activated": "bg-emerald-100 text-emerald-700",
};

const riskColors: Record<string, string> = {
  "Low": "bg-success/10 text-success",
  "Medium": "bg-warning/10 text-warning",
  "High": "bg-destructive/10 text-destructive",
};

const regionOptions = [
  { value: "tn", label: "Tamil Nadu" },
  { value: "up", label: "Uttar Pradesh" },
  { value: "mh", label: "Maharashtra" },
  { value: "ka", label: "Karnataka" },
  { value: "kl", label: "Kerala" },
  { value: "ap", label: "Andhra Pradesh" },
];

const reviewerOptions = [
  { value: "reviewer-a", label: "Reviewer A" },
  { value: "reviewer-b", label: "Reviewer B" },
  { value: "reviewer-c", label: "Reviewer C" },
];

const RegistrationPipeline = () => {
  const [selectedRegistration, setSelectedRegistration] = useState<typeof registrations[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedReviewer, setSelectedReviewer] = useState("");

  const handleViewDetails = (registration: typeof registrations[0]) => {
    setSelectedRegistration(registration);
    setDetailOpen(true);
  };

  const handleRowClick = (registration: typeof registrations[0]) => {
    handleViewDetails(registration);
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === registrations.length ? [] : registrations.map(r => r.id)
    );
  };

  return (
    <div className="p-6 lg:px-8 lg:pt-4 lg:pb-8 max-w-7xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">Registration Pipeline</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage temple self-registration submissions and workflow
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {[
          { label: "All", count: 2847, active: true },
          { label: "Submitted", count: 156, active: false },
          { label: "Under Review", count: 89, active: false },
          { label: "Verification", count: 67, active: false },
          { label: "Approved", count: 2341, active: false },
          { label: "Rejected", count: 261, active: false },
          { label: "Activated", count: 2089, active: false },
        ].map((status, i) => (
          <motion.button
            key={status.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`p-3 rounded-xl border text-left transition-all hover:shadow-md ${
              status.active 
                ? "border-primary bg-primary/5 shadow-sm" 
                : "border-border hover:border-primary/50"
            }`}
          >
            <p className="text-lg font-bold">{status.count}</p>
            <p className="text-xs text-muted-foreground">{status.label}</p>
          </motion.button>
        ))}
      </div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card rounded-2xl glass-shadow p-4 mb-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by temple, trust, or ID..." className="pl-9" />
          </div>
          <SearchableSelect
            options={[{ value: "all", label: "All Status" }, ...Object.keys(statusColors).map(s => ({ value: s.toLowerCase().replace(/\s+/g, "-"), label: s }))]}
            placeholder="Status"
            onValueChange={() => {}}
            className="w-[150px]"
          />
          <SearchableSelect
            options={[{ value: "all", label: "All Regions" }, ...regionOptions]}
            value={selectedRegion}
            onValueChange={setSelectedRegion}
            placeholder="Region"
            onAddNew={() => alert("Add new region")}
            addNewLabel="Add Region"
            className="w-[150px]"
          />
          <SearchableSelect
            options={[{ value: "all", label: "All Risk" }, { value: "high", label: "High Risk" }, { value: "medium", label: "Medium Risk" }, { value: "low", label: "Low Risk" }]}
            placeholder="Risk Level"
            onValueChange={() => {}}
            className="w-[150px]"
          />
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Bulk Actions Bar */}
      {selectedItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-3 mb-4 flex items-center justify-between"
        >
          <span className="text-sm font-medium">{selectedItems.length} item(s) selected</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Assign Reviewer
            </Button>
            <Button variant="outline" size="sm">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Bulk Approve
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Reject Selected
            </Button>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-2xl glass-shadow overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedItems.length === registrations.length}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
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
              <TableRow 
                key={reg.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(reg)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox 
                    checked={selectedItems.includes(reg.id)}
                    onCheckedChange={() => toggleSelectItem(reg.id)}
                  />
                </TableCell>
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
                      ? "text-warning" 
                      : "text-foreground"
                  }`}>
                    {reg.slaRemaining}
                  </span>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover">
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
      </motion.div>

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
            <>
              {/* Actions at Top */}
              <div className="flex items-center gap-2 pt-2 pb-4 border-b">
                <Button size="sm" className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Approve & Create Tenant
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Move to Verification
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Send className="h-4 w-4" />
                  Request More Info
                </Button>
                <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive">
                  <AlertTriangle className="h-4 w-4" />
                  Reject
                </Button>
              </div>

              <Tabs defaultValue="data" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="data">Submitted Data</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="risk">Risk & Duplicates</TabsTrigger>
                </TabsList>

                <TabsContent value="data" className="space-y-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        Basic Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1.5 border-b border-border/50">
                          <span className="text-muted-foreground">Temple Name</span>
                          <span className="font-medium">{selectedRegistration.templeName}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-border/50">
                          <span className="text-muted-foreground">Trust Name</span>
                          <span className="font-medium">{selectedRegistration.trustName}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-border/50">
                          <span className="text-muted-foreground">Registration ID</span>
                          <span className="font-mono">{selectedRegistration.id}</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span className="text-muted-foreground">Submitted At</span>
                          <span className="font-medium">{selectedRegistration.submittedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Location
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1.5 border-b border-border/50">
                          <span className="text-muted-foreground">Region</span>
                          <span className="font-medium">{selectedRegistration.region}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-border/50">
                          <span className="text-muted-foreground">City</span>
                          <span className="font-medium">{selectedRegistration.city}</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span className="text-muted-foreground">Country</span>
                          <span className="font-medium">India</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assignment Section */}
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold">Assignment</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Assign Reviewer</Label>
                        <SearchableSelect
                          options={reviewerOptions}
                          value={selectedReviewer}
                          onValueChange={setSelectedReviewer}
                          placeholder="Select reviewer"
                          onAddNew={() => alert("Add new reviewer")}
                          addNewLabel="Add Reviewer"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Region Tag</Label>
                        <SearchableSelect
                          options={regionOptions}
                          value={selectedRegion}
                          onValueChange={setSelectedRegion}
                          placeholder="Select region"
                          onAddNew={() => alert("Add new region")}
                          addNewLabel="Add Region"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Fields */}
                  <div className="glass-card rounded-xl p-4">
                    <CustomFieldsSection 
                      fields={customFields}
                      onFieldsChange={setCustomFields}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4 mt-4">
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-semibold">Documents ({selectedRegistration.verified}/{selectedRegistration.documents} Verified)</h4>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Request Document
                      </Button>
                    </div>
                    <Progress value={(selectedRegistration.verified / selectedRegistration.documents) * 100} className="h-2 mb-4" />
                    <div className="space-y-2">
                      {[
                        { name: "Trust Registration Certificate", status: "Verified" },
                        { name: "PAN Card", status: "Verified" },
                        { name: "Bank Statement", status: "Pending" },
                        { name: "Authorized Signatory ID", status: "Pending" },
                        { name: "GST Certificate", status: "Verified" },
                      ].map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                          <span className="text-sm">{doc.name}</span>
                          <Badge variant={doc.status === "Verified" ? "default" : "secondary"}>
                            {doc.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="compliance" className="space-y-4 mt-4">
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold">Compliance Checklist</h4>
                    {[
                      { label: "Legal Documents Verified", checked: true },
                      { label: "Bank Details Verified", checked: true },
                      { label: "KYC Completed", checked: false },
                      { label: "Trust Registration Valid", checked: true },
                      { label: "Address Proof Verified", checked: false },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                        <Checkbox checked={item.checked} />
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="risk" className="space-y-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-semibold">Risk Assessment</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <span className="text-sm text-muted-foreground">Risk Score</span>
                          <Badge className={riskColors[selectedRegistration.riskScore]}>
                            {selectedRegistration.riskScore}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <span className="text-sm text-muted-foreground">Duplicate Confidence</span>
                          <span className="text-sm font-medium">{selectedRegistration.duplicateScore}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-semibold">Internal Notes</h4>
                      <Textarea placeholder="Add internal notes..." className="min-h-[100px]" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrationPipeline;
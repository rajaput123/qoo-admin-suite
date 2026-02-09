import { useState } from "react";
import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  Shield, 
  Search, 
  Filter,
  Eye,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  MapPin,
  XCircle,
  Download,
  ArrowUpRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SearchableSelect from "@/components/SearchableSelect";

const riskCases = [
  { 
    id: "RSK-301", 
    registrationId: "REG-4521",
    templeName: "Sri Lakshmi Narasimha Temple", 
    riskScore: 85,
    riskLevel: "High",
    primaryReason: "Document mismatch",
    secondaryReasons: ["Address inconsistency", "Incomplete KYC"],
    region: "Tamil Nadu",
    status: "Pending Review",
    assignedTo: "Risk Officer A",
    flaggedAt: "2024-01-15 09:30"
  },
  { 
    id: "RSK-300", 
    registrationId: "REG-4518",
    templeName: "Kashi Vishwanath Trust", 
    riskScore: 78,
    riskLevel: "High",
    primaryReason: "Duplicate detection (85%)",
    secondaryReasons: ["Trust name similarity"],
    region: "Uttar Pradesh",
    status: "Under Investigation",
    assignedTo: "Risk Officer B",
    flaggedAt: "2024-01-15 08:15"
  },
  { 
    id: "RSK-299", 
    registrationId: "REG-4515",
    templeName: "Jagannath Mandir Trust", 
    riskScore: 52,
    riskLevel: "Medium",
    primaryReason: "Incomplete bank verification",
    secondaryReasons: [],
    region: "Odisha",
    status: "Pending Review",
    assignedTo: "Unassigned",
    flaggedAt: "2024-01-14 16:45"
  },
  { 
    id: "RSK-298", 
    registrationId: "REG-4510",
    templeName: "Unknown Temple Entry", 
    riskScore: 92,
    riskLevel: "Critical",
    primaryReason: "Fraudulent documents suspected",
    secondaryReasons: ["Multiple failed verifications", "Blacklisted trust name"],
    region: "Maharashtra",
    status: "Blocked",
    assignedTo: "Risk Officer A",
    flaggedAt: "2024-01-14 14:20"
  },
];

const regionRiskData = [
  { region: "Tamil Nadu", total: 487, high: 12, medium: 34, low: 441 },
  { region: "Uttar Pradesh", total: 423, high: 8, medium: 28, low: 387 },
  { region: "Maharashtra", total: 398, high: 15, medium: 42, low: 341 },
  { region: "Karnataka", total: 356, high: 5, medium: 22, low: 329 },
  { region: "Kerala", total: 312, high: 3, medium: 18, low: 291 },
];

const complianceMetrics = [
  { label: "Legal Compliance Rate", value: 94.2, change: 2.1, trend: "up" },
  { label: "Bank Verification Rate", value: 91.8, change: -0.5, trend: "down" },
  { label: "KYC Completion Rate", value: 88.5, change: 3.2, trend: "up" },
  { label: "Document Verification Rate", value: 92.1, change: 1.8, trend: "up" },
];

const riskLevelColors: Record<string, string> = {
  "Low": "bg-success/10 text-success",
  "Medium": "bg-warning/10 text-warning",
  "High": "bg-destructive/10 text-destructive",
  "Critical": "bg-destructive/20 text-destructive",
};

const statusColors: Record<string, string> = {
  "Pending Review": "bg-muted text-muted-foreground",
  "Under Investigation": "bg-warning/10 text-warning",
  "Resolved": "bg-success/10 text-success",
  "Blocked": "bg-destructive/10 text-destructive",
  "Overridden": "bg-info/10 text-info",
};

const riskOfficerOptions = [
  { value: "officer-a", label: "Risk Officer A" },
  { value: "officer-b", label: "Risk Officer B" },
  { value: "officer-c", label: "Risk Officer C" },
];

const ComplianceRisk = () => {
  const [selectedCase, setSelectedCase] = useState<typeof riskCases[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleRowClick = (item: typeof riskCases[0]) => {
    setSelectedCase(item);
    setDetailOpen(true);
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === riskCases.length ? [] : riskCases.map(r => r.id)
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
          <h1 className="text-2xl font-bold text-foreground">Compliance & Risk</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Risk monitoring, compliance tracking, and fraud prevention
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {complianceMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-4 glass-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium flex items-center gap-1 ${
                metric.trend === "up" ? "text-success" : "text-destructive"
              }`}>
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {metric.change > 0 ? "+" : ""}{metric.change}%
              </span>
            </div>
            <p className="text-2xl font-bold">{metric.value}%</p>
            <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
            <Progress value={metric.value} className="h-1.5 mt-2" />
          </motion.div>
        ))}
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: "All Cases", count: 48, color: "text-foreground", icon: AlertTriangle },
          { label: "Critical", count: 3, color: "text-destructive", active: false },
          { label: "High Risk", count: 12, color: "text-destructive", active: false },
          { label: "Medium Risk", count: 18, color: "text-warning", active: false },
          { label: "Resolved", count: 15, color: "text-success", active: false },
        ].map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card rounded-xl p-4 text-left transition-all hover:shadow-md border ${
              item.active ? "border-primary" : "border-border hover:border-primary/50"
            }`}
          >
            <p className={`text-2xl font-bold ${item.color}`}>{item.count}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </motion.button>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-3 mb-4 flex items-center justify-between"
        >
          <span className="text-sm font-medium">{selectedItems.length} item(s) selected</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Bulk Override
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
              <XCircle className="h-4 w-4 mr-2" />
              Block Selected
            </Button>
          </div>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Risk Cases Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Risk Cases</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9 h-8 w-[200px]" />
              </div>
              <SearchableSelect
                options={[
                  { value: "all", label: "All Levels" },
                  { value: "critical", label: "Critical" },
                  { value: "high", label: "High" },
                  { value: "medium", label: "Medium" },
                ]}
                placeholder="Risk Level"
                onValueChange={() => {}}
                className="h-8 w-[120px]"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox 
                    checked={selectedItems.length === riskCases.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Case</TableHead>
                <TableHead>Temple</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskCases.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(item)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleSelectItem(item.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{item.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{item.templeName}</p>
                      <p className="text-xs text-muted-foreground">{item.region}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={riskLevelColors[item.riskLevel]} variant="secondary">
                        {item.riskLevel}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.riskScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm max-w-[150px] truncate">{item.primaryReason}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[item.status]} variant="secondary">
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem onClick={() => handleRowClick(item)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Review Case
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Override Risk
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          Block Registration
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Region Risk Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card rounded-2xl glass-shadow overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Region Risk Summary
            </h2>
            <button className="text-xs text-primary hover:underline font-medium">View All</button>
          </div>
          <div className="p-4 space-y-3">
            {regionRiskData.map((region, i) => (
              <motion.div 
                key={region.region} 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="p-3 rounded-xl border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{region.region}</span>
                  <span className="text-xs text-muted-foreground">{region.total} total</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-destructive" 
                      style={{ width: `${(region.high / region.total) * 100}%` }} 
                    />
                    <div 
                      className="h-full bg-warning" 
                      style={{ width: `${(region.medium / region.total) * 100}%` }} 
                    />
                    <div 
                      className="h-full bg-success" 
                      style={{ width: `${(region.low / region.total) * 100}%` }} 
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                  <span className="text-destructive">{region.high} high</span>
                  <span className="text-warning">{region.medium} med</span>
                  <span className="text-success">{region.low} low</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Case Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Risk Case: {selectedCase?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedCase && (
            <>
              {/* Actions at Top */}
              <div className="flex items-center gap-2 pt-2 pb-4 border-b">
                <Button size="sm" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Mark as Resolved
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Override Risk
                </Button>
                <Button size="sm" variant="outline" className="gap-2 text-destructive hover:text-destructive">
                  <XCircle className="h-4 w-4" />
                  Block Registration
                </Button>
              </div>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList>
                  <TabsTrigger value="details">Case Details</TabsTrigger>
                  <TabsTrigger value="history">Investigation History</TabsTrigger>
                  <TabsTrigger value="override">Manual Override</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-semibold">Risk Assessment</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <span className="text-sm text-muted-foreground">Risk Score</span>
                          <div className="flex items-center gap-2">
                            <Progress value={selectedCase.riskScore} className="w-20 h-2" />
                            <span className="font-bold">{selectedCase.riskScore}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <span className="text-sm text-muted-foreground">Risk Level</span>
                          <Badge className={riskLevelColors[selectedCase.riskLevel]}>
                            {selectedCase.riskLevel}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge className={statusColors[selectedCase.status]}>
                            {selectedCase.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card rounded-xl p-4 space-y-3">
                      <h4 className="text-sm font-semibold">Risk Factors</h4>
                      <div className="space-y-2">
                        <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                          <p className="text-sm font-medium text-destructive">{selectedCase.primaryReason}</p>
                          <p className="text-xs text-destructive/80">Primary Risk Factor</p>
                        </div>
                        {selectedCase.secondaryReasons.map((reason, index) => (
                          <div key={index} className="p-2 rounded-lg bg-warning/10 border border-warning/20">
                            <p className="text-sm text-warning">{reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Assignment */}
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <Label className="text-sm font-semibold">Assign Risk Officer</Label>
                    <SearchableSelect
                      options={riskOfficerOptions}
                      placeholder="Select officer"
                      onValueChange={() => {}}
                      onAddNew={() => alert("Add new risk officer")}
                      addNewLabel="Add Officer"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                  <div className="glass-card rounded-xl p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      Investigation history will be displayed here
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="override" className="space-y-4 mt-4">
                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <Label className="text-sm font-semibold">Investigation Notes</Label>
                    <Textarea placeholder="Add investigation notes..." className="min-h-[100px]" />
                  </div>

                  <div className="glass-card rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-semibold">Manual Override</h4>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-medium">Override Risk Assessment</p>
                        <p className="text-xs text-muted-foreground">Mark as verified after manual review</p>
                      </div>
                      <Switch />
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

export default ComplianceRisk;
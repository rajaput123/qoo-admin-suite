import { useState } from "react";
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
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

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
  "Low": "bg-green-100 text-green-700",
  "Medium": "bg-amber-100 text-amber-700",
  "High": "bg-red-100 text-red-700",
  "Critical": "bg-red-200 text-red-800",
};

const statusColors: Record<string, string> = {
  "Pending Review": "bg-gray-100 text-gray-700",
  "Under Investigation": "bg-amber-100 text-amber-700",
  "Resolved": "bg-green-100 text-green-700",
  "Blocked": "bg-red-100 text-red-700",
  "Overridden": "bg-blue-100 text-blue-700",
};

const ComplianceRisk = () => {
  const [selectedCase, setSelectedCase] = useState<typeof riskCases[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="p-4 lg:px-8 lg:pt-4 lg:pb-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Compliance & Risk</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Risk monitoring, compliance tracking, and fraud prevention
        </p>
      </div>

      {/* Compliance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {complianceMetrics.map((metric) => (
          <Card key={metric.label} className="border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium flex items-center gap-1 ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "All Cases", count: 48, color: "text-foreground", bg: "bg-gray-100" },
          { label: "Critical", count: 3, color: "text-red-700", bg: "bg-red-100" },
          { label: "High Risk", count: 12, color: "text-red-600", bg: "bg-red-50" },
          { label: "Medium Risk", count: 18, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Resolved", count: 15, color: "text-green-600", bg: "bg-green-50" },
        ].map((item) => (
          <Card key={item.label} className="border shadow-sm cursor-pointer hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className={`inline-flex p-2 rounded-lg ${item.bg} mb-2`}>
                <AlertTriangle className={`h-4 w-4 ${item.color}`} />
              </div>
              <p className={`text-2xl font-bold ${item.color}`}>{item.count}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Risk Cases Table */}
        <Card className="lg:col-span-2 border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Risk Cases</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9 h-8 w-[200px]" />
                </div>
                <Select>
                  <SelectTrigger className="h-8 w-[120px]">
                    <SelectValue placeholder="Risk Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
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
                <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50">
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
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem onClick={() => { setSelectedCase(item); setDetailOpen(true); }}>
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
        </Card>

        {/* Region Risk Summary */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Region Risk Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {regionRiskData.map((region) => (
              <div key={region.region} className="p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{region.region}</span>
                  <span className="text-xs text-muted-foreground">{region.total} total</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-red-500" 
                      style={{ width: `${(region.high / region.total) * 100}%` }} 
                    />
                    <div 
                      className="h-full bg-amber-500" 
                      style={{ width: `${(region.medium / region.total) * 100}%` }} 
                    />
                    <div 
                      className="h-full bg-green-500" 
                      style={{ width: `${(region.low / region.total) * 100}%` }} 
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                  <span className="text-red-600">{region.high} high</span>
                  <span className="text-amber-600">{region.medium} med</span>
                  <span className="text-green-600">{region.low} low</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
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
            <Tabs defaultValue="details" className="mt-4">
              <TabsList>
                <TabsTrigger value="details">Case Details</TabsTrigger>
                <TabsTrigger value="history">Investigation History</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Risk Score</span>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedCase.riskScore} className="w-20 h-2" />
                          <span className="font-bold">{selectedCase.riskScore}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Risk Level</span>
                        <Badge className={riskLevelColors[selectedCase.riskLevel]}>
                          {selectedCase.riskLevel}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge className={statusColors[selectedCase.status]}>
                          {selectedCase.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Risk Factors</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="p-2 rounded-lg bg-red-50 border border-red-200">
                        <p className="text-sm font-medium text-red-700">{selectedCase.primaryReason}</p>
                        <p className="text-xs text-red-600">Primary Risk Factor</p>
                      </div>
                      {selectedCase.secondaryReasons.map((reason, index) => (
                        <div key={index} className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                          <p className="text-sm text-amber-700">{reason}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card className="border">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Investigation history will be displayed here
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="actions" className="space-y-4 mt-4">
                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Investigation Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea placeholder="Add investigation notes..." className="min-h-[100px]" />
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Manual Override</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-medium">Override Risk Assessment</p>
                        <p className="text-xs text-muted-foreground">Mark as verified after manual review</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-center gap-3">
                  <Button variant="outline" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Request More Info
                  </Button>
                  <Button className="flex-1">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Resolve Case
                  </Button>
                  <Button variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Block
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

export default ComplianceRisk;

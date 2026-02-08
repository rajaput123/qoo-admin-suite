import { 
  FileInput, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  TrendingUp,
  AlertTriangle,
  Timer,
  MapPin,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const metrics = [
  { label: "Total Registrations", value: "2,847", change: "+12%", icon: FileInput, color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Under Review", value: "156", change: "+8", icon: Clock, color: "text-amber-600", bgColor: "bg-amber-50" },
  { label: "Verification Pending", value: "89", change: "-5", icon: Timer, color: "text-orange-600", bgColor: "bg-orange-50" },
  { label: "Approved", value: "2,341", change: "+23", icon: CheckCircle2, color: "text-green-600", bgColor: "bg-green-50" },
  { label: "Rejected", value: "261", change: "+3", icon: XCircle, color: "text-red-600", bgColor: "bg-red-50" },
  { label: "Tenants Created", value: "2,198", change: "+18", icon: Building2, color: "text-primary", bgColor: "bg-primary/10" },
];

const funnelStages = [
  { stage: "Submitted", count: 2847, percentage: 100 },
  { stage: "Under Review", count: 2691, percentage: 94.5 },
  { stage: "Verification", count: 2502, percentage: 87.9 },
  { stage: "Approved", count: 2341, percentage: 82.2 },
  { stage: "Tenant Created", count: 2198, percentage: 77.2 },
  { stage: "Activated", count: 2089, percentage: 73.4 },
];

const highRiskCases = [
  { id: "REG-4521", temple: "Sri Lakshmi Temple", risk: "High", reason: "Document mismatch", region: "Tamil Nadu" },
  { id: "REG-4518", temple: "Kashi Vishwanath Trust", risk: "High", reason: "Duplicate detected", region: "Uttar Pradesh" },
  { id: "REG-4515", temple: "Jagannath Mandir", risk: "Medium", reason: "Incomplete KYC", region: "Odisha" },
];

const regionSummary = [
  { region: "Tamil Nadu", registrations: 487, approved: 412, pending: 45, rejected: 30 },
  { region: "Uttar Pradesh", registrations: 423, approved: 356, pending: 42, rejected: 25 },
  { region: "Maharashtra", registrations: 398, approved: 341, pending: 38, rejected: 19 },
  { region: "Karnataka", registrations: 356, approved: 298, pending: 35, rejected: 23 },
  { region: "Kerala", registrations: 312, approved: 278, pending: 22, rejected: 12 },
];

const recentActivity = [
  { action: "Tenant Created", temple: "Sri Meenakshi Temple", user: "Admin A", time: "2 min ago" },
  { action: "Approved", temple: "Tirupati Balaji Trust", user: "Approver B", time: "5 min ago" },
  { action: "Verification Complete", temple: "ISKCON Mumbai", user: "Verifier C", time: "12 min ago" },
  { action: "Submitted", temple: "Shirdi Sai Sansthan", user: "Self-Registration", time: "18 min ago" },
  { action: "Rejected", temple: "Unknown Temple", user: "Reviewer D", time: "25 min ago" },
];

const slaMetrics = [
  { metric: "Avg. Review Time", value: "4.2 hrs", target: "6 hrs", status: "good" },
  { metric: "Avg. Verification Time", value: "1.8 days", target: "2 days", status: "good" },
  { metric: "Avg. Approval Time", value: "2.5 days", target: "3 days", status: "good" },
  { metric: "Overdue Cases", value: "12", target: "0", status: "warning" },
];

const Overview = () => {
  return (
    <div className="p-4 lg:px-8 lg:pt-4 lg:pb-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Onboarding Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Monitor registration pipeline, verification status, and activation metrics
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <span className={`text-xs font-medium ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Registration Funnel */}
        <Card className="lg:col-span-2 border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Registration Funnel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {funnelStages.map((stage, index) => (
              <div key={stage.stage} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{stage.stage}</span>
                  <span className="font-medium">{stage.count.toLocaleString()} ({stage.percentage}%)</span>
                </div>
                <Progress 
                  value={stage.percentage} 
                  className="h-2"
                />
              </div>
            ))}
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Activation Rate</span>
                <span className="text-lg font-bold text-primary">73.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SLA Monitoring */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Timer className="h-4 w-4 text-primary" />
              SLA Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {slaMetrics.map((sla) => (
              <div key={sla.metric} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">{sla.metric}</p>
                  <p className="text-xs text-muted-foreground">Target: {sla.target}</p>
                </div>
                <Badge variant={sla.status === "good" ? "default" : "destructive"}>
                  {sla.value}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* High Risk Cases */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              High Risk Cases
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {highRiskCases.map((item) => (
              <div key={item.id} className="p-3 rounded-lg border bg-destructive/5 border-destructive/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
                  <Badge variant="destructive" className="text-xs">
                    {item.risk}
                  </Badge>
                </div>
                <p className="text-sm font-medium">{item.temple}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{item.reason}</span>
                  <span className="text-xs text-muted-foreground">{item.region}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Region Summary */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Region Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {regionSummary.map((region) => (
                <div key={region.region} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <span className="text-sm font-medium">{region.region}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-green-600">{region.approved}</span>
                    <span className="text-amber-600">{region.pending}</span>
                    <span className="text-red-600">{region.rejected}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    activity.action === "Approved" || activity.action === "Tenant Created" 
                      ? "bg-green-500" 
                      : activity.action === "Rejected" 
                        ? "bg-red-500" 
                        : "bg-amber-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.temple}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{activity.action}</span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;

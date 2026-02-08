import { motion } from "framer-motion";
import {
  Building2,
  FileInput,
  FilePenLine,
  XCircle,
  UsersRound,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertTriangle,
  Trophy,
  TrendingUp,
  Copy,
  CheckCircle2,
  Percent,
} from "lucide-react";

const kpis = [
  { label: "Total Published", value: "12,847", change: "+124", up: true, icon: Building2 },
  { label: "Pending Submissions", value: "86", change: "+12", up: true, icon: FileInput },
  { label: "Pending Edit Requests", value: "34", change: "-8", up: false, icon: FilePenLine },
  { label: "Duplicate Flags", value: "23", change: "+5", up: true, icon: Copy },
  { label: "Active Contributors", value: "248", change: "+18", up: true, icon: UsersRound },
  { label: "Approval Rate", value: "94.2%", change: "+2.1%", up: true, icon: Percent },
];

const recentActivity = [
  { action: "Submission approved", detail: "Sri Meenakshi Temple, Madurai", time: "2 min ago", type: "approved", icon: CheckCircle2 },
  { action: "Edit request submitted", detail: "Golden Temple – contact update", time: "8 min ago", type: "edit", icon: FilePenLine },
  { action: "New submission", detail: "Brihadeeswara Temple, Thanjavur", time: "15 min ago", type: "submission", icon: FileInput },
  { action: "Duplicate flagged", detail: "Kashi Vishwanath – possible match", time: "32 min ago", type: "duplicate", icon: Copy },
  { action: "Submission rejected", detail: "Incomplete data – Konark Temple", time: "1 hr ago", type: "rejected", icon: XCircle },
  { action: "New contributor", detail: "Rajesh Kumar joined via onboarding", time: "2 hr ago", type: "contributor", icon: UsersRound },
];

const highRiskSubmissions = [
  { temple: "Unknown Temple XYZ", risk: "High", reason: "Unverified source, missing images", score: 85 },
  { temple: "Sri Padmanabhaswamy", risk: "Medium", reason: "Duplicate suspected", score: 62 },
  { temple: "Chamundi Hills Temple", risk: "Medium", reason: "Incomplete address", score: 55 },
  { temple: "Local Shiva Temple", risk: "High", reason: "No contributor history", score: 78 },
];

const topContributors = [
  { name: "Priya Patel", submissions: 56, approved: 52, points: 2340 },
  { name: "Deepa Murthy", submissions: 42, approved: 40, points: 1890 },
  { name: "Lakshmi Rajan", submissions: 31, approved: 29, points: 1520 },
  { name: "Harpreet Singh", submissions: 24, approved: 22, points: 1180 },
  { name: "Amit Kumar", submissions: 12, approved: 11, points: 680 },
];

const regionalGrowth = [
  { region: "Tamil Nadu", temples: 2847, growth: "+12%" },
  { region: "Uttar Pradesh", temples: 2156, growth: "+8%" },
  { region: "Karnataka", temples: 1934, growth: "+15%" },
  { region: "Maharashtra", temples: 1678, growth: "+6%" },
  { region: "Andhra Pradesh", temples: 1432, growth: "+11%" },
  { region: "Gujarat", temples: 1245, growth: "+9%" },
];

const activityTypeColors: Record<string, string> = {
  approved: "text-success",
  rejected: "text-destructive",
  submission: "text-info",
  edit: "text-warning",
  duplicate: "text-accent",
  contributor: "text-primary",
};

const riskColors: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-success/10 text-success",
};

const Overview = () => {
  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Overview</h1>
        <p className="text-sm text-muted-foreground mb-6">Information Management Control Center</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-card rounded-lg border p-4 card-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-1.5 rounded-md bg-gold-light">
                <kpi.icon className="h-4 w-4 text-accent" />
              </div>
              <div className={`flex items-center text-xs font-medium ${kpi.up ? "text-success" : "text-destructive"}`}>
                {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {kpi.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{kpi.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Moderation Activity */}
        <div className="lg:col-span-2 bg-card rounded-lg border card-shadow">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Recent Moderation Activity
            </h2>
            <button className="text-xs text-accent hover:underline">View All</button>
          </div>
          <div className="divide-y max-h-[320px] overflow-auto">
            {recentActivity.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div key={i} className="px-5 py-3.5 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                  <div className={`mt-0.5 ${activityTypeColors[item.type]}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* High Risk Submissions */}
        <div className="bg-card rounded-lg border card-shadow">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              High Risk Submissions
            </h2>
            <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-medium">
              {highRiskSubmissions.filter(s => s.risk === "High").length} Critical
            </span>
          </div>
          <div className="divide-y max-h-[320px] overflow-auto">
            {highRiskSubmissions.map((item, i) => (
              <div key={i} className="px-5 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate pr-2">{item.temple}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${riskColors[item.risk]}`}>
                    {item.score}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Contributors */}
        <div className="bg-card rounded-lg border card-shadow">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <Trophy className="h-4 w-4 text-accent" />
              Top Contributors
            </h2>
            <button className="text-xs text-accent hover:underline">Leaderboard</button>
          </div>
          <div className="divide-y">
            {topContributors.map((contributor, i) => (
              <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gold-light text-accent text-xs font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{contributor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {contributor.approved}/{contributor.submissions} approved
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-accent">{contributor.points.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Region-wise Temple Growth */}
        <div className="bg-card rounded-lg border card-shadow">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Region-wise Temple Growth
            </h2>
            <button className="text-xs text-accent hover:underline">Full Report</button>
          </div>
          <div className="divide-y">
            {regionalGrowth.map((region, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{region.region}</p>
                  <p className="text-xs text-muted-foreground">{region.temples.toLocaleString()} temples</p>
                </div>
                <span className="text-sm font-medium text-success flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  {region.growth}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

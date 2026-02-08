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
} from "lucide-react";

const kpis = [
  { label: "Total Published", value: "12,847", change: "+124", up: true, icon: Building2 },
  { label: "Pending Submissions", value: "86", change: "+12", up: true, icon: FileInput },
  { label: "Pending Edit Requests", value: "34", change: "-8", up: false, icon: FilePenLine },
  { label: "Rejected This Week", value: "7", change: "-3", up: false, icon: XCircle },
  { label: "Active Contributors", value: "248", change: "+18", up: true, icon: UsersRound },
];

const recentActivity = [
  { action: "New submission", detail: "Sri Meenakshi Temple, Madurai", time: "2 min ago", type: "submission" },
  { action: "Edit approved", detail: "Jagannath Temple, Puri – contact update", time: "15 min ago", type: "approved" },
  { action: "Submission rejected", detail: "Duplicate entry – Kashi Vishwanath", time: "1 hr ago", type: "rejected" },
  { action: "New contributor", detail: "Rajesh Kumar joined via onboarding", time: "2 hr ago", type: "contributor" },
  { action: "Edit request", detail: "Tirupati Balaji – photo update", time: "3 hr ago", type: "edit" },
];

const pendingReviews = [
  { name: "Golden Temple Heritage Update", submitter: "Harpreet Singh", date: "Feb 6, 2026", type: "Edit" },
  { name: "Somnath Temple New Listing", submitter: "Priya Patel", date: "Feb 5, 2026", type: "New" },
  { name: "Kedarnath Temple Photos", submitter: "Amit Sharma", date: "Feb 5, 2026", type: "Edit" },
];

const Overview = () => {
  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-2xl font-bold text-foreground mb-1">Overview</h1>
        <p className="text-sm text-muted-foreground mb-6">Information Management at a glance</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-3 bg-card rounded-lg border card-shadow">
          <div className="px-5 py-4 border-b">
            <h2 className="font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="divide-y">
            {recentActivity.map((item, i) => (
              <div key={i} className="px-5 py-3.5 flex items-start gap-3 hover:bg-muted/30 transition-colors">
                <div className="mt-0.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Reviews */}
        <div className="lg:col-span-2 bg-card rounded-lg border card-shadow">
          <div className="px-5 py-4 border-b">
            <h2 className="font-semibold text-foreground">Pending Reviews</h2>
          </div>
          <div className="divide-y">
            {pendingReviews.map((item, i) => (
              <div key={i} className="px-5 py-3.5 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate pr-2">{item.name}</p>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                      item.type === "New"
                        ? "bg-info/10 text-info"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.submitter} · {item.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

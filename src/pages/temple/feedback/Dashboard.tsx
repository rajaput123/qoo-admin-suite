import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MessageSquareText, Star, TrendingUp, TrendingDown, ThumbsUp, ThumbsDown, AlertCircle, CheckCircle2 } from "lucide-react";

const kpis = [
  { label: "Total Feedback", value: "2,847", change: "+12%", trend: "up", icon: MessageSquareText },
  { label: "Avg Rating", value: "4.3 / 5", change: "+0.2", trend: "up", icon: Star },
  { label: "Positive Sentiment", value: "78%", change: "+5%", trend: "up", icon: ThumbsUp },
  { label: "Pending Review", value: "34", change: "-8", trend: "down", icon: AlertCircle },
];

const recentFeedback = [
  { id: "FB-1201", devotee: "Lakshmi Devi", category: "Darshan Experience", rating: 5, comment: "Wonderful arrangements during Maha Shivaratri", date: "2026-02-10", status: "Reviewed" },
  { id: "FB-1200", devotee: "Anonymous", category: "Queue Management", rating: 2, comment: "Waited 3 hours despite having a slot booking", date: "2026-02-10", status: "Escalated" },
  { id: "FB-1199", devotee: "Raghav Sharma", category: "Prasadam Quality", rating: 4, comment: "Good taste but portions could be larger", date: "2026-02-09", status: "Acknowledged" },
  { id: "FB-1198", devotee: "Meera K", category: "Cleanliness", rating: 3, comment: "Restrooms near east gate need attention", date: "2026-02-09", status: "Action Taken" },
  { id: "FB-1197", devotee: "Venkat Rao", category: "Staff Behaviour", rating: 5, comment: "Security staff very helpful and courteous", date: "2026-02-09", status: "Reviewed" },
];

const categoryBreakdown = [
  { category: "Darshan Experience", count: 842, avgRating: 4.5, percentage: 30 },
  { category: "Queue Management", count: 564, avgRating: 3.2, percentage: 20 },
  { category: "Prasadam Quality", count: 451, avgRating: 4.1, percentage: 16 },
  { category: "Cleanliness", count: 394, avgRating: 3.8, percentage: 14 },
  { category: "Staff Behaviour", count: 338, avgRating: 4.4, percentage: 12 },
  { category: "Facilities", count: 258, avgRating: 3.6, percentage: 8 },
];

const statusColor: Record<string, string> = {
  Reviewed: "bg-green-100 text-green-700",
  Escalated: "bg-red-100 text-red-700",
  Acknowledged: "bg-blue-100 text-blue-700",
  "Action Taken": "bg-purple-100 text-purple-700",
  Pending: "bg-amber-100 text-amber-700",
};

const FeedbackDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Feedback Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Overview of devotee feedback, ratings, and sentiment trends</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
                <span className={`text-xs font-medium flex items-center gap-0.5 ${kpi.trend === "up" ? "text-green-600" : "text-amber-600"}`}>
                  {kpi.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Feedback by Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryBreakdown.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{cat.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{cat.count}</span>
                    <Badge variant="outline" className="text-[10px] gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" /> {cat.avgRating}
                    </Badge>
                  </div>
                </div>
                <Progress value={cat.percentage} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentFeedback.map((fb) => (
              <div key={fb.id} className="p-3 rounded-lg border hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">{fb.id}</span>
                    <Badge variant="outline" className={`text-[10px] ${statusColor[fb.status]}`}>{fb.status}</Badge>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < fb.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground">{fb.comment}</p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                  <span>{fb.devotee}</span>
                  <span>•</span>
                  <span>{fb.category}</span>
                  <span>•</span>
                  <span>{fb.date}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackDashboard;

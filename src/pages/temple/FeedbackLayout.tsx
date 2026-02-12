import { MessageSquareText, LayoutDashboard, TrendingUp, BarChart3 } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Dashboard", path: "/temple/feedback", icon: LayoutDashboard, description: "Feedback overview & KPIs" },
  { label: "Feedback Collection", path: "/temple/feedback/collection", icon: MessageSquareText, description: "Collect & manage responses" },
  { label: "Sentiment Analysis", path: "/temple/feedback/sentiment", icon: TrendingUp, description: "Trend & sentiment insights" },
  { label: "Analytics & Reports", path: "/temple/feedback/analytics", icon: BarChart3, description: "Deep analytics & exports" },
];

const FeedbackLayout = () => {
  return <TempleLayout title="Feedback & Analytics" icon={MessageSquareText} navItems={navItems} />;
};

export default FeedbackLayout;

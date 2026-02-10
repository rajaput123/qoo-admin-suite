import { MessageSquareText, LayoutDashboard, Star, TrendingUp, BarChart3, Settings, FileText } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Dashboard", path: "/temple/feedback", icon: LayoutDashboard, description: "Feedback overview & KPIs" },
  { label: "Feedback Collection", path: "/temple/feedback/collection", icon: MessageSquareText, description: "Collect & manage responses" },
  { label: "Ratings & Reviews", path: "/temple/feedback/ratings", icon: Star, description: "Devotee ratings analysis" },
  { label: "Sentiment Analysis", path: "/temple/feedback/sentiment", icon: TrendingUp, description: "Trend & sentiment insights" },
  { label: "Analytics & Reports", path: "/temple/feedback/analytics", icon: BarChart3, description: "Deep analytics & exports" },
  { label: "Configuration", path: "/temple/feedback/config", icon: Settings, description: "Forms, categories, channels" },
];

const FeedbackLayout = () => {
  return <TempleLayout title="Feedback & Analytics" icon={MessageSquareText} navItems={navItems} />;
};

export default FeedbackLayout;

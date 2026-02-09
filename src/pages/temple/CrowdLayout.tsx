import { MapPin, LayoutDashboard, Map, Gauge, Activity, BarChart3, Brain, Shield, Plane, AlertTriangle } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Zone Configuration", path: "/temple/crowd", icon: Map, description: "Define zones & capacity limits" },
  { label: "Slot & Flow Control", path: "/temple/crowd/flow", icon: Gauge, description: "Darshan flow & entry control" },
  { label: "Real-Time Monitoring", path: "/temple/crowd/live", icon: Activity, badge: "LIVE", description: "Live crowd density dashboard" },
  { label: "Data & Analytics", path: "/temple/crowd/analytics", icon: BarChart3, description: "Historical crowd data & reports" },
  { label: "Prediction & Risk", path: "/temple/crowd/prediction", icon: Brain, description: "Surge prediction & risk engine" },
  { label: "Compliance", path: "/temple/crowd/compliance", icon: Shield, description: "Safety & preparedness reports" },
  { label: "Drone Monitoring", path: "/temple/crowd/drone", icon: Plane, description: "Aerial density monitoring" },
  { label: "Alerts & Emergency", path: "/temple/crowd/alerts", icon: AlertTriangle, badge: "2", description: "Alert levels & emergency controls" },
];

const CrowdLayout = () => {
  return <TempleLayout title="Crowd & Capacity" icon={MapPin} navItems={navItems} />;
};

export default CrowdLayout;

import { Building2, Home, Landmark, Heart, DoorOpen, MonitorSmartphone, GitBranch, Eye } from "lucide-react";
import TempleLayout from "@/components/TempleLayout";

const navItems = [
  { label: "Main Temple", path: "/temple/structure", icon: Home },
  { label: "Shrines / Sub Temples", path: "/temple/structure/shrines", icon: Landmark },
  { label: "Sacred (Samadhi)", path: "/temple/structure/sacred", icon: Heart },
  { label: "Halls", path: "/temple/structure/halls", icon: DoorOpen },
  { label: "Counters", path: "/temple/structure/counters", icon: MonitorSmartphone },
  { label: "Hierarchy View", path: "/temple/structure/hierarchy", icon: GitBranch },
  { label: "Virtual Tour", path: "/temple/structure/virtual-tour", icon: Eye },
];

const TempleStructureLayout = () => {
  return <TempleLayout title="Temple Structure" icon={Building2} navItems={navItems} />;
};

export default TempleStructureLayout;

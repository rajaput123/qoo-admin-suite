import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Heart,
  Users,
  Megaphone,
  UsersRound,
  Package,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  User,
  HelpCircle,
  AlertCircle,
  Sparkles,
  Video,
  MapPin,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// Mock tenant data
const tenantData = {
  templeName: "Sri Venkateswara Temple",
  tenantId: "TNT-2024-001234",
  plan: "Premium",
  status: "Active",
  trialDaysLeft: null, // null means not in trial
  region: "Karnataka",
};

// Modules with feature flags
const modules = [
  {
    id: "temple-info",
    title: "Temple Info",
    icon: Building2,
    enabled: true,
    path: "/temple/info",
    description: "Manage temple profile, timings, and gallery",
  },
  {
    id: "sevas",
    title: "Sevas & Darshan",
    icon: Sparkles,
    enabled: true,
    path: "/temple/sevas",
    description: "Configure seva offerings and darshan slots",
  },
  {
    id: "bookings",
    title: "Bookings",
    icon: Calendar,
    enabled: true,
    path: "/temple/bookings",
    description: "View and manage all bookings",
    badge: "12 Today",
  },
  {
    id: "donations",
    title: "Donations",
    icon: Heart,
    enabled: true,
    path: "/temple/donations",
    description: "Track donations and generate receipts",
    badge: "₹24,500",
  },
  {
    id: "devotees",
    title: "Devotees",
    icon: Users,
    enabled: true,
    path: "/temple/devotees",
    description: "Manage devotee database and VIPs",
  },
  {
    id: "volunteers",
    title: "Volunteers",
    icon: UsersRound,
    enabled: true,
    path: "/temple/volunteers",
    description: "Volunteer roster and scheduling",
  },
  {
    id: "events",
    title: "Events",
    icon: Calendar,
    enabled: true,
    path: "/temple/events",
    description: "Create and manage temple events",
    badge: "3 Upcoming",
  },
  {
    id: "live",
    title: "Live Streaming",
    icon: Video,
    enabled: false,
    path: "/temple/live",
    description: "Stream live darshan and events",
    planRequired: "Enterprise",
  },
  {
    id: "communication",
    title: "PR & Comms",
    icon: Megaphone,
    enabled: true,
    path: "/temple/communication",
    description: "Announcements and notifications",
  },
  {
    id: "crowd",
    title: "Crowd Control",
    icon: MapPin,
    enabled: false,
    path: "/temple/crowd",
    description: "Real-time crowd monitoring",
    planRequired: "Enterprise",
  },
  {
    id: "assets",
    title: "Assets & Stock",
    icon: Package,
    enabled: true,
    path: "/temple/assets",
    description: "Inventory and asset management",
  },
  {
    id: "tasks",
    title: "Tasks",
    icon: ClipboardList,
    enabled: true,
    path: "/temple/tasks",
    description: "Task and project management",
    badge: "5 Pending",
  },
  {
    id: "reports",
    title: "Reports",
    icon: BarChart3,
    enabled: true,
    path: "/temple/reports",
    description: "Analytics and reports",
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    enabled: true,
    path: "/temple/settings",
    description: "Temple account settings",
  },
];

// Operational snapshot data
const snapshotData = [
  { label: "Today's Bookings", value: "12", trend: "+3" },
  { label: "Today's Donations", value: "₹24,500", trend: "+₹5,200" },
  { label: "Upcoming Events", value: "3", trend: null },
  { label: "Pending Tasks", value: "5", trend: "-2" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
};

const TempleHub = () => {
  const navigate = useNavigate();

  const enabledModules = modules.filter((m) => m.enabled);
  const disabledModules = modules.filter((m) => !m.enabled);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <h1 className="text-xl font-bold text-primary">Keehoo</h1>
            <Badge variant="secondary" className="text-xs">
              {tenantData.plan}
            </Badge>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            {/* Notification Bell */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-destructive rounded-full border-2 border-card" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View notifications</p>
              </TooltipContent>
            </Tooltip>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      SV
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 bg-card border shadow-lg">
                <DropdownMenuItem className="gap-2">
                  <User className="h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")} className="gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </header>

      {/* Trial Banner */}
      {tenantData.trialDaysLeft && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Trial Period: {tenantData.trialDaysLeft} days remaining</span>
            </div>
            <button className="text-sm font-medium text-primary hover:underline">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Temple Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">{tenantData.templeName}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>ID: {tenantData.tenantId}</span>
            <span>•</span>
            <span>{tenantData.region}</span>
            <span>•</span>
            <Badge variant="outline" className="text-xs text-green-700 border-green-300 bg-green-50">
              {tenantData.status}
            </Badge>
          </div>
        </motion.div>

        {/* Operational Snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          {snapshotData.map((item) => (
            <div key={item.label} className="glass-card rounded-2xl p-4">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-foreground">{item.value}</span>
                {item.trend && (
                  <span className="text-xs text-green-600 font-medium mb-0.5">{item.trend}</span>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Module Grid */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">MODULES</h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4"
          >
            {enabledModules.map((module) => (
              <Tooltip key={module.id} delayDuration={300}>
                <TooltipTrigger asChild>
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(module.path)}
                    className="group flex flex-col items-center text-center focus:outline-none relative"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 bg-muted group-hover:bg-primary group-hover:shadow-lg transition-all duration-200">
                      <module.icon className="h-6 w-6 text-foreground group-hover:text-primary-foreground transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-medium text-foreground">{module.title}</span>
                    {module.badge && (
                      <Badge className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0 h-5">
                        {module.badge}
                      </Badge>
                    )}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px] text-center">
                  <p className="text-xs">{module.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </motion.div>
        </div>

        {/* Locked Modules */}
        {disabledModules.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">AVAILABLE ON UPGRADE</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {disabledModules.map((module) => (
                <Tooltip key={module.id} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center text-center opacity-50 cursor-not-allowed">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 bg-muted/50">
                        <module.icon className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{module.title}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[200px] text-center">
                    <p className="text-xs">{module.description}</p>
                    <p className="text-xs text-primary mt-1">Requires {module.planRequired} plan</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TempleHub;

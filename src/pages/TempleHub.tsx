import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Heart,
  Users,
  Megaphone,
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
  Briefcase,
  X,
  Crown,
  ShieldAlert,
  Clock,
  BookOpen,
  CalendarDays,
  GitBranch,
  Boxes,
  UserCheck,
  Landmark,
  Truck,
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
import { Button } from "@/components/ui/button";

// Account status types
type AccountStatus = "active" | "trial" | "expired" | "suspended" | "compliance_pending";

// Mock tenant data - simulates different states
const tenantData = {
  templeName: "Sri Venkateswara Temple",
  tenantId: "TNT-2024-001234",
  plan: "Premium",
  tier: "Standard",
  status: "trial" as AccountStatus,
  trialDaysLeft: 14,
  region: "Karnataka",
  healthScore: "Healthy",
  subscriptionExpiry: "2024-03-15",
  complianceIssues: [],
};

// All Temple Management Modules matching reference image
const allModules = [
  {
    id: "temple-structure",
    title: "Temple Structure",
    icon: Landmark,
    enabled: true,
    path: "/temple/structure",
    description: "Temple hierarchy, shrines, halls and counters",
    category: "core",
  },
  {
    id: "communication",
    title: "PR & Communication",
    icon: Megaphone,
    enabled: true,
    path: "/temple/communication",
    description: "Announcements, notifications, media",
    category: "core",
  },
  {
    id: "offerings",
    title: "Offerings",
    icon: Sparkles,
    enabled: true,
    path: "/temple/offerings",
    description: "Rituals, darshan, slots, bookings, pricing",
    category: "core",
  },
  {
    id: "bookings",
    title: "Booking Management",
    icon: Calendar,
    enabled: true,
    path: "/temple/bookings",
    description: "Online & counter bookings, attendance, reports",
    category: "core",
  },
  {
    id: "suppliers",
    title: "Stock / Inventory",
    icon: Boxes,
    enabled: true,
    path: "/temple/suppliers",
    description: "Suppliers, purchase orders, deliveries, payments",
    category: "core",
  },
  {
    id: "prasadam",
    title: "Prasadam Management",
    icon: Package,
    enabled: true,
    path: "/temple/prasadam",
    description: "Production, batches, counters, distribution",
    category: "core",
  },
  {
    id: "projects",
    title: "Projects & Initiatives",
    icon: ClipboardList,
    enabled: true,
    path: "/temple/tasks",
    description: "Project and initiative management",
    category: "core",
  },
  {
    id: "people",
    title: "People / HR",
    icon: Users,
    enabled: true,
    path: "/temple/people",
    description: "Employees, shifts, attendance, leaves",
    category: "core",
  },
  {
    id: "tasks",
    title: "Task Management",
    icon: ClipboardList,
    enabled: true,
    path: "/temple/tasks",
    description: "Task assignment and tracking",
    category: "core",
  },
  {
    id: "branches",
    title: "Branch Management",
    icon: GitBranch,
    enabled: true,
    path: "/temple/branches",
    description: "Multi-branch temple management",
    category: "core",
  },
  {
    id: "institution",
    title: "Institution",
    icon: Building2,
    enabled: true,
    path: "/temple/info",
    description: "Temple institution details",
    category: "operations",
  },
  {
    id: "knowledge",
    title: "Knowledge Management",
    icon: BookOpen,
    enabled: true,
    path: "/temple/knowledge",
    description: "Documents, SOPs, and knowledge base",
    category: "operations",
  },
  {
    id: "assets",
    title: "Asset Management",
    icon: Package,
    enabled: true,
    path: "/temple/assets",
    description: "Temple asset tracking and maintenance",
    category: "operations",
  },
  {
    id: "crowd",
    title: "Crowd & Capacity Management",
    icon: MapPin,
    enabled: true,
    path: "/temple/crowd",
    description: "Real-time crowd monitoring",
    category: "operations",
  },
  {
    id: "devotees",
    title: "Devotee/Volunteer Management",
    icon: UserCheck,
    enabled: true,
    path: "/temple/devotees",
    description: "Devotee database and volunteer management",
    category: "engagement",
  },
  {
    id: "freelancer",
    title: "Freelancer",
    icon: Briefcase,
    enabled: true,
    path: "/temple/freelancer",
    description: "Manage freelance workers",
    category: "engagement",
  },
  {
    id: "vip-devotee",
    title: "VIP Devotee Management",
    icon: Crown,
    enabled: true,
    path: "/temple/vip",
    description: "VIP devotee tracking and services",
    category: "engagement",
  },
  {
    id: "events",
    title: "Event Management",
    icon: CalendarDays,
    enabled: true,
    path: "/temple/events",
    description: "Event creation, registration, capacity",
    category: "engagement",
  },
  {
    id: "planner",
    title: "Planner",
    icon: Calendar,
    enabled: true,
    path: "/temple/planner",
    description: "Calendar and scheduling planner",
    category: "analytics",
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    enabled: true,
    path: "/temple/settings",
    description: "Temple profile, subscription, users",
    category: "system",
  },
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

// Account Status Banner Component
const AccountStatusBanner = ({ 
  status, 
  trialDaysLeft, 
  onDismiss 
}: { 
  status: AccountStatus; 
  trialDaysLeft?: number;
  onDismiss?: () => void;
}) => {
  const bannerConfig = {
    trial: {
      bg: "bg-amber-50 border-amber-200",
      text: "text-amber-800",
      icon: Clock,
      message: `Trial Period: ${trialDaysLeft} days remaining`,
      action: "Upgrade Now",
    },
    expired: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      icon: AlertCircle,
      message: "Your subscription has expired. Some features are restricted.",
      action: "Renew Subscription",
    },
    suspended: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      icon: ShieldAlert,
      message: "Your account has been suspended. Please contact support.",
      action: "Contact Support",
    },
    compliance_pending: {
      bg: "bg-orange-50 border-orange-200",
      text: "text-orange-800",
      icon: AlertCircle,
      message: "Compliance verification pending. Some features may be restricted.",
      action: "View Details",
    },
    active: null,
  };

  const config = bannerConfig[status];
  if (!config) return null;

  const IconComponent = config.icon;

  return (
    <div className={`${config.bg} border-b`}>
      <div className="max-w-5xl mx-auto px-6 py-2.5 flex items-center justify-between">
        <div className={`flex items-center gap-2 ${config.text}`}>
          <IconComponent className="h-4 w-4" />
          <span className="text-sm font-medium">{config.message}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-primary hover:underline">
            {config.action}
          </button>
          {onDismiss && status === "trial" && (
            <button onClick={onDismiss} className="p-1 hover:bg-amber-100 rounded transition-colors">
              <X className="h-3.5 w-3.5 text-amber-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TempleHub = () => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);

  // Filter modules based on status
  const isSuspended = tenantData.status === "suspended";
  const isExpired = tenantData.status === "expired";

  const enabledModules = allModules.filter((m) => !isSuspended);

  const getModuleState = (module: typeof allModules[0]) => {
    if (isSuspended) return "suspended";
    if (isExpired && module.category !== "system") return "expired";
    if (!module.enabled) return "locked";
    return "enabled";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <h1 className="text-xl font-bold text-primary">Keehoo</h1>
            <Badge variant="secondary" className="text-xs gap-1">
              <Crown className="h-3 w-3" />
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
              <DropdownMenuContent align="end" className="w-52 bg-popover border shadow-lg">
                <div className="px-2 py-1.5 border-b border-border mb-1">
                  <p className="text-sm font-medium">Ramesh Kumar</p>
                  <p className="text-xs text-muted-foreground">Temple Administrator</p>
                </div>
                <DropdownMenuItem onClick={() => navigate("/profile")} className="gap-2">
                  <User className="h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/temple/settings")} className="gap-2">
                  <Settings className="h-4 w-4" />
                  Temple Settings
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

      {/* Account Status Banner */}
      {showBanner && (
        <AccountStatusBanner 
          status={tenantData.status} 
          trialDaysLeft={tenantData.trialDaysLeft}
          onDismiss={() => setShowBanner(false)}
        />
      )}

      {/* Suspended Overlay */}
      {isSuspended && (
        <div className="bg-red-50 border-b border-red-200 py-8 text-center">
          <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-red-800 mb-1">Account Suspended</h2>
          <p className="text-sm text-red-700 mb-4">Your temple account has been suspended. All modules are disabled.</p>
          <Button variant="destructive" size="sm">Contact Support</Button>
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
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">{tenantData.tenantId}</span>
            <span>•</span>
            <span>{tenantData.region}</span>
            <span>•</span>
            <Badge 
              variant="outline" 
              className={`text-xs ${
                tenantData.status === "active" 
                  ? "text-green-700 border-green-300 bg-green-50"
                  : tenantData.status === "trial"
                    ? "text-amber-700 border-amber-300 bg-amber-50"
                    : "text-red-700 border-red-300 bg-red-50"
              }`}
            >
              {tenantData.status === "trial" ? "Trial" : tenantData.status.charAt(0).toUpperCase() + tenantData.status.slice(1)}
            </Badge>
            <Badge variant="outline" className="text-xs text-green-700 border-green-300 bg-green-50">
              {tenantData.healthScore}
            </Badge>
          </div>
        </motion.div>

        {/* Module Grid - Enabled */}
        {!isSuspended && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Modules</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4"
            >
              {enabledModules.map((module) => {
                const state = getModuleState(module);
                const isRestricted = state === "expired";
                
                return (
                  <Tooltip key={module.id} delayDuration={300}>
                    <TooltipTrigger asChild>
                      <motion.button
                        variants={itemVariants}
                        whileHover={!isRestricted ? { y: -4, transition: { duration: 0.2 } } : {}}
                        whileTap={!isRestricted ? { scale: 0.97 } : {}}
                        onClick={() => !isRestricted && navigate(module.path)}
                        className={`group flex flex-col items-center text-center focus:outline-none relative ${
                          isRestricted ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isRestricted}
                      >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 transition-all duration-200 ${
                          isRestricted 
                            ? "bg-muted/50" 
                            : "bg-muted group-hover:bg-primary group-hover:shadow-lg"
                        }`}>
                          <module.icon 
                            className={`h-6 w-6 transition-colors duration-200 ${
                              isRestricted 
                                ? "text-muted-foreground" 
                                : "text-foreground group-hover:text-primary-foreground"
                            }`} 
                            strokeWidth={1.5} 
                          />
                        </div>
                        <span className={`text-xs font-medium ${isRestricted ? "text-muted-foreground" : "text-foreground"}`}>
                          {module.title}
                        </span>
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[200px] text-center">
                      <p className="text-xs">{module.description}</p>
                      {isRestricted && (
                        <p className="text-xs text-destructive mt-1">Subscription expired</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </motion.div>
          </div>
        )}


        {/* Quick Actions */}
        {!isSuspended && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 p-6 glass-card rounded-2xl"
          >
            <h3 className="font-medium text-foreground mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/temple/offerings")}>
                Manage Rituals
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/temple/events")}>
                Create Event
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/temple/communication")}>
                Send Announcement
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/temple/planner")}>
                Open Planner
              </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default TempleHub;

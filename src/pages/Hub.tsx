import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Database,
  Building2,
  Users,
  Shield,
  Wallet,
  BarChart3,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const domains = [
  {
    id: "information",
    title: "Information",
    subtitle: "Management",
    icon: Database,
    status: "Active",
    path: "/domain/information/overview",
    color: "bg-primary",
  },
  {
    id: "onboarding",
    title: "Temple",
    subtitle: "Onboarding",
    icon: Building2,
    status: "Active",
    path: "/domain/information/overview",
    color: "bg-emerald-500",
  },
  {
    id: "tenants",
    title: "Tenant",
    subtitle: "Management",
    icon: Users,
    status: "Active",
    path: "/domain/information/overview",
    color: "bg-blue-500",
  },
  {
    id: "governance",
    title: "Platform",
    subtitle: "Governance",
    icon: Shield,
    status: "Coming Soon",
    path: "/domain/information/overview",
    color: "bg-violet-500",
  },
  {
    id: "finance",
    title: "Finance",
    subtitle: "& Billing",
    icon: Wallet,
    status: "Coming Soon",
    path: "/domain/information/overview",
    color: "bg-amber-500",
  },
  {
    id: "analytics",
    title: "Analytics",
    subtitle: "& Reports",
    icon: BarChart3,
    status: "Coming Soon",
    path: "/domain/information/overview",
    color: "bg-rose-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

const Hub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-radial">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-white to-brown-light/30 pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate("/hub")} 
            className="text-2xl font-bold text-primary tracking-tight"
          >
            Qoo
          </motion.button>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 px-3 py-2 rounded-xl glass hover:glass-shadow transition-all duration-300">
                  <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      SA
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-foreground hidden sm:block">Super Admin</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 glass-card border-0 shadow-lg">
                <DropdownMenuItem onClick={() => navigate("/")} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Hub</h1>
          <p className="text-muted-foreground">Select a domain to manage</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6"
        >
          {domains.map((domain) => (
            <motion.button
              key={domain.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                transition: { type: "spring", stiffness: 400, damping: 17 } 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(domain.path)}
              disabled={domain.status === "Coming Soon"}
              className="group flex flex-col items-center text-center focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Icon Container */}
              <div className={`
                relative w-16 h-16 rounded-2xl flex items-center justify-center mb-3
                ${domain.status === "Active" ? domain.color : "bg-muted"}
                shadow-lg group-hover:shadow-xl transition-all duration-300
                ${domain.status === "Active" ? "group-hover:scale-105" : ""}
              `}>
                <domain.icon className="h-7 w-7 text-white" strokeWidth={1.5} />
                
                {/* Glow effect */}
                {domain.status === "Active" && (
                  <div className={`
                    absolute inset-0 rounded-2xl ${domain.color} opacity-0 
                    group-hover:opacity-40 blur-xl transition-opacity duration-300
                  `} />
                )}
              </div>

              {/* Label */}
              <span className="text-xs font-medium text-foreground leading-tight">
                {domain.title}
              </span>
              {domain.subtitle && (
                <span className="text-[10px] text-muted-foreground mt-0.5">
                  {domain.subtitle}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Hub;

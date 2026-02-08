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
    icon: Database,
    status: "Active",
    path: "/domain/information/overview",
  },
  {
    id: "onboarding",
    title: "Onboarding",
    icon: Building2,
    status: "Active",
    path: "/domain/information/overview",
  },
  {
    id: "tenants",
    title: "Tenants",
    icon: Users,
    status: "Active",
    path: "/domain/information/overview",
  },
  {
    id: "governance",
    title: "Governance",
    icon: Shield,
    status: "Coming Soon",
    path: "/domain/information/overview",
  },
  {
    id: "finance",
    title: "Finance",
    icon: Wallet,
    status: "Coming Soon",
    path: "/domain/information/overview",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: BarChart3,
    status: "Coming Soon",
    path: "/domain/information/overview",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
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

const Hub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/hub")} 
            className="text-xl font-bold text-primary"
          >
            Qoo
          </motion.button>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      SA
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-white border shadow-lg">
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
      <main className="max-w-3xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Admin Hub</h1>
          <p className="text-sm text-muted-foreground">Select a domain to manage</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-4 sm:grid-cols-6 gap-5"
        >
          {domains.map((domain) => (
            <motion.button
              key={domain.id}
              variants={itemVariants}
              whileHover={{ 
                y: -4, 
                transition: { duration: 0.2 } 
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(domain.path)}
              disabled={domain.status === "Coming Soon"}
              className="group flex flex-col items-center text-center focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {/* Icon Container - Uniform gray color */}
              <div className={`
                w-14 h-14 rounded-2xl flex items-center justify-center mb-2
                ${domain.status === "Active" 
                  ? "bg-muted group-hover:bg-primary group-hover:shadow-lg" 
                  : "bg-muted"
                }
                transition-all duration-200
              `}>
                <domain.icon 
                  className={`
                    h-6 w-6 transition-colors duration-200
                    ${domain.status === "Active" 
                      ? "text-foreground group-hover:text-white" 
                      : "text-muted-foreground"
                    }
                  `} 
                  strokeWidth={1.5} 
                />
              </div>

              {/* Label */}
              <span className="text-xs font-medium text-foreground">
                {domain.title}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Hub;

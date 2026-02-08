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
  ChevronRight,
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
    title: "Information Management",
    description: "Temple directory & content",
    icon: Database,
    status: "Active",
    path: "/domain/information/overview",
  },
  {
    id: "onboarding",
    title: "Temple Onboarding",
    description: "Registration & verification",
    icon: Building2,
    status: "Active",
    path: "/domain/information/overview",
  },
  {
    id: "tenants",
    title: "Tenant Management",
    description: "Multi-tenant access",
    icon: Users,
    status: "Active",
    path: "/domain/information/overview",
  },
  {
    id: "governance",
    title: "Platform Governance",
    description: "Policies & compliance",
    icon: Shield,
    status: "Coming Soon",
    path: "/domain/information/overview",
  },
  {
    id: "finance",
    title: "Finance",
    description: "Billing & donations",
    icon: Wallet,
    status: "Coming Soon",
    path: "/domain/information/overview",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Metrics & reports",
    icon: BarChart3,
    status: "Coming Soon",
    path: "/domain/information/overview",
  },
];

const Hub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/hub")} className="text-lg font-bold text-primary tracking-tight">
            Qoo
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-medium">
                    SA
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 bg-popover">
              <DropdownMenuItem onClick={() => navigate("/")}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-xl font-bold text-foreground mb-1">Admin Hub</h1>
          <p className="text-sm text-muted-foreground mb-6">Select a domain</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {domains.map((domain, i) => (
            <motion.button
              key={domain.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              onClick={() => navigate(domain.path)}
              className="group relative bg-card rounded-lg border p-4 text-left card-shadow hover:card-shadow-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-1.5 rounded-md bg-gold-light">
                  <domain.icon className="h-4 w-4 text-accent" />
                </div>
                {domain.status === "Coming Soon" && (
                  <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                    Soon
                  </span>
                )}
              </div>
              <h3 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-tight">
                {domain.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {domain.description}
              </p>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Hub;

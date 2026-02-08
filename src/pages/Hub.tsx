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
    description: "Temple directory, submissions, and content governance",
    icon: Database,
    status: "Active",
    path: "/domain/information/overview",
  },
  {
    id: "onboarding",
    title: "Temple Onboarding",
    description: "Registration workflows and verification processes",
    icon: Building2,
    status: "Active",
    path: "/domain/information/overview",
  },
  {
    id: "tenants",
    title: "Tenant Management",
    description: "Multi-tenant configuration and access control",
    icon: Users,
    status: "Active",
    path: "/domain/information/overview",
  },
  {
    id: "governance",
    title: "Platform Governance",
    description: "Policies, compliance, and platform-wide settings",
    icon: Shield,
    status: "Coming Soon",
    path: "/domain/information/overview",
  },
  {
    id: "finance",
    title: "Finance",
    description: "Billing, donations tracking, and financial reports",
    icon: Wallet,
    status: "Coming Soon",
    path: "/domain/information/overview",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Platform insights, usage metrics, and reporting",
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
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/hub")} className="text-xl font-bold text-primary tracking-tight">
            Qoo
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                    SA
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover">
              <DropdownMenuItem onClick={() => navigate("/")}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Hub</h1>
          <p className="text-muted-foreground mb-10">
            Select a domain to manage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((domain, i) => (
            <motion.button
              key={domain.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              onClick={() => navigate(domain.path)}
              className="group relative bg-card rounded-lg border p-6 text-left card-shadow hover:card-shadow-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-gold-light">
                  <domain.icon className="h-5 w-5 text-accent" />
                </div>
                {domain.status === "Coming Soon" && (
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors">
                {domain.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {domain.description}
              </p>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Hub;

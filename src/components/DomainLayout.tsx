import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileInput,
  FilePenLine,
  Building2,
  UsersRound,
  Tags,
  History,
  Search,
  Bell,
  LogOut,
  ChevronLeft,
  Copy,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/domain/information/overview" },
  { label: "Submissions", icon: FileInput, path: "/domain/information/submissions" },
  { label: "Edit Requests", icon: FilePenLine, path: "/domain/information/edit-requests" },
  { label: "Temples", icon: Building2, path: "/domain/information/temples" },
  { label: "Duplicates", icon: Copy, path: "/domain/information/duplicates" },
  { label: "Contributors", icon: UsersRound, path: "/domain/information/contributors" },
  { label: "Categories", icon: Tags, path: "/domain/information/categories" },
  { label: "Audit History", icon: History, path: "/domain/information/audit" },
];

const DomainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-radial flex">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-white to-brown-light/20 pointer-events-none" />

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen glass-sidebar z-30 flex flex-col"
      >
        {/* Logo & Collapse */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => navigate("/hub")}
                className="text-xl font-bold text-primary"
              >
                Qoo
              </motion.button>
            )}
          </AnimatePresence>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-300",
              collapsed && "rotate-180"
            )} />
          </button>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className={cn(
            "relative transition-all duration-300",
            searchFocused && "ring-2 ring-primary/20 rounded-xl"
          )}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={collapsed ? "" : "Search..."}
              className={cn(
                "h-10 pl-9 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30 rounded-xl transition-all",
                collapsed && "w-10 pl-3 pr-0"
              )}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-auto">
          {sidebarItems.map((item, index) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <motion.button
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", active && "text-primary-foreground")} />
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom Section - Notifications, Help, Profile */}
        <div className="p-3 space-y-2 border-t border-border/50">
          {/* Notifications */}
          <button className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
          )}>
            <div className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full" />
            </div>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Notifications
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Help */}
          <button className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
          )}>
            <HelpCircle className="h-5 w-5" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Help & Support
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                "hover:bg-muted/80 group"
              )}>
                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                    SA
                  </AvatarFallback>
                </Avatar>
                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex-1 text-left overflow-hidden"
                    >
                      <p className="text-sm font-medium text-foreground truncate">Super Admin</p>
                      <p className="text-xs text-muted-foreground truncate">admin@qoo.dev</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-56 glass-card border-0 shadow-xl mb-2">
              <DropdownMenuItem className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/")} className="gap-2 text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 relative z-10 transition-all duration-300",
          collapsed ? "ml-[72px]" : "ml-[260px]"
        )}
      >
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DomainLayout;

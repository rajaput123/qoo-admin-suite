import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Home,
  Bell,
  Search,
  User,
  Settings,
  HelpCircle,
  LogOut,
  PanelLeftClose,
  PanelLeft,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, ReactNode } from "react";

interface NavItemType {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface TempleLayoutProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  navItems: NavItemType[];
  children?: ReactNode;
}

const TempleLayout = ({ title, icon: Icon, navItems }: TempleLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Get current page title from navItems
  const currentItem = navItems.find(item => location.pathname === item.path);
  const pageTitle = currentItem?.label || navItems[0]?.label || "";

  // Breadcrumb
  const breadcrumbs = [
    { label: "Hub", path: "/temple-hub" },
    { label: title, path: navItems[0]?.path || "" },
    ...(currentItem && currentItem !== navItems[0] ? [{ label: currentItem.label, path: currentItem.path }] : []),
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "border-r border-border bg-card flex flex-col transition-all duration-300 sticky top-0 h-screen",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-14 border-b border-border flex items-center px-4 gap-3">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 flex-1 min-w-0"
            >
              <Icon className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="font-semibold text-foreground truncate">{title}</span>
            </motion.div>
          )}
          {collapsed && (
            <Icon className="h-5 w-5 text-primary mx-auto" />
          )}
        </div>

        {/* Back to Hub */}
        <div className="p-2 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            className={cn("w-full gap-2", collapsed ? "justify-center px-2" : "justify-start")}
            onClick={() => navigate("/temple-hub")}
          >
            <Home className="h-4 w-4" />
            {!collapsed && <span>Back to Hub</span>}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Tooltip key={item.path} delayDuration={collapsed ? 0 : 1000}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <Badge variant={isActive ? "secondary" : "outline"} className="text-[10px] px-1.5 h-5">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </NavLink>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                    {item.badge && <p className="text-xs text-muted-foreground">{item.badge}</p>}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-2">
          {/* Search */}
          {!collapsed && (
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-8 h-8 text-sm bg-muted border-0" 
              />
            </div>
          )}

          {/* Footer Actions */}
          <div className={cn("flex items-center gap-1", collapsed ? "flex-col" : "")}>
            {/* Notifications */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
                </button>
              </TooltipTrigger>
              <TooltipContent side={collapsed ? "right" : "top"}>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded-lg hover:bg-muted transition-colors">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      RK
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={collapsed ? "center" : "end"} side="top" className="w-48 bg-popover">
                <DropdownMenuItem onClick={() => navigate("/profile")} className="gap-2">
                  <User className="h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/temple/settings")} className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")} className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Collapse Toggle */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => setCollapsed(!collapsed)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors ml-auto"
                >
                  {collapsed ? (
                    <PanelLeft className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <PanelLeftClose className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side={collapsed ? "right" : "top"}>
                <p>{collapsed ? "Expand" : "Collapse"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header with Breadcrumb */}
        <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-4 sticky top-0 z-10">
          <nav className="flex items-center gap-1.5 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center gap-1.5">
                {index > 0 && <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground rotate-180" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-foreground">{crumb.label}</span>
                ) : (
                  <button 
                    onClick={() => navigate(crumb.path)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TempleLayout;

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  FileInput,
  FilePenLine,
  Building2,
  UsersRound,
  Tags,
  History,
  Search,
  Plus,
  Bell,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/domain/information/overview" },
  { label: "Submissions", icon: FileInput, path: "/domain/information/submissions" },
  { label: "Edit Requests", icon: FilePenLine, path: "/domain/information/edit-requests" },
  { label: "Temples", icon: Building2, path: "/domain/information/temples" },
  { label: "Contributors", icon: UsersRound, path: "/domain/information/contributors" },
  { label: "Categories", icon: Tags, path: "/domain/information/categories" },
  { label: "Audit History", icon: History, path: "/domain/information/audit" },
];

const DomainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const currentPage = sidebarItems.find((item) => location.pathname.startsWith(item.path));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-14 border-b bg-card flex items-center px-4 gap-4 shrink-0 z-20">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-muted transition-colors lg:hidden"
        >
          <Menu className="h-5 w-5 text-muted-foreground" />
        </button>

        <button
          onClick={() => navigate("/hub")}
          className="text-lg font-bold text-primary tracking-tight shrink-0"
        >
          Qoo
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
          <ChevronLeft className="h-3.5 w-3.5" />
          <button onClick={() => navigate("/hub")} className="hover:text-foreground transition-colors">
            Hub
          </button>
          <span>/</span>
          <span className="text-foreground font-medium">Information Management</span>
          {currentPage && (
            <>
              <span>/</span>
              <span className="text-foreground">{currentPage.label}</span>
            </>
          )}
        </div>

        <div className="flex-1" />

        <div className="hidden md:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="h-8 w-56 pl-9 text-sm bg-muted border-0"
            />
          </div>
        </div>

        <Button size="sm" className="h-8 gap-1.5 hidden sm:flex">
          <Plus className="h-3.5 w-3.5" />
          <span className="text-xs">Quick Action</span>
        </Button>

        <button className="p-1.5 rounded-md hover:bg-muted transition-colors relative">
          <Bell className="h-4.5 w-4.5 text-muted-foreground" />
          <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-destructive rounded-full" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:opacity-80 transition-opacity">
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
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "border-r bg-card shrink-0 transition-all duration-200 hidden lg:flex flex-col",
            collapsed ? "w-14" : "w-56"
          )}
        >
          <nav className="flex-1 py-3 px-2 space-y-0.5">
            {sidebarItems.map((item) => {
              const active = location.pathname.startsWith(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-accent font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className={cn("h-4 w-4 shrink-0", active && "text-accent")} />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          <div className="p-2 border-t">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DomainLayout;

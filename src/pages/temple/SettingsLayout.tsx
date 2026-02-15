import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Settings, User, CreditCard, Calendar, Users, Shield, LayoutGrid, Cog } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsSections = [
  { label: "Profile", path: "/temple/settings", icon: User, description: "Organization profile & contact details" },
  { label: "Finance", path: "/temple/settings/finance", icon: CreditCard, description: "Bank accounts & tax information" },
  { label: "Subscription", path: "/temple/settings/subscription", icon: Calendar, description: "Plan & billing management" },
  { label: "Users", path: "/temple/settings/users", icon: Users, description: "User management & access" },
  { label: "Roles & Permissions", path: "/temple/settings/roles", icon: Shield, description: "Role creation & permissions" },
  { label: "Modules", path: "/temple/settings/modules", icon: LayoutGrid, description: "Module access control" },
  { label: "System", path: "/temple/settings/system", icon: Cog, description: "System-wide settings" },
];

const SettingsLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 border-r bg-muted/30 min-h-screen p-4">
          <div className="flex items-center gap-2 mb-6">
            <Settings className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Settings</h2>
          </div>
          <nav className="space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              const isActive = location.pathname === section.path || 
                (section.path !== "/temple/settings" && location.pathname.startsWith(section.path));
              
              return (
                <button
                  key={section.path}
                  onClick={() => navigate(section.path)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Content Panel */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;

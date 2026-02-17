import {
  LayoutDashboard,
  Upload,
  Loader2,
  SplitSquareVertical,
  ClipboardCheck,
  Settings,
  Shield,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Upload Data", url: "/upload", icon: Upload },
  { title: "Processing", url: "/processing", icon: Loader2 },
  { title: "Preview", url: "/preview", icon: SplitSquareVertical },
  { title: "Audit & Compliance", url: "/audit", icon: ClipboardCheck },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg gradient-success">
          <Shield className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold text-sidebar-primary tracking-tight">MedShield</h1>
          <p className="text-[11px] text-sidebar-foreground/60 tracking-wide uppercase">De-Identification</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? ""
                  : "text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-accent/50"
              }`}
              activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sidebar-accent/30">
          <Shield className="w-4 h-4 text-success" />
          <span className="text-xs text-sidebar-foreground/80">HIPAA & GDPR Compliant</span>
        </div>
        <button className="flex items-center gap-3 w-full px-3 py-2.5 mt-2 rounded-lg text-sm text-sidebar-foreground/60 hover:text-sidebar-primary hover:bg-sidebar-accent/50 transition-colors">
          <LogOut className="w-[18px] h-[18px]" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

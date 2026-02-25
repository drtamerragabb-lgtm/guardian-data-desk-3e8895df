import {
  LayoutDashboard,
  Upload,
  Loader2,
  SplitSquareVertical,
  ClipboardCheck,
  Settings,
  Shield,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex flex-col w-64 bg-background text-foreground border-r border-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg gradient-success">
          <Shield className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground tracking-tight">MedShield</h1>
          <p className="text-[11px] text-muted-foreground tracking-wide uppercase">De-Identification</p>
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
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              activeClassName="bg-primary/10 text-primary font-semibold"
            >
              <item.icon className="w-[18px] h-[18px]" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-border space-y-2">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark((d) => !d)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          <span>{dark ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
          <Shield className="w-4 h-4 text-success" />
          <span className="text-xs text-muted-foreground">HIPAA & GDPR Compliant</span>
        </div>
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
          <LogOut className="w-[18px] h-[18px]" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

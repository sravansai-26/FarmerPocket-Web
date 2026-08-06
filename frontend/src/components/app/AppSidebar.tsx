import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Store,
  ShieldCheck,
  Wallet,
  Activity,
  FileText,
  Bell,
  Settings,
  HelpCircle,
  X,
  CloudRain
} from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { name: "My Farm", href: "/app", icon: LayoutDashboard },
  { name: "Farm Protection", href: "/app/protection", icon: ShieldCheck },
  { name: "Crop Planner", href: "/app/planner", icon: FileText },
  { name: "Protection Wallet", href: "/app/wallet", icon: Wallet },
  { name: "Payouts", href: "/app/payouts", icon: Activity },
  { name: "Farm Monitoring", href: "/app/monitoring", icon: CloudRain },
];

const BOTTOM_NAV_ITEMS = [
  { name: "Settings", href: "/app/settings", icon: Settings },
  { name: "Support", href: "/app/support", icon: HelpCircle },
];

export function AppSidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between pb-6 pt-2 px-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
              <rect x="4.75" y="4.75" width="30.5" height="30.5" rx="9.25" stroke="currentColor" strokeWidth="2.5" />
              <path d="M12 24.5c3-6 5-9 8-9s5 3 8 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[17px] font-semibold tracking-tight">FarmerPocket</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.href || (item.href !== "/app" && currentPath.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <item.icon size={18} className={isActive ? "text-primary" : ""} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 space-y-1 border-t border-border pt-4">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = currentPath.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-[14.5px] font-medium transition-colors",
                isActive
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <item.icon size={18} className={isActive ? "text-primary" : ""} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import { Menu, Search, User, ChevronDown } from "lucide-react";
import { useAuth } from "../../lib/auth";
import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 -ml-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent"
        >
          <Menu size={20} />
        </button>
        
        {/* We can add a dynamic Breadcrumb here based on route later */}
        <div className="hidden lg:flex items-center text-[14.5px] font-medium">
          {/* Breadcrumb placeholder */}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="hidden text-right md:block">
            <p className="text-[14px] font-medium leading-none">{user?.name || "User"}</p>
            <p className="text-[12px] text-muted-foreground mt-1">{user?.email}</p>
          </div>
          
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3 text-[13.3px] font-medium transition-colors hover:bg-muted"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User size={14} />
              </div>
              <span className="max-w-[100px] truncate">{user?.name?.split(" ")[0] || "User"}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </button>
            
            <div className={`absolute right-0 mt-2 w-48 rounded-md border border-border bg-card shadow-md z-50 ${menuOpen ? "block" : "hidden"}`}>
              <div className="py-1">
                <Link to="/app/settings" className="block px-4 py-2 text-[13px] text-foreground hover:bg-accent transition-colors">
                  Settings
                </Link>
                <button 
                  onClick={async () => {
                    await signOut();
                    window.location.href = "/signin";
                  }}
                  className="block w-full text-left px-4 py-2 text-[13px] text-destructive hover:bg-accent transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

import { Outlet, createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../lib/auth";
import { auth } from "../lib/firebase";
import { AppSidebar } from "../components/app/AppSidebar";
import { AppHeader } from "../components/app/AppHeader";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { user, ready } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) {
      navigate({ to: "/signin", replace: true });
    }
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-canvas">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-canvas selection:bg-primary/20 selection:text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <AppSidebar />
      </aside>

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 -translate-x-full border-r border-border bg-card transition-transform duration-300 lg:hidden",
          sidebarOpen && "translate-x-0"
        )}
      >
        <AppSidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Workspace */}
      <main className="flex min-w-0 flex-1 flex-col">
        <AppHeader onMenuClick={() => setSidebarOpen(true)} />
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

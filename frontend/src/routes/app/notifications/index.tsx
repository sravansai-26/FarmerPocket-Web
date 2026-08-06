import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { Bell, CheckCircle, AlertTriangle, Info, Check, AlertCircle } from "lucide-react";
import clsx from "clsx";

export const Route = createFileRoute("/app/notifications/")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/notifications");
      return res.data;
    }
  });

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      await api.patch("/notifications/read-all");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="text-[var(--success)]" size={20} />;
      case "warning": return <AlertTriangle className="text-[var(--warning)]" size={20} />;
      case "error": return <AlertCircle className="text-[var(--failure)]" size={20} />;
      default: return <Info className="text-primary" size={20} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Bell size={28} /> Notifications
          </h1>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Stay updated on your protection covers, payouts, and weather alerts.
          </p>
        </div>
        <button 
          onClick={() => markAllAsRead.mutate()}
          disabled={notifications.filter((n: any) => !n.is_read).length === 0}
          className="bg-accent text-foreground px-4 py-2 text-[13px] font-medium rounded-md hover:bg-accent/80 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Check size={16} /> Mark all as read
        </button>
      </header>

      {isLoading ? (
        <div className="text-sm text-muted-foreground p-8 text-center bg-card rounded-xl border border-border shadow-[var(--shadow-quiet)]">
          Loading notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-sm text-muted-foreground p-8 text-center bg-card rounded-xl border border-border shadow-[var(--shadow-quiet)]">
          No notifications yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((n: any) => (
            <div 
              key={n.id} 
              className={clsx(
                "rounded-xl border p-5 shadow-[var(--shadow-quiet)] flex gap-4 transition-colors",
                n.is_read ? "bg-card border-border opacity-70" : "bg-card border-primary/20 ring-1 ring-primary/10"
              )}
            >
              <div className="shrink-0 mt-1">
                {getIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3 className={clsx("text-[15px] font-semibold", n.is_read ? "text-foreground" : "text-primary")}>
                    {n.title}
                  </h3>
                  <span className="text-[12px] text-muted-foreground shrink-0">
                    {new Date(n.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[13px] text-muted-foreground mt-1">
                  {n.message}
                </p>
                {n.action_url && (
                  <div className="mt-3">
                    <Link to={n.action_url} className="text-[12px] font-semibold text-primary hover:underline">
                      View details
                    </Link>
                  </div>
                )}
              </div>
              {!n.is_read && (
                <div className="shrink-0">
                  <button 
                    onClick={() => markAsRead.mutate(n.id)}
                    className="text-[12px] text-primary hover:bg-primary/10 px-2 py-1 rounded transition-colors"
                  >
                    Mark as read
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

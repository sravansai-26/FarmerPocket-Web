import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Loader2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/app/planner/")({
  component: CropPlannerPage,
});

function CropPlannerPage() {
  const { data: protections, isLoading } = useQuery({
    queryKey: ["protections"],
    queryFn: async () => {
      const res = await api.get("/protection/");
      return res.data;
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-primary">Crop Protection Planner</h1>
        <p className="mt-2 text-[15px] text-muted-foreground font-medium">
          Manage your protected stages and active covers for your farm.
        </p>
      </header>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Active Protections</h2>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center p-4"><Loader2 className="animate-spin text-muted-foreground" /></div>
          ) : !protections || protections.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground flex flex-col items-center">
              <ShieldAlert className="mb-2 opacity-50" size={32} />
              <p>You have no active crop protections.</p>
            </div>
          ) : (
            protections.map((p: any, idx: number) => (
              <div key={idx} className="border border-border rounded-lg p-5 flex items-center justify-between mb-4 last:mb-0">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="bg-[var(--success-soft)] text-[var(--success)] text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Active</span>
                    <h3 className="font-semibold text-[15px]">{p.cover_name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Farm #{p.farm_id} • Status: {p.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Coverage</p>
                  <p className="font-medium text-lg">₹{p.payout_amount?.toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

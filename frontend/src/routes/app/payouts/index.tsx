import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/app/payouts/")({
  component: PayoutsPage,
});

function PayoutsPage() {
  const { data: protections, isLoading } = useQuery({
    queryKey: ["protections"],
    queryFn: async () => {
      const res = await api.get("/protection/");
      return res.data;
    },
  });

  const payouts = protections?.filter((p: any) => p.status === "triggered") || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-primary">Verification & Payouts</h1>
        <p className="mt-2 text-[15px] text-muted-foreground font-medium">
          View automated verification decisions and payout history.
        </p>
      </header>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold">Recent Decisions</h2>
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse text-[14px]">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="p-4 font-medium text-muted-foreground">Date</th>
                <th className="p-4 font-medium text-muted-foreground">Activity</th>
                <th className="p-4 font-medium text-muted-foreground">Decision</th>
                <th className="p-4 font-medium text-muted-foreground">Amount</th>
                <th className="p-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center"><Loader2 className="animate-spin inline-block text-muted-foreground" /></td>
                </tr>
              ) : payouts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">No recent payouts or decisions found.</td>
                </tr>
              ) : (
                payouts.map((p: any, idx: number) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="p-4">{new Date().toLocaleDateString()}</td>
                    <td className="p-4 font-medium">{p.cover_name}</td>
                    <td className="p-4">
                      <span className="bg-[var(--success-soft)] text-[var(--success)] px-2 py-1 rounded text-xs font-semibold">Triggered</span>
                    </td>
                    <td className="p-4 font-mono">₹{p.payout_amount?.toLocaleString("en-IN")}</td>
                    <td className="p-4">
                      <button className="text-primary text-sm hover:underline">View Evidence</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

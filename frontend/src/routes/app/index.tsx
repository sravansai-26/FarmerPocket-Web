import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../lib/auth";
import { api } from "../../lib/api";
import { Activity, ShieldCheck, ArrowRight, Wallet as WalletIcon, CloudRain, Sun, Map } from "lucide-react";
import { RazorpayTopUp } from "../../components/pocket/RazorpayTopUp";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [{ title: "My Farm — FarmerPocket" }, { name: "robots", content: "noindex" }],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/");
      return res.data;
    },
  });

  const balance = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    data?.wallet?.balance || 0,
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-primary">My Farm</h1>
        <p className="mt-2 text-[15px] text-muted-foreground font-medium">
          Good Morning, {user?.name?.split(" ")[0] || "Farmer"} Garu. 
          <span className="text-[var(--warning)] ml-2 inline-flex items-center gap-1">
            <CloudRain size={16} /> Rain Expected Today
          </span>
        </p>
      </header>

      {/* Main Plot Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <section className="col-span-2 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-quiet)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 text-primary transition-opacity group-hover:opacity-10"><Map size={120} /></div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Active Plot</h2>
              <p className="mt-1 text-2xl font-semibold tracking-tight">{data?.farm?.plot_name || "No Active Plot"}</p>
            </div>
            {data?.farm?.plot_name === "No Active Plot" ? (
              <Link to="/app/add-farm" className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm hover:bg-primary/90 transition-colors">
                + Add Farm
              </Link>
            ) : (
              <div className="bg-primary-soft text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
                Stage: {data?.farm?.stage || "Planning"}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-border pt-6">
            <div>
              <p className="text-[12px] text-muted-foreground">Next Activity</p>
              <p className="font-medium text-[15px]">{data?.farm?.next_activity || "-"}</p>
            </div>
            <div>
              <p className="text-[12px] text-muted-foreground">Weather Intelligence</p>
              <p className="font-medium text-[15px] text-[var(--warning)] flex items-center gap-2">
                <CloudRain size={14}/> {data?.farm?.rain_prob}% Rain Probability
              </p>
            </div>
          </div>

          <div className="mt-6 bg-[var(--warning-soft)] border border-[var(--warning)]/20 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-[12px] text-[var(--warning)] font-semibold uppercase tracking-wider">AI Recommendation</p>
              <p className="font-medium text-[14px] text-foreground mt-0.5">{data?.farm?.recommendation}</p>
            </div>
            <Link to="/app/protection" className="bg-[var(--warning)] text-white text-xs px-4 py-2 rounded-md font-semibold hover:bg-[var(--warning)]/90 transition-colors">
              Protect Now
            </Link>
          </div>
        </section>

        {/* Protection Summary */}
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-quiet)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-[var(--success)] transition-opacity group-hover:opacity-20"><ShieldCheck size={48} /></div>
            <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Protected Activities</h2>
            <p className="mt-3 text-4xl font-semibold tracking-tight">{data?.farm?.protected_activities || 0}</p>
            <div className="mt-4 flex items-center gap-3">
              <Link to="/app/planner" className="text-[12px] font-medium text-primary hover:underline underline-offset-4">View Crop Planner &rarr;</Link>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-quiet)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-primary transition-opacity group-hover:opacity-20"><WalletIcon size={48} /></div>
            <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">Protection Balance</h2>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-primary">{balance}</p>
            <RazorpayTopUp amount={1000} />
            <div className="mt-4 text-[12px] text-muted-foreground">
              Ready for instant payouts
            </div>
          </section>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Feed: Active Monitoring / Decisions */}
        <div className="col-span-2 space-y-6">
          <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-quiet)] overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-foreground uppercase tracking-wider">Recent Payouts & Decisions</h2>
              <Link to="/app/payouts" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                Verification Centre <ArrowRight size={14} />
              </Link>
            </div>
            
            {isLoading ? (
              <div className="p-12 text-center text-muted-foreground text-[13px] animate-pulse">Loading activity...</div>
            ) : data?.recent_payouts?.length > 0 ? (
              <ul className="divide-y divide-border">
                {data.recent_payouts.map((payout: any) => (
                  <li key={payout.id} className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-medium text-foreground">Decision #{payout.id}</p>
                      <p className="text-[12px] text-muted-foreground mt-1">Status: {payout.status}</p>
                    </div>
                    <span className="text-[14px] font-medium font-mono text-[var(--success)]">
                      +₹{payout.amount}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <p className="text-[13px] text-muted-foreground max-w-sm">
                  No recent payouts or weather triggers. Your farm is currently safe.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar Feed: Transactions */}
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-quiet)] overflow-hidden">
             <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-foreground uppercase tracking-wider">Wallet Ledger</h2>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground text-[13px] animate-pulse">Loading...</div>
            ) : data?.recent_transactions?.length > 0 ? (
              <ul className="divide-y divide-border">
                {data.recent_transactions.map((tx: any) => (
                  <li key={tx.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-medium capitalize text-foreground">{tx.type}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{tx.date}</p>
                    </div>
                    <span className={`text-[13px] font-mono font-medium ${tx.type === 'credit' ? 'text-[var(--success)]' : 'text-foreground'}`}>
                      {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center">
                <p className="text-[12px] text-muted-foreground">No recent transactions.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Wallet, ArrowDownToLine, ArrowUpRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const Route = createFileRoute("/app/wallet/")({
  component: WalletPage,
});

function WalletPage() {
  const { data: wallet, isLoading, isError } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const res = await api.get("/wallet/");
      return res.data;
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-primary">Farm Protection Wallet</h1>
        <p className="mt-2 text-[15px] text-muted-foreground font-medium">
          Manage your protection balance and transaction history.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <Wallet size={32} />
            </div>
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Available Balance</p>
            {isLoading ? (
              <Loader2 className="animate-spin text-primary mt-4" size={32} />
            ) : isError ? (
              <p className="text-destructive mt-4">Failed to load balance</p>
            ) : (
              <p className="text-5xl font-semibold mt-2 tracking-tight">
                ₹{wallet?.balance?.toLocaleString("en-IN") || "0"}
              </p>
            )}
            
            <div className="flex gap-4 mt-8">
                <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 flex items-center gap-2">
                    <ArrowDownToLine size={16} /> Top Up
                </button>
                <button className="bg-muted text-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-muted/80 flex items-center gap-2">
                    <ArrowUpRight size={16} /> Withdraw
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

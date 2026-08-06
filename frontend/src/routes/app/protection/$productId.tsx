import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Zap, CloudRain, Plane, Laptop, Package, Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/api";

export const Route = createFileRoute("/app/protection/$productId")({
  head: () => ({
    meta: [{ title: "Cover Details — FarmerPocket" }, { name: "robots", content: "noindex" }],
  }),
  component: ProductDetailsPage,
});

const iconMap: Record<string, any> = {
  CloudRain: CloudRain,
  Plane: Plane,
  Laptop: Laptop,
  Package: Package,
  Shield: ShieldCheck,
};

function ProductDetailsPage() {
  const { productId } = Route.useParams();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <div className="p-24 flex justify-center text-muted-foreground animate-pulse text-[13px]">Loading cover details...</div>;
  }

  if (isError || !product) {
    return (
      <div className="p-24 text-center">
        <p className="text-[13px] text-muted-foreground mb-4">Cover not found.</p>
        <Link to="/app/marketplace" className="text-primary hover:underline font-medium text-[13px]">Return to marketplace</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <header>
        <Link 
          to="/app/marketplace" 
          className="inline-flex items-center gap-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Marketplace
        </Link>
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-semibold tracking-wide mb-3">
              {product.category}
            </span>
            <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
            <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed max-w-2xl whitespace-pre-line">
              {product.description}
            </p>
          </div>
          <div className="h-16 w-16 rounded-full bg-accent flex flex-shrink-0 items-center justify-center border border-border shadow-sm">
            <ShieldCheck size={28} className="text-foreground" />
          </div>
        </div>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-[16px] font-medium text-foreground border-b border-border pb-2">How it works</h2>
            <div className="grid gap-4">
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0 border border-border text-[12px] font-medium">1</div>
                <div>
                  <p className="text-[14px] font-medium text-foreground">Select your coverage window</p>
                  <p className="text-[13px] text-muted-foreground mt-1">Define exactly when and where you need protection based on the required parameters.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0 border border-border text-[12px] font-medium">2</div>
                <div>
                  <p className="text-[14px] font-medium text-foreground">Continuous Monitoring</p>
                  <p className="text-[13px] text-muted-foreground mt-1">Our oracle constantly checks the data source against your conditions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0 border border-border text-[12px] font-medium">3</div>
                <div>
                  <p className="text-[14px] font-medium text-foreground">Instant Automatic Payout</p>
                  <p className="text-[13px] text-muted-foreground mt-1">If the trigger condition is met, funds are instantly transferred to your wallet. No claims adjusters, no paperwork.</p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="space-y-4">
             <h2 className="text-[16px] font-medium text-foreground border-b border-border pb-2">Terms & Conditions</h2>
             <div className="bg-card border border-border rounded-xl p-6 shadow-[var(--shadow-quiet)]">
                <p className="text-[13px] text-muted-foreground whitespace-pre-line leading-relaxed">
                  {product.terms || "Standard FarmerPocket platform terms apply to this product."}
                </p>
             </div>
          </section>
        </div>

        <div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-quiet)] sticky top-6">
            <h3 className="text-[14px] font-medium text-foreground mb-4">Coverage Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Base Premium</label>
                <div className="text-2xl font-semibold font-mono tracking-tight">
                  {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(product.base_premium)}
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1 block">Maximum Payout</label>
                <div className="text-xl font-semibold font-mono tracking-tight text-[var(--success)]">
                   {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(product.coverage_amount)}
                </div>
              </div>

              <div className="bg-accent/50 rounded-lg p-3 flex items-start gap-3 mt-4 border border-border/50">
                <Zap size={16} className="text-[var(--warning)] shrink-0 mt-0.5" />
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  The final premium is dynamically calculated based on the historical risk multiplier for your configuration.
                </p>
              </div>
            </div>

            <button className="w-full mt-6 bg-foreground text-background text-[13px] font-medium h-10 rounded-md hover:bg-foreground/90 transition-colors">
              Configure & Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

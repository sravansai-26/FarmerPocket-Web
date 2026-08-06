import { createFileRoute } from "@tanstack/react-router";
import { ActionButton, Arrow } from "../../../components/pocket/Button";

export const Route = createFileRoute("/_public/products/$productId")({
  component: CoverDetailsPage,
});

function CoverDetailsPage() {
  const { productId } = Route.useParams();

  return (
    <div className="pt-32 pb-20 mx-auto max-w-[1240px] px-4 md:px-6 animate-in fade-in duration-500">
      <header className="max-w-2xl">
        <p className="eyebrow">Cover Details</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{productId}</h1>
        <p className="mt-4 text-[16px] text-muted-foreground">
          Detailed metrics, triggers, and payout thresholds for this cover.
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-quiet)]">
            <h2 className="text-[18px] font-medium text-foreground">Trigger Parameters</h2>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between border-b border-border pb-4">
                <span className="text-[14px] text-muted-foreground">Data Source</span>
                <span className="text-[14px] font-mono text-foreground">Oracle / API</span>
              </div>
              <div className="flex justify-between border-b border-border pb-4">
                <span className="text-[14px] text-muted-foreground">Monitoring Window</span>
                <span className="text-[14px] font-mono text-foreground">Event Duration</span>
              </div>
              <div className="flex justify-between border-b border-border pb-4">
                <span className="text-[14px] text-muted-foreground">Threshold</span>
                <span className="text-[14px] font-mono text-foreground">Specific Condition</span>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-quiet)]">
            <h2 className="text-[18px] font-medium text-foreground">Historical Simulator</h2>
            <div className="mt-6 flex h-48 items-center justify-center rounded-lg border border-border bg-canvas">
              <p className="text-[13px] text-muted-foreground">Simulation chart placeholder</p>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-quiet)] sticky top-24">
            <h2 className="text-[14px] font-medium text-foreground">Purchase Cover</h2>
            <div className="mt-6 grid gap-2">
              <div className="flex justify-between">
                <span className="text-[13px] text-muted-foreground">Premium</span>
                <span className="text-[13px] font-mono">$0.00</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="text-[13px] text-muted-foreground">Payout</span>
                <span className="text-[13px] font-mono text-primary">$0.00</span>
              </div>
            </div>
            <ActionButton className="w-full mt-8">
              Checkout <Arrow />
            </ActionButton>
          </section>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/protection/")({
  component: ProtectionServicesPage,
});

function ProtectionServicesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-primary">Protection Services</h1>
        <p className="mt-2 text-[15px] text-muted-foreground font-medium">
          Select stage-wise protection for your upcoming farm activities.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Sowing Protection */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold text-primary">Sowing Day Protection</h3>
                <p className="text-sm text-muted-foreground mt-2">Protects against heavy rainfall washing away seeds within 48 hours of sowing.</p>
                
                <div className="mt-4 p-4 bg-[var(--warning-soft)] rounded-lg">
                    <p className="text-xs text-[var(--warning)] font-bold uppercase">Trigger Condition</p>
                    <p className="text-sm font-medium mt-1">Rainfall &gt; 20mm</p>
                </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div>
                    <p className="text-xs text-muted-foreground">Premium</p>
                    <p className="font-semibold">₹199 / acre</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
                    Select
                </button>
            </div>
        </div>

        {/* Fertilizer Protection */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold text-primary">Fertilizer Day Cover</h3>
                <p className="text-sm text-muted-foreground mt-2">Protects against unexpected storms leaching fertilizers post-application.</p>
                
                <div className="mt-4 p-4 bg-[var(--warning-soft)] rounded-lg">
                    <p className="text-xs text-[var(--warning)] font-bold uppercase">Trigger Condition</p>
                    <p className="text-sm font-medium mt-1">Rainfall &gt; 15mm in 12h</p>
                </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div>
                    <p className="text-xs text-muted-foreground">Premium</p>
                    <p className="font-semibold">₹249 / acre</p>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
                    Select
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

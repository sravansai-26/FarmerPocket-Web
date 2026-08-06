import { createFileRoute } from "@tanstack/react-router";
import { CloudRain, Wind, ThermometerSun } from "lucide-react";

export const Route = createFileRoute("/app/monitoring/")({
  component: MonitoringPage,
});

function MonitoringPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-primary">Live Farm Monitoring</h1>
        <p className="mt-2 text-[15px] text-muted-foreground font-medium">
          Real-time weather data and satellite observations for your plots.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-2 rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-semibold">Plot 1: Cotton (Kharif)</h2>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Source: Tomorrow.io & IMD</span>
          </div>
          
          <div className="p-8 flex-1 bg-canvas flex items-center justify-center relative overflow-hidden">
             {/* Map placeholder */}
             <div className="absolute inset-0 bg-primary/5 pattern-grid-lg opacity-50 mix-blend-overlay"></div>
             <p className="text-muted-foreground relative z-10">[Satellite Map View of Farm Boundary]</p>
          </div>
        </div>

        <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 text-primary mb-2">
                    <CloudRain size={20} />
                    <h3 className="font-semibold">Rainfall</h3>
                </div>
                <p className="text-3xl font-semibold tracking-tight">12 mm <span className="text-sm font-normal text-muted-foreground">last 24h</span></p>
            </div>
            
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 text-[var(--warning)] mb-2">
                    <ThermometerSun size={20} />
                    <h3 className="font-semibold">Temperature</h3>
                </div>
                <p className="text-3xl font-semibold tracking-tight">34°C <span className="text-sm font-normal text-muted-foreground">avg</span></p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 text-muted-foreground mb-2">
                    <Wind size={20} />
                    <h3 className="font-semibold">Wind Speed</h3>
                </div>
                <p className="text-3xl font-semibold tracking-tight">14 km/h <span className="text-sm font-normal text-muted-foreground">gusts</span></p>
            </div>
        </div>
      </div>
    </div>
  );
}

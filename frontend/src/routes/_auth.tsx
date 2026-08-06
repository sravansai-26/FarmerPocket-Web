import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "../components/pocket/Logo";
import { ShieldCheck, Zap, Globe } from "lucide-react";
import { useAuth } from "../lib/auth";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  const { ready } = useAuth();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-canvas selection:bg-primary/20 selection:text-foreground">
      {/* Left Side: Auth Form Container */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 2xl:w-1/3 relative z-10">
        <header className="absolute left-0 top-0 flex w-full p-6 md:p-8">
          <Link to="/" className="text-foreground transition-opacity hover:opacity-80">
            <Logo />
          </Link>
        </header>

        <main className="mx-auto w-full max-w-sm lg:w-96 mt-12">
          <Outlet />
        </main>
        
        <footer className="absolute bottom-6 left-6 text-[12px] text-muted-foreground flex gap-4">
          <Link to="/legal" className="hover:text-foreground">Privacy Policy</Link>
          <Link to="/legal" className="hover:text-foreground">Terms of Service</Link>
        </footer>
      </div>

      {/* Right Side: Showcase Panel (Visible on Desktop) */}
      <div className="relative hidden w-0 flex-1 lg:block bg-zinc-950 overflow-hidden border-l border-border">
        {/* Farm Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/farmer_auth_bg.png)', opacity: 0.8 }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
        
        <div className="flex flex-col justify-center h-full p-16 xl:p-24 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-md">
              Farm investments,<br />
              <span className="text-primary drop-shadow-md">fully protected.</span>
            </h2>
            
            <p className="text-lg text-zinc-300 leading-relaxed mb-12 max-w-lg drop-shadow-sm">
              FarmerPocket protects your seasonal farm investments—labor, seeds, fertilizers, and harvesting—with stage-wise, automatic payouts driven by deterministic weather data.
            </p>
            
            <div className="grid gap-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <Globe size={18} className="text-primary/80" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Weather Oracle Architecture</h3>
                  <p className="text-[13px] text-zinc-300 mt-1">Real-time climate data feeds monitor your specific plot continuously.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <Zap size={18} className="text-primary/80" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Automatic Decision Engine</h3>
                  <p className="text-[13px] text-zinc-300 mt-1">Smart contracts trigger your payout instantly the moment thresholds are crossed.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <ShieldCheck size={18} className="text-primary/80" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Stage-Wise Protection</h3>
                  <p className="text-[13px] text-zinc-300 mt-1">Protect what you've already spent, from land preparation and sowing to harvesting.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

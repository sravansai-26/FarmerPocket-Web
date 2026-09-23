import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Arrow } from "../../components/pocket/Button";
import { CountUp } from "../../components/pocket/CountUp";
import { DecisionConsole } from "../../components/pocket/DecisionConsole";
import { Faq } from "../../components/pocket/Faq";
import { Reveal } from "../../components/pocket/Reveal";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: [
      { title: "FarmerPocket — Agricultural Operating System" },
      {
        name: "description",
        content:
          "Automatic stage-wise protection for your farm investments. Powered by trusted weather data. Instant payouts when predefined conditions occur.",
      },
      { property: "og:title", content: "FarmerPocket — Agricultural Operating System" },
      {
        property: "og:description",
        content:
          "Automatic stage-wise protection for your farm investments. Instant payouts when predefined weather events occur.",
      },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "FarmerPocket — Agricultural Operating System" },
      {
        name: "twitter:description",
        content:
          "Automatic stage-wise protection for your farm investments. Instant payouts when predefined weather events occur.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const losses = [
  { title: "Seed Sowing Washed Out", detail: "45 mm rainfall · Day 2" },
  { title: "Fertilizer Leached", detail: "Unexpected storm · Post application" },
  { title: "Nursery Damaged", detail: "Heatwave warning · 42°C" },
  { title: "Harvest Delayed", detail: "Continuous rain · 3 Days" },
  { title: "Cotton Picking Ruined", detail: "Unseasonal rain" },
];

const ledger = [
  { time: "06:00", source: "IMD Weather", reading: "Rain 12 mm", state: "Monitoring" },
  { time: "14:30", source: "Tomorrow.io", reading: "Rain 45 mm", state: "Threshold crossed" },
  { time: "14:35", source: "Protection Engine", reading: "Sowing Stage", state: "Decision Triggered" },
  { time: "14:40", source: "Payout Engine", reading: "₹5000 settled via UPI", state: "Completed" },
];

const covers = [
  { name: "Sowing Day Protection", trigger: "Rainfall > 20mm within 48h", price: "₹199/acre", payout: "₹3,500" },
  { name: "Fertilizer Day Cover", trigger: "Heavy rain washes fertilizer", price: "₹249/acre", payout: "₹4,200" },
  { name: "Harvest Protection", trigger: "Continuous rain during harvest", price: "₹399/acre", payout: "₹12,000" },
  { name: "Nursery Heat Shield", trigger: "Temperature > 40°C for 3 days", price: "₹150/acre", payout: "₹2,500" },
  { name: "Cotton Picking Cover", trigger: "Unseasonal rain damages lint", price: "₹450/acre", payout: "₹15,000" },
];

const principles = [
  {
    title: "Objective Verification",
    body: "Every FarmerPocket cover uses satellite and public weather data. No manual surveys. No crop cutting experiments.",
  },
  {
    title: "Stage-Wise Protection",
    body: "Protect your investments exactly when you make them — from land preparation to harvest.",
  },
  {
    title: "Automatic Payouts",
    body: "You never submit a claim form. FarmerPocket continuously monitors your plot and triggers payouts automatically.",
  },
  {
    title: "Complete Transparency",
    body: "Every decision is logged on a transparent ledger. You can verify exactly which weather station triggered your payout.",
  },
];

const pipeline = [
  { step: "Register Farm", detail: "Map your plot using GPS or survey number." },
  { step: "Plan Season", detail: "Add your crop stages and upcoming activities." },
  { step: "Select Protection", detail: "Choose exactly which activity to protect." },
  { step: "Live Monitoring", detail: "We monitor satellite and hyper-local weather data." },
  { step: "Automatic Verification", detail: "Conditions are verified instantly against thresholds." },
  { step: "Instant Payout", detail: "Money reaches your bank account to cover the loss." },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center pb-24 pt-36 lg:pb-32 lg:pt-48 border-b border-border">
        {/* Full width background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/landing_hero_bg.png)', opacity: 0.8 }} />
          <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-transparent" />
        </div>
        
        <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-24 relative z-10 w-full">
          <Reveal>
            <h1 className="mt-6 max-w-[15ch] text-[40.5px] font-semibold leading-[1.04] tracking-[-0.035em] lg:text-[66.2px] drop-shadow-md">
              Every Rupee You Put Into Your <span className="text-primary">Farm</span> Deserves Protection.
            </h1>
            <div className="mt-8 max-w-[46ch] space-y-4 text-[16.6px] leading-relaxed text-muted-foreground drop-shadow-sm">
              <p>FarmerPocket automatically protects your agricultural investments — labor, seeds, fertilizer, and machinery.</p>
              <p>
                No paperwork. No yield assessments. No waiting months. Just instant payouts when bad weather disrupts your work.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <ActionLink to="/signin">
                Start Protecting
                <Arrow />
              </ActionLink>
              <ActionLink to="/how-it-works" variant="ghost">
                View Crop Timeline
              </ActionLink>
            </div>
            <p className="mt-10 font-mono text-[11px] text-muted-foreground drop-shadow-sm">
              Trusted by 10,000+ farmers · Instant UPI Payouts · Real-time Weather Oracle
            </p>
          </Reveal>

          <Reveal delay={120}>
            {/* Minimalist transparent card overlaying the background */}
            <div className="h-[400px] w-full rounded-2xl bg-card/60 backdrop-blur-xl border border-border flex items-center justify-center overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-primary/5 pattern-grid-lg opacity-30 mix-blend-overlay"></div>
              <div className="p-8 text-center z-10">
                <div className="w-16 h-16 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl">🌱</span>
                </div>
                <h3 className="text-2xl font-semibold mb-2">Live Farm Monitoring</h3>
                <p className="text-muted-foreground">Satellite view and active weather conditions</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem Timeline */}
      <section className="border-y border-border bg-canvas">
        <div className="shell section">
          <Reveal>
            <h2 className="max-w-[20ch] text-[31.3px] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[40.5px]">
              Farming is a series of investments. So are your losses.
            </h2>
          </Reveal>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border">
            {losses.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 60}>
                <div className="group flex flex-wrap items-baseline justify-between gap-3 bg-card px-6 py-7 transition-colors duration-180 hover:bg-background">
                  <span className="text-[17.5px] tracking-[-0.01em] lg:text-[23.9px] text-primary">
                    {item.title}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground opacity-70 transition-opacity duration-180">
                    {item.detail}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Product introduction */}
      <section className="shell section">
        <Reveal>
          <p className="max-w-[16ch] text-[40.5px] font-semibold leading-[1.02] tracking-[-0.04em] lg:text-[81px]">
            FarmerPocket protects the stages.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-12 grid gap-8 border-t border-border pt-12 lg:grid-cols-2">
            <p className="max-w-[24ch] text-[23.9px] leading-[1.25] tracking-[-0.02em]">
              Instead of waiting for harvest to claim crop failure...
            </p>
            <p className="max-w-[34ch] text-[23.9px] leading-[1.25] tracking-[-0.02em] text-muted-foreground">
              We protect your sowing costs today, and your fertilizer costs tomorrow.
            </p>
          </div>
        </Reveal>
      </section>

      {/* How it Works / Technology */}
      <section className="border-y border-border bg-canvas">
        <div className="shell section">
          <Reveal>
            <p className="eyebrow">How It Works</p>
            <h2 className="mt-5 max-w-[18ch] text-[31.3px] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[40.5px]">
              From farm registration to instant payout.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3">
            {pipeline.map((item, index) => (
              <Reveal as="li" key={item.step} delay={index * 50}>
                <div className="group h-full bg-card p-8 transition-colors duration-180 hover:bg-primary-soft">
                  <span className="font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                  <h3 className="mt-4 text-[17.5px] tracking-[-0.01em] text-primary">{item.step}</h3>
                  <p className="mt-3 max-w-[34ch] text-[13.8px] leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Comparison: PMFBY vs FarmerPocket */}
      <section className="shell section">
        <Reveal>
          <p className="eyebrow">A New Approach</p>
          <h2 className="mt-5 max-w-[20ch] text-[31.3px] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[40.5px]">
            Complementing existing schemes.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          <Reveal className="bg-card p-8 lg:p-12">
            <p className="eyebrow text-muted-foreground">Traditional Schemes (e.g. PMFBY)</p>
            <ol className="mt-8 grid gap-5">
              {[
                "End of season yield assessment.",
                "Manual crop cutting experiments.",
                "Village-level averaging.",
                "Massive paperwork.",
                "Months of waiting for payouts.",
              ].map((line) => (
                <li key={line} className="text-[16.6px] text-muted-foreground flex gap-3">
                  <span className="text-muted-foreground/50">→</span> {line}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal className="bg-card p-8 lg:p-12" delay={100}>
            <p className="eyebrow text-primary">FarmerPocket</p>
            <ol className="mt-8 grid gap-5">
              {[
                "Stage-wise activity protection.",
                "Automatic satellite & weather oracle.",
                "Plot-level precision.",
                "Zero paperwork or claims.",
                "Instant UPI payouts.",
              ].map((line) => (
                <li key={line} className="text-[16.6px] flex gap-3">
                  <span className="text-primary">✓</span> {line}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Cover categories */}
      <section className="border-y border-border bg-canvas">
        <div className="shell section">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Protection Plans</p>
                <h2 className="mt-5 max-w-[16ch] text-[31.3px] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[40.5px]">
                  Specific protection for specific risks.
                </h2>
              </div>
            </div>
          </Reveal>

          <div
            tabIndex={0}
            role="group"
            aria-label="Cover catalogue, scroll horizontally"
            className="mt-14 overflow-x-auto pb-4"
          >
            <ul className="flex snap-x snap-mandatory gap-5">
              {covers.map((cover) => (
                <li key={cover.name} className="w-[300px] shrink-0 snap-start">
                  <article className="group h-full rounded-lg border border-border bg-card p-7 transition-all duration-180 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                    <h3 className="mt-2 text-[17.5px] tracking-[-0.01em] text-primary">{cover.name}</h3>
                    <p className="mt-2 text-[12.9px] text-muted-foreground">{cover.trigger}</p>
                    <div className="mt-6 flex flex-col gap-2 border-t border-border pt-4 font-mono text-[12px]">
                      <span className="text-muted-foreground">Premium: {cover.price}</span>
                      <span className="text-foreground font-semibold">Max Payout: {cover.payout}</span>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Transparency ledger */}
      <section className="shell section">
        <div className="grid gap-14 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Farm Verification Centre</p>
            <h2 className="mt-5 max-w-[14ch] text-[31.3px] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[40.5px]">
              Truth is in the data.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[14.7px] leading-relaxed text-muted-foreground">
              Every weather observation, every decision, and every payout is logged immutably.
              You can verify exactly why a payout was triggered based on public meteorological data.
            </p>

            <ol className="mt-12 border-t border-border">
              {ledger.map((row) => (
                <li
                  key={`${row.time}-${row.state}`}
                  className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-border py-4 font-mono text-[12px]"
                >
                  <span className="text-muted-foreground">{row.time}</span>
                  <span className="text-primary">{row.source}</span>
                  <span />
                  <span className="text-muted-foreground">
                    {row.reading} · {row.state}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <DecisionConsole />
          </Reveal>
        </div>
      </section>
    </>
  );
}

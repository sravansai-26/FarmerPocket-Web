import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Arrow } from "../../components/pocket/Button";
import { DecisionConsole } from "../../components/pocket/DecisionConsole";
import { Reveal } from "../../components/pocket/Reveal";

export const Route = createFileRoute("/_public/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — FarmerPocket" },
      {
        name: "description",
        content:
          "Buy a cover, FarmerPocket monitors trusted public data, the trigger is evaluated automatically and the payout is released. Six steps, no claim.",
      },
      { property: "og:title", content: "How It Works — FarmerPocket" },
      {
        property: "og:description",
        content: "Six steps from cover to payout, with no claim, no documents and no waiting.",
      },
      { property: "og:url", content: "/how-it-works" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "How It Works — FarmerPocket" },
      {
        name: "twitter:description",
        content: "Six steps from cover to payout, with no claim, no documents and no waiting.",
      },
    ],
    links: [{ rel: "canonical", href: "/how-it-works" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How FarmerPocket works",
          step: [
            { "@type": "HowToStep", name: "Choose a cover" },
            { "@type": "HowToStep", name: "Monitoring begins" },
            { "@type": "HowToStep", name: "Trigger evaluated" },
            { "@type": "HowToStep", name: "Automatic payout" },
          ],
        }),
      },
    ],
  }),
  component: HowItWorksPage,
});

const steps = [
  {
    title: "Choose a protection plan",
    body: "Pick the farming activity, plot, and stage. The trigger threshold and the payout are shown before you pay.",
  },
  {
    title: "Monitoring begins",
    body: "At the start of your crop stage the trigger engine begins polling the published weather and satellite sources.",
  },
  {
    title: "Readings are recorded",
    body: "Every reading is timestamped and stored. You can watch them accumulate in your farm timeline in real time.",
  },
  {
    title: "The trigger is evaluated",
    body: "When a reading crosses the threshold, it is confirmed against a secondary source before anything is released.",
  },
  {
    title: "Payout is released",
    body: "Funds are sent to your account automatically. There is no yield assessment to submit and nobody to convince.",
  },
  {
    title: "The decision stays replayable",
    body: "The full timeline remains available afterwards — including the plans that did not pay out, and why.",
  },
];

function HowItWorksPage() {
  return (
    <>
      <section className="shell pb-20 pt-36 lg:pt-48">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h1 className="mt-6 max-w-[15ch] text-[40.5px] font-semibold leading-[1.05] tracking-[-0.035em] lg:text-[58.9px]">
            Reality is the claim.
          </h1>
          <p className="mt-8 max-w-[52ch] text-[16.6px] leading-relaxed text-muted-foreground">
            FarmerPocket watches the same public data that agricultural institutes and meteorological
            offices rely on — and acts on it the moment your condition is met.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-border bg-canvas">
        <div className="shell section">
          <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-2">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 50}>
                <div className="h-full bg-card p-9 lg:p-12">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Step 0{index + 1}
                  </span>
                  <h2 className="mt-5 text-[23.9px] tracking-[-0.02em]">{step.title}</h2>
                  <p className="mt-4 max-w-[42ch] text-[14.7px] leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell section">
        <Reveal>
          <h2 className="max-w-[18ch] text-[31.3px] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[40.5px]">
            Drag the timeline. Watch the decision happen.
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-12">
          <DecisionConsole />
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-12">
            <ActionLink to="/products">
              Browse protection plans
              <Arrow />
            </ActionLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}

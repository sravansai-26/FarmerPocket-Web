import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../../components/pocket/Reveal";

export const Route = createFileRoute("/_public/about")({
  head: () => ({
    meta: [
      { title: "About — FarmerPocket" },
      {
        name: "description",
        content:
          "FarmerPocket began with a simple question: why should protecting farm investments involve months of waiting and endless paperwork?",
      },
      { property: "og:title", content: "About — FarmerPocket" },
      {
        property: "og:description",
        content: "Why protecting farm investments shouldn't involve big paperwork.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "About — FarmerPocket" },
      {
        name: "twitter:description",
        content: "Why protecting farm investments shouldn't involve big paperwork.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const timeline = [
  ["Idea", "Unseasonal rain washing away freshly sown seeds, and no mechanism that protected the initial investment."],
  ["Prototype", "A single farm plot, one satellite weather feed, and an automatic payout for sowing failure."],
  ["Trigger Engine", "Activity-based monitoring, satellite verification, and agricultural stage thresholds."],
  ["Transparency Layer", "Every reading stored, timestamped and replayable by the farmer."],
  [
    "Agricultural Operating System",
    "Stage-wise protection, instant UPI settlement, no claims anywhere in the flow.",
  ],
];

function AboutPage() {
  return (
    <>
      <section className="shell pb-20 pt-36 lg:pt-48">
        <Reveal>
          <p className="eyebrow">About</p>
          <h1 className="mt-6 max-w-[16ch] text-[31.3px] font-semibold leading-[1.08] tracking-[-0.035em] lg:text-[51.5px]">
            FarmerPocket began with a simple question. Why should farm protection require months of waiting and endless paperwork?
          </h1>
        </Reveal>
      </section>

      <section className="border-y border-border bg-canvas">
        <div className="shell section">
          <ol className="border-t border-border">
            {timeline.map(([title, body], index) => (
              <Reveal as="li" key={title} delay={index * 60}>
                <div className="grid gap-3 border-b border-border py-9 lg:grid-cols-[0.06fr_0.34fr_0.6fr] lg:items-baseline lg:gap-10">
                  <span className="font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                  <h2 className="text-[20.2px] tracking-[-0.02em]">{title}</h2>
                  <p className="max-w-[56ch] text-[14.7px] leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell section">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="max-w-[16ch] text-[23.9px] leading-[1.25] tracking-[-0.02em]">
              We are not a traditional insurer. We are an Agricultural Operating System.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="max-w-[54ch] space-y-5 text-[14.7px] leading-relaxed text-muted-foreground">
              <p>
                FarmerPocket converts objective, publicly recorded weather and satellite data into automatic payouts for farmers.
                Members never file a claim, because there is nothing to argue about: either the published weather threshold was
                crossed at the exact farm location, or it wasn't.
              </p>
              <p>
                That constraint shapes everything — the protection we offer, the meteorological data sources we trust,
                and the transparency we provide. We would rather offer precise, automated protection than subjective yield assessments.
              </p>
              <p>FarmerPocket is part of the LYFSpot agricultural ecosystem.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

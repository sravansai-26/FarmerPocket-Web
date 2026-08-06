import { createFileRoute } from "@tanstack/react-router";
import { DecisionConsole } from "../../components/pocket/DecisionConsole";
import { Reveal } from "../../components/pocket/Reveal";

export const Route = createFileRoute("/_public/transparency")({
  head: () => ({
    meta: [
      { title: "Trust Centre — FarmerPocket" },
      {
        name: "description",
        content:
          "Published thresholds, replayable decision timelines, named data sources and privacy-first data handling. See how FarmerPocket verifies reality.",
      },
      { property: "og:title", content: "Trust Centre — FarmerPocket" },
      {
        property: "og:description",
        content: "Published thresholds, replayable decisions and named data sources.",
      },
      { property: "og:url", content: "/transparency" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Trust Centre — FarmerPocket" },
      {
        name: "twitter:description",
        content: "Published thresholds, replayable decisions and named data sources.",
      },
    ],
    links: [{ rel: "canonical", href: "/transparency" }],
  }),
  component: TransparencyPage,
});

const commitments = [
  {
    title: "Published thresholds",
    body: "The trigger value for every protection plan is fixed and visible at the moment of purchase. It cannot be changed once monitoring begins.",
  },
  {
    title: "Named data sources",
    body: "We name the provider behind every reading. Where a secondary source exists, it is named too.",
  },
  {
    title: "Replayable decisions",
    body: "Every farm protection plan keeps its full reading history, including plans that did not trigger.",
  },
  {
    title: "Payout without request",
    body: "A confirmed trigger releases funds automatically. Farmers are never asked to prove an event or crop failure.",
  },
];

const practices = [
  ["Data stored", "Account identity, farm coordinates, plan parameters, weather readings and payout records."],
  [
    "Data not stored",
    "Location history outside your farm monitoring window, contacts, device advertising IDs.",
  ],
  ["Retention", "Protection records are retained for the period required for financial reconciliation."],
  ["Access", "Farmers can export or request deletion of their account data at any time."],
  ["Payments", "Settlement runs over UPI rails; card and bank credentials are never stored by us."],
  ["Authentication", "OAuth-protected sign-in with session-scoped tokens."],
];

function TransparencyPage() {
  return (
    <>
      <section className="shell pb-20 pt-36 lg:pt-48">
        <Reveal>
          <p className="eyebrow">Trust centre</p>
          <h1 className="mt-6 max-w-[14ch] text-[40.5px] font-semibold leading-[1.05] tracking-[-0.035em] lg:text-[58.9px]">
            Every decision is visible.
          </h1>
          <p className="mt-8 max-w-[54ch] text-[16.6px] leading-relaxed text-muted-foreground">
            This page is maintained by FarmerPocket to answer common security and transparency
            questions about the platform. It describes our own practices; it is not an independent
            audit or certification.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-border bg-canvas">
        <div className="shell section">
          <Reveal>
            <DecisionConsole />
          </Reveal>
        </div>
      </section>

      <section className="shell section">
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {commitments.map((item, index) => (
            <Reveal key={item.title} delay={index * 50}>
              <div className="h-full bg-card p-9">
                <h2 className="text-[20.2px] tracking-[-0.02em]">{item.title}</h2>
                <p className="mt-4 max-w-[42ch] text-[14.7px] leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-canvas">
        <div className="shell section">
          <Reveal>
            <h2 className="max-w-[18ch] text-[31.3px] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[40.5px]">
              Designed with privacy first.
            </h2>
          </Reveal>
          <Reveal>
            <dl className="mt-12 border-t border-border">
              {practices.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 border-b border-border py-6 lg:grid-cols-[0.28fr_0.72fr] lg:gap-10"
                >
                  <dt className="eyebrow pt-1">{label}</dt>
                  <dd className="max-w-[64ch] text-[14.7px] leading-relaxed text-muted-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal>
            <p className="mt-10 max-w-[60ch] text-[12.9px] leading-relaxed text-muted-foreground">
              Security questions or a suspected vulnerability? Write to our team through the contact
              page and mark the subject as Security. We respond to reports before anything else.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

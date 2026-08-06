import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../../components/pocket/Reveal";

export const Route = createFileRoute("/_public/legal")({
  head: () => ({
    meta: [
      { title: "Legal & Policies — FarmerPocket" },
      {
        name: "description",
        content:
          "Privacy, terms, cookies and accessibility summaries for the FarmerPocket protection platform.",
      },
      { property: "og:title", content: "Legal & Policies — FarmerPocket" },
      {
        property: "og:description",
        content: "Privacy, terms, cookies and accessibility summaries for FarmerPocket.",
      },
      { property: "og:url", content: "/legal" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Legal & Policies — FarmerPocket" },
      {
        name: "twitter:description",
        content: "Privacy, terms, cookies and accessibility summaries for FarmerPocket.",
      },
    ],
    links: [{ rel: "canonical", href: "/legal" }],
  }),
  component: LegalPage,
});

const sections = [
  {
    title: "Privacy",
    body: "We collect the identity details needed to operate an account, the parameters of each cover you buy, the readings recorded during monitoring, and payout records. We do not sell member data or share it for advertising.",
  },
  {
    title: "Terms",
    body: "A cover is an agreement to pay a fixed amount if a published, objectively measurable condition occurs within a defined window. Covers can be cancelled for a full refund at any time before monitoring opens.",
  },
  {
    title: "Cookies",
    body: "We use functional cookies for session management and preferences. Analytics, where used, is aggregated and does not build cross-site profiles of members.",
  },
  {
    title: "Licences",
    body: "FarmerPocket operates as a technology platform in partnership with regulated financial and protection providers. Provider details are listed on each cover before purchase.",
  },
  {
    title: "Accessibility",
    body: "The interface targets WCAG 2.2 AA: full keyboard operation, visible focus, reduced-motion support, semantic structure and touch targets of at least 44 by 44 pixels.",
  },
];

function LegalPage() {
  return (
    <>
      <section className="shell pb-16 pt-36 lg:pt-48">
        <Reveal>
          <p className="eyebrow">Legal</p>
          <h1 className="mt-6 max-w-[16ch] text-[40.5px] font-semibold leading-[1.05] tracking-[-0.035em] lg:text-[51.5px]">
            Written to be read.
          </h1>
          <p className="mt-8 max-w-[52ch] text-[16.6px] leading-relaxed text-muted-foreground">
            Plain summaries of how FarmerPocket operates. Full documents are provided at account
            creation and on request.
          </p>
        </Reveal>
      </section>

      <section className="shell pb-24">
        <Reveal>
          <dl className="border-t border-border">
            {sections.map((section) => (
              <div
                key={section.title}
                className="grid gap-3 border-b border-border py-9 lg:grid-cols-[0.28fr_0.72fr] lg:gap-10"
              >
                <dt className="text-[20.2px] tracking-[-0.02em]">{section.title}</dt>
                <dd className="max-w-[64ch] text-[14.7px] leading-relaxed text-muted-foreground">
                  {section.body}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>
    </>
  );
}

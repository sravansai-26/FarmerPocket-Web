import { createFileRoute } from "@tanstack/react-router";
import { ActionLink, Arrow } from "../../../components/pocket/Button";
import { Reveal } from "../../../components/pocket/Reveal";

export const Route = createFileRoute("/_public/products/")({
  head: () => ({
    meta: [
      { title: "Covers — FarmerPocket" },
      {
        name: "description",
        content:
          "Rain, flight, rail, sport and event covers. Each with one published trigger, one monitoring window and one automatic payout.",
      },
      { property: "og:title", content: "Covers — FarmerPocket" },
      {
        property: "og:description",
        content:
          "Each cover has one published trigger, one monitoring window and one automatic payout.",
      },
      { property: "og:url", content: "/products" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Covers — FarmerPocket" },
      {
        name: "twitter:description",
        content:
          "Each cover has one published trigger, one monitoring window and one automatic payout.",
      },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const catalogue = [
  {
    group: "Weather",
    covers: [
      {
        name: "Rain Cover",
        trigger: "Rainfall above 5.0 mm in window",
        price: "₹29",
        payout: "₹150",
        source: "Tomorrow.io · IMD",
      },
      {
        name: "Outdoor Event",
        trigger: "Event-grade weather warning issued",
        price: "₹59",
        payout: "₹700",
        source: "OpenWeather · IMD",
      },
      {
        name: "Cycling",
        trigger: "Sustained gusts above 45 km/h",
        price: "₹25",
        payout: "₹250",
        source: "Tomorrow.io",
      },
      {
        name: "Photography",
        trigger: "Visibility below 2 km",
        price: "₹39",
        payout: "₹450",
        source: "OpenWeather",
      },
    ],
  },
  {
    group: "Travel",
    covers: [
      {
        name: "Flight Delay",
        trigger: "Departure delayed beyond 120 min",
        price: "₹79",
        payout: "₹1,200",
        source: "AviationStack · FlightAware",
      },
      {
        name: "Train Delay",
        trigger: "Arrival delayed beyond 90 min",
        price: "₹35",
        payout: "₹400",
        source: "Indian Rail APIs",
      },
      {
        name: "Road Trip",
        trigger: "Official highway closure declared",
        price: "₹45",
        payout: "₹600",
        source: "State transport feeds",
      },
    ],
  },
  {
    group: "Sport & culture",
    covers: [
      {
        name: "Match Cover",
        trigger: "Play abandoned without result",
        price: "₹49",
        payout: "₹500",
        source: "Official sports data",
      },
      {
        name: "Festival",
        trigger: "Organiser cancellation published",
        price: "₹69",
        payout: "₹800",
        source: "Organiser feeds",
      },
      {
        name: "Concert",
        trigger: "Event cancelled before start time",
        price: "₹69",
        payout: "₹800",
        source: "Ticketing partners",
      },
    ],
  },
];

function ProductsPage() {
  return (
    <>
      <section className="shell pb-20 pt-36 lg:pt-48">
        <Reveal>
          <p className="eyebrow">Covers</p>
          <h1 className="mt-6 max-w-[16ch] text-[40.5px] font-semibold leading-[1.05] tracking-[-0.035em] lg:text-[58.9px]">
            Every cover published before you buy it.
          </h1>
          <p className="mt-8 max-w-[52ch] text-[16.6px] leading-relaxed text-muted-foreground">
            The trigger, the threshold, the data source and the payout are fixed at purchase.
            Nothing is decided afterwards.
          </p>
        </Reveal>
      </section>

      {catalogue.map((section, sectionIndex) => (
        <section
          key={section.group}
          className={sectionIndex % 2 === 0 ? "border-y border-border bg-canvas" : ""}
        >
          <div className="shell section">
            <Reveal>
              <p className="eyebrow">{section.group}</p>
            </Reveal>
            <ul className="mt-10 border-t border-border">
              {section.covers.map((cover, index) => (
                <Reveal as="li" key={cover.name} delay={index * 50}>
                  <div className="grid gap-4 border-b border-border py-8 lg:grid-cols-[0.28fr_0.34fr_0.22fr_0.16fr] lg:items-baseline lg:gap-10">
                    <h2 className="text-[20.2px] tracking-[-0.02em]">{cover.name}</h2>
                    <p className="text-[13.8px] text-muted-foreground">{cover.trigger}</p>
                    <p className="font-mono text-[12px] text-muted-foreground">{cover.source}</p>
                    <p className="font-mono text-[12px]">
                      <span className="text-muted-foreground">{cover.price}</span>
                      <span className="mx-2 text-border-strong">→</span>
                      <span className="text-primary">{cover.payout}</span>
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="shell section">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-border bg-card p-10">
            <p className="max-w-[30ch] text-[23.9px] leading-[1.2] tracking-[-0.02em]">
              Need a cover for an event we don't list yet?
            </p>
            <ActionLink to="/contact">
              Talk to us
              <Arrow />
            </ActionLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}

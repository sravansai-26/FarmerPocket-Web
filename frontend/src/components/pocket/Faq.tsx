import { useState } from "react";

const items = [
  {
    q: "How does FarmerPocket know when something happens?",
    a: "Every cover is bound to a measurable public data source — meteorological stations, aviation status feeds, rail operations data or official sports results. The trigger engine polls those sources throughout your monitoring window and records every reading.",
  },
  {
    q: "Do I ever submit claims?",
    a: "No. There is no claim form, no document upload and no assessor. When the trigger condition is met, the payout is released automatically.",
  },
  {
    q: "What if the data source fails?",
    a: "Each cover has a primary and a secondary source. If both become unavailable during the monitoring window, the protection cost is returned in full.",
  },
  {
    q: "When do payouts happen?",
    a: "Payouts are initiated within seconds of a confirmed trigger and typically settle to your UPI account in under three minutes.",
  },
  {
    q: "Can I cancel before monitoring begins?",
    a: "Yes. A cover can be cancelled at any point before its monitoring window opens, with the protection cost refunded in full.",
  },
  {
    q: "How are prices calculated?",
    a: "Protection cost is derived from the probability of the trigger occurring in your window and location, plus a fixed platform fee. The breakdown is shown before purchase.",
  },
  {
    q: "Can I trust the trigger?",
    a: "The threshold, the data source and the evaluation logic are all published before you buy, and the full decision timeline is replayable afterwards.",
  },
  {
    q: "Why isn't manual proof required?",
    a: "Because reality is already recorded. Asking members to prove an event that public infrastructure has already measured adds delay, not accuracy.",
  },
  {
    q: "Will more cover types be added?",
    a: "Yes. Any event with a reliable, objective and timestamped public data source is a candidate for a FarmerPocket.",
  },
  {
    q: "How does FarmerPocket make money?",
    a: "A transparent platform fee is included in the protection cost. We do not profit by declining payouts — decisions are made by data, not by us.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-border">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q} className="border-b border-border">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : index)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-120 hover:text-primary"
              >
                <span className="text-[15.6px] font-medium tracking-[-0.01em] lg:text-[17.5px]">
                  {item.q}
                </span>
                <span className="relative flex size-6 shrink-0 items-center justify-center">
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span
                    className={`absolute h-3.5 w-px bg-current transition-transform duration-180 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                      expanded ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              className="grid transition-all duration-260 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr", opacity: expanded ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-7 text-[14.7px] leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

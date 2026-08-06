import { useEffect, useState } from "react";

const steps = ["Purchased", "Monitoring", "Trigger", "Payout"] as const;

export function LiveCoverWidget() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % (steps.length + 1)), 1800);
    return () => clearInterval(id);
  }, []);

  const status =
    active === 0
      ? "Ready"
      : active === 1
        ? "Monitoring"
        : active === 2
          ? "Trigger Confirmed"
          : active === 3
            ? "Payout Sent"
            : "Completed";

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-quiet)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[17.5px] font-medium tracking-[-0.01em]">Outdoor Picnic</p>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">SATURDAY · 4:00 PM</p>
        </div>
        <span
          className={`rounded-full px-3 py-1.5 font-mono text-[10.1px] tracking-wide transition-colors duration-260 ${
            active >= 2
              ? "bg-success-soft text-success"
              : active === 1
                ? "bg-warning-soft text-warning"
                : "bg-muted text-muted-foreground"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="my-6 rule-line" />

      <dl className="grid grid-cols-2 gap-y-5">
        <div>
          <dt className="eyebrow">Cover</dt>
          <dd className="mt-1.5 text-[14.7px]">Rain Cover</dd>
        </div>
        <div>
          <dt className="eyebrow">Monitoring window</dt>
          <dd className="mt-1.5 font-mono text-[13.8px]">4 PM – 8 PM</dd>
        </div>
        <div>
          <dt className="eyebrow">Protection cost</dt>
          <dd className="mt-1.5 text-[14.7px]">₹29</dd>
        </div>
        <div>
          <dt className="eyebrow">Potential payout</dt>
          <dd className="mt-1.5 text-[14.7px] text-primary">₹150</dd>
        </div>
      </dl>

      <div className="my-6 rule-line" />

      <ol className="grid gap-0">
        {steps.map((step, index) => {
          const done = active > index;
          const current = active === index;
          return (
            <li key={step} className="flex items-center gap-3 py-2">
              <span className="relative flex size-4 items-center justify-center">
                <span
                  className={`size-2.5 rounded-full transition-all duration-260 ${
                    done ? "bg-success" : current ? "scale-125 bg-primary" : "bg-border-strong"
                  }`}
                />
                {index < steps.length - 1 ? (
                  <span
                    className={`absolute top-4 h-5 w-px transition-colors duration-260 ${
                      done ? "bg-success/40" : "bg-border"
                    }`}
                  />
                ) : null}
              </span>
              <span
                className={`text-[12.9px] transition-colors duration-260 ${
                  done || current ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
              {done ? (
                <span className="ml-auto font-mono text-[10.1px] text-muted-foreground">done</span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

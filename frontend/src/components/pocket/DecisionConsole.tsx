import { useState } from "react";

const frames = [
  { time: "16:00", rain: 0.0, wind: 6, status: "Monitoring started" },
  { time: "16:30", rain: 1.2, wind: 9, status: "Below threshold" },
  { time: "17:00", rain: 3.1, wind: 11, status: "Below threshold" },
  { time: "17:24", rain: 4.3, wind: 14, status: "Approaching threshold" },
  { time: "17:35", rain: 5.3, wind: 16, status: "Trigger confirmed" },
  { time: "17:36", rain: 5.6, wind: 16, status: "Automatic payout released" },
];

const THRESHOLD = 5.0;

export function DecisionConsole() {
  const [index, setIndex] = useState(3);
  const frame = frames[index];
  const triggered = frame.rain >= THRESHOLD;

  return (
    <div className="rounded-xl border border-border bg-card shadow-[var(--shadow-quiet)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-5">
        <div>
          <p className="text-[15.6px] font-medium">Rain Cover</p>
          <p className="mt-1 text-[12px] text-muted-foreground">Hyderabad Botanical Garden</p>
        </div>
        <span
          className={`rounded-full px-3 py-1.5 font-mono text-[10.1px] ${
            triggered ? "bg-success-soft text-success" : "bg-warning-soft text-warning"
          }`}
        >
          {triggered ? "TRIGGER CONFIRMED" : "MONITORING"}
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {[
          { label: "Data source", value: "Tomorrow.io" },
          { label: "Updated", value: `${frame.time}:18` },
          { label: "Rainfall", value: `${frame.rain.toFixed(1)} mm` },
          { label: "Trigger", value: `${THRESHOLD.toFixed(1)} mm` },
        ].map((item) => (
          <div key={item.label} className="bg-card px-6 py-5">
            <dt className="eyebrow">{item.label}</dt>
            <dd className="mt-2 font-mono text-[13.8px]">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-border px-6 py-6">
        <div className="relative h-2 w-full rounded-full bg-muted">
          <div
            className={`h-2 rounded-full transition-all duration-340 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              triggered ? "bg-success" : "bg-primary"
            }`}
            style={{ width: `${Math.min((frame.rain / 6) * 100, 100)}%` }}
          />
          <span
            className="absolute -top-1 h-4 w-px bg-border-strong"
            style={{ left: `${(THRESHOLD / 6) * 100}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[10.1px] text-muted-foreground">
          <span>Rainfall observed</span>
          <span>Threshold {THRESHOLD.toFixed(1)} mm</span>
        </div>

        <label className="mt-7 block">
          <span className="eyebrow">Replay the decision</span>
          <input
            type="range"
            min={0}
            max={frames.length - 1}
            step={1}
            value={index}
            onChange={(event) => setIndex(Number(event.target.value))}
            aria-label="Replay decision timeline"
            className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-[var(--primary)]"
          />
        </label>
        <div className="mt-2 flex justify-between font-mono text-[10.1px] text-muted-foreground">
          {frames.map((item, itemIndex) => (
            <span key={item.time} className={itemIndex === index ? "text-foreground" : undefined}>
              {item.time}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-border px-6 py-5">
        <p className="font-mono text-[12px]">
          <span className="text-muted-foreground">{frame.time}</span>
          <span className="mx-3 text-border-strong">|</span>
          <span className={triggered ? "text-success" : "text-foreground"}>{frame.status}</span>
          <span className="mx-3 text-border-strong">|</span>
          <span className="text-muted-foreground">wind {frame.wind} km/h</span>
        </p>
      </div>
    </div>
  );
}

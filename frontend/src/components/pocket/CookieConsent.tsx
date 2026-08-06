import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ActionButton } from "./Button";

const STORAGE_KEY = "pocketcover.cookie-consent";

export type ConsentPrefs = {
  necessary: true;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
  decidedAt: string;
};

const options = [
  {
    key: "necessary" as const,
    title: "Strictly necessary",
    body: "Session, security and cover-purchase functionality. Always on.",
    locked: true,
  },
  {
    key: "preferences" as const,
    title: "Preferences",
    body: "Remembers interface choices such as saved locations and units.",
    locked: false,
  },
  {
    key: "analytics" as const,
    title: "Analytics",
    body: "Aggregated usage measurement. Never used to build cross-site profiles.",
    locked: false,
  },
  {
    key: "marketing" as const,
    title: "Marketing",
    body: "Off by default. We do not sell member data or run ad retargeting.",
    locked: false,
  },
];

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, preferences: true, marketing: false });

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setOpen(true);
  }, []);

  const save = (next: { analytics: boolean; preferences: boolean; marketing: boolean }) => {
    const record: ConsentPrefs = { necessary: true, ...next, decidedAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    setOpen(false);
    setPanel(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-3 bottom-3 z-[70] md:inset-x-auto md:bottom-6 md:right-6 md:w-[420px]"
    >
      <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-lift)]">
        <p className="eyebrow">Cookies</p>
        <h2
          id="cookie-consent-title"
          className="mt-2 text-[15.6px] font-semibold tracking-[-0.02em]"
        >
          You choose what we remember.
        </h2>
        <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
          Necessary cookies keep covers and sessions working. Everything else is optional and off
          until you say otherwise. Read the{" "}
          <Link to="/legal" className="text-primary underline underline-offset-4">
            cookie policy
          </Link>
          .
        </p>

        {panel ? (
          <ul className="mt-4 grid gap-3 border-t border-border pt-4">
            {options.map((option) => {
              const checked = option.locked || prefs[option.key as "analytics"];
              return (
                <li key={option.key} className="flex items-start gap-3">
                  <input
                    id={`consent-${option.key}`}
                    type="checkbox"
                    checked={Boolean(checked)}
                    disabled={option.locked}
                    onChange={(event) =>
                      setPrefs((prev) => ({ ...prev, [option.key]: event.target.checked }))
                    }
                    className="mt-1 size-4 accent-[var(--primary)]"
                  />
                  <label htmlFor={`consent-${option.key}`} className="block">
                    <span className="block text-[12.9px] font-medium">{option.title}</span>
                    <span className="block text-[11.5px] leading-relaxed text-muted-foreground">
                      {option.body}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <ActionButton
            className="flex-1 text-[12.9px]"
            onClick={() => save({ analytics: true, preferences: true, marketing: true })}
          >
            Accept all
          </ActionButton>
          <ActionButton
            variant="ghost"
            className="flex-1 text-[12.9px]"
            onClick={() => save({ analytics: false, preferences: false, marketing: false })}
          >
            Reject optional
          </ActionButton>
          <ActionButton
            variant="quiet"
            className="text-[12px]"
            aria-expanded={panel}
            onClick={() => (panel ? save(prefs) : setPanel(true))}
          >
            {panel ? "Save preferences" : "Preferences"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

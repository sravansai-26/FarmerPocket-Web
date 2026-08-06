import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ActionButton, Arrow } from "../../components/pocket/Button";
import { Reveal } from "../../components/pocket/Reveal";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FarmerPocket" },
      {
        name: "description",
        content:
          "Questions, ideas or partnerships — talk to the FarmerPocket team about automatic, transparent agricultural protection.",
      },
      { property: "og:title", content: "Contact — FarmerPocket" },
      {
        property: "og:description",
        content: "Questions, ideas or partnerships — the FarmerPocket team is listening.",
      },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Contact — FarmerPocket" },
      {
        name: "twitter:description",
        content: "Questions, ideas or partnerships — the FarmerPocket team is listening.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const fieldClass =
  "mt-2 w-full rounded-md border border-border bg-card px-4 py-3 text-[13.8px] text-foreground transition-colors duration-120 placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-primary focus:outline-none";

const INBOX = "lyfspot@zohomail.in";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    try {
      const response = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as {
        ok: boolean;
        delivery?: string;
        error?: string;
      };

      if (result.ok) {
        setSent(true);
        return;
      }

      if (result.delivery === "unconfigured" || result.delivery === "failed") {
        // Fall back to the visitor's mail client so the message still reaches the inbox.
        const body = `Name: ${data.name}\nEmail: ${data.email}\nPriority: ${data.priority}\n\n${data.message}`;
        window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(
          `[${data.priority}] ${data.subject}`,
        )}&body=${encodeURIComponent(body)}`;
        setSent(true);
        return;
      }

      setError(result.error ?? "We couldn't send that message. Please try again.");
    } catch {
      setError("Network error. Please try again or email us directly.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="shell pb-24 pt-36 lg:pt-48">
      <div className="grid gap-16 lg:grid-cols-[0.42fr_0.58fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-6 max-w-[13ch] text-[31.3px] font-semibold leading-[1.08] tracking-[-0.035em] lg:text-[51.5px]">
            Let's build a more transparent future for farming.
          </h1>
          <div className="mt-8 space-y-2 text-[16.6px] text-muted-foreground">
            <p>Questions?</p>
            <p>Ideas?</p>
            <p>Partnerships?</p>
            <p className="text-foreground">We're listening.</p>
          </div>
          <dl className="mt-12 border-t border-border">
            {[
              ["Support", "support@farmerpocket.app"],
              ["Partnerships", "partners@farmerpocket.app"],
              ["Security", "security@farmerpocket.app"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-border py-4">
                <dt className="eyebrow pt-0.5">{label}</dt>
                <dd className="font-mono text-[12px]">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-lg border border-border bg-card p-8 shadow-[var(--shadow-quiet)] lg:p-10">
            {sent ? (
              <div className="py-16 text-center">
                <p className="text-[23.9px] tracking-[-0.02em]">Message received.</p>
                <p className="mx-auto mt-4 max-w-[36ch] text-[13.8px] leading-relaxed text-muted-foreground">
                  A member of the team will reply to you directly. Security reports are answered
                  first.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow">Name</span>
                    <input required name="name" className={fieldClass} placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="eyebrow">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      className={fieldClass}
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="eyebrow">Subject</span>
                  <input
                    required
                    name="subject"
                    className={fieldClass}
                    placeholder="What is this about?"
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">Priority</span>
                  <select name="priority" className={fieldClass} defaultValue="Normal">
                    <option>Normal</option>
                    <option>Partnership</option>
                    <option>Security</option>
                  </select>
                </label>
                <label className="block">
                  <span className="eyebrow">Message</span>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    className={`${fieldClass} resize-y`}
                    placeholder="Tell us what you're thinking."
                  />
                </label>
                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="max-w-[30ch] text-[12px] text-muted-foreground">
                    We reply from a real address, not a no-reply inbox.
                  </p>
                  <ActionButton type="submit" disabled={busy} className="disabled:opacity-60">
                    {busy ? "Sending…" : "Send Message"}
                    <Arrow />
                  </ActionButton>
                </div>
                {error ? (
                  <p role="alert" className="text-[12.9px] text-[var(--failure)]">
                    {error}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

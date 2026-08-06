import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Mail, Phone, MessageSquare, ExternalLink, FileText } from "lucide-react";

export const Route = createFileRoute("/app/support/")({
  component: SupportPage,
});

function SupportPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight flex items-center gap-2">
          <LifeBuoy size={28} /> Help & Support
        </h1>
        <p className="mt-2 text-[13px] text-muted-foreground">
          Need assistance with your protection covers, payouts, or account? We are here to help.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact Cards */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-quiet)] flex flex-col items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Phone size={20} />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-foreground">Call Us (Toll Free)</h2>
            <p className="text-[13px] text-muted-foreground mt-1">
              Available 24/7 in Telugu, Hindi, and English.
            </p>
            <p className="mt-4 text-xl font-medium tracking-tight text-primary">1800-XXX-XXXX</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-quiet)] flex flex-col items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Mail size={20} />
          </div>
          <div>
            <h2 className="text-[16px] font-semibold text-foreground">Email Support</h2>
            <p className="text-[13px] text-muted-foreground mt-1">
              For detailed queries and document verification.
            </p>
            <a href="mailto:support@farmerpocket.in" className="mt-4 inline-block text-[15px] font-medium text-primary hover:underline">
              support@farmerpocket.in
            </a>
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-quiet)] overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-[16px] font-medium text-foreground">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-border">
          {[
            {
              q: "How does the Smart Contract Engine trigger payouts?",
              a: "Our engine continuously monitors weather data from OpenWeather and Tomorrow.io for your plot coordinates. If adverse conditions (like excess rainfall) exceed your policy parameters during the specified crop stage, it automatically credits your wallet without any paperwork."
            },
            {
              q: "When can I withdraw money from my Protection Wallet?",
              a: "You can withdraw funds directly to your linked bank account anytime. Payouts credited by smart contracts are instantly available for withdrawal."
            },
            {
              q: "How do I add multiple farms?",
              a: "Go to your Dashboard and click '+ Add Farm'. You can add unlimited plots, and each plot can have its own independent protection covers based on the crop season."
            }
          ].map((faq, i) => (
            <div key={i} className="p-6">
              <h3 className="text-[14px] font-semibold text-foreground flex items-center gap-2">
                <FileText size={16} className="text-primary" /> {faq.q}
              </h3>
              <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-quiet)] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[16px] font-medium text-foreground">Raise a Ticket</h2>
          <p className="text-[13px] text-muted-foreground mt-1">If your issue is complex, you can open a support ticket.</p>
        </div>
        <button className="bg-foreground text-background px-4 py-2 text-[13px] font-medium rounded-md flex items-center gap-2 hover:bg-foreground/90 transition-colors">
          <MessageSquare size={16} /> Open Ticket
        </button>
      </section>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const INBOX = "lyfspot@zohomail.in";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(150),
  priority: z.enum(["Normal", "Partnership", "Security"]),
  message: z.string().trim().min(1).max(2000),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
        }

        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Please check the form fields and try again." },
            { status: 400 },
          );
        }

        const data = parsed.data;
        const apiKey = process.env.RESEND_API_KEY;
        const from = process.env.CONTACT_FROM_EMAIL ?? "FarmerPocket <onboarding@resend.dev>";

        if (!apiKey) {
          // No mail provider configured yet — tell the client to fall back to a mail client.
          return Response.json(
            { ok: false, delivery: "unconfigured", inbox: INBOX },
            { status: 200 },
          );
        }

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [INBOX],
            reply_to: data.email,
            subject: `[${data.priority}] ${data.subject}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nPriority: ${data.priority}\n\n${data.message}`,
          }),
        });

        if (!res.ok) {
          return Response.json({ ok: false, delivery: "failed", inbox: INBOX }, { status: 502 });
        }

        return Response.json({ ok: true, delivery: "sent" });
      },
    },
  },
});

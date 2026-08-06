import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  AuthFooterLink,
  AuthShell,
  Divider,
  ErrorNote,
  GoogleButton,
  SubmitRow,
  authFieldClass,
  useAuthRedirect,
  useFormSubmit,
} from "../components/pocket/AuthKit";
import { useAuth } from "../lib/auth";

export const Route = createFileRoute("/_auth/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — FarmerPocket" },
      {
        name: "description",
        content:
          "Create a FarmerPocket account to buy covers with published triggers and receive automatic payouts without claims.",
      },
      { property: "og:title", content: "Sign Up — FarmerPocket" },
      { property: "og:description", content: "Create your FarmerPocket account in under a minute." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/signup" },
      { name: "twitter:title", content: "Sign Up — FarmerPocket" },
      {
        name: "twitter:description",
        content: "Create your FarmerPocket account in under a minute.",
      },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/signup" }],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  useAuthRedirect();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [verificationSent, setVerificationSent] = useState(false);

  const { busy, error, setError, onSubmit } = useFormSubmit(async (event) => {
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") ?? "");
    if (password.length < 8) throw new Error("Password must be at least 8 characters.");
    if (password !== String(data.get("confirm") ?? "")) throw new Error("Passwords do not match.");

    await signUp(String(data.get("name") ?? ""), String(data.get("email") ?? ""), password);
    setVerificationSent(true);
  });

  if (verificationSent) {
    return (
      <AuthShell
        eyebrow="Verify Email"
        title="Check your inbox."
        intro="We've sent a verification link to your email address. Please click the link to verify your account."
        footer={
          <button
            type="button"
            onClick={() => navigate({ to: "/signin", replace: true })}
            className="font-medium text-primary underline underline-offset-4"
          >
            Go to sign in
          </button>
        }
      >
        <div className="text-center">
          <p className="text-[12.9px] text-foreground">
            You must verify your email before you can sign in and access the dashboard.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Create account"
      title="Start protecting your farm."
      intro="One account, precise weather thresholds, automatic payouts. No claims, ever."
      footer={
        <AuthFooterLink prompt="Already have an account?" to="/signin" label="Sign in here" />
      }
    >
      <GoogleButton label="Sign up with Google" onError={setError} />
      <Divider />
      <form onSubmit={onSubmit} className="grid gap-5" noValidate>
        <label className="block">
          <span className="eyebrow">Full name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className={authFieldClass}
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className={authFieldClass}
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Password</span>
          <input
            required
            type="password"
            name="password"
            autoComplete="new-password"
            className={authFieldClass}
            placeholder="At least 8 characters"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Confirm password</span>
          <input
            required
            type="password"
            name="confirm"
            autoComplete="new-password"
            className={authFieldClass}
            placeholder="Repeat password"
          />
        </label>
        <SubmitRow busy={busy} label="Create Account" />
      </form>
      <ErrorNote message={error} />
    </AuthShell>
  );
}

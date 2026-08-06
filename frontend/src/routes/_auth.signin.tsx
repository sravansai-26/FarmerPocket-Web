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

export const Route = createFileRoute("/_auth/signin")({
  head: () => ({
    meta: [
      { title: "Sign In — FarmerPocket" },
      {
        name: "description",
        content:
          "Sign in to your FarmerPocket account to view active covers, monitoring windows and automatic payout history.",
      },
      { property: "og:title", content: "Sign In — FarmerPocket" },
      { property: "og:description", content: "Access your FarmerPocket account and active covers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/signin" },
      { name: "twitter:title", content: "Sign In — FarmerPocket" },
      {
        name: "twitter:description",
        content: "Access your FarmerPocket account and active covers.",
      },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/signin" }],
  }),
  component: SignInPage,
});

function SignInPage() {
  useAuthRedirect();
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const { busy, error, setError, onSubmit } = useFormSubmit(async (event) => {
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");

    if (isResetMode) {
      await resetPassword(email);
      setResetSent(true);
      return;
    }

    const password = String(data.get("password") ?? "");
    await signIn(email, password);
    navigate({ to: "/app", replace: true });
  });

  if (isResetMode) {
    return (
      <AuthShell
        eyebrow="Reset Password"
        title="Recover your account."
        intro="Enter your email address and we will send you a link to reset your password."
        footer={
          <button
            type="button"
            onClick={() => {
              setIsResetMode(false);
              setResetSent(false);
            }}
            className="font-medium text-primary underline underline-offset-4"
          >
            Back to sign in
          </button>
        }
      >
        {resetSent ? (
          <div className="text-center">
            <p className="text-[12.9px] text-foreground">
              Check your email for a link to reset your password. If it doesn't appear within a few
              minutes, check your spam folder.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-5" noValidate>
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
            <SubmitRow busy={busy} label="Send Reset Link" />
          </form>
        )}
        <ErrorNote message={error} />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Farmers"
      title="Sign in to FarmerPocket."
      intro="Your farm plots, readings and payouts — exactly as recorded."
      footer={<AuthFooterLink prompt="Don't have an account?" to="/signup" label="Sign up here" />}
    >
      <GoogleButton label="Continue with Google" onError={setError} />
      <Divider />
      <form onSubmit={onSubmit} className="grid gap-5" noValidate>
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
          <div className="flex items-center justify-between">
            <span className="eyebrow">Password</span>
            <button
              type="button"
              onClick={() => setIsResetMode(true)}
              className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <input
            required
            type="password"
            name="password"
            autoComplete="current-password"
            className={authFieldClass}
            placeholder="••••••••"
          />
        </label>
        <SubmitRow busy={busy} label="Sign In" />
      </form>
      <ErrorNote message={error} />
    </AuthShell>
  );
}

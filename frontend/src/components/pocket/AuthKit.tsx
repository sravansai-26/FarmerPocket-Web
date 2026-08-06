import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ActionButton, Arrow } from "./Button";
import { Reveal } from "./Reveal";
import { useAuth } from "../../lib/auth";

export const authFieldClass =
  "mt-2 w-full rounded-md border border-border bg-card px-4 py-3 text-[12.9px] text-foreground transition-colors duration-150 placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-primary focus:outline-none";

export function GoogleMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.6 9.2c0-.6-.05-1.2-.16-1.7H9v3.3h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.5Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H.9v2.3A9 9 0 0 0 9 18Z"
      />
      <path fill="#FBBC05" d="M3.9 10.7a5.4 5.4 0 0 1 0-3.4V5H.9a9 9 0 0 0 0 8l3-2.3Z" />
      <path
        fill="#EA4335"
        d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .9 5l3 2.3C4.6 5.1 6.6 3.6 9 3.6Z"
      />
    </svg>
  );
}

export function AuthShell({
  eyebrow,
  title,
  intro,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="w-full">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 text-[25.8px] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[32px]">
          {title}
        </h1>
        <p className="mt-3 text-[12.9px] leading-relaxed text-muted-foreground">{intro}</p>
      </Reveal>
      <Reveal delay={90}>
        <div className="mt-8 rounded-xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-quiet)]">
          {children}
        </div>
        <p className="mt-6 text-center text-[12px] text-muted-foreground">{footer}</p>
      </Reveal>
    </div>
  );
}

export function useAuthRedirect() {
  const navigate = useNavigate();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (ready && user) navigate({ to: "/app", replace: true });
  }, [ready, user, navigate]);
}

export function GoogleButton({
  label,
  onError,
}: {
  label: string;
  onError: (message: string) => void;
}) {
  const { signInWithGoogle } = useAuth();
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await signInWithGoogle();
          navigate({ to: "/app", replace: true });
        } catch (error) {
          onError(error instanceof Error ? error.message : "Google sign-in failed.");
        } finally {
          setBusy(false);
        }
      }}
      className="flex min-h-[44px] w-full items-center justify-center gap-3 rounded-full border border-border-strong bg-card text-[12.9px] font-medium text-foreground transition-all duration-150 hover:bg-muted disabled:opacity-60"
    >
      <GoogleMark />
      {busy ? "Connecting to Google…" : label}
    </button>
  );
}

export function Divider() {
  return (
    <div className="my-6 flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-border" />
      <span className="text-[10.1px] uppercase tracking-[0.16em] text-muted-foreground">or</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function AuthFooterLink({
  prompt,
  to,
  label,
}: {
  prompt: string;
  to: string;
  label: string;
}) {
  return (
    <>
      {prompt}{" "}
      <Link to={to} className="font-medium text-primary underline underline-offset-4">
        {label}
      </Link>
    </>
  );
}

export function SubmitRow({ busy, label }: { busy: boolean; label: string }) {
  return (
    <ActionButton type="submit" disabled={busy} className="w-full disabled:opacity-60">
      {busy ? "Please wait…" : label}
      <Arrow />
    </ActionButton>
  );
}

export function useFormSubmit(action: (event: FormEvent<HTMLFormElement>) => Promise<void>) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await action(event);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return { busy, error, setError, onSubmit };
}

export function ErrorNote({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mt-4 rounded-md bg-[var(--failure)]/10 px-3 py-2 text-[12px] text-[var(--failure)]"
    >
      {message}
    </p>
  );
}

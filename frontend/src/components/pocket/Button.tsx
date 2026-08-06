import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-[13.8px] font-medium transition-all duration-150 ease-[cubic-bezier(0.22,0.61,0.36,1)] active:scale-[0.98] min-h-[44px] px-6";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-[var(--shadow-quiet)] hover:shadow-[var(--shadow-lift)] hover:brightness-[1.06]",
  ghost:
    "border border-border-strong bg-transparent text-foreground hover:bg-muted hover:border-border",
  quiet: "text-muted-foreground hover:text-foreground hover:bg-muted px-4",
} as const;

type Variant = keyof typeof variants;

export function ActionLink({
  to,
  variant = "primary",
  className = "",
  children,
  ...rest
}: { to: string; variant?: Variant; className?: string; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  "to" | "className" | "children"
>) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function ActionButton({
  variant = "primary",
  className = "",
  children,
  ...rest
}: { variant?: Variant } & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

/** Folded-paper mark: a pocket seam formed in negative space. */
export function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`group inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-200 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-rotate-3"
      >
        <path
          d="M4 7.2C4 5.43 5.43 4 7.2 4h11.6C20.57 4 22 5.43 22 7.2v11.6c0 1.77-1.43 3.2-3.2 3.2H7.2A3.2 3.2 0 0 1 4 18.8V7.2Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M4.6 10.4h6.9a1.9 1.9 0 0 1 1.9 1.9v9.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M13.4 12.3 21.6 6.4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark ? (
        <span className="text-[13.8px] font-semibold tracking-[-0.02em]">FarmerPocket</span>
      ) : null}
    </span>
  );
}

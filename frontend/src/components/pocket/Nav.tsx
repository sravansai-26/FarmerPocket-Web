import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ActionButton, Arrow } from "./Button";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

const publicLinks = [
  { label: "Products", to: "/products" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Trust", to: "/transparency" },
  { label: "About", to: "/about" },
  { label: "Support", to: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center p-4 transition-all duration-300 md:p-5 ${
          scrolled ? "py-3" : "py-4 md:py-6"
        }`}
      >
        <nav
          className={`flex w-full max-w-[1200px] items-center justify-between rounded-full border transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            scrolled
              ? "border-border bg-card/80 p-2 pl-4 pr-2 shadow-[var(--shadow-lift)] backdrop-blur-xl"
              : "border-transparent bg-transparent p-0 pl-2 pr-0"
          }`}
        >
          {/* Logo (Left) */}
          <Link
            to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center text-foreground transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
            aria-label="FarmerPocket home"
          >
            <Logo />
          </Link>

          {/* Links (Center) */}
          <ul className="hidden items-center gap-1 lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {publicLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeProps={{ className: "text-foreground bg-muted font-medium" }}
                  className={`rounded-full px-4 py-2 text-[13px] transition-all duration-200 ${
                    scrolled 
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted" 
                      : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions (Right) */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/signin" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full">
              <ActionButton className={scrolled ? "h-9 px-5 text-[12px]" : ""}>
                Get Started
                <Arrow />
              </ActionButton>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 pt-28 backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          className={`mx-auto flex w-full max-w-sm flex-col gap-2 p-6 transition-all duration-300 delay-75 ${
            open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {publicLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="flex min-h-[48px] items-center rounded-xl px-4 text-[15px] font-medium text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          
          <div className="mt-6 border-t border-border pt-6">
            <Link to="/signin" onClick={() => setOpen(false)}>
              <ActionButton className="w-full justify-center min-h-[50px] text-[15px]">
                Get Started
                <Arrow />
              </ActionButton>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

import { Link } from "@tanstack/react-router";
import { ActionLink, Arrow } from "./Button";

const columns = [
  {
    title: "Products",
    items: [
      { label: "Rain Cover", to: "/products" },
      { label: "Flight Cover", to: "/products" },
      { label: "Sports Cover", to: "/products" },
      { label: "Travel", to: "/products" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/about" },
      { label: "Press", to: "/about" },
      { label: "Partners", to: "/contact" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Transparency", to: "/transparency" },
      { label: "How It Works", to: "/how-it-works" },
      { label: "Security", to: "/transparency" },
      { label: "Status", to: "/transparency" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", to: "/legal" },
      { label: "Terms", to: "/legal" },
      { label: "Cookies", to: "/legal" },
      { label: "Accessibility", to: "/legal" },
    ],
  },
];

const socials = ["LinkedIn", "X", "GitHub"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-canvas">
      <div className="shell">
        <div className="border-b border-border py-24 text-center lg:py-32">
          <h2 className="mx-auto max-w-[16ch] text-[31.3px] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[51.5px]">
            Ready to protect your next plan?
          </h2>
          <div className="mt-8 flex justify-center">
            <ActionLink to="/signin">
              Get Started
              <Arrow />
            </ActionLink>
          </div>
        </div>

        <div className="grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="eyebrow">{column.title}</p>
              <ul className="mt-5 grid gap-3">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-[13.8px] text-muted-foreground transition-colors duration-120 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-line" />

        <div className="flex flex-col gap-10 py-16">
          <p className="text-[47.8px] font-semibold leading-none tracking-[-0.045em] text-foreground/90 md:text-[101.2px] lg:text-[138px]">
            FarmerPocket
          </p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[24ch] text-[13.8px] leading-relaxed text-muted-foreground">
              Designed for life's small uncertainties.
            </p>
            <ul className="flex gap-6">
              {socials.map((social) => (
                <li key={social}>
                  <a
                    href="/contact"
                    className="text-[12px] text-muted-foreground transition-colors duration-150 hover:text-foreground"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} FarmerPocket · A LYFSpot product. FarmerPocket is a
            parametric protection platform, not an insurer.
          </p>
        </div>
      </div>
    </footer>
  );
}

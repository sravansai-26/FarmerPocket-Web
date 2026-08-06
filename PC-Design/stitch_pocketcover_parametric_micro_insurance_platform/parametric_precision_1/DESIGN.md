---
name: Parametric Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#43474e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f88'
  primary: '#002045'
  on-primary: '#ffffff'
  primary-container: '#1a365d'
  on-primary-container: '#86a0cd'
  inverse-primary: '#adc7f7'
  secondary: '#546066'
  on-secondary: '#ffffff'
  secondary-container: '#d5e2e9'
  on-secondary-container: '#58646a'
  tertiary: '#002617'
  on-tertiary: '#ffffff'
  tertiary-container: '#003e28'
  on-tertiary-container: '#00b47d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f7'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#d8e4eb'
  secondary-fixed-dim: '#bcc8cf'
  on-secondary-fixed: '#111d22'
  on-secondary-fixed-variant: '#3c494e'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
  data-mono:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1200px
  gutter: 24px
  section-padding: 80px
  card-padding: 32px
---

## Brand & Style

The design system is anchored in the philosophy of "Invisible Protection." It targets a sophisticated audience that values efficiency over traditional insurance complexity. The emotional response is one of **instant confidence**—the interface must feel automated, mathematically certain, and premium.

The visual style is a hybrid of **High-End Corporate Minimalism** and **Modern Utility**. It leverages:
- **Precision Engineering:** Elements are aligned to a strict but invisible grid, echoing the logic of parametric smart contracts.
- **Organic Softness:** High border radii and generous whitespace soften the technical nature of the product, making finance feel approachable.
- **Glassmorphism Lite:** Subtle backdrop blurs are used sparingly to indicate hierarchy and "floating" states without being decorative.
- **Functional Clarity:** Every element exists for a reason; decorative "fluff" is replaced by exceptional typographic rhythm and tonal depth.

## Colors

The palette is designed to convey stability and the "green light" of automated payouts.

- **Primary (Deep Royal Blue):** Used for core branding, primary actions, and high-level headings. It provides the "institutional" weight required for insurance.
- **Secondary (Soft Sky Blue):** Primarily used for large surface backgrounds and subtle component states. It prevents the UI from feeling "heavy" or overly corporate.
- **Success (Emerald):** This is the "Payout" color. It is used strategically for positive balance changes, automated approvals, and active coverage states.
- **Neutrals:** A range of cool greys that maintain clarity. Pure white (#FFFFFF) is reserved for card surfaces to pop against the Soft Sky Blue background.

## Typography

This design system utilizes **Inter** for its high legibility and neutral, professional character across all core UI elements. To inject a sense of "technical precision" and developer-grade transparency, **Geist** is used for labels and monospaced data points.

- **Headlines:** Feature tight letter-spacing and substantial weight to create a strong visual anchor.
- **Body:** Generous line-heights ensure readability for policy details and terms.
- **Labels:** Small, uppercase, and slightly tracked-out to distinguish metadata from content.

## Layout & Spacing

The layout follows a **Fluid-Fixed hybrid model**. Content is contained within a 1200px max-width wrapper, centered on the screen. 

- **The 8px Rhythm:** All spacing (margins, padding, gaps) must be multiples of 8px. 
- **Whitespace as a Feature:** Use "over-spacing" to separate conceptual blocks. Section margins should be at least 80px on desktop to evoke the premium feel of Apple-style marketing pages.
- **Invisible Grids:** Alignment is paramount. Elements should align to the left edge of the typography hierarchy, creating a clean vertical axis.
- **Mobile Reflow:** On mobile, margins reduce to 20px, and section padding scales down to 48px.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Refined Shadows** rather than heavy borders.

- **Level 0 (Background):** `Soft Sky Blue` (#EBF8FF) or `White` (#FFFFFF).
- **Level 1 (Cards):** Pure White with a 1px border of 5% Black and a very soft, diffused shadow (0px 10px 30px rgba(0,0,0,0.03)).
- **Level 2 (Modals/Popovers):** Increased shadow spread (0px 20px 50px rgba(0,0,0,0.08)) with a 12px backdrop blur on the underlying surface.
- **Glass Effects:** Used for sticky navigation bars or "Live Coverage" tickers—60% White opacity with a 20px blur creates a sense of airiness.

## Shapes

The shape language is consistently **Large & Soft**. 

- **Standard Elements:** Buttons and inputs use a 12px (rounded-lg) radius.
- **Container Elements:** Main product cards and dashboard modules use a 24px (rounded-2xl) to 32px (rounded-3xl) radius to create a distinctive, modern silhouette.
- **Interactive States:** Focus states should use a 2px offset ring in the Primary color to maintain the "precision" aspect of the brand.

## Components

### Buttons
- **Primary:** Deep Royal Blue background, White text. High-contrast, no gradient.
- **Secondary:** Soft Sky Blue background, Primary Blue text. Subtle hover state with a slight increase in saturation.
- **Tertiary/Ghost:** No background, Primary Blue text. Reserved for low-emphasis actions.

### Cards
- Pure White background.
- 24px corner radius.
- 1px subtle stroke (#E2E8F0).
- Internal padding of 32px to allow content to "breathe."

### Input Fields
- Subtle grey background (#F8FAFC) that turns White on focus.
- 12px corner radius.
- Labels in `label-sm` (Geist) positioned above the field.

### Status Chips (Parametric Indicators)
- Small, pill-shaped.
- Use `Success Emerald` for "Active" or "Paid" status.
- Use a soft Amber for "Monitoring" or "Pending."
- Text should be bold and concise.

### Progress & Visualization
- Use thin, high-precision lines for charts.
- Avoid chunky bars; opt for refined, data-heavy visualizations that look like premium financial instruments.
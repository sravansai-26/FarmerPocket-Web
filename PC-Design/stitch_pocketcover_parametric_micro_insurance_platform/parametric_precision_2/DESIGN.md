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
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#001f4b'
  on-tertiary: '#ffffff'
  tertiary-container: '#003374'
  on-tertiary-container: '#6a9dff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f7'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  code-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 16px
  max-width: 1280px
---

## Brand & Style
The design system is engineered for the Trust Centre, where clarity and technical integrity are paramount. The brand personality is rooted in "Hyper-Transparency"—a design philosophy that treats information as a structural element. The aesthetic combines **Corporate Modernism** with **Technical Minimalism**, evoking the feeling of a high-security blueprint or a sophisticated auditing dashboard.

The target audience consists of security engineers, compliance officers, and stakeholders who require immediate, unvarnished access to data. The emotional response is one of "Informed Confidence"—users should feel that the system is hiding nothing, with every data point validated and every status accounted for. The visual language uses structured layouts, precise linework, and a "Verification-First" hierarchy to reinforce institutional stability.

## Colors
The palette is centered on the **Transparency Palette**, a selection of high-contrast tones designed for legibility and categorical clarity.

- **Primary (Deep Navy):** #1A365D. Used for structural elements, headers, and primary navigation to convey stability and authority.
- **Secondary (Verification Green):** #059669. Reserved strictly for successful validations, uptime status, and passed audits.
- **Tertiary (Action Blue):** #3B82F6. Used for interactive elements, links, and data-source highlights.
- **Neutral (Slate):** #64748B. Used for secondary text, metadata, and borders to maintain a professional, de-emphasized background.
- **Backgrounds:** Utilize a pure white (#FFFFFF) base with ultra-light cool gray (#F8FAFC) for sectional grounding.

## Typography
This design system utilizes **Inter** for its core communication due to its exceptional legibility and systematic appearance. To enhance the technical narrative, **Geist** is introduced for labels and monospaced data points, creating a clear distinction between narrative content and technical data.

Headlines use tight tracking and heavy weights to anchor the page. Labels (using Geist) should always be in a slightly higher weight or uppercase to indicate their role as metadata markers. Body copy maintains a generous line height to ensure complex technical documentation remains accessible.

## Layout & Spacing
The layout reflects **Architectural Stability** through a rigid 12-column fluid grid. The system uses a 4px baseline shift to ensure all elements align to a technical rhythm.

- **Desktop:** 12 columns with 24px gutters. Elements should align strictly to column starts.
- **Tablet:** 8 columns with 20px gutters.
- **Mobile:** 4 columns with 16px margins.
- **Alignment:** Use heavy vertical lines (1px, #E2E8F0) to separate grid sections in complex data views, mimicking a technical drawing or ledger.
- **Padding:** High-density spacing (8px/12px) is preferred for data tables, while generous padding (40px+) is used to isolate major trust categories.

## Elevation & Depth
Depth in this design system is conveyed through **Low-Contrast Outlines** and **Tonal Layering** rather than traditional shadows. This reinforces the "flat and transparent" brand promise.

- **Surface Tiers:** The main canvas is pure white. Secondary containers (like sidebars or data cards) use a subtle #F1F5F9 fill.
- **Borders:** Instead of shadows, use 1px borders (#E2E8F0) to define boundaries. 
- **Interactive State:** On hover, a card does not lift; instead, its border color shifts to the Primary Blue (#1A365D) or gains a subtle 4px inset "shadow" to imply a press, staying true to the tactile nature of a physical instrument.
- **Overlays:** Modals use a backdrop blur (8px) with a semi-transparent white tint to maintain context of the underlying data.

## Shapes
The shape language is **Soft (0.25rem)**. This slight rounding prevents the UI from feeling aggressive or "sharp," maintaining accessibility while the predominantly straight lines and 90-degree intersections preserve the "Precision" aspect of the system.

- **Small Components:** Checkboxes and small buttons use a 4px (0.25rem) radius.
- **Containers:** Large data cards and code blocks use an 8px (0.5rem) radius.
- **Status Badges:** These are the only exception, using a full pill-shape (999px) to distinguish them from interactive buttons.

## Components
### Verification UI Patterns
- **Status Badges:** Small, pill-shaped indicators. "Verified" uses a Secondary Green background (10% opacity) with solid Green text. "Pending" uses a Neutral Slate theme.
- **Code-Snippet Blocks:** Encased in a slate-gray container (#1E293B) with syntax highlighting. Includes a "Copy to Clipboard" action and a "Source Verified" timestamp in the footer.
- **Data-Source Cards:** Interactive containers that display the origin of a piece of trust data. They must feature a "Last Synced" label in the top right using the Label-MD type role.
- **Buttons:** 
  - *Primary:* Solid #1A365D with white text. No gradient.
  - *Secondary:* 1px border of #1A365D with no fill.
- **Input Fields:** Rectangular with a 1px border. On focus, the border thickens to 2px Primary Blue with no outer glow.
- **Audit Lists:** Uses alternating row highlights (Zebra striping) in #F8FAFC to ensure high-density data remains readable across wide spans.
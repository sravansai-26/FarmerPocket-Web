---
name: Parametric Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#cadbfc'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dfe8ff'
  surface-container-highest: '#d6e3ff'
  on-surface: '#091c35'
  on-surface-variant: '#434654'
  inverse-surface: '#20314b'
  inverse-on-surface: '#ecf0ff'
  outline: '#737685'
  outline-variant: '#c3c6d6'
  surface-tint: '#0c56d0'
  primary: '#003d9b'
  on-primary: '#ffffff'
  primary-container: '#0052cc'
  on-primary-container: '#c4d2ff'
  inverse-primary: '#b2c5ff'
  secondary: '#006c47'
  on-secondary: '#ffffff'
  secondary-container: '#8af5be'
  on-secondary-container: '#00714b'
  tertiary: '#432f9c'
  on-tertiary: '#ffffff'
  tertiary-container: '#5b49b5'
  on-tertiary-container: '#d5ccff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b2c5ff'
  on-primary-fixed: '#001848'
  on-primary-fixed-variant: '#0040a2'
  secondary-fixed: '#8df7c1'
  secondary-fixed-dim: '#71dba6'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005235'
  tertiary-fixed: '#e5deff'
  tertiary-fixed-dim: '#c9bfff'
  on-tertiary-fixed: '#1a0063'
  on-tertiary-fixed-variant: '#4633a0'
  background: '#f9f9ff'
  on-background: '#091c35'
  surface-variant: '#d6e3ff'
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  timestamp:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max-width: 1280px
---

## Brand & Style

The brand identity is rooted in high-integrity data visualization and technical clarity. Targeted at enterprise support and technical operations, the design system evokes an emotional response of absolute reliability, precision, and calm efficiency. 

The aesthetic is **Corporate / Modern** with a lean toward **Technical Minimalism**. It prioritizes information density without clutter, using refined whitespace to separate complex data streams. The visual language suggests a "dashboard-first" mentality where every pixel serves a functional purpose, utilizing subtle geometric cues to guide the user through complex support workflows.

## Colors

The palette is anchored by a foundational **Professional Blue** (#0052CC) for primary actions and brand presence. Success states and resolved ticket indicators utilize a **Refined Green** (#00875A) to signal high-integrity completion.

- **Primary:** Deep technical blue for navigation and primary buttons.
- **Secondary:** Success green for status indicators and positive growth.
- **Tertiary:** Muted purple for metadata, categories, and secondary tags.
- **Neutral:** A range of slate grays (#091E42 to #F4F5F7) provides the structural framework, ensuring data remains the focal point.
- **Support-Specific Tones:** Use high-chroma, low-luminance versions of these colors for "Status Badges" to ensure WCAG AA legibility against pale backgrounds.

## Typography

This design system utilizes a tri-font hierarchy to maximize structural clarity. 

1. **Hanken Grotesk** is used for headlines to provide a sharp, contemporary professional feel.
2. **Inter** handles all body copy and user-generated content, chosen for its exceptional legibility in dense support threads.
3. **JetBrains Mono** is reserved for technical metadata, ticket IDs, and chat timestamps. This monospaced addition reinforces the "Parametric" theme, providing a rhythmic cadence to time-based data.

All technical labels and timestamps should be rendered in uppercase or tabular figures to maintain a strictly aligned grid.

## Layout & Spacing

The system employs a **Fluid Grid** based on an 8px rhythmic scale (with a 4px sub-unit for tight components). 

- **Desktop:** 12-column grid with 16px gutters. Knowledge base articles should be constrained to an 8-column center-aligned track (approx. 720px) to maximize readability.
- **Support Dashboard:** Uses a "Master-Detail" layout. The left sidebar (navigation) is fixed at 240px, the secondary list (ticket queue) is 320px, and the detail view (conversation) is fluid.
- **Mobile:** Single column with 16px side margins. 

Vertical spacing between chat bubbles is set to 8px for messages from the same sender and 16px for different senders to visually group conversation blocks.

## Elevation & Depth

To maintain a "Precision" feel, the system avoids heavy shadows. Instead, it utilizes **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Level 0:** The main application background (#F4F5F7).
- **Surface Level 1:** Primary content cards and chat bubbles, using a white background with a subtle 1px border (#DFE1E6).
- **Surface Level 2:** Floating elements (modals, dropdowns) use a very soft, highly diffused shadow (0px 4px 12px rgba(9, 30, 66, 0.08)) to indicate temporary interaction.
- **Depth in Chat:** Agent responses use a subtle blue tint (#F0F5FF) and a 1px primary-colored border on the left edge to differentiate from user messages.

## Shapes

The design system uses a **Soft** shape language (0.25rem / 4px base radius) to maintain a professional, slightly technical edge.

- **Standard Buttons & Inputs:** 4px radius.
- **Chat Bubbles:** 8px radius (rounded-lg) to distinguish conversational UI from functional UI.
- **Knowledge Base Categories:** 4px radius with icon containers utilizing a 50% (circle) radius for visual distinction.
- **Status Indicators:** Fully rounded (pill) for high visibility and immediate recognition.

## Components

### Ticket Status Indicators
Status indicators are rendered as solid-color pills.
- **Open:** Primary Blue background, White text.
- **Pending:** Amber background (#FFAB00), Dark text.
- **Resolved:** Secondary Green background, White text.
- **Critical:** Red background (#DE350B), White text.

### Chat Bubbles
Bubbles are aligned to the left (User) and right (Agent). 
- **User Bubbles:** White background, Slate-700 text, 1px Gray border.
- **Agent Bubbles:** Soft Blue (#F0F5FF) background, Primary Blue text.
- **Timestamps:** Placed outside the bubble in JetBrains Mono (timestamp role), aligned to the edge of the message.

### Knowledge Base Categories
Structured as "Card-in-Grid" components. Each category card includes:
- A 40x40px circular icon container.
- `headline-sm` for the category title.
- `body-sm` for the article count (e.g., "12 Articles").
- A 1px border that shifts to Primary Blue on hover.

### Inputs & Tables
- **Inputs:** Square-ish (4px radius) with a 2px focus ring in Primary Blue.
- **Data Tables:** Zebra-striping every second row (#FBFBFC) with JetBrains Mono used for ID columns and numeric values to ensure vertical alignment.
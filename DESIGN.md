---
name: Sacred Professionalism
colors:
  surface: '#f9f9fb'
  surface-dim: '#d9dadc'
  surface-bright: '#f9f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f5'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e4'
  on-surface: '#1a1c1d'
  on-surface-variant: '#474553'
  inverse-surface: '#2f3132'
  inverse-on-surface: '#f0f0f2'
  outline: '#787584'
  outline-variant: '#c9c4d5'
  surface-tint: '#5c4dbe'
  primary: '#1c0070'
  on-primary: '#ffffff'
  primary-container: '#311b92'
  on-primary-container: '#9c8fff'
  inverse-primary: '#c7bfff'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#0f2228'
  on-tertiary: '#ffffff'
  tertiary-container: '#25373e'
  on-tertiary-container: '#8da0a8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5deff'
  primary-fixed-dim: '#c7bfff'
  on-primary-fixed: '#180065'
  on-primary-fixed-variant: '#4433a4'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#d2e6ef'
  tertiary-fixed-dim: '#b6cad2'
  on-tertiary-fixed: '#0b1e24'
  on-tertiary-fixed-variant: '#374951'
  background: '#f9f9fb'
  on-background: '#1a1c1d'
  surface-variant: '#e2e2e4'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '500'
    lineHeight: 44px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 30px
    fontWeight: '500'
    lineHeight: 38px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is crafted for an audience seeking a blend of high-end professional expertise and spiritual depth. It balances the rigor of a traditional cabinet/consultancy with the expansive, calming nature of a modern wellness practice. 

The aesthetic direction is **Modern Minimalism** infused with **Refined Editorial** elements. The UI should evoke an emotional response of clarity, wisdom, and profound trust. High-quality whitespace is prioritized to allow content to breathe, reflecting a sense of mental space and tranquility. Visual elements should feel deliberate, quiet, and premium, avoiding unnecessary decoration in favor of meaningful structural elegance.

## Colors

The palette is anchored by a deep, intellectual indigo that bridges the gap between traditional corporate trust and spiritual depth.

- **Primary (Deep Indigo):** Used for key brand moments, headers, and primary actions. It represents authority and the subconscious.
- **Secondary (Muted Gold):** Reserved for delicate accents, borders, and specialized high-intent calls to action. It introduces a "high-end" and "sacred" quality without appearing gaudy.
- **Tertiary (Ether Blue):** Used for light backgrounds, secondary containers, and information-heavy sections to maintain a sense of lightness.
- **Surface & Background:** Predominantly clean white (#FFFFFF) for the primary content areas to ensure an expansive, uncluttered feel.

## Typography

This design system utilizes a high-contrast typographic pairing to signal both tradition and modernity.

- **Headlines:** Use **EB Garamond**. This serif conveys historical authority and a literary quality. It should be set with generous line-height and tight tracking for larger sizes to maintain a sophisticated editorial look.
- **Body & UI:** Use **Manrope**. A modern, geometric sans-serif that ensures legibility and professional precision. Its openness balances the classic nature of the serif headlines.
- **Labels:** Use uppercase Manrope with increased letter spacing for navigation, small badges, and categories to create a rhythmic, structured feel.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to ensure a curated, centered reading experience. Content should be contained within a 1200px max-width container, utilizing a 12-column grid.

- **Desktop-First Approach:** Start with generous vertical padding (80px - 120px) between sections to emphasize the "quiet luxury" of space.
- **Rhythm:** All spacing must be a multiple of the 8px base unit.
- **Responsive Reflow:** On tablet and mobile, margins shrink, and the grid collapses to 4 columns. Typography scales down specifically for primary headers to prevent awkward wrapping, while body text remains consistent for legibility.

## Elevation & Depth

To maintain a "high-end" and grounded feel, this design system avoids heavy shadows. Instead, it utilizes **Tonal Layers** and **Subtle Outlines**.

- **Surfaces:** Use extremely light background tints (Tertiary Ether Blue or Neutral Gray) to differentiate sections rather than lifting them with shadows.
- **Borders:** Use hairline borders (1px) in the Secondary Gold (at low opacity) or Neutral colors to define containers.
- **Shadows:** If depth is required (e.g., for dropdowns or floating buttons), use an "Ambient" style: very long blur (20px+), very low opacity (5-8%), and a slight Primary Indigo tint to the shadow color to keep it harmonious with the brand.

## Shapes

The shape language is **Soft** and structured. A 0.25rem (4px) base radius is applied to buttons and inputs to suggest precision and professionalism, while larger containers like cards may use 0.5rem (8px) for a gentler touch.

Avoid fully rounded "pill" shapes, as they appear too casual and tech-oriented for a professional cabinet. Sharp corners should also be avoided to keep the brand feeling approachable and "spiritual."

## Components

### Buttons
- **Primary:** Solid Deep Indigo fill with white Manrope text. High contrast, sharp but slightly softened corners.
- **Secondary:** Transparent background with a 1px Gold border and Gold text. Used for less urgent actions.

### Inputs & Fields
- Use "Floating Label" or "Minimal Underline" styles to keep the UI clean. 
- Active state should be signaled by a color shift to the Primary Indigo, never a heavy glow.

### Cards
- Cards should have a white background, a very thin neutral border, and no shadow.
- Content inside cards should be heavily inset (24px - 32px padding) to reinforce the luxury of space.

### Lists
- Use custom icons or "dot" indicators in Gold for list items. 
- Maintain 16px - 20px gap between list items to ensure they don't feel crowded.

### Specialized Components
- **The Divider:** A horizontal line using a subtle Gold gradient that fades out at both ends, used to separate major thematic sections.
- **The Quote Block:** Large EB Garamond italicized text, centered, with a light Ether Blue background to highlight client testimonials or spiritual insights.
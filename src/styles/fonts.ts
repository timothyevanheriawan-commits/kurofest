/**
 * KUROFEST 2026 — Typography System
 * 和モダン Design System
 */

import { Onest, DM_Sans, DM_Mono, Noto_Serif_JP } from "next/font/google";

/* ═══════════════════════════════════════════════════════════════════════════
   DISPLAY — Bebas Neue
   Tall, condensed, all-caps. Every headline becomes a statement.
   Previously: Inter (a UI/body font — wrong tool for display work)
   ═══════════════════════════════════════════════════════════════════════════ */
export const fontDisplay = Onest({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

/* ═══════════════════════════════════════════════════════════════════════════
   SANS — DM Sans
   Friendly, geometric, contemporary. Better body readability than Geist.
   Previously: Geist (a developer/code font — too technical for editorial)
   ═══════════════════════════════════════════════════════════════════════════ */
export const fontSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-sans",
});

/* ═══════════════════════════════════════════════════════════════════════════
   MONO — DM Mono
   Matches DM Sans's design language. Used for prices, codes, times.
   Previously: JetBrains Mono — referenced in globals.css but never loaded,
   causing OS-dependent fallback rendering on every monetary/data value.
   ═══════════════════════════════════════════════════════════════════════════ */
export const fontMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

/* ═══════════════════════════════════════════════════════════════════════════
   SERIF — Noto Serif JP
   Japanese kanji, vertical text, and serif accents. No change — was correct.
   Subset to only the characters actually used to cut ~95% of font payload.
   ═══════════════════════════════════════════════════════════════════════════ */
export const fontNotoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
  variable: "--font-serif",
  preload: false,
});

/**
 * KUROFEST 2026 - Typography System
 * 和モダン Design System
 */

import { Inter, Geist, Noto_Serif_JP } from "next/font/google";

/* ═══════════════════════════════════════════════════════════════════════════
   FONT DEFINITIONS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Primary sans-serif - UI and body text */
export const fontInter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/** Secondary sans-serif - Display and headings */
export const fontGeist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

/** Japanese serif - Kanji and vertical text */
export const fontNotoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
  variable: "--font-noto-serif-jp",
  preload: false, // Japanese fonts are large
});

/* ═══════════════════════════════════════════════════════════════════════════
   COMBINED VARIABLE STRING
   ═══════════════════════════════════════════════════════════════════════════ */

/** All font CSS variables combined for the <body> className */
export const fontVariables = `${fontInter.variable} ${fontGeist.variable} ${fontNotoSerifJP.variable}`;

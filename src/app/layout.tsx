import type { Metadata, Viewport } from "next";
import { fontDisplay, fontSans, fontMono, fontNotoSerifJP } from "@/styles/fonts";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Header } from "@/components/features/layout/header";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { StaticGrain } from "@/components/ui/grain-overlay";
import { CommandPalette } from "@/components/ui/command-palette";
import { cn } from "@/lib/utils";
import "@/app/globals.css";

/* ─── Metadata ──────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: "KuroFest 2026 | 黒祭",
    template: "%s | KuroFest 2026",
  },
  description:
    "Japan's premier anime and pop-culture convention. August 15–16, 2026 at Tokyo Big Sight.",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
    siteName: "KuroFest 2026",
    title: "KuroFest 2026 | 黒祭",
    description:
      "Japan's premier anime and pop-culture convention. August 15–16, 2026 at Tokyo Big Sight.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1722803921446-70be3842871e?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "KuroFest 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KuroFest 2026 | 黒祭",
    description:
      "Japan's premier anime and pop-culture convention. August 15–16, 2026 at Tokyo Big Sight.",
    images: [
      "https://images.unsplash.com/photo-1722803921446-70be3842871e?q=80&w=1200",
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

/* ─── Viewport (separate export required in Next.js 15) ─────────────────── */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Matches sumi-950 — browser chrome blends into the dark hero on mobile
  themeColor: "#0d0d11",
};

/* ─── Layout ────────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    // lang="ja" — primary content language is Japanese
    // Individual English sections don't need overrides since browsers handle
    // mixed-script content correctly; the lang attr mainly affects glyph
    // variant selection for CJK characters and screen-reader pronunciation.
    <html lang="ja">
      <body
        className={cn(
          fontDisplay.variable,
          fontSans.variable,
          fontMono.variable,
          fontNotoSerifJP.variable,
          "font-sans antialiased",
          "bg-washi-100 text-sumi-950",
          "overflow-x-hidden min-h-screen"
        )}
      >
        <CustomCursor />
        <StaticGrain opacity={0.025} />
        <CommandPalette />

        <SmoothScroll>
          <Header />
          {children}
          {modal}
        </SmoothScroll>
      </body>
    </html>
  );
}
import type { Metadata, Viewport } from "next";
import { fontDisplay, fontSans, fontMono, fontNotoSerifJP } from "@/styles/fonts";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Header } from "@/components/features/layout/header";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { StaticGrain } from "@/components/ui/grain-overlay";
import { CommandPalette } from "@/components/ui/command-palette";
import { cn } from "@/lib/utils";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "KuroFest 2026 | 黒祭",
    template: "%s | KuroFest 2026",
  },
  description: "Japan's premier anime and pop-culture convention. August 15–16, 2026 at Tokyo Big Sight.",
  // ... other metadata
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0d11", // sumi-950
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ja" className="selection:bg-shu-600 selection:text-washi-50">
      <body
        className={cn(
          fontDisplay.variable,
          fontSans.variable,
          fontMono.variable,
          fontNotoSerifJP.variable,
          "font-sans antialiased",
          "bg-washi-100 text-sumi-950",
          "min-h-screen flex flex-col"
        )}
      >
        {/* Accessibility: Keyboard users skip nav */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-shu-600 focus:text-washi-100 font-mono text-xs"
        >
          Skip to content (Content へ移動)
        </a>

        <CustomCursor />

        {/* Pointer-events-none ensures clicks go through the grain */}
        <StaticGrain opacity={0.025} className="pointer-events-none" />

        <CommandPalette />

        <SmoothScroll>
          <Header />

          <main id="main-content" className="flex-grow outline-none" tabIndex={-1}>
            {children}
          </main>

          {modal}

          {/* Footer would go here */}
        </SmoothScroll>
      </body>
    </html>
  );
}
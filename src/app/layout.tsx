import type { Metadata } from "next";
import { fontInter, fontGeist, fontNotoSerifJP } from "@/styles/fonts";
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
  description:
    "Japan's premier anime and pop-culture convention. August 15-16, 2026 at Tokyo Big Sight.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          fontInter.variable,
          fontGeist.variable,
          fontNotoSerifJP.variable,
          "font-sans antialiased",
          "bg-washi-100 text-sumi-950",
          "overflow-x-hidden min-h-screen"
        )}
      >
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Grain Overlay */}
        <StaticGrain opacity={0.025} />

        {/* Command Palette */}
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
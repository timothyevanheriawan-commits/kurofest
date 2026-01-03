import type { Metadata } from "next";
import { TicketFlow } from "@/components/features/tickets/ticket-flow";
import { Footer } from "@/components/features/layout/footer";

export const metadata: Metadata = {
    title: "Tickets",
    description: "Secure your pass to KuroFest 2026",
};

export default function TicketPage() {
    return (
        <>
            <main className="min-h-screen bg-washi-100 px-4 pt-28 pb-24 md:px-8">
                {/* Background Pattern - CLEANED UP */}
                <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
                    {/* Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, #1a1a1a 1px, transparent 1px),
                                linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
                            `,
                            backgroundSize: "40px 40px",
                        }}
                    />

                    {/* Subtle Accent Circle (Kept, but moved slightly for balance) */}
                    <div className="absolute top-32 right-[5%] w-64 h-64 rounded-full bg-shu-600/5 blur-3xl" />

                    {/* REMOVED: Bottom gradient fade to ensure clean paper look */}
                </div>

                {/* Content */}
                <div className="relative z-10 mx-auto max-w-lg">
                    <header className="mb-10 flex flex-col items-center text-center">
                        <div className="mb-6 w-px h-12 bg-sumi-300" />

                        <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase pl-[0.4em]">
                            Phase 1 Sales
                        </span>

                        <h1 className="mt-3 font-display text-4xl md:text-5xl font-black tracking-tight text-sumi-950">
                            Secure Your Pass
                        </h1>

                        {/* OPTICAL CENTER FIX: tracking-widest + left padding */}
                        <p className="mt-2 font-serif text-lg text-sumi-500 tracking-widest pl-[0.2em]">
                            入場券を確保する
                        </p>

                        {/* REFINED BADGE: Matches the TicketFlow border style */}
                        <div className="mt-8 flex items-center gap-3 px-4 py-2 border border-sumi-950 bg-washi-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-shu-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-shu-600"></span>
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.1em] text-sumi-950 uppercase">
                                Early Bird Ends July 31
                            </span>
                        </div>
                    </header>

                    <TicketFlow />

                    <p className="mt-8 text-center text-xs text-sumi-400 font-mono">
                        All sales are final. Please review our{" "}
                        <a
                            href="#"
                            className="underline underline-offset-4 decoration-sumi-300 hover:text-sumi-950 hover:decoration-sumi-950 transition-all"
                        >
                            terms &amp; conditions
                        </a>
                        .
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}
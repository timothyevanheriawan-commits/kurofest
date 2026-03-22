import type { Metadata } from "next";
import { GuestGrid } from "@/components/features/guests/guest-grid";
import { Footer } from "@/components/features/layout/footer";

export const metadata: Metadata = {
    title: "Guests",
    description: "Meet the special guests of KuroFest 2026",
};

export default function GuestsPage() {
    return (
        <>
            <main className="min-h-screen bg-washi-100 px-4 pt-28 pb-24 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <header className="mb-12 md:mb-16 flex gap-6 items-start">
                        {/* Vertical accent rule */}
                        <div className="hidden md:block w-px self-stretch bg-sumi-200 shrink-0 mt-1" />

                        <div>
                            <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase">
                                特別ゲスト
                            </span>
                            <h1 className="mt-2 font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-sumi-950">
                                Special Guests
                            </h1>
                            <div className="mt-4 w-16 h-0.5 bg-shu-600" />
                        </div>
                    </header>

                    <GuestGrid />
                </div>
            </main>

            <Footer />
        </>
    );
}
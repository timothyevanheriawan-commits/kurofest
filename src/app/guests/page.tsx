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
                    {/* Page Header */}
                    <header className="mb-12 md:mb-16">
                        <div className="mb-6 w-px h-12 bg-sumi-300 mx-auto md:mx-0" />

                        <span className="block text-center md:text-left text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase">
                            Featured Artists & Performers
                        </span>

                        <h1 className="mt-3 text-center md:text-left font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-sumi-950">
                            Special Guests
                        </h1>

                        <p className="mt-2 text-center md:text-left font-serif text-xl md:text-2xl text-sumi-400">
                            特別ゲスト
                        </p>

                        <div className="mt-6 w-24 h-0.5 bg-shu-600 mx-auto md:mx-0" />

                        <p className="mt-6 text-center md:text-left text-sm text-sumi-600 max-w-xl">
                            Meet the incredible artists, performers, and creators joining us at KuroFest 2026.
                            From award-winning cosplayers to legendary voice actors.
                        </p>
                    </header>

                    {/* Guest Grid */}
                    <GuestGrid />
                </div>
            </main>

            <Footer />
        </>
    );
}
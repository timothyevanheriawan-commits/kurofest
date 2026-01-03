import type { Metadata } from "next";
import { NewsGrid } from "@/components/features/news/news-grid";
import { Footer } from "@/components/features/layout/footer";

export const metadata: Metadata = {
    title: "News",
    description: "Latest announcements and updates from KuroFest 2026",
};

export default function NewsPage() {
    return (
        <>
            <main className="min-h-screen bg-washi-100 px-4 pt-28 pb-24 md:px-8">
                <div className="mx-auto max-w-5xl">
                    {/* Header Container: Flex Column + Center Items */}
                    <header className="mb-12 flex flex-col items-center justify-center text-center">

                        {/* Top Line */}
                        <div className="mb-6 w-px h-12 bg-sumi-300" />

                        {/* Subtitle */}
                        <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase pl-[0.4em]">
                            Latest Updates
                        </span>

                        {/* Main Title */}
                        <h1 className="mt-3 font-display text-5xl md:text-6xl font-black tracking-tight text-sumi-950">
                            News
                        </h1>

                        {/* Japanese Title - OPTICAL FIX */}
                        {/* 'pl-[0.2em]' balances the 'tracking-widest' so it looks perfectly centered */}
                        <p className="mt-2 font-serif text-2xl text-sumi-400 tracking-widest pl-[0.2em]">
                            お知らせ
                        </p>

                        {/* Red Accent Line */}
                        <div className="mt-6 w-16 h-0.5 bg-shu-600" />

                        {/* Description */}
                        <p className="mt-6 text-sm text-sumi-600 max-w-md leading-relaxed">
                            Stay up to date with the latest announcements, guest reveals, and event updates.
                        </p>
                    </header>

                    <NewsGrid />
                </div>
            </main>

            <Footer />
        </>
    );
}
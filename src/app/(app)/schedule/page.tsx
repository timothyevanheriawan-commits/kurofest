import type { Metadata } from "next";
import { ScheduleView } from "@/components/features/schedule/schedule-view";
import { Footer } from "@/components/features/layout/footer";

export const metadata: Metadata = {
    title: "Schedule",
    description: "Full event timetable for KuroFest 2026",
};

export default function SchedulePage() {
    return (
        <>
            <main className="min-h-screen bg-washi-100 px-4 pt-24 pb-24 md:px-8">
                <div className="mx-auto max-w-4xl">
                    {/* Compact header — content is what matters here */}
                    <header className="mb-10 flex items-end justify-between gap-6 border-b-2 border-sumi-950 pb-6">
                        <div>
                            <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase">
                                Event Programme
                            </span>
                            <h1 className="mt-1 font-display text-4xl md:text-5xl font-black tracking-tight text-sumi-950">
                                Timetable
                            </h1>
                            <p className="mt-1 font-serif text-lg text-sumi-400">予定表</p>
                        </div>

                        {/* Date + venue — right-aligned, compact */}
                        <div className="shrink-0 text-right hidden sm:block">
                            <span className="block font-mono text-xs text-sumi-500 tracking-wider">
                                Aug 15–16, 2026
                            </span>
                            <span className="block text-xs text-sumi-400 mt-1">
                                Tokyo Big Sight
                            </span>
                        </div>
                    </header>

                    <ScheduleView />
                </div>
            </main>

            <Footer />
        </>
    );
}
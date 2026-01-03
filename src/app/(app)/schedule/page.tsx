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
            <main className="min-h-screen bg-washi-100 px-4 pt-28 pb-24 md:px-8">
                <div className="mx-auto max-w-4xl">
                    <header className="mb-12 text-center">
                        <div className="mx-auto mb-6 w-px h-12 bg-sumi-300" />

                        <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase">
                            Event Programme
                        </span>

                        <h1 className="mt-3 font-display text-5xl md:text-7xl font-black tracking-tight text-sumi-950">
                            Timetable
                        </h1>

                        <p className="mt-2 font-serif text-2xl text-sumi-400">予定表</p>

                        <div className="mt-6 mx-auto w-16 h-0.5 bg-shu-600" />

                        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-sumi-500">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-sumi-400" />
                                <span>Tokyo Big Sight</span>
                            </div>
                            <div className="w-px h-4 bg-sumi-300" />
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-shu-600" />
                                <span className="font-mono">Aug 15-16, 2026</span>
                            </div>
                        </div>
                    </header>

                    <ScheduleView />
                </div>
            </main>

            <Footer />
        </>
    );
}
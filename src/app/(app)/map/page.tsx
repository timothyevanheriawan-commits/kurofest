import type { Metadata } from "next";
import { MapViewer } from "@/components/features/map/map-viewer";
import { Footer } from "@/components/features/layout/footer";

export const metadata: Metadata = {
    title: "Venue Map",
    description: "Interactive floor plan of KuroFest 2026 at Tokyo Big Sight",
};

const LEGEND = [
    { color: "bg-shu-600", label: "Stage", labelJa: "ステージ" },
    { color: "bg-sumi-950", label: "Booth", labelJa: "ブース" },
    { color: "bg-sumi-600", label: "Food", labelJa: "飲食" },
    { color: "bg-sumi-400", label: "Rest Area", labelJa: "休憩所" },
    { color: "bg-sumi-700", label: "Entrance", labelJa: "入口" },
] as const;

export default function MapPage() {
    return (
        <>
            <main className="min-h-screen bg-washi-100 px-4 pt-24 pb-16 md:px-8">
                <div className="mx-auto max-w-7xl">

                    {/* Page header — consistent with other pages, no right-side column */}
                    <header className="mb-8 border-b-2 border-sumi-950 pb-6 flex items-end justify-between gap-6">
                        <div>
                            <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase">
                                Navigation
                            </span>
                            <h1 className="mt-1 font-display text-4xl md:text-5xl font-black tracking-tight text-sumi-950">
                                Venue Map
                            </h1>
                            <p className="mt-1 font-serif text-lg text-sumi-400">会場案内図</p>
                        </div>

                        <div className="shrink-0 text-right hidden sm:block">
                            <span className="block font-mono text-xs text-sumi-500 tracking-wider">
                                Tokyo Big Sight
                            </span>
                            <span className="block text-xs text-sumi-400 mt-1">
                                East Hall 1–8
                            </span>
                        </div>
                    </header>

                    {/* Map viewer */}
                    <MapViewer />

                    {/* Unified legend + tips strip — one component, not two */}
                    <div className="mt-0 border-2 border-t-0 border-sumi-950 bg-washi-50">
                        <div className="flex flex-col md:flex-row md:items-stretch divide-y-2 md:divide-y-0 md:divide-x-2 divide-sumi-950">

                            {/* Legend */}
                            <div className="flex-1 px-5 py-4">
                                <span className="text-[10px] font-semibold tracking-[0.2em] text-sumi-400 uppercase block mb-3">
                                    凡例 / Legend
                                </span>
                                <div className="flex flex-wrap gap-x-6 gap-y-2">
                                    {LEGEND.map((item) => (
                                        <div key={item.label} className="flex items-center gap-2">
                                            <div className={`w-3 h-3 shrink-0 ${item.color}`} />
                                            <span className="text-xs font-semibold text-sumi-800">
                                                {item.label}
                                            </span>
                                            <span className="text-[10px] font-serif text-sumi-400">
                                                {item.labelJa}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tips — inline, no separate box */}
                            <div className="px-5 py-4 md:w-64 shrink-0">
                                <span className="text-[10px] font-semibold tracking-[0.2em] text-sumi-400 uppercase block mb-3">
                                    Tips
                                </span>
                                <ul className="space-y-1.5 text-xs text-sumi-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-shu-600 shrink-0 mt-0.5">—</span>
                                        <span>Drag to pan around the venue</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-shu-600 shrink-0 mt-0.5">—</span>
                                        <span>Pinch or use +/– to zoom</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-shu-600 shrink-0 mt-0.5">—</span>
                                        <span>Tap markers for details</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
}
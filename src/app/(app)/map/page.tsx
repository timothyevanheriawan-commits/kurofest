import type { Metadata } from "next";
import { MapViewer } from "@/components/features/map/map-viewer";
import { Footer } from "@/components/features/layout/footer";

export const metadata: Metadata = {
    title: "Venue Map",
    description: "Interactive floor plan of KuroFest 2026 at Tokyo Big Sight",
};

export default function MapPage() {
    return (
        <>
            <main className="min-h-screen bg-washi-100 px-4 pt-28 pb-16 md:px-8">
                <div className="mx-auto max-w-7xl">
                    <header className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase">
                                Navigation
                            </span>

                            <h1 className="mt-2 font-display text-4xl md:text-5xl font-black tracking-tight text-sumi-950">
                                Venue Map
                            </h1>

                            <p className="mt-1 font-serif text-lg text-sumi-400">会場案内図</p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-sumi-500">
                            <span>Tokyo Big Sight</span>
                            <div className="w-px h-4 bg-sumi-300" />
                            <span>East Hall 1-8</span>
                        </div>
                    </header>

                    <MapViewer />

                    {/* Legend */}
                    <div className="mt-6 p-5 border-2 border-sumi-200 bg-washi-50">
                        <h2 className="text-[10px] font-semibold tracking-[0.2em] text-sumi-400 uppercase mb-4">
                            Legend / 凡例
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { color: "bg-shu-600", label: "Stage", labelJa: "ステージ" },
                                { color: "bg-sumi-950", label: "Booth", labelJa: "ブース" },
                                { color: "bg-sumi-600", label: "Food", labelJa: "飲食" },
                                { color: "bg-sumi-400", label: "Rest Area", labelJa: "休憩所" },
                                { color: "bg-sumi-700", label: "Entrance", labelJa: "入口" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-3">
                                    <div className={`w-4 h-4 ${item.color} border border-washi-100`} />
                                    <div>
                                        <span className="text-xs font-semibold text-sumi-950 block">
                                            {item.label}
                                        </span>
                                        <span className="text-[10px] font-serif text-sumi-400">
                                            {item.labelJa}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="mt-6 p-5 border border-sumi-200">
                        <h2 className="text-[10px] font-semibold tracking-[0.2em] text-sumi-400 uppercase mb-3">
                            Tips
                        </h2>
                        <ul className="grid md:grid-cols-3 gap-4 text-sm text-sumi-600">
                            <li className="flex items-start gap-2">
                                <span className="text-shu-600">•</span>
                                <span>Drag the map to pan around the venue</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-shu-600">•</span>
                                <span>Use +/- buttons or pinch to zoom</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-shu-600">•</span>
                                <span>Tap markers for location details</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
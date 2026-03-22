import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-washi-100 p-6 relative overflow-hidden">
            {/* Background Texture/Grain would be here globally */}

            <div className="bg-white border-2 border-sumi-950 p-12 md:p-20 relative max-w-2xl w-full text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                {/* Decorative Corners */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-sumi-950" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-sumi-950" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-sumi-950" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-sumi-950" />

                {/* Content */}
                <div className="space-y-8">
                    <div className="flex flex-col items-center gap-4">
                        <span className="font-serif text-sumi-400 text-lg tracking-widest">エラー 404</span>
                        <h1 className="font-display text-8xl md:text-9xl font-black text-sumi-950 leading-none">
                            404
                        </h1>
                        <div className="w-16 h-1 bg-shu-600 my-2" />
                        <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-sumi-950">
                            Page Not Found
                        </h2>
                    </div>

                    <p className="font-serif text-sumi-600 text-lg leading-relaxed max-w-md mx-auto">
                        The content you are looking for seems to have drifted away into the void.
                    </p>

                    <div className="pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-sumi-950 text-washi-100 text-xs font-bold uppercase tracking-[0.2em] hover:bg-shu-600 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Return Home
                        </Link>
                    </div>
                </div>

                {/* Decorative ID */}
                <span className="absolute bottom-4 right-6 text-[10px] font-mono text-sumi-300">
                    ERR_ID: PAGE_MISSING
                </span>
            </div>
        </main>
    );
}
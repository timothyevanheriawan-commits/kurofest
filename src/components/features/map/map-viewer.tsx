"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X, RotateCcw } from "lucide-react";
import { VenueSVG } from "./venue-svg";
import { MAP_NODES, NODE_TYPE_CONFIG, MapNode } from "@/components/features/map/map-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { EASING } from "@/lib/motion-config";

export function MapViewer() {
    // Fix: separate ref for the viewport (constraint boundary) vs the draggable canvas
    const viewportRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [activeNode, setActiveNode] = useState<MapNode | null>(null);

    // Set initial scale on mount for mobile
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            requestAnimationFrame(() => setScale(0.8));
        }
    }, []);

    const handleZoom = (dir: "in" | "out") =>
        setScale((prev) => Math.min(Math.max(prev + (dir === "in" ? 0.25 : -0.25), 0.5), 3));

    return (
        <div
            ref={viewportRef}
            className={cn(
                "relative h-[72vh] md:h-[78vh] w-full overflow-hidden",
                "bg-washi-100 border-2 border-sumi-950"
            )}
        >
            {/* ── Zoom controls ───────────────────────────────────────────── */}
            <div className="absolute right-4 top-4 z-20 border-2 border-sumi-950 bg-washi-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <button
                    onClick={() => handleZoom("in")}
                    disabled={scale >= 3}
                    aria-label="Zoom in"
                    className={cn(
                        "w-11 h-11 flex items-center justify-center",
                        "border-b-2 border-sumi-950",
                        "hover:bg-sumi-100 active:bg-sumi-200 transition-colors",
                        "disabled:opacity-30 disabled:cursor-not-allowed"
                    )}
                >
                    <Plus size={18} strokeWidth={2.5} />
                </button>

                <div className="h-9 flex items-center justify-center bg-sumi-50 border-b-2 border-sumi-950 font-mono text-xs font-bold text-sumi-600 px-2">
                    {Math.round(scale * 100)}%
                </div>

                <button
                    onClick={() => handleZoom("out")}
                    disabled={scale <= 0.5}
                    aria-label="Zoom out"
                    className={cn(
                        "w-11 h-11 flex items-center justify-center",
                        "hover:bg-sumi-100 active:bg-sumi-200 transition-colors",
                        "disabled:opacity-30 disabled:cursor-not-allowed"
                    )}
                >
                    <Minus size={18} strokeWidth={2.5} />
                </button>
            </div>

            {/* Reset — only appears when zoomed, positioned below zoom controls */}
            <AnimatePresence>
                {scale !== 1 && (
                    <motion.button
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: EASING.expoOut }}
                        onClick={() => setScale(1)}
                        aria-label="Reset zoom"
                        className={cn(
                            "absolute right-4 z-20",
                            "w-11 h-11 flex items-center justify-center",
                            "border-2 border-sumi-950 bg-washi-100",
                            "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                            "hover:bg-sumi-100 transition-colors"
                        )}
                        // Dynamically positioned just below the zoom stack (4 + 11+9+11 = 35 * 4px = 140px + border)
                        style={{ top: "calc(1rem + 130px + 0.5rem)" }}
                    >
                        <RotateCcw size={14} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── Draggable canvas ─────────────────────────────────────────── */}
            {/* Fix: dragConstraints refs the viewport div (parent), not the draggable itself */}
            <motion.div
                drag
                dragConstraints={viewportRef}
                dragElastic={0.08}
                dragMomentum={false}
                animate={{ scale }}
                transition={{ duration: 0.35, ease: EASING.expoOut }}
                className="flex h-full w-full items-center justify-center cursor-grab active:cursor-grabbing"
            >
                <div className="relative aspect-square w-[150vh] max-w-[1200px]">
                    <VenueSVG />

                    {MAP_NODES.map((node) => {
                        const config = NODE_TYPE_CONFIG[node.type];
                        const isActive = activeNode?.id === node.id;

                        return (
                            <motion.button
                                key={node.id}
                                onClick={() => setActiveNode(isActive ? null : node)}
                                aria-label={node.label}
                                className={cn(
                                    "absolute w-10 h-10 -ml-5 -mt-5 md:w-8 md:h-8 md:-ml-4 md:-mt-4",
                                    "flex items-center justify-center",
                                    "border-2 border-washi-100",
                                    "shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]",
                                    "transition-all duration-200",
                                    isActive && "scale-125 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]"
                                )}
                                style={{
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                    // Fix: use color directly — it's already a hex value in map-data.ts
                                    backgroundColor: config.color,
                                }}
                                whileHover={{ scale: isActive ? 1.25 : 1.15 }}
                                whileTap={{ scale: 0.92 }}
                            >
                                {/* Pulse ring on stage nodes */}
                                {node.type === "stage" && !isActive && (
                                    <span
                                        className="absolute inset-0 animate-ping opacity-25 rounded-none"
                                        style={{ backgroundColor: config.color }}
                                    />
                                )}
                                <span className="w-2 h-2 bg-washi-100 shrink-0" />
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* ── Node info panel ──────────────────────────────────────────── */}
            <AnimatePresence>
                {activeNode && (() => {
                    const config = NODE_TYPE_CONFIG[activeNode.type];
                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 16, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 16, x: "-50%" }}
                            transition={{ duration: 0.25, ease: EASING.expoOut }}
                            className={cn(
                                "absolute bottom-4 left-1/2",
                                "w-[calc(100%-2rem)] max-w-sm z-30",
                                "bg-washi-100 border-2 border-sumi-950",
                                "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                            )}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between p-4 border-b-2 border-sumi-200">
                                <div>
                                    <span
                                        className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                                        style={{ color: config.color }}
                                    >
                                        {config.label}
                                    </span>
                                    <h3 className="mt-1 font-display text-xl font-bold text-sumi-950">
                                        {activeNode.label}
                                    </h3>
                                    <p className="font-serif text-sm text-sumi-400">
                                        {activeNode.label_ja}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActiveNode(null)}
                                    aria-label="Close"
                                    className="w-9 h-9 flex items-center justify-center border-2 border-sumi-200 hover:bg-sumi-950 hover:text-washi-100 hover:border-sumi-950 transition-colors"
                                >
                                    <X size={14} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-4">
                                <p className="text-sm text-sumi-600 leading-relaxed">
                                    {activeNode.description}
                                </p>

                                {/* Fix: "View Schedule" now actually links to /schedule */}
                                <div className="mt-4 flex gap-2">
                                    <Link
                                        href="/schedule"
                                        className={cn(
                                            "flex-1 py-2.5 text-center",
                                            "bg-sumi-950 text-washi-100",
                                            "text-[10px] font-semibold tracking-[0.15em] uppercase",
                                            "hover:bg-shu-600 transition-colors"
                                        )}
                                    >
                                        View Schedule
                                    </Link>
                                    {/* Fix: "Directions" removed — no maps integration exists.
                                        Replaced with a close action that's actually useful. */}
                                    <button
                                        onClick={() => setActiveNode(null)}
                                        className={cn(
                                            "px-4 py-2.5",
                                            "border-2 border-sumi-200 text-sumi-600",
                                            "text-[10px] font-semibold tracking-[0.15em] uppercase",
                                            "hover:border-sumi-950 hover:text-sumi-950 transition-colors"
                                        )}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
}
"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X, Navigation } from "lucide-react";
import { VenueSVG } from "./venue-svg";
import { MAP_NODES, NODE_TYPE_CONFIG, MapNode } from "@/components/features/map/map-data";
import { cn } from "@/lib/utils";

export function MapViewer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [activeNode, setActiveNode] = useState<MapNode | null>(null);

    const handleZoom = (direction: "in" | "out") => {
        setScale((prev) => {
            const newScale = direction === "in" ? prev + 0.25 : prev - 0.25;
            return Math.min(Math.max(newScale, 0.5), 3);
        });
    };

    const resetView = () => {
        setScale(1);
    };

    return (
        <div
            className={cn(
                "relative h-[75vh] md:h-[80vh] w-full overflow-hidden",
                "bg-washi-100",
                "border-2 border-sumi-950"
            )}
        >
            {/* ─────────────────────────────────────────────────────────────────────
          HEADER BAR
          ───────────────────────────────────────────────────────────────────── */}
            <div
                className={cn(
                    "absolute top-0 left-0 right-0 z-20",
                    "h-12 px-4",
                    "flex items-center justify-between",
                    "bg-washi-100 border-b-2 border-sumi-950"
                )}
            >
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-sumi-500 uppercase">
                        Interactive Map
                    </span>
                    <div className="w-px h-4 bg-sumi-300" />
                    <span className="font-serif text-sm text-sumi-400">会場案内図</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-sumi-500">
                    <Navigation size={12} />
                    <span className="font-mono">Drag to pan</span>
                </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────────────
          ZOOM CONTROLS - Industrial Style
          ───────────────────────────────────────────────────────────────────── */}
            <div
                className={cn(
                    "absolute right-4 top-16 z-20",
                    "border-2 border-sumi-950 bg-washi-100",
                    "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                )}
            >
                <button
                    onClick={() => handleZoom("in")}
                    disabled={scale >= 3}
                    className={cn(
                        "w-12 h-12 flex items-center justify-center",
                        "border-b-2 border-sumi-950",
                        "transition-all duration-150",
                        "hover:bg-sumi-100",
                        "active:translate-y-0.5 active:bg-sumi-200",
                        "disabled:opacity-30 disabled:cursor-not-allowed disabled:active:translate-y-0"
                    )}
                    aria-label="Zoom in"
                >
                    <Plus size={20} strokeWidth={2.5} />
                </button>

                {/* Zoom level readout */}
                <div
                    className={cn(
                        "h-10 flex items-center justify-center",
                        "border-b-2 border-sumi-950",
                        "bg-sumi-100",
                        "font-mono text-sm font-bold text-sumi-700"
                    )}
                >
                    {Math.round(scale * 100)}%
                </div>

                <button
                    onClick={() => handleZoom("out")}
                    disabled={scale <= 0.5}
                    className={cn(
                        "w-12 h-12 flex items-center justify-center",
                        "transition-all duration-150",
                        "hover:bg-sumi-100",
                        "active:translate-y-0.5 active:bg-sumi-200",
                        "disabled:opacity-30 disabled:cursor-not-allowed disabled:active:translate-y-0"
                    )}
                    aria-label="Zoom out"
                >
                    <Minus size={20} strokeWidth={2.5} />
                </button>
            </div>

            {/* Reset button */}
            {scale !== 1 && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={resetView}
                    className={cn(
                        "absolute right-4 top-[220px] z-20",
                        "px-3 py-2",
                        "border-2 border-sumi-950 bg-washi-100",
                        "text-[10px] font-semibold tracking-[0.15em] uppercase",
                        "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                        "hover:bg-sumi-100 active:translate-y-0.5"
                    )}
                >
                    Reset
                </motion.button>
            )}

            {/* ─────────────────────────────────────────────────────────────────────
          DRAGGABLE CANVAS
          ───────────────────────────────────────────────────────────────────── */}
            <motion.div
                ref={containerRef}
                drag
                dragConstraints={containerRef}
                dragElastic={0.1}
                animate={{ scale }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className={cn(
                    "flex h-full w-full items-center justify-center",
                    "cursor-grab active:cursor-grabbing",
                    "pt-12"
                )}
            >
                <div className="relative aspect-square w-[150vh] max-w-[1200px]">
                    <VenueSVG />

                    {/* Map Node Markers */}
                    {MAP_NODES.map((node) => {
                        const config = NODE_TYPE_CONFIG[node.type];
                        const isActive = activeNode?.id === node.id;

                        return (
                            <motion.button
                                key={node.id}
                                onClick={() => setActiveNode(isActive ? null : node)}
                                className={cn(
                                    "absolute",
                                    "w-8 h-8 -ml-4 -mt-4",
                                    "flex items-center justify-center",
                                    "border-2 border-washi-100",
                                    "transition-all duration-300",
                                    "shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]",
                                    isActive && "scale-125 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]"
                                )}
                                style={{
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                    backgroundColor: config.color.replace("var(--color-", "").replace(")", ""),
                                }}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={node.label}
                            >
                                {/* Pulse animation for stages */}
                                {node.type === "stage" && !isActive && (
                                    <span
                                        className="absolute inset-0 animate-ping opacity-30"
                                        style={{ backgroundColor: config.color.replace("var(--color-", "").replace(")", "") }}
                                    />
                                )}

                                {/* Inner marker */}
                                <span className="w-2 h-2 bg-washi-100" />
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* ─────────────────────────────────────────────────────────────────────
          NODE INFO PANEL
          ───────────────────────────────────────────────────────────────────── */}
            <AnimatePresence>
                {activeNode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                        className={cn(
                            "absolute bottom-4 left-1/2",
                            "w-[calc(100%-2rem)] max-w-md",
                            "z-30",
                            "bg-washi-100 border-2 border-sumi-950",
                            "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between p-4 border-b-2 border-sumi-200">
                            <div>
                                <span
                                    className="text-[10px] font-semibold tracking-[0.15em] uppercase"
                                    style={{ color: NODE_TYPE_CONFIG[activeNode.type].color.replace("var(--color-", "").replace(")", "") }}
                                >
                                    {NODE_TYPE_CONFIG[activeNode.type].label}
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
                                className={cn(
                                    "w-10 h-10 flex items-center justify-center",
                                    "border-2 border-sumi-950",
                                    "transition-colors duration-300",
                                    "hover:bg-sumi-950 hover:text-washi-100"
                                )}
                                aria-label="Close"
                            >
                                <X size={16} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <p className="text-sm text-sumi-600 leading-relaxed">
                                {activeNode.description}
                            </p>

                            <div className="mt-4 flex gap-3">
                                <button
                                    className={cn(
                                        "flex-1 py-3",
                                        "bg-sumi-950 text-washi-100",
                                        "text-[10px] font-semibold tracking-[0.15em] uppercase",
                                        "transition-colors duration-300",
                                        "hover:bg-shu-600"
                                    )}
                                >
                                    View Schedule
                                </button>
                                <button
                                    className={cn(
                                        "px-4 py-3",
                                        "border-2 border-sumi-950 text-sumi-950",
                                        "text-[10px] font-semibold tracking-[0.15em] uppercase",
                                        "transition-colors duration-300",
                                        "hover:bg-sumi-950 hover:text-washi-100"
                                    )}
                                >
                                    Directions
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
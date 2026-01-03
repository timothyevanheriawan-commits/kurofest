"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getScheduleByDay } from "@/lib/mock-schedule";
import { ScheduleCard } from "./schedule-card";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   MOTION CONFIGURATION
   ═══════════════════════════════════════════════════════════════════════════ */

const easing = {
    expoOut: [0.19, 1, 0.22, 1] as const,
};

const duration = {
    fast: 0.3,
    normal: 0.5,
};

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export function ScheduleView() {
    const [activeDay, setActiveDay] = useState<1 | 2>(1);

    const filteredEvents = getScheduleByDay(activeDay);

    return (
        <div className="mx-auto max-w-3xl">
            {/* ─────────────────────────────────────────────────────────────────────
          DAY SWITCHER
          ───────────────────────────────────────────────────────────────────── */}
            <div className="sticky top-20 z-30 py-4 bg-washi-100">
                <div className="flex border-2 border-sumi-950">
                    {([1, 2] as const).map((day) => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={cn(
                                "relative flex-1 py-4",
                                "transition-colors duration-300",
                                activeDay === day
                                    ? "bg-sumi-950 text-washi-100"
                                    : "bg-washi-100 text-sumi-600 hover:text-sumi-950"
                            )}
                            style={{ transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)" }}
                        >
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
                                    {day === 1 ? "Saturday" : "Sunday"}
                                </span>
                                <span className="font-display text-2xl font-bold">
                                    Day {day}
                                </span>
                                <span className="font-serif text-sm opacity-60">
                                    {day === 1 ? "八月十五日" : "八月十六日"}
                                </span>
                            </div>

                            {/* Active indicator line */}
                            {activeDay === day && (
                                <motion.div
                                    layoutId="day-indicator"
                                    transition={{ duration: duration.fast, ease: easing.expoOut }}
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-shu-600"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────────────
          SCHEDULE TIMELINE
          ───────────────────────────────────────────────────────────────────── */}
            <div className="mt-8 min-h-[50vh]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeDay}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.08,
                                    delayChildren: 0.1,
                                },
                            },
                        }}
                    >
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((item) => (
                                <ScheduleCard key={item.id} item={item} />
                            ))
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-sumi-400">No events scheduled for this day.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ─────────────────────────────────────────────────────────────────────
          FOOTER NOTE
          ───────────────────────────────────────────────────────────────────── */}
            <div className="mt-12 py-6 border-t border-sumi-200 text-center">
                <p className="text-xs text-sumi-400">
                    Schedule subject to change.{" "}
                    <span className="font-serif">予定は変更される場合があります。</span>
                </p>
            </div>
        </div>
    );
}
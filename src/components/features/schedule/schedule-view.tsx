"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getScheduleByDay, MOCK_SCHEDULE } from "@/lib/mock-schedule";
import { ScheduleCard } from "./schedule-card";
import { cn } from "@/lib/utils";
import { EASING, DURATION } from "@/lib/motion-config";

const day1Count = MOCK_SCHEDULE.filter((e) => e.day === 1).length;
const day2Count = MOCK_SCHEDULE.filter((e) => e.day === 2).length;

export function ScheduleView() {
    const [activeDay, setActiveDay] = useState<1 | 2>(1);
    const events = getScheduleByDay(activeDay);

    return (
        <div className="mx-auto max-w-3xl">
            {/* Day switcher — sticky, with event counts */}
            <div className="sticky top-20 z-30 py-4 bg-washi-100">
                <div className="flex border-2 border-sumi-950">
                    {([1, 2] as const).map((day) => {
                        const count = day === 1 ? day1Count : day2Count;
                        const isActive = activeDay === day;
                        return (
                            <button
                                key={day}
                                onClick={() => setActiveDay(day)}
                                className={cn(
                                    "relative flex-1 py-4 transition-colors duration-300",
                                    "border-r-2 border-sumi-950 last:border-r-0",
                                    isActive
                                        ? "bg-sumi-950 text-washi-100"
                                        : "bg-washi-100 text-sumi-600 hover:text-sumi-950"
                                )}
                            >
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
                                        {day === 1 ? "Saturday" : "Sunday"}
                                    </span>
                                    <span className="font-display text-2xl font-bold">
                                        Day {day}
                                    </span>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="font-serif text-sm opacity-60">
                                            {day === 1 ? "八月十五日" : "八月十六日"}
                                        </span>
                                        {/* Event count badge */}
                                        <span className={cn(
                                            "font-mono text-[10px] px-1.5 py-0.5 tracking-wide",
                                            isActive
                                                ? "bg-washi-100/20 text-washi-100/70"
                                                : "bg-sumi-100 text-sumi-500"
                                        )}>
                                            {count}
                                        </span>
                                    </div>
                                </div>

                                {isActive && (
                                    <motion.div
                                        layoutId="day-indicator"
                                        transition={{ duration: DURATION.fast, ease: EASING.expoOut }}
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-shu-600"
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Schedule timeline */}
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
                                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                            },
                        }}
                    >
                        {events.length > 0 ? (
                            events.map((item, index) => (
                                <ScheduleCard
                                    key={item.id}
                                    item={item}
                                    isLast={index === events.length - 1}
                                />
                            ))
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-sumi-400">No events scheduled for this day.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-12 py-6 border-t border-sumi-200 text-center">
                <p className="text-xs text-sumi-400">
                    Schedule subject to change.{" "}
                    <span className="font-serif">予定は変更される場合があります。</span>
                </p>
            </div>
        </div>
    );
}
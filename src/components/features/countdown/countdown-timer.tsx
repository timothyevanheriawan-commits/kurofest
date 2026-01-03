"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimeUnit {
    value: number;
    label: string;
    labelJa: string;
}

const EVENT_DATE = new Date("2026-08-15T09:00:00+09:00");

export function CountdownTimer({ className }: { className?: string }) {
    // FIX: Initialize as null. This acts as our "isMounted" check implicitly.
    const [timeLeft, setTimeLeft] = useState<TimeUnit[] | null>(null);

    useEffect(() => {
        const calculateTimeLeft = (): TimeUnit[] => {
            const now = new Date();
            const difference = EVENT_DATE.getTime() - now.getTime();

            if (difference <= 0) {
                return [
                    { value: 0, label: "Days", labelJa: "日" },
                    { value: 0, label: "Hours", labelJa: "時間" },
                    { value: 0, label: "Minutes", labelJa: "分" },
                    { value: 0, label: "Seconds", labelJa: "秒" },
                ];
            }

            return [
                {
                    value: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    label: "Days",
                    labelJa: "日",
                },
                {
                    value: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    label: "Hours",
                    labelJa: "時間",
                },
                {
                    value: Math.floor((difference / (1000 * 60)) % 60),
                    label: "Minutes",
                    labelJa: "分",
                },
                {
                    value: Math.floor((difference / 1000) % 60),
                    label: "Seconds",
                    labelJa: "秒",
                },
            ];
        };

        // Defer initial setState to the next frame to avoid synchronous state update inside the effect
        const rafId = requestAnimationFrame(() => {
            setTimeLeft(calculateTimeLeft());
        });

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => {
            cancelAnimationFrame(rafId);
            clearInterval(timer);
        };
    }, []);

    // FIX: Check if timeLeft is null. 
    // This handles the hydration mismatch by showing the skeleton during SSR and first paint.
    if (!timeLeft) {
        return (
            <div className={cn("flex gap-3 md:gap-4", className)}>
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="w-16 md:w-24 h-20 md:h-28 bg-washi-100/10 animate-pulse"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className={cn("flex gap-3 md:gap-5", className)}>
            {timeLeft.map((unit, index) => (
                <motion.div
                    key={unit.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: index * 0.1,
                        duration: 0.5,
                        ease: [0.19, 1, 0.22, 1],
                    }}
                    className="flex flex-col items-center"
                >
                    {/* Number Box */}
                    <div
                        className={cn(
                            "relative",
                            "w-16 md:w-24 h-20 md:h-28",
                            "bg-washi-100 border-2 border-washi-100", // Ensure this contrast works with your background
                            "flex items-center justify-center",
                            "overflow-hidden"
                        )}
                    >
                        {/* Animated number */}
                        <motion.span
                            key={unit.value}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                            className={cn(
                                "font-mono text-3xl md:text-5xl font-bold text-sumi-950",
                                "tabular-nums"
                            )}
                        >
                            {String(unit.value).padStart(2, "0")}
                        </motion.span>

                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-shu-600" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-shu-600" />
                    </div>

                    {/* Labels */}
                    <span className="mt-3 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-washi-100/60">
                        {unit.label}
                    </span>
                    <span className="font-serif text-sm md:text-base text-washi-100/40">
                        {unit.labelJa}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}
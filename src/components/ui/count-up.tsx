"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
    /** Numeric target, e.g. 50 for "50+" */
    to: number;
    /** Suffix appended after the number, e.g. "+" or "K+" */
    suffix?: string;
    /** Duration in seconds */
    duration?: number;
    className?: string;
}

/**
 * Animates a number from 0 to `to` when it scrolls into view.
 * Falls back to the final value instantly if prefers-reduced-motion is set.
 */
export function CountUp({ to, suffix = "", duration = 1.4, className }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const reducedMotion = useReducedMotion();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        if (reducedMotion) { setDisplay(to); return; }

        const controls = animate(0, to, {
            duration,
            ease: [0.19, 1, 0.22, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
        });

        return () => controls.stop();
    }, [isInView, to, duration, reducedMotion]);

    return (
        <span ref={ref} className={className}>
            {display}{suffix}
        </span>
    );
}
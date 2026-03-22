"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { MOCK_GUESTS } from "@/lib/mock-data";
import { GuestCard } from "./guest-card";
import { cn } from "@/lib/utils";
import { EASING } from "@/lib/motion-config";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: EASING.expoOut },
    },
};

/*
 * Span map — three breakpoint tiers:
 *
 *  mobile  (<sm)   : all cards single-column, equal height
 *  tablet  (sm–lg) : 2-column grid. "large" spans 2 cols, everything else 1 col.
 *                    "large" also spans 2 rows so it stays square/portrait.
 *  desktop (lg+)   : 4-column grid. original large/medium/small logic applies.
 *
 * This prevents the gap orphan at ~768px where a "large" card took
 * col-span-2 of a 2-col grid next to a "small" card — leaving a blank half-row.
 */
function spanClasses(span: "large" | "medium" | "small") {
    return cn({
        // desktop (lg+): original bento
        "lg:col-span-2 lg:row-span-2": span === "large",
        "lg:col-span-2 lg:row-span-1": span === "medium",
        "lg:col-span-1 lg:row-span-1": span === "small",

        // tablet (sm–lg): only large cards span both columns;
        // medium + small sit in a single column to avoid orphan gaps
        "sm:col-span-2 sm:row-span-2": span === "large",
        "sm:col-span-1 sm:row-span-1": span === "medium" || span === "small",
    });
}

export function GuestGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn(
                "grid gap-4 md:gap-6",
                // mobile: 1 col | tablet: 2 col | desktop: 4 col
                "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                // row heights: slightly shorter on tablet so the 2×2 large card
                // doesn't dominate the viewport
                "auto-rows-[300px] sm:auto-rows-[280px] md:auto-rows-[320px] lg:auto-rows-[340px]",
                "min-h-[50vh]"
            )}
        >
            {MOCK_GUESTS.map((guest, index) => (
                <motion.div
                    key={guest.id}
                    variants={itemVariants}
                    className={cn(spanClasses(guest.span), "h-full w-full")}
                >
                    <GuestCard guest={guest} index={index} />
                </motion.div>
            ))}
        </motion.div>
    );
}

export { GuestGrid as BentoGrid };
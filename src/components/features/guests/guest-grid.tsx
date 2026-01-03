"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { MOCK_GUESTS } from "@/lib/mock-data";
import { GuestCard } from "./guest-card";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   MOTION CONFIGURATION
   ═══════════════════════════════════════════════════════════════════════════ */

const containerVariants: Variants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.19, 1, 0.22, 1], // Expo Out
        },
    },
};

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export function GuestGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    // FIX: Use the hook instead of the prop. 
    // 'amount: 0.1' means trigger when just 10% of the grid is visible.
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            // FIX: Explicitly drive animation state based on hook
            animate={isInView ? "visible" : "hidden"}
            className={cn(
                "grid gap-4 md:gap-6",
                "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                "auto-rows-[350px] md:auto-rows-[400px]",
                // FIX: Add min-height to ensure the observer can find the element before content paints
                "min-h-[50vh]"
            )}
        >
            {MOCK_GUESTS.map((guest, index) => {
                const spanClass = cn({
                    "sm:col-span-2 sm:row-span-2": guest.span === "large",
                    "sm:col-span-2 sm:row-span-1": guest.span === "medium",
                    "sm:col-span-1 sm:row-span-1": guest.span === "small",
                });

                return (
                    <motion.div
                        key={guest.id}
                        variants={itemVariants}
                        className={cn(spanClass, "h-full w-full")}
                    >
                        <GuestCard guest={guest} index={index} />
                    </motion.div>
                );
            })}
        </motion.div>
    );
}

// Export alias for compatibility
export { GuestGrid as BentoGrid };
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Update your interface to include "accent"
interface MarqueeDividerProps {
    items: string[];
    variant?: "dark" | "light" | "accent"; // Added "accent" here
    speed?: number;
}

// In your component's return/styles logic:
const variantStyles = {
    dark: "bg-neutral-900 text-white",
    light: "bg-[#fdfcf8] text-neutral-900 border-y border-neutral-900",
    accent: "bg-[#c3002e] text-[#fdfcf8] font-black" // The new KuroFest Red style
};

export function MarqueeDivider({ items, variant = "dark", speed = 25 }: MarqueeDividerProps) {
    // Create a looped array to ensure seamless scrolling
    const content = (
        <div className="flex items-center gap-12 px-6">
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-12">
                    <span className="text-sm font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                        {item}
                    </span>
                    {/* Separator Diamond */}
                    <div className={cn(
                        "h-2 w-2 rotate-45",
                        variant === "dark" ? "bg-sumi-500" : "bg-sumi-300"
                    )} />
                </div>
            ))}
        </div>
    );

    return (
        <div
            className={cn(
                "flex w-full overflow-hidden border-y py-4 select-none",
                // Flexbox centering fix
                "items-center justify-center",
                variant === "dark"
                    ? "bg-sumi-950 text-washi-100 border-sumi-800"
                    : "bg-washi-100 text-sumi-950 border-sumi-200"
            )}
        >
            <div className="flex min-w-full flex-nowrap">
                <motion.div
                    className="flex flex-shrink-0 items-center"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {content}
                </motion.div>

                <motion.div
                    className="flex flex-shrink-0 items-center"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {content}
                </motion.div>
            </div>
        </div>
    );
}
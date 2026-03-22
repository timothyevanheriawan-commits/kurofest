"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeDividerProps {
    items: string[];
    variant?: "dark" | "light" | "accent";
    speed?: number;
}

const variantStyles = {
    dark: "bg-sumi-950  text-washi-100 border-sumi-800",
    light: "bg-washi-100 text-sumi-950  border-sumi-200",
    accent: "bg-shu-600   text-washi-100 border-shu-700",
};

const diamondStyles = {
    dark: "bg-sumi-500",
    light: "bg-sumi-300",
    accent: "bg-washi-100/60",
};

export function MarqueeDivider({ items, variant = "dark", speed = 25 }: MarqueeDividerProps) {
    const content = (
        <div className="flex items-center gap-12 px-6">
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-12">
                    <span className="text-sm font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                        {item}
                    </span>
                    <div className={cn("h-2 w-2 rotate-45", diamondStyles[variant])} />
                </div>
            ))}
        </div>
    );

    return (
        <div
            className={cn(
                "flex w-full overflow-hidden border-y py-4 select-none items-center",
                variantStyles[variant]
            )}
        >
            <div className="flex min-w-full flex-nowrap">
                {[0, 1].map((i) => (
                    <motion.div
                        key={i}
                        className="flex flex-shrink-0 items-center"
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                    >
                        {content}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Guest, ROLE_LABELS } from "@/lib/mock-data";
import type { Easing } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO: Easing = [0.19, 1, 0.22, 1];

const imageVariants = {
    rest: {
        scale: 1.05,
        filter: "grayscale(100%)",
    },
    hover: {
        scale: 1,
        filter: "grayscale(0%)",
        transition: {
            duration: 0.6,
            ease: EASE_OUT_EXPO,
        },
    },
};

const redSunVariants = {
    rest: {
        scale: 0,
        opacity: 0,
    },
    hover: {
        scale: 2.5,
        opacity: 0.75,
        transition: {
            duration: 0.7,
            ease: EASE_OUT_EXPO,
        },
    },
};

const textSlideVariants = {
    rest: { y: 0 },
    hover: {
        y: -4,
        transition: { duration: 0.4, ease: EASE_OUT_EXPO },
    },
};

const taglineVariants = {
    rest: { opacity: 0, y: 10 },
    hover: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.05 },
    },
};

const verticalTextVariants = {
    rest: { opacity: 0.4, x: 8 },
    hover: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: EASE_OUT_EXPO },
    },
};

interface GuestCardProps {
    guest: Guest;
    index?: number;
}

export const GuestCard = memo(function GuestCard({
    guest,
    index = 0,
}: GuestCardProps) {
    const prefersReducedMotion = useReducedMotion();
    const roleLabel = ROLE_LABELS[guest.role];

    // Prioritize first 4 images for instant loading (LCP fix)
    const shouldPrioritize = parseInt(guest.id) <= 4;

    return (
        <Link
            href={`/guests/${guest.slug}`}
            scroll={false}
            className="block h-full w-full focus-visible:outline-offset-4"
        >
            {/* 
               SYNC FIX: Only putting layoutId on the main container 
               Nested layoutIds often cause breaking/missing animations in complex grids
            */}
            <motion.article
                layoutId={`card-${guest.id}`}
                initial="rest"
                whileHover={prefersReducedMotion ? undefined : "hover"}
                animate="rest"
                className={cn(
                    "group relative h-full w-full overflow-hidden",
                    "bg-washi-200",
                    "border-2 border-sumi-200",
                    "transition-all duration-500",
                    "hover:border-sumi-950 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                    // Performance hint
                    "will-change-transform"
                )}
            >
                {/* Image Layer - Removed internal layoutId to prevent sync issues */}
                <motion.div
                    variants={imageVariants}
                    className="absolute inset-0"
                >
                    <Image
                        src={guest.image_url}
                        alt={guest.name}
                        fill
                        priority={shouldPrioritize}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top"
                    />

                    {/* Noise texture overlay */}
                    <div
                        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                    />
                </motion.div>

                {/* Red Sun Overlay */}
                <motion.div
                    variants={redSunVariants}
                    className={cn(
                        "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2",
                        "w-32 h-32",
                        "rounded-full bg-shu-600",
                        "pointer-events-none z-10",
                        "blur-sm"
                    )}
                    aria-hidden="true"
                />

                {/* Role Label - Removed layoutId */}
                <div className="absolute top-0 left-0 z-20">
                    <div
                        className={cn(
                            "px-3 py-2",
                            "bg-sumi-950 text-washi-100",
                            "text-[10px] font-semibold tracking-[0.2em] uppercase"
                        )}
                    >
                        {roleLabel.en}
                    </div>
                </div>

                {/* Vertical Japanese Name */}
                <motion.div
                    variants={verticalTextVariants}
                    className="absolute top-4 right-3 writing-vertical z-20 overflow-visible"
                >
                    <span
                        className={cn(
                            "font-serif text-xl md:text-2xl lg:text-3xl font-bold",
                            "text-washi-100",
                            "drop-shadow-[2px_2px_0px_rgba(0,0,0,0.9)]",
                            "whitespace-nowrap"
                        )}
                    >
                        {guest.name_ja}
                    </span>
                </motion.div>

                {/* Bottom Gradient */}
                <div
                    className={cn(
                        "absolute bottom-0 left-0 right-0",
                        "h-3/4",
                        "bg-gradient-to-t from-sumi-950 via-sumi-950/80 via-40% to-transparent",
                        "z-15 pointer-events-none"
                    )}
                />

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-20">
                    <motion.h3
                        variants={textSlideVariants}
                        className={cn(
                            "font-display text-lg md:text-xl lg:text-2xl font-bold tracking-tight",
                            "text-washi-100",
                            "uppercase leading-none"
                        )}
                    >
                        {guest.name}
                    </motion.h3>

                    <motion.p
                        variants={taglineVariants}
                        className="mt-2 text-xs md:text-sm text-washi-100/70 line-clamp-2 leading-relaxed"
                    >
                        {guest.tagline || "Featured guest at KuroFest 2026"}
                    </motion.p>

                    <motion.div
                        variants={taglineVariants}
                        className="mt-3 flex items-center gap-2"
                    >
                        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-shu-500">
                            View Profile
                        </span>
                        <motion.span
                            className="text-shu-500"
                            variants={{
                                rest: { x: 0 },
                                hover: { x: 6 },
                            }}
                        >
                            →
                        </motion.span>
                    </motion.div>
                </div>

                {/* Card number */}
                <div className="absolute bottom-4 right-4 z-20">
                    <span className="font-mono text-[10px] text-washi-100/30 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>
            </motion.article>
        </Link>
    );
});
"use client";

import { useRef } from "react";
import Image from "next/image";
import {
    motion,
    useScroll,
    useTransform,
    useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/cta-button";
import { EASING } from "@/lib/motion-config";

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const opacityScroll = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-sumi-950"
        >
            {/* Background Image */}
            <motion.div
                style={{
                    y: prefersReducedMotion ? 0 : yBackground,
                    scale: prefersReducedMotion ? 1 : scale,
                    willChange: "transform",
                }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://images.unsplash.com/photo-1722803921446-70be3842871e?q=80&w=1233&auto=format&fit=crop"
                    alt="Convention atmosphere"
                    fill
                    priority
                    className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-sumi-950/60 via-transparent to-sumi-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-sumi-950/40 via-transparent to-sumi-950/40" />
            </motion.div>

            {/* Animated Grid Lines */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {[...Array(7)].map((_, i) => (
                    <motion.div
                        key={`v-${i}`}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: EASING.expoOut }}
                        className="absolute top-0 bottom-0 w-px bg-washi-100/[0.07] origin-top"
                        style={{ left: `${(i + 1) * 12.5}%` }}
                    />
                ))}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`h-${i}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.2, delay: 0.6 + i * 0.08, ease: EASING.expoOut }}
                        className="absolute left-0 right-0 h-px bg-washi-100/[0.07] origin-left"
                        style={{ top: `${(i + 1) * 16.666}%` }}
                    />
                ))}
            </div>

            {/* Red Sun */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 1, ease: EASING.expoOut }}
                className="absolute top-[10%] right-[8%] md:top-[12%] md:right-[12%] z-5"
            >
                <div className="relative w-16 h-16 md:w-32 md:h-32 lg:w-40 lg:h-40">
                    <div className="absolute inset-0 rounded-full bg-shu-600/40 blur-2xl" />
                    <div className="absolute inset-0 rounded-full bg-shu-600/90" />
                </div>
            </motion.div>

            {/* Main Content
                Fix: flex layout changed so kanji sits in the top half and CTAs
                are anchored to the bottom on mobile — prevents overlap with
                the scroll indicator on short screens.
                On md+ the original centred layout is preserved.
            */}
            <motion.div
                style={{
                    y: prefersReducedMotion ? 0 : yContent,
                    opacity: prefersReducedMotion ? 1 : opacityContent,
                }}
                className="relative z-20 flex flex-col h-full px-4 sm:px-6"
            >
                {/* Top section: kanji + title + date — pushed down from top on mobile */}
                <div className="flex flex-col items-center justify-center flex-1 pt-24 md:pt-0">
                    {/* Pre-title */}
                    <div className="overflow-hidden">
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: EASING.quintOut }}
                        >
                            <span className="text-[10px] md:text-xs font-semibold tracking-[0.5em] text-washi-100/50 uppercase">
                                {"Japan's Premier Anime Convention"}
                            </span>
                        </motion.div>
                    </div>

                    {/* Main Kanji */}
                    <div className="mt-4 md:mt-6 flex gap-2 md:gap-6 lg:gap-8 overflow-hidden">
                        {["黒", "祭"].map((char, index) => (
                            <div key={char} className="overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.4 + index * 0.15,
                                        ease: EASING.quintOut,
                                    }}
                                    className={cn(
                                        "block font-serif font-black text-washi-100",
                                        // Fix: slightly smaller on short mobile (svh-aware)
                                        "text-[28vw] sm:text-[26vw] md:text-[22vw] lg:text-[18vw]",
                                        "leading-[0.75] select-none",
                                        "drop-shadow-[0_0_60px_rgba(255,255,255,0.1)]"
                                    )}
                                >
                                    {char}
                                </motion.span>
                            </div>
                        ))}
                    </div>

                    {/* English Title */}
                    <div className="mt-2 md:mt-4 overflow-hidden">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: EASING.quintOut }}
                            className="block font-display text-2xl md:text-4xl lg:text-5xl font-bold tracking-[0.1em] text-washi-100"
                        >
                            KUROFEST 2026
                        </motion.h1>
                    </div>

                    {/* Date & Location */}
                    <div className="mt-6 md:mt-8 overflow-hidden">
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1, ease: EASING.quintOut }}
                            className="flex items-center gap-4 md:gap-6"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-shu-500" />
                                <span className="font-mono text-xs md:text-sm tracking-wider text-washi-100/70">
                                    AUG 15-16, 2026
                                </span>
                            </div>
                            <div className="w-px h-4 bg-washi-100/30" />
                            <span className="text-xs md:text-sm text-washi-100/70">
                                Tokyo Big Sight
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom section: CTAs — fixed to bottom on mobile, inline on md+
                    Fix: using pb-safe so CTAs clear the scroll indicator (20px gap)
                    and don't overlap on short viewports like iPhone SE.
                */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2, ease: EASING.quintOut }}
                    className={cn(
                        // Mobile: pinned above scroll indicator, horizontally centred
                        "flex flex-col sm:flex-row gap-4",
                        "items-center justify-center",
                        "pb-28 md:pb-0",         // clear the scroll indicator on mobile
                        "mb-0 md:mb-16 lg:mb-20" // breathing room below on desktop
                    )}
                >
                    <CTAButton href="/tickets" variant="primary" size="lg">
                        Get Tickets
                    </CTAButton>
                    <CTAButton
                        href="/schedule"
                        variant="outline"
                        size="lg"
                        className="border-washi-100/40 text-washi-100 hover:bg-washi-100 hover:text-sumi-950"
                    >
                        View Schedule
                    </CTAButton>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator — sits at bottom, fades on scroll */}
            <motion.div
                style={{ opacity: opacityScroll }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
            >
                <span className="text-[10px] font-geist uppercase tracking-widest text-washi-100/70">Scroll</span>
                <div className="h-12 w-[1px] bg-washi-100/20 overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="h-full w-full bg-washi-100"
                    />
                </div>
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-sumi-950 via-sumi-950/80 to-transparent z-15 pointer-events-none" />
        </section>
    );
}
"use client";

import { useRef, ElementType } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const lineVariants: Variants = {
    hidden: {
        y: "100%",
    },
    visible: {
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.33, 1, 0.68, 1], // Custom ease - editorial feel
        },
    },
};

const characterVariants: Variants = {
    hidden: {
        y: "100%",
        opacity: 0,
    },
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
            delay: i * 0.03,
        },
    }),
};

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

interface TextRevealProps {
    children: string;
    className?: string;
    as?: ElementType;
    delay?: number;
    once?: boolean;
}

/**
 * Line-by-line text reveal with masked animation
 */
export function TextReveal({
    children,
    className,
    as: Component = "h2",
    delay = 0,
    once = true,
}: TextRevealProps) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    // Split text into lines (by newline or just treat as single line)
    const lines = children.split("\n");

    return (
        <Component
            ref={ref}
            className={cn("overflow-hidden", className)}
        >
            <motion.span
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="block"
                style={{ transitionDelay: `${delay}s` }}
            >
                {lines.map((line, lineIndex) => (
                    <span key={lineIndex} className="block overflow-hidden">
                        <motion.span
                            variants={lineVariants}
                            className="block"
                        >
                            {line}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Component>
    );
}

/**
 * Character-by-character reveal for dramatic headers
 */
export function TextRevealByChar({
    children,
    className,
    as: Component = "h1",
    delay = 0,
    once = true,
}: TextRevealProps) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    const characters = children.split("");

    return (
        <Component
            ref={ref}
            className={cn("overflow-hidden", className)}
            aria-label={children}
        >
            <motion.span
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-flex flex-wrap"
                style={{ transitionDelay: `${delay}s` }}
            >
                {characters.map((char, i) => (
                    <span key={i} className="overflow-hidden inline-block">
                        <motion.span
                            custom={i}
                            variants={characterVariants}
                            className="inline-block"
                            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Component>
    );
}

/**
 * Word-by-word reveal - good for subtitles
 */
interface WordRevealProps extends Omit<TextRevealProps, "children"> {
    children: string;
}

export function TextRevealByWord({
    children,
    className,
    as: Component = "p",
    delay = 0,
    once = true,
}: WordRevealProps) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const words = children.split(" ");

    return (
        <Component
            ref={ref}
            className={cn("overflow-hidden", className)}
        >
            <motion.span
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-flex flex-wrap gap-x-[0.25em]"
                style={{ transitionDelay: `${delay}s` }}
            >
                {words.map((word, i) => (
                    <span key={i} className="overflow-hidden inline-block">
                        <motion.span
                            variants={lineVariants}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Component>
    );
}

/**
 * Slide up reveal for any element (not just text)
 */
interface SlideRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    once?: boolean;
}

export function SlideReveal({
    children,
    className,
    delay = 0,
    direction = "up",
    once = true,
}: SlideRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });

    const directionMap = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
    };

    const { x, y } = directionMap[direction];

    return (
        <div ref={ref} className={cn("overflow-hidden", className)}>
            <motion.div
                initial={{ opacity: 0, x, y }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
                transition={{
                    duration: 0.7,
                    ease: [0.33, 1, 0.68, 1],
                    delay,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
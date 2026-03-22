"use client";

import { useRef, ElementType } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASING, DURATION } from "@/lib/motion-config";

const containerVariants: Variants = {
    hidden: {},
    visible: (delayChildren: number = 0) => ({
        transition: {
            staggerChildren: 0.1,
            delayChildren,
        },
    }),
};

const lineVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
        y: 0,
        transition: {
            duration: DURATION.slow,
            ease: EASING.quintOut,
        },
    },
};

const characterVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: DURATION.normal,
            ease: EASING.quintOut,
            delay: i * 0.03,
        },
    }),
};

interface TextRevealProps {
    children: string;
    className?: string;
    as?: ElementType;
    delay?: number;
    once?: boolean;
}

export function TextReveal({
    children,
    className,
    as: Component = "h2",
    delay = 0,
    once = true,
}: TextRevealProps) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once, margin: "-100px" });
    const lines = children.split("\n");

    return (
        <Component ref={ref} className={cn("overflow-hidden", className)}>
            <motion.span
                custom={delay}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="block"
            >
                {lines.map((line, lineIndex) => (
                    <span key={lineIndex} className="block overflow-hidden">
                        <motion.span variants={lineVariants} className="block">
                            {line}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Component>
    );
}

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
        <Component ref={ref} className={cn("overflow-hidden", className)} aria-label={children}>
            <motion.span
                custom={delay}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-flex flex-wrap"
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
        <Component ref={ref} className={cn("overflow-hidden", className)}>
            <motion.span
                custom={delay}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-flex flex-wrap gap-x-[0.25em]"
            >
                {words.map((word, i) => (
                    <span key={i} className="overflow-hidden inline-block">
                        <motion.span variants={lineVariants} className="inline-block">
                            {word}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Component>
    );
}

interface SlideRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    once?: boolean;
}

const OFFSET = 40;
const directionOffset = {
    up: { y: OFFSET, x: 0 },
    down: { y: -OFFSET, x: 0 },
    left: { y: 0, x: OFFSET },
    right: { y: 0, x: -OFFSET },
};

export function SlideReveal({
    children,
    className,
    delay = 0,
    direction = "up",
    once = true,
}: SlideRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "-50px" });
    const { x, y } = directionOffset[direction];

    const variants: Variants = {
        hidden: { opacity: 0, x, y },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: DURATION.slow,
                ease: EASING.quintOut,
                delay,
            },
        },
    };

    return (
        <div ref={ref} className={cn(className)}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {children}
            </motion.div>
        </div>
    );
}
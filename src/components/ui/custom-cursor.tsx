"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [cursorText, setCursorText] = useState("");
    const cursorRef = useRef<HTMLDivElement>(null);

    // Mouse position with spring physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configuration for that "ink following brush" feel
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Trailing Ring physics (Defined at top level to satisfy Rules of Hooks)
    const ringSpringConfig = { damping: 35, stiffness: 200 };
    const ringX = useSpring(mouseX, ringSpringConfig);
    const ringY = useSpring(mouseY, ringSpringConfig);

    useEffect(() => {
        // 1. Check if device has fine pointer (mouse).
        // If not (e.g. touch), we simply don't add listeners.
        // The component remains rendered but invisible and inert.
        const mediaQuery = window.matchMedia("(pointer: fine)");
        if (!mediaQuery.matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            // Only show cursor once mouse moves (prevents default pos flash)
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Track interactive elements
        const handleElementHover = () => {
            const hoveredElement = document.querySelector(":hover");

            if (hoveredElement) {
                const isInteractive =
                    hoveredElement.matches("a, button, [role='button'], input, textarea, select, [data-cursor]") ||
                    hoveredElement.closest("a, button, [role='button'], [data-cursor]");

                setIsHovering(!!isInteractive);

                // Check for custom cursor text
                const cursorData = hoveredElement.closest("[data-cursor]");
                if (cursorData) {
                    setCursorText(cursorData.getAttribute("data-cursor") || "");
                } else {
                    setCursorText("");
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseover", handleElementHover);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handleElementHover);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Hide default cursor globally ONLY on fine pointer devices */}
            <style jsx global>{`
                @media (pointer: fine) {
                    * {
                        cursor: none !important;
                    }
                }
            `}</style>

            {/* Main cursor dot - Vermilion Hanko style */}
            <motion.div
                ref={cursorRef}
                className={cn(
                    "fixed top-0 left-0 z-[9999] pointer-events-none",
                    "flex items-center justify-center",
                    // Hidden by default until mouse moves or if touch device
                    !isVisible && "opacity-0"
                )}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                {/* Inner dot */}
                <motion.div
                    className={cn(
                        "rounded-full bg-shu-600",
                        "transition-colors duration-200"
                    )}
                    animate={{
                        width: isHovering ? 48 : isClicking ? 8 : 12,
                        height: isHovering ? 48 : isClicking ? 8 : 12,
                        backgroundColor: isHovering ? "transparent" : undefined,
                        borderWidth: isHovering ? 2 : 0,
                        borderColor: isHovering ? "rgb(197, 48, 48)" : undefined,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                    }}
                    style={{
                        borderStyle: "solid",
                    }}
                />

                {/* Cursor text label */}
                {cursorText && isHovering && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute text-[10px] font-bold tracking-[0.15em] uppercase text-shu-600 whitespace-nowrap"
                        style={{ top: "calc(100% + 8px)" }}
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>

            {/* Trailing ring - for extra polish */}
            <motion.div
                className={cn(
                    "fixed top-0 left-0 z-[9998] pointer-events-none",
                    "w-8 h-8 rounded-full",
                    "border border-sumi-950/20",
                    !isVisible && "opacity-0",
                    isHovering && "opacity-0"
                )}
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
}
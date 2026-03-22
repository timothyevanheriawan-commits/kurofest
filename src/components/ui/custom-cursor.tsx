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

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const cursorX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
    const cursorY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });
    const ringX = useSpring(mouseX, { damping: 35, stiffness: 200 });
    const ringY = useSpring(mouseY, { damping: 35, stiffness: 200 });

    useEffect(() => {
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Fix: use event.target directly — no querySelector(":hover") style recalc
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as Element;

            const interactive =
                target.matches("a, button, [role='button'], input, textarea, select, [data-cursor]") ||
                !!target.closest("a, button, [role='button'], [data-cursor]");

            setIsHovering(interactive);

            const cursorEl = target.closest("[data-cursor]");
            setCursorText(cursorEl?.getAttribute("data-cursor") ?? "");
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <style jsx global>{`
                @media (pointer: fine) {
                    * { cursor: none !important; }
                }
            `}</style>

            {/* Main cursor dot */}
            <motion.div
                ref={cursorRef}
                className={cn(
                    "fixed top-0 left-0 z-[9999] pointer-events-none",
                    "flex items-center justify-center",
                    !isVisible && "opacity-0"
                )}
                style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
            >
                <motion.div
                    className="rounded-full bg-shu-600"
                    animate={{
                        width: isHovering ? 48 : isClicking ? 8 : 12,
                        height: isHovering ? 48 : isClicking ? 8 : 12,
                        backgroundColor: isHovering ? "transparent" : undefined,
                        borderWidth: isHovering ? 2 : 0,
                        borderColor: isHovering ? "rgb(197, 48, 48)" : undefined,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{ borderStyle: "solid" }}
                />

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

            {/* Trailing ring */}
            <motion.div
                className={cn(
                    "fixed top-0 left-0 z-[9998] pointer-events-none",
                    "w-8 h-8 rounded-full border border-sumi-950/20",
                    !isVisible && "opacity-0",
                    isHovering && "opacity-0"
                )}
                style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
            />
        </>
    );
}
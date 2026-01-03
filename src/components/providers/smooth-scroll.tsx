"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   SMOOTH SCROLL PROVIDER
   Wraps the app with Lenis for butter-smooth scrolling.
   Respects user's "Reduce Motion" preference.
   ═══════════════════════════════════════════════════════════════════════════ */

interface SmoothScrollProps {
    children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    const shouldReduceMotion = useReducedMotion();

    // Respect accessibility preferences
    if (shouldReduceMotion) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            options={{
                // Wa-Modern feel: Deliberate, unhurried scrolling
                lerp: 0.1, // Lower = heavier, more deliberate
                duration: 1.4, // Slightly longer for that "considered" feel
                smoothWheel: true,
                wheelMultiplier: 0.9, // Slightly reduced for precision
                touchMultiplier: 2,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}
"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";
import type { Variants } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   MOTION CONFIGURATION
   ═══════════════════════════════════════════════════════════════════════════ */

const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

interface ModalShellProps {
    children: React.ReactNode;
}

export function ModalShell({ children }: ModalShellProps) {
    const router = useRouter();
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        router.back();
    }, [router]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleClose]);

    // Prevent body scroll
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            handleClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                ref={overlayRef}
                onClick={handleBackdropClick}
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                role="dialog"
                aria-modal="true"
            >
                {/* Backdrop */}
                <div className="absolute inset-0 -z-10 bg-sumi-950/60" />

                {/* Modal content */}
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
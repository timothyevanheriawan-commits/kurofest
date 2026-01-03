"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GrainOverlayProps {
    opacity?: number;
    animate?: boolean;
    className?: string;
}

export function GrainOverlay({
    opacity = 0.04,
    animate = true,
    className,
}: GrainOverlayProps) {
    const [seed, setSeed] = useState(0);

    // Subtle animation - shifts the noise pattern
    useEffect(() => {
        if (!animate) return;

        const interval = setInterval(() => {
            setSeed((prev) => (prev + 1) % 10);
        }, 100);

        return () => clearInterval(interval);
    }, [animate]);

    return (
        <div
            className={cn(
                "fixed inset-0 pointer-events-none z-[9990]",
                "mix-blend-overlay",
                className
            )}
            style={{ opacity }}
            aria-hidden="true"
        >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id={`grain-${seed}`}>
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency={0.8}
                            numOctaves={4}
                            seed={seed}
                            stitchTiles="stitch"
                        />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    filter={`url(#grain-${seed})`}
                />
            </svg>
        </div>
    );
}

/**
 * Static grain - better performance, no animation
 */
export function StaticGrain({
    opacity = 0.03,
    className,
}: {
    opacity?: number;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "fixed inset-0 pointer-events-none z-[9990]",
                "mix-blend-overlay",
                className
            )}
            style={{
                opacity,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
        />
    );
}
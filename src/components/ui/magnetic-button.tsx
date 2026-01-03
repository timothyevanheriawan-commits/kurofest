"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticCTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    href?: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "default" | "lg";
    className?: string;
}

export function MagneticCTA({
    children,
    href,
    variant = "primary",
    size = "default",
    className,
    ...props
}: MagneticCTAProps) {
    // 1. Define robust visual styles (CSS only, no JS physics)
    const baseStyles = cn(
        "relative inline-flex items-center justify-center font-bold uppercase tracking-widest",
        "transition-all duration-200 ease-out",
        "active:scale-95", // Tactile click feedback

        // VARIANTS
        variant === "primary" && [
            "bg-shu-600 text-washi-100",
            "hover:bg-shu-500",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
        ],

        variant === "secondary" && [
            "bg-sumi-950 text-washi-100",
            "hover:bg-sumi-800",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"
        ],

        variant === "outline" && [
            "border-2 bg-transparent border-current",
            "hover:bg-current hover:text-sumi-950" // Invert on hover
        ],

        // SIZES
        size === "default" && "px-6 py-3 text-xs",
        size === "lg" && "px-8 py-4 text-sm",

        className
    );

    // 2. Render as Next.js Link if href is provided (Navigation)
    if (href) {
        return (
            <Link href={href} className={baseStyles}>
                {children}
            </Link>
        );
    }

    // 3. Render as standard HTML Button if no href (Forms/Actions)
    return (
        <button className={baseStyles} {...props}>
            {children}
        </button>
    );
}
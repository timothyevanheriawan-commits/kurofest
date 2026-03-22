import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    showText?: boolean;
    /** "dark" = ink on paper (default), "light" = paper on ink */
    color?: "dark" | "light";
    size?: "sm" | "md" | "lg";
}

/**
 * KuroFest mark — two stacked horizontal rules with a split vermilion accent.
 * Reads as abstract brushwork; no kanji required.
 *
 * Used in: header, footer (full), footer (minimal)
 * All three import this single component so they stay in sync.
 */
export function Logo({ className, showText = true, color = "dark", size = "md" }: LogoProps) {
    const isLight = color === "light";

    const ruleClass = isLight ? "bg-washi-100" : "bg-sumi-950";
    const muteClass = isLight ? "bg-washi-100/25" : "bg-sumi-200";
    const titleClass = isLight ? "text-washi-100" : "text-sumi-950";
    const subtitleClass = isLight ? "text-washi-100/40" : "text-sumi-400";

    const titleSize = size === "sm" ? "text-sm" : size === "lg" ? "text-2xl" : "text-[17px]";
    const subSize = size === "sm" ? "text-[8px]" : "text-[9px]";
    const rule1W = size === "sm" ? "w-5" : size === "lg" ? "w-8" : "w-6";
    const rule2aW = size === "sm" ? "w-2.5" : size === "lg" ? "w-4" : "w-3";
    const rule2bW = size === "sm" ? "w-2.5" : size === "lg" ? "w-4" : "w-3";
    const gap = size === "sm" ? "gap-[4px]" : size === "lg" ? "gap-[7px]" : "gap-[5px]";

    return (
        <div className={cn("group flex items-center gap-2.5 select-none", className)}>
            {/* Mark */}
            <div className={cn("flex flex-col items-start", gap)}>
                {/* Top rule — full width */}
                <div className={cn("h-[2px]", rule1W, ruleClass,
                    "transition-all duration-300 group-hover:w-8")} />
                {/* Bottom rule — split: vermilion left, muted right */}
                <div className="flex items-center gap-1.5">
                    <div className={cn("h-[2px] bg-shu-600 shrink-0", rule2aW)} />
                    <div className={cn("h-[2px] shrink-0", rule2bW, muteClass,
                        "transition-all duration-300 group-hover:opacity-60")} />
                </div>
            </div>

            {/* Wordmark */}
            {showText && (
                <div className="flex flex-col leading-none gap-[3px]">
                    <span className={cn(
                        "font-display tracking-tight transition-colors duration-300",
                        titleSize, titleClass
                    )}>
                        KUROFEST
                    </span>
                    <span className={cn(
                        "font-mono tracking-[0.3em] uppercase transition-colors duration-300",
                        subSize, subtitleClass
                    )}>
                        2026
                    </span>
                </div>
            )}
        </div>
    );
}
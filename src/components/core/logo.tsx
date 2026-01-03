import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    showText?: boolean;
    color?: "auto" | "dark" | "light";
}

export function Logo({ className, showText = true, color = "auto" }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-3 group select-none", className)}>
            {/* THE MARK (Crest) */}
            <div
                className={cn(
                    "relative flex h-10 w-10 items-center justify-center border-2 transition-colors duration-300",
                    color === "auto" && "border-current text-current",
                    color === "dark" && "border-sumi-950 text-sumi-950",
                    color === "light" && "border-washi-100 text-washi-100"
                )}
            >
                {/* The Kanji 'Black' */}
                <span className="font-serif text-lg font-bold leading-none pt-0.5">
                    黒
                </span>

                {/* The 'Hanko' Accent (Red Dot) */}
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-shu-600" />

                {/* Hover Effect: Fill */}
                <div
                    className={cn(
                        "absolute inset-0 -z-10 scale-0 transition-transform duration-300 group-hover:scale-100",
                        color === "light" ? "bg-washi-100" : "bg-sumi-950"
                    )}
                />
            </div>

            {/* THE WORDMARK */}
            {showText && (
                <div className="flex flex-col leading-none">
                    <span
                        className={cn(
                            "font-display text-lg font-bold tracking-tight transition-colors",
                            color === "auto" && "text-current",
                            color === "dark" && "text-sumi-950",
                            color === "light" && "text-washi-100",
                            // Inverse text color on hover if needed, but simple is better for Wa-Modern
                        )}
                    >
                        KUROFEST
                    </span>
                    <span
                        className={cn(
                            "font-mono text-[10px] tracking-[0.2em] uppercase",
                            color === "auto" && "text-current/60",
                            color === "dark" && "text-sumi-500",
                            color === "light" && "text-washi-100/60"
                        )}
                    >
                        2026
                    </span>
                </div>
            )}
        </div>
    );
}
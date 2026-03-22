import Link from "next/link";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    href?: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "default" | "lg";
    className?: string;
    suppressHydrationWarning?: boolean;
}

export function CTAButton({
    children,
    href,
    variant = "primary",
    size = "default",
    className,
    ...props
}: CTAButtonProps) {
    const baseStyles = cn(
        "relative inline-flex items-center justify-center font-bold uppercase tracking-widest",
        "transition-colors duration-200 ease-out",
        "active:scale-95",

        variant === "primary" && [
            "bg-shu-600 text-washi-100",
            "hover:bg-shu-500",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]",
        ],

        variant === "secondary" && [
            "bg-sumi-950 text-washi-100",
            "hover:bg-sumi-800",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]",
        ],

        variant === "outline" && [
            "border-2 bg-transparent border-current",
            "hover:bg-sumi-950 hover:border-sumi-950 hover:text-washi-100",
        ],

        size === "default" && "px-6 py-3 text-xs",
        size === "lg" && "px-8 py-4 text-sm",

        className
    );

    if (href) {
        return (
            <Link href={href} className={baseStyles}>
                {children}
            </Link>
        );
    }

    return (
        <button className={baseStyles} {...props}>
            {children}
        </button>
    );
}

export { CTAButton as MagneticCTA };
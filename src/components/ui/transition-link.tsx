"use client";

import { useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function TransitionLink({
    href,
    children,
    className,
    onClick,
}: TransitionLinkProps) {
    const router = useRouter();

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            onClick?.();

            // Small delay to let any exit animations start
            setTimeout(() => {
                router.push(href);
            }, 50);
        },
        [href, router, onClick]
    );

    return (
        <a
            href={href}
            onClick={handleClick}
            className={cn(className)}
        >
            {children}
        </a>
    );
}
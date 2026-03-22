"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASING } from "@/lib/motion-config";
import { Logo } from "@/components/core/logo";

const NAV_ITEMS = [
    { label: "Schedule", labelJa: "予定", href: "/schedule" },
    { label: "Guests", labelJa: "ゲスト", href: "/guests" },
    { label: "Map", labelJa: "地図", href: "/map" },
    { label: "News", labelJa: "ニュース", href: "/news" },
] as const;

export function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isHomePage = pathname === "/";
    const showBg = isScrolled || !isHomePage;
    const isDark = isHomePage && !isScrolled;

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

    // Body scroll lock while mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);


    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: EASING.expoOut }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50",
                    "h-20 flex items-center",
                    "px-6 md:px-12 lg:px-16",
                    "transition-colors duration-500"
                )}
            >
                {/* Background */}
                <div className={cn(
                    "absolute inset-0 -z-10 transition-all duration-500",
                    showBg
                        ? "bg-washi-100/95 backdrop-blur-md border-b border-sumi-200"
                        : "bg-transparent border-b border-transparent"
                )} />

                <div className="relative z-10 flex w-full items-center justify-between max-w-7xl mx-auto">

                    {/* Logo */}
                    <Link href="/">
                        <Logo color={isDark ? "light" : "dark"} size="md" />
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-7">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative py-2 flex flex-col items-center gap-0.5",
                                        "transition-colors duration-300",
                                        isDark
                                            ? isActive ? "text-washi-100" : "text-washi-100/50 hover:text-washi-100"
                                            : isActive ? "text-sumi-950" : "text-sumi-400 hover:text-sumi-950"
                                    )}
                                >
                                    <span className="text-[11px] font-semibold tracking-[0.12em] uppercase">
                                        {item.label}
                                    </span>
                                    {/* Japanese subtitle on desktop */}
                                    <span className={cn(
                                        "font-serif text-[9px] transition-colors duration-300",
                                        isDark ? "text-washi-100/30" : "text-sumi-300",
                                        isActive && (isDark ? "text-washi-100/50" : "text-sumi-400")
                                    )}>
                                        {item.labelJa}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            transition={{ duration: 0.3, ease: EASING.expoOut }}
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-shu-600"
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        {/* ⌘K hint */}
                        <button
                            className={cn(
                                "hidden lg:flex items-center gap-1.5 px-2.5 py-1",
                                "border transition-colors duration-300",
                                "text-[10px] font-mono tracking-wide",
                                isDark
                                    ? "border-washi-100/20 text-washi-100/40 hover:border-washi-100/40 hover:text-washi-100/70"
                                    : "border-sumi-200 text-sumi-400 hover:border-sumi-400 hover:text-sumi-600"
                            )}
                            onClick={() => {
                                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
                                document.dispatchEvent(event);
                            }}
                            aria-label="Open command palette"
                        >
                            <span>⌘K</span>
                        </button>

                        <Link
                            href="/tickets"
                            className={cn(
                                "ml-2 px-5 py-2.5",
                                "text-[11px] font-semibold tracking-[0.15em] uppercase",
                                "border-2 transition-all duration-300",
                                isDark
                                    ? "bg-washi-100 text-sumi-950 border-washi-100 hover:bg-shu-600 hover:border-shu-600 hover:text-washi-100"
                                    : "bg-sumi-950 text-washi-100 border-sumi-950 hover:bg-shu-600 hover:border-shu-600"
                            )}
                        >
                            Get Tickets
                        </Link>
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                        className={cn(
                            "md:hidden w-10 h-10 flex items-center justify-center",
                            "border-2 transition-colors duration-300",
                            isDark
                                ? isMobileMenuOpen
                                    ? "bg-washi-100 text-sumi-950 border-washi-100"
                                    : "border-washi-100 text-washi-100"
                                : isMobileMenuOpen
                                    ? "bg-sumi-950 text-washi-100 border-sumi-950"
                                    : "border-sumi-950 text-sumi-950"
                        )}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile menu — full-screen, focus-trapped */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-sumi-950/50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Panel */}
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.4, ease: EASING.expoOut }}
                            className="absolute top-0 right-0 bottom-0 w-72 bg-washi-100 border-l-2 border-sumi-950 flex flex-col pt-20"
                        >
                            <div className="flex-1 px-6 pt-6">
                                {NAV_ITEMS.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05, ease: EASING.expoOut }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-center justify-between py-4 border-b border-sumi-100",
                                                pathname.startsWith(item.href)
                                                    ? "text-sumi-950"
                                                    : "text-sumi-400"
                                            )}
                                        >
                                            <span className="text-sm font-semibold tracking-[0.1em] uppercase">
                                                {item.label}
                                            </span>
                                            <span className="font-serif text-base text-sumi-300">
                                                {item.labelJa}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.22, ease: EASING.expoOut }}
                                    className="mt-6"
                                >
                                    <Link
                                        href="/tickets"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full py-4 text-center bg-shu-600 text-washi-100 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-shu-500 transition-colors"
                                    >
                                        Get Tickets
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Footer info */}
                            <div className="px-6 pb-8 border-t border-sumi-100 pt-6">
                                <p className="text-[10px] tracking-[0.2em] text-sumi-400 uppercase">
                                    August 15–16, 2026
                                </p>
                                <p className="mt-1 font-display text-sm font-bold text-sumi-950">
                                    Tokyo Big Sight
                                </p>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
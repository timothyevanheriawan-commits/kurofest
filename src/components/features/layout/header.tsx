"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
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
    const headerRef = useRef<HTMLElement>(null);

    const isHomePage = pathname === "/";
    const showBg = isScrolled || !isHomePage;
    const isDark = isHomePage && !isScrolled;

    // Scroll progress for visual feedback
    const { scrollYProgress } = useScroll();
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY > 80;
            setIsScrolled(scrolled);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, []);


    // Close mobile menu on route change (using render-time state adjustment)
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    }
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = "var(--scrollbar-width, 0px)";
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, [isMobileMenuOpen]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // ESC closes mobile menu
            if (e.key === "Escape" && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
            // ⌘K opens command palette (handled by CommandPalette component)
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.header
                ref={headerRef}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: EASING.expoOut }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50",
                    "h-20 flex items-center",
                    "px-4 sm:px-6 md:px-12 lg:px-16",
                    "transition-colors duration-500"
                )}
            >
                {/* Background with border */}
                <div className={cn(
                    "absolute inset-0 -z-10 transition-all duration-500",
                    showBg
                        ? "bg-washi-100/98 backdrop-blur-md border-b border-sumi-950/10"
                        : "bg-transparent border-b border-transparent"
                )} />

                {/* Scroll progress indicator */}
                <motion.div
                    style={{ width: progressWidth }}
                    className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-shu-600 origin-left transition-opacity duration-500",
                        showBg ? "opacity-100" : "opacity-0"
                    )}
                />

                <div className="relative z-10 flex w-full items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu-600 rounded-sm"
                    >
                        <Logo color={isDark ? "light" : "dark"} size="md" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative px-3 lg:px-4 py-2 flex flex-col items-center gap-0.5",
                                        "transition-colors duration-300 rounded-sm",
                                        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu-600",
                                        isDark
                                            ? isActive
                                                ? "text-washi-100"
                                                : "text-washi-100/60 hover:text-washi-100"
                                            : isActive
                                                ? "text-sumi-950"
                                                : "text-sumi-500 hover:text-sumi-950"
                                    )}
                                >
                                    <span className="text-[11px] font-semibold tracking-[0.12em] uppercase">
                                        {item.label}
                                    </span>
                                    <span className={cn(
                                        "font-serif text-[9px] transition-colors duration-300",
                                        isDark
                                            ? "text-washi-100/30"
                                            : "text-sumi-300",
                                        isActive && (isDark ? "text-washi-100/50" : "text-sumi-500")
                                    )}>
                                        {item.labelJa}
                                    </span>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="desktop-nav-underline"
                                            transition={{ duration: 0.3, ease: EASING.expoOut }}
                                            className={cn(
                                                "absolute -bottom-1 left-0 right-0 h-0.5",
                                                isDark ? "bg-washi-100" : "bg-sumi-950"
                                            )}
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        {/* Command palette hint */}
                        <button
                            className={cn(
                                "hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 ml-2",
                                "border transition-all duration-300 rounded-sm",
                                "text-[10px] font-mono tracking-wide",
                                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600",
                                isDark
                                    ? "border-washi-100/20 text-washi-100/40 hover:border-washi-100/40 hover:text-washi-100/70 hover:bg-washi-100/5"
                                    : "border-sumi-200 text-sumi-400 hover:border-sumi-400 hover:text-sumi-600 hover:bg-sumi-950/5"
                            )}
                            onClick={() => {
                                const event = new KeyboardEvent("keydown", {
                                    key: "k",
                                    metaKey: true,
                                    bubbles: true
                                });
                                document.dispatchEvent(event);
                            }}
                            aria-label="Open command palette (⌘K)"
                        >
                            <span>⌘K</span>
                        </button>

                        {/* CTA Button */}
                        <Link
                            href="/tickets"
                            className={cn(
                                "ml-3 px-5 py-2.5 rounded-sm",
                                "text-[11px] font-semibold tracking-[0.15em] uppercase",
                                "border-2 transition-all duration-300",
                                "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-shu-600",
                                isDark
                                    ? "bg-washi-100 text-sumi-950 border-washi-100 hover:bg-shu-600 hover:border-shu-600 hover:text-washi-100"
                                    : "bg-sumi-950 text-washi-100 border-sumi-950 hover:bg-shu-600 hover:border-shu-600"
                            )}
                        >
                            Tickets
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
                        className={cn(
                            "md:hidden w-10 h-10 flex items-center justify-center rounded-sm",
                            "border-2 transition-all duration-300",
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600",
                            isDark
                                ? isMobileMenuOpen
                                    ? "bg-washi-100 text-sumi-950 border-washi-100"
                                    : "border-washi-100 text-washi-100 hover:bg-washi-100/10"
                                : isMobileMenuOpen
                                    ? "bg-sumi-950 text-washi-100 border-sumi-950"
                                    : "border-sumi-950 text-sumi-950 hover:bg-sumi-950/5"
                        )}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={isMobileMenuOpen ? "close" : "menu"}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu */}
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
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-sumi-950/60 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Panel */}
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.4, ease: EASING.expoOut }}
                            className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-washi-100 border-l-2 border-sumi-950 flex flex-col"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation"
                        >
                            {/* Close button in panel */}
                            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-sumi-100">
                                <span className="text-xs font-mono tracking-[0.2em] text-sumi-400 uppercase">
                                    Menu
                                </span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center border-2 border-sumi-950 text-sumi-950 hover:bg-sumi-950 hover:text-washi-100 transition-colors rounded-sm"
                                    aria-label="Close menu"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Navigation links */}
                            <div className="flex-1 overflow-y-auto px-6 pt-2">
                                {NAV_ITEMS.map((item, index) => {
                                    const isActive = pathname.startsWith(item.href);
                                    return (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: index * 0.05,
                                                ease: EASING.expoOut
                                            }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={cn(
                                                    "group flex items-center justify-between py-4 border-b border-sumi-100",
                                                    "transition-colors duration-200",
                                                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600 rounded-sm",
                                                    isActive
                                                        ? "text-sumi-950"
                                                        : "text-sumi-400 hover:text-sumi-950"
                                                )}
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-semibold tracking-[0.1em] uppercase">
                                                        {item.label}
                                                    </span>
                                                    <span className="font-serif text-xs text-sumi-300">
                                                        {item.labelJa}
                                                    </span>
                                                </div>
                                                <ChevronRight
                                                    size={16}
                                                    className={cn(
                                                        "transition-transform duration-200",
                                                        isActive
                                                            ? "translate-x-0"
                                                            : "translate-x-0 group-hover:translate-x-1"
                                                    )}
                                                />
                                            </Link>
                                        </motion.div>
                                    );
                                })}

                                {/* CTA in mobile menu */}
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, ease: EASING.expoOut }}
                                    className="mt-8 mb-6"
                                >
                                    <Link
                                        href="/tickets"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "block w-full py-4 text-center rounded-sm",
                                            "bg-shu-600 text-washi-100",
                                            "text-xs font-semibold tracking-[0.15em] uppercase",
                                            "hover:bg-shu-500 transition-colors",
                                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-shu-600"
                                        )}
                                    >
                                        Get Tickets
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Footer info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="px-6 py-6 border-t border-sumi-100 bg-washi-200/50"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 bg-shu-600 rounded-full" />
                                    <p className="text-[10px] tracking-[0.2em] text-sumi-400 uppercase">
                                        August 15–16, 2026
                                    </p>
                                </div>
                                <p className="font-display text-base font-bold text-sumi-950">
                                    Tokyo Big Sight
                                </p>
                                <p className="mt-2 text-xs text-sumi-400">
                                    Japan&apos;s premier anime convention
                                </p>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
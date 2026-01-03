"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
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

    // Check if we're on the marketing/home page (hero visible)
    const isHomePage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine header style based on scroll and page
    const showBackground = isScrolled || !isHomePage;
    const isDarkMode = isHomePage && !isScrolled;

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50",
                    "h-20 flex items-center",
                    "px-6 md:px-12 lg:px-16",
                    "transition-colors duration-500"
                )}
            >
                {/* Background */}
                <div
                    className={cn(
                        "absolute inset-0 -z-10",
                        "transition-all duration-500",
                        showBackground
                            ? "bg-washi-100/95 backdrop-blur-md border-b border-sumi-200"
                            : "bg-transparent border-b border-transparent"
                    )}
                />

                <div className="relative z-10 flex w-full items-center justify-between max-w-7xl mx-auto">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-3">
                        <div
                            className={cn(
                                "w-10 h-10 flex items-center justify-center",
                                "border-2 font-serif text-sm font-bold",
                                "transition-all duration-300",
                                isDarkMode
                                    ? "border-washi-100 text-washi-100 group-hover:bg-washi-100 group-hover:text-sumi-950"
                                    : "border-sumi-950 text-sumi-950 group-hover:bg-sumi-950 group-hover:text-washi-100"
                            )}
                        >
                            黒
                        </div>

                        <div className="hidden sm:block">
                            <span
                                className={cn(
                                    "block font-display text-lg font-bold tracking-tight leading-none",
                                    "transition-colors duration-300",
                                    isDarkMode ? "text-washi-100" : "text-sumi-950"
                                )}
                            >
                                KUROFEST
                            </span>
                            <span
                                className={cn(
                                    "block text-[10px] tracking-[0.2em] uppercase",
                                    "transition-colors duration-300",
                                    isDarkMode ? "text-washi-100/60" : "text-sumi-500"
                                )}
                            >
                                2026
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative py-2",
                                        "text-xs font-semibold tracking-[0.15em] uppercase",
                                        "transition-colors duration-300",
                                        isDarkMode
                                            ? isActive
                                                ? "text-washi-100"
                                                : "text-washi-100/60 hover:text-washi-100"
                                            : isActive
                                                ? "text-sumi-950"
                                                : "text-sumi-500 hover:text-sumi-950"
                                    )}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-shu-600"
                                        />
                                    )}
                                </Link>
                            );
                        })}

                        <Link
                            href="/tickets"
                            className={cn(
                                "ml-4 px-5 py-2.5",
                                "text-[11px] font-semibold tracking-[0.15em] uppercase",
                                "border-2 transition-all duration-300",
                                isDarkMode
                                    ? "bg-washi-100 text-sumi-950 border-washi-100 hover:bg-shu-600 hover:border-shu-600 hover:text-washi-100"
                                    : "bg-sumi-950 text-washi-100 border-sumi-950 hover:bg-shu-600 hover:border-shu-600"
                            )}
                        >
                            Get Tickets
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "md:hidden w-10 h-10 flex items-center justify-center",
                            "border-2 transition-colors duration-300",
                            isDarkMode
                                ? isMobileMenuOpen
                                    ? "bg-washi-100 text-sumi-950 border-washi-100"
                                    : "border-washi-100 text-washi-100"
                                : isMobileMenuOpen
                                    ? "bg-sumi-950 text-washi-100 border-sumi-950"
                                    : "border-sumi-950 text-sumi-950"
                        )}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}

                        aria-expanded={isMobileMenuOpen ? "true" : "false"}
                    >
                        {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-sumi-950/40"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                            className="absolute top-0 right-0 bottom-0 w-[300px] bg-washi-100 border-l-2 border-sumi-950 pt-24 px-6"
                        >
                            <div className="space-y-1">
                                {NAV_ITEMS.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)} // FIX: Close menu on click here
                                            className={cn(
                                                "flex items-center justify-between py-4 border-b border-sumi-200",
                                                pathname.startsWith(item.href)
                                                    ? "text-sumi-950"
                                                    : "text-sumi-500"
                                            )}
                                        >
                                            <span className="text-sm font-semibold tracking-[0.1em] uppercase">
                                                {item.label}
                                            </span>
                                            <span className="font-serif text-lg text-sumi-300">
                                                {item.labelJa}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/tickets"
                                    onClick={() => setIsMobileMenuOpen(false)} // FIX: Close on click here too
                                    className="block w-full py-4 text-center bg-shu-600 text-washi-100 text-xs font-semibold tracking-[0.15em] uppercase"
                                >
                                    Get Tickets
                                </Link>
                            </motion.div>

                            <div className="absolute bottom-8 left-6 right-6">
                                <div className="text-[10px] tracking-[0.2em] text-sumi-400 uppercase">
                                    August 15-16, 2026
                                </div>
                                <div className="mt-1 font-display text-sm font-bold text-sumi-950">
                                    Tokyo Big Sight
                                </div>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
import Link from "next/link";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = {
    quickLinks: [
        { label: "Schedule", href: "/schedule" },
        { label: "Guests", href: "/guests" },
        { label: "Map", href: "/map" },
        { label: "News", href: "/news" },
        { label: "Tickets", href: "/tickets" },
    ],
    social: [
        { label: "Twitter", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "YouTube", href: "#" },
    ],
};

interface FooterProps {
    variant?: "default" | "minimal";
}

export function Footer({ variant = "default" }: FooterProps) {
    if (variant === "minimal") {
        return (
            <footer className="bg-sumi-950 text-washi-100 border-t border-washi-100/10">
                <div className="mx-auto max-w-7xl px-6 md:px-12 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 border border-washi-100/50 flex items-center justify-center font-serif text-sm font-bold">
                                黒
                            </div>
                            <span className="font-display text-sm font-bold">KUROFEST 2026</span>
                        </div>

                        {/* Links */}
                        <nav className="flex gap-6 text-xs tracking-[0.1em] uppercase text-washi-100/50">
                            {FOOTER_LINKS.quickLinks.slice(0, 4).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-washi-100 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Copyright */}
                        <p className="text-xs text-washi-100/30">
                            © 2026 KuroFest
                        </p>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-sumi-950 text-washi-100 border-t border-washi-100/10">
            <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 md:py-20">
                <div className="grid md:grid-cols-12 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 border-2 border-washi-100 flex items-center justify-center font-serif text-xl font-bold">
                                黒
                            </div>
                            <div>
                                <span className="block font-display text-2xl font-bold tracking-tight">
                                    KUROFEST
                                </span>
                                <span className="block text-xs tracking-[0.2em] text-washi-100/50 uppercase">
                                    2026
                                </span>
                            </div>
                        </div>
                        <p className="mt-6 text-sm text-washi-100/50 max-w-sm leading-relaxed">
                            Japan&apos;s premier anime and pop-culture convention, bringing
                            together fans, artists, and creators from around the world.
                        </p>

                        {/* Social links */}
                        <div className="mt-6 flex gap-3">
                            {FOOTER_LINKS.social.map((platform) => (
                                <a
                                    key={platform.label}
                                    href={platform.href}
                                    className={cn(
                                        "px-4 py-2",
                                        "border border-washi-100/20",
                                        "text-[10px] font-semibold tracking-[0.1em] uppercase text-washi-100/50",
                                        "transition-all duration-300",
                                        "hover:border-washi-100 hover:text-washi-100"
                                    )}
                                >
                                    {platform.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3">
                        <h3 className="text-[10px] font-semibold tracking-[0.2em] text-washi-100/30 uppercase mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-washi-100/50 hover:text-washi-100 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-4">
                        <h3 className="text-[10px] font-semibold tracking-[0.2em] text-washi-100/30 uppercase mb-6">
                            Contact & Venue
                        </h3>
                        <ul className="space-y-3 text-sm text-washi-100/50">
                            <li>
                                <a
                                    href="mailto:info@kurofest.jp"
                                    className="hover:text-washi-100 transition-colors"
                                >
                                    info@kurofest.jp
                                </a>
                            </li>
                            <li className="pt-2 border-t border-washi-100/10">
                                <span className="text-washi-100/70">Tokyo Big Sight</span>
                            </li>
                            <li>3-11-1 Ariake, Koto-ku</li>
                            <li>Tokyo 135-0063, Japan</li>
                            <li className="pt-2">
                                <span className="font-mono text-washi-100/70">
                                    Aug 15-16, 2026
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-washi-100/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-washi-100/30">
                        © 2026 KuroFest. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-washi-100/30">
                        <a href="#" className="hover:text-washi-100/60 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-washi-100/60 transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-washi-100/60 transition-colors">
                            Accessibility
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/core/logo";

const QUICK_LINKS = [
    { label: "Schedule", labelJa: "予定", href: "/schedule" },
    { label: "Guests", labelJa: "ゲスト", href: "/guests" },
    { label: "Map", labelJa: "地図", href: "/map" },
    { label: "News", labelJa: "ニュース", href: "/news" },
    { label: "Tickets", labelJa: "チケット", href: "/tickets" },
];

const SOCIAL = [
    { label: "Twitter", labelJa: "X", href: "https://x.com/kurofest" },
    { label: "Instagram", labelJa: "インスタ", href: "https://www.instagram.com/kurofest" },
    { label: "YouTube", labelJa: "ユーチューブ", href: "https://www.youtube.com/@kurofest" },
];

interface FooterProps {
    variant?: "default" | "minimal";
}

export function Footer({ variant = "default" }: FooterProps) {
    if (variant === "minimal") {
        return (
            <footer className="bg-sumi-950 text-washi-100 border-t border-washi-100/10">
                <div className="mx-auto max-w-7xl px-6 md:px-12 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <Logo color="light" size="md" />
                        <nav className="flex gap-6 text-xs tracking-[0.1em] uppercase text-washi-100/50">
                            {QUICK_LINKS.slice(0, 4).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-washi-100 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <p className="text-xs text-washi-100/30">© 2026 KuroFest</p>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-sumi-950 text-washi-100">
            {/* Top accent rule */}
            <div className="h-px bg-washi-100/10" />
            <div className="h-[2px] w-16 bg-shu-600 mx-6 md:mx-12" />

            <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 md:py-20">
                <div className="grid md:grid-cols-12 gap-12">

                    {/* Brand — 4/12 */}
                    <div className="md:col-span-4">
                        <Logo color="light" size="md" />

                        <p className="mt-6 text-sm text-washi-100/50 leading-relaxed">
                            Japan&apos;s premier anime and pop-culture convention.
                            Two days of concerts, panels, and unforgettable encounters.
                        </p>

                        {/* Social — more visible */}
                        <div className="mt-6 flex flex-col gap-2">
                            {SOCIAL.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={cn(
                                        "group flex items-center gap-3",
                                        "text-sm text-washi-100/70 hover:text-washi-100",
                                        "transition-colors duration-300"
                                    )}
                                >
                                    <div className="w-px h-4 bg-washi-100/20 group-hover:bg-shu-600 transition-colors duration-300" />
                                    <span className="font-semibold tracking-wide">{s.label}</span>
                                    <span className="font-serif text-xs text-washi-100/30 group-hover:text-washi-100/50 transition-colors">
                                        {s.labelJa}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links — 3/12 */}
                    <div className="md:col-span-3 md:col-start-6">
                        <h3 className="text-[10px] font-semibold tracking-[0.2em] text-washi-100/30 uppercase mb-6">
                            Navigation
                        </h3>
                        <ul className="space-y-2">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-3 text-sm text-washi-100/50 hover:text-washi-100 transition-colors group"
                                    >
                                        <span className="w-px h-3 bg-washi-100/10 group-hover:bg-shu-600 transition-colors duration-300 shrink-0" />
                                        {link.label}
                                        <span className="font-serif text-xs text-washi-100/20 group-hover:text-washi-100/40 transition-colors ml-auto">
                                            {link.labelJa}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact — 4/12 */}
                    <div className="md:col-span-4 md:col-start-9">
                        <h3 className="text-[10px] font-semibold tracking-[0.2em] text-washi-100/30 uppercase mb-6">
                            Contact & Venue
                        </h3>
                        <ul className="space-y-3 text-sm text-washi-100/50">
                            <li>
                                <a href="mailto:info@kurofest.jp" className="hover:text-washi-100 transition-colors">
                                    info@kurofest.jp
                                </a>
                            </li>
                            <li className="pt-3 border-t border-washi-100/10 space-y-1">
                                <span className="block text-washi-100/70 font-medium">Tokyo Big Sight</span>
                                <span className="block">3-11-1 Ariake, Koto-ku</span>
                                <span className="block">Tokyo 135-0063, Japan</span>
                            </li>
                            <li className="pt-3 font-mono text-xs tracking-wider text-washi-100/30">
                                Aug 15–16, 2026
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-6 border-t border-washi-100/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-sumi-500">
                    <p>© 2026 KuroFest. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-washi-100 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-washi-100 transition-colors">Terms of Service</Link>
                        <Link href="/accessbility" className="hover:text-washi-100 transition-colors">Accessibility</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
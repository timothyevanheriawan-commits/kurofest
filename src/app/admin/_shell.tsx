"use client";

import { createClient } from "@/lib/supabase/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/core/logo";
import {
    LayoutDashboard, Users, Calendar,
    Newspaper, LogOut, Menu, X, ShoppingBag
} from "lucide-react";
import { useState } from "react";
import type { User } from "@supabase/supabase-js";

const ADMIN_NAV = [
    { label: "Dashboard", labelJa: "概要", href: "/admin", icon: LayoutDashboard },
    { label: "Guests", labelJa: "ゲスト", href: "/admin/guests", icon: Users },
    { label: "Orders", labelJa: "注文", href: "/admin/orders", icon: ShoppingBag },
    { label: "Schedule", labelJa: "スケジュール", href: "/admin/schedule", icon: Calendar },
    { label: "News", labelJa: "ニュース", href: "/admin/news", icon: Newspaper },
];

export default function AdminShell({
    children,
    user,
}: {
    children: React.ReactNode;
    user: User;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-washi-200 flex text-sumi-950">
            {/* Mobile toggle */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-sumi-950 text-washi-100 flex items-center justify-center shadow-lg"
                aria-label={open ? "Close menu" : "Open menu"}
            >
                {open ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-sumi-950 text-washi-100",
                "flex flex-col border-r border-sumi-800",
                "transition-transform duration-300",
                open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                {/* Logo */}
                <div className="px-6 py-7 border-b border-sumi-800">
                    <Link href="/admin" onClick={() => setOpen(false)}>
                        <Logo color="light" size="sm" showText />
                    </Link>
                    <div className="mt-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-shu-600 shrink-0" />
                        <span className="text-[10px] font-mono tracking-[0.2em] text-washi-100/40 uppercase">
                            Admin Portal
                        </span>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    {ADMIN_NAV.map(({ label, labelJa, href, icon: Icon }) => {
                        const isActive = pathname === href ||
                            (href !== "/admin" && pathname.startsWith(href));
                        return (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 transition-colors",
                                    "group rounded-none",
                                    isActive
                                        ? "bg-washi-100 text-sumi-950"
                                        : "text-washi-100/50 hover:text-washi-100 hover:bg-sumi-900"
                                )}
                            >
                                <Icon size={16} className="shrink-0" />
                                <span className="text-sm font-medium flex-1">{label}</span>
                                <span className={cn(
                                    "font-serif text-[10px] transition-colors",
                                    isActive ? "text-sumi-400" : "text-washi-100/20 group-hover:text-washi-100/30"
                                )}>
                                    {labelJa}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer: user + sign out */}
                <div className="px-3 py-4 border-t border-sumi-800">
                    <div className="px-3 py-2 mb-1">
                        <p className="text-[10px] text-washi-100/30 uppercase tracking-widest font-mono truncate">
                            {user.email}
                        </p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-shu-400 hover:text-shu-300 hover:bg-sumi-900 transition-colors"
                    >
                        <LogOut size={16} className="shrink-0" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-sumi-950/60 z-30 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Main content */}
            <main className="flex-1 lg:pl-64 min-h-screen">
                <div className="p-6 md:p-10 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
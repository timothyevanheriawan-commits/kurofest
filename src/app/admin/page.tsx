import { createClient } from "@/lib/supabase/supabase-server";
import {
    Users,
    Calendar,
    Newspaper,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Fetch basic counts
    const [
        { count: guestCount },
        { count: eventCount },
        { count: newsCount }
    ] = await Promise.all([
        supabase.from("guests").select("*", { count: "exact", head: true }),
        supabase.from("schedule").select("*", { count: "exact", head: true }),
        supabase.from("news").select("*", { count: "exact", head: true })
    ]);

    const stats = [
        { label: "Guests", value: guestCount || 0, icon: Users, href: "/admin/guests", color: "text-sumi-600" },
        { label: "Schedule Events", value: eventCount || 0, icon: Calendar, href: "/admin/schedule", color: "text-shu-600" },
        { label: "News Articles", value: newsCount || 0, icon: Newspaper, href: "/admin/news", color: "text-sumi-950" },
    ];

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Link
                            key={stat.label}
                            href={stat.href}
                            className="group bg-white border-2 border-sumi-950 p-6 flex flex-col hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2 bg-washi-100 ${stat.color}`}>
                                    <Icon size={24} />
                                </div>
                                <ArrowUpRight className="text-sumi-200 group-hover:text-sumi-950 transition-colors" size={20} />
                            </div>
                            <span className="text-4xl font-black text-sumi-950 mb-1">{stat.value}</span>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-sumi-400">
                                Total {stat.label}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Actions / Recent Activity Placeholder */}
            <div className="grid lg:grid-cols-2 gap-8">
                <section className="bg-white border-2 border-sumi-950 p-8">
                    <h2 className="font-display text-xl font-bold uppercase mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-shu-600" />
                        Quick Actions
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {[
                            { label: "Add New Guest", href: "/admin/guests/new" },
                            { label: "Create Event", href: "/admin/schedule/new" },
                            { label: "Post Update", href: "/admin/news/new" },
                            { label: "View Public Site", href: "/" },
                        ].map((action) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="px-4 py-3 bg-washi-100 border border-sumi-200 text-xs font-bold uppercase tracking-widest hover:bg-sumi-950 hover:text-washi-100 transition-all text-center"
                            >
                                {action.label}
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="bg-white border-2 border-sumi-950 p-8 opacity-50">
                    <h2 className="font-display text-xl font-bold uppercase mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-sumi-300" />
                        System Health
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-sumi-100 pb-2">
                            <span className="text-xs uppercase font-medium text-sumi-400 tracking-wider">Database</span>
                            <span className="text-xs font-bold text-sumi-950">SUPABASE_CONNECTED</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-sumi-100 pb-2">
                            <span className="text-xs uppercase font-medium text-sumi-400 tracking-wider">Auth Status</span>
                            <span className="text-xs font-bold text-sumi-950">SECURE [RLS_ENABLED]</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-sumi-100 pb-2">
                            <span className="text-xs uppercase font-medium text-sumi-400 tracking-wider">Environment</span>
                            <span className="text-xs font-bold text-sumi-950 uppercase">{process.env.NODE_ENV}</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
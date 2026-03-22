import { createClient } from "@/lib/supabase/supabase-server";
import { Plus, Edit, Trash2, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default async function ScheduleAdminPage() {
    const supabase = await createClient();

    const { data: schedule } = await supabase
        .from("schedule")
        .select(`
            *,
            guests (
                name
            )
        `)
        .order("day", { ascending: true })
        .order("time_start", { ascending: true });

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="font-display text-4xl font-black tracking-tight uppercase text-sumi-950">
                        Schedule
                    </h1>
                    <p className="mt-2 font-serif text-lg text-sumi-400">スケジュール管理</p>
                </div>

                <Link
                    href="/admin/schedule/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-shu-600 text-washi-100 text-xs font-bold uppercase tracking-widest hover:bg-shu-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                    <Plus size={16} />
                    Add New Event
                </Link>
            </header>

            {/* Timetable by Day */}
            <div className="grid lg:grid-cols-2 gap-8">
                {[1, 2].map((day) => (
                    <section key={day} className="space-y-4">
                        <h2 className="font-display text-2xl font-black uppercase flex items-center gap-3">
                            <span className="w-8 h-8 bg-sumi-950 text-washi-100 flex items-center justify-center text-sm">
                                {day}
                            </span>
                            Day {day}
                        </h2>

                        <div className="bg-white border-2 border-sumi-950 divide-y-2 divide-sumi-950">
                            {schedule?.filter(item => item.day === day).map((item) => (
                                <div key={item.id} className="p-4 group hover:bg-washi-50 transition-colors relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase text-sumi-400">
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {item.time_start.slice(0, 5)} — {item.time_end.slice(0, 5)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin size={12} />
                                                {item.location}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/admin/schedule/${item.id}`}
                                                className="p-1 hover:text-sumi-950 transition-colors"
                                            >
                                                <Edit size={14} />
                                            </Link>
                                            <button className="p-1 hover:text-shu-600 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-sumi-950 leading-tight">
                                        {item.title}
                                    </h3>
                                    {item.guests && (
                                        <p className="text-xs text-sumi-500 mt-1 font-serif">
                                            feat. {item.guests.name}
                                        </p>
                                    )}
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-[10px] font-bold px-2 py-0.5 border border-sumi-100 uppercase text-sumi-400">
                                            {item.type}
                                        </span>
                                        {item.is_featured && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-shu-100 text-shu-600 uppercase">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {(!schedule || schedule.filter(item => item.day === day).length === 0) && (
                                <div className="p-8 text-center text-sumi-300 text-xs uppercase tracking-widest italic py-12">
                                    No events scheduled
                                </div>
                            )}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

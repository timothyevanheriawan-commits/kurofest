import { createClient } from "@/lib/supabase/supabase-server";
import { upsertEvent } from "../actions";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

export default async function EventEditorPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const isNew = id === "new";
    const supabase = await createClient();

    let event = null;
    if (!isNew) {
        const { data, error } = await supabase
            .from("schedule")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            notFound();
        }
        event = data;
    }

    // Fetch guests for speaker selection
    const { data: guests } = await supabase
        .from("guests")
        .select("id, name")
        .order("name");

    const inputClasses = cn(
        "w-full bg-white border-2 border-sumi-200 px-4 py-2 text-sumi-950 font-medium",
        "focus:border-sumi-950 focus:outline-none transition-colors"
    );

    const labelClasses = "block text-[10px] font-bold tracking-[0.2em] uppercase text-sumi-400 mb-2";

    // Action wrapper to satisfy Next.js form action type
    const formAction = async (formData: FormData) => {
        "use server";
        await upsertEvent(formData);
    };

    return (
        <div className="space-y-8 pb-24">
            <header className="flex items-center gap-6">
                <Link
                    href="/admin/schedule"
                    className="p-2 hover:bg-white border-2 border-transparent hover:border-sumi-950 transition-all"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="font-display text-4xl font-black tracking-tight uppercase text-sumi-950">
                        {isNew ? "Add Event" : "Edit Event"}
                    </h1>
                    <p className="mt-1 font-serif text-lg text-sumi-400">
                        {isNew ? "新規イベント追加" : "イベント情報を編集"}
                    </p>
                </div>
            </header>

            <form action={formAction} className="grid lg:grid-cols-3 gap-8">
                {!isNew && <input type="hidden" name="id" value={event.id} />}

                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white border-2 border-sumi-950 p-8 space-y-6">
                        <h2 className="font-display text-sm font-bold uppercase tracking-widest border-b border-sumi-100 pb-2">
                            Event Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Title (English)</label>
                                <input
                                    name="title"
                                    defaultValue={event?.title}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Title (Japanese)</label>
                                <input
                                    name="title_ja"
                                    defaultValue={event?.title_ja}
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClasses}>Description</label>
                            <textarea
                                name="description"
                                defaultValue={event?.description}
                                rows={4}
                                className={cn(inputClasses, "resize-none")}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Location</label>
                                <input
                                    name="location"
                                    defaultValue={event?.location}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Location (Japanese)</label>
                                <input
                                    name="location_ja"
                                    defaultValue={event?.location_ja}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white border-2 border-sumi-950 p-8 space-y-6">
                        <h2 className="font-display text-sm font-bold uppercase tracking-widest border-b border-sumi-100 pb-2">
                            Speaker & Type
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Primary Speaker</label>
                                <select
                                    name="speaker_id"
                                    defaultValue={event?.speaker_id || ""}
                                    className={inputClasses}
                                >
                                    <option value="">No Speaker / General</option>
                                    {guests?.map(guest => (
                                        <option key={guest.id} value={guest.id}>{guest.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Event Type</label>
                                <select name="type" defaultValue={event?.type} className={inputClasses}>
                                    <option value="performance">Performance</option>
                                    <option value="panel">Panel</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="meetup">Meet & Greet</option>
                                    <option value="dj-set">DJ Set</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="bg-white border-2 border-sumi-950 p-8 space-y-6">
                        <h2 className="font-display text-sm font-bold uppercase tracking-widest border-b border-sumi-100 pb-2">
                            Timing & Status
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClasses}>Day</label>
                                <select name="day" defaultValue={event?.day || 1} className={inputClasses}>
                                    <option value={1}>Day 1</option>
                                    <option value={2}>Day 2</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Capacity</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    defaultValue={event?.capacity}
                                    className={inputClasses}
                                    placeholder="Unlimited"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClasses}>Start Time</label>
                                <input
                                    type="time"
                                    name="time_start"
                                    defaultValue={event?.time_start?.slice(0, 5)}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>End Time</label>
                                <input
                                    type="time"
                                    name="time_end"
                                    defaultValue={event?.time_end?.slice(0, 5)}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 italic">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="is_featured"
                                    defaultChecked={event?.is_featured}
                                    className="w-4 h-4 border-2 border-sumi-950 checked:bg-shu-600 transition-all"
                                />
                                <span className="text-xs font-bold uppercase tracking-widest text-sumi-400 group-hover:text-sumi-950">Featured Event</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="is_live"
                                    defaultChecked={event?.is_live}
                                    className="w-4 h-4 border-2 border-sumi-950 checked:bg-green-600 transition-all"
                                />
                                <span className="text-xs font-bold uppercase tracking-widest text-sumi-400 group-hover:text-sumi-950">Currently Live</span>
                            </label>
                        </div>
                    </section>

                    <div className="sticky top-24 space-y-4">
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-sumi-950 text-washi-100 font-bold uppercase tracking-widest hover:bg-shu-600 transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
                        >
                            <Save size={18} />
                            Save Event
                        </button>

                        {!isNew && (
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-sumi-200 text-sumi-400 font-bold uppercase tracking-widest hover:border-shu-600 hover:text-shu-600 transition-colors"
                            >
                                <Trash2 size={18} />
                                Delete Event
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

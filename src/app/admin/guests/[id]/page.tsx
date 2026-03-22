import { createClient } from "@/lib/supabase/supabase-server";
import { upsertGuest } from "../actions";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

export default async function GuestEditorPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const isNew = id === "new";
    let guest = null;

    if (!isNew) {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("guests")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            notFound();
        }
        guest = data;
    }

    const inputClasses = cn(
        "w-full bg-white border-2 border-sumi-200 px-4 py-2 text-sumi-950 font-medium",
        "focus:border-sumi-950 focus:outline-none transition-colors"
    );

    const labelClasses = "block text-[10px] font-bold tracking-[0.2em] uppercase text-sumi-400 mb-2";

    return (
        <div className="space-y-8 pb-24">
            <header className="flex items-center gap-6">
                <Link
                    href="/admin/guests"
                    className="p-2 hover:bg-white border-2 border-transparent hover:border-sumi-950 transition-all"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="font-display text-4xl font-black tracking-tight uppercase text-sumi-950">
                        {isNew ? "Add Guest" : "Edit Guest"}
                    </h1>
                    <p className="mt-1 font-serif text-lg text-sumi-400">
                        {isNew ? "新規ゲスト追加" : "ゲスト情報を編集"}
                    </p>
                </div>
            </header>

            <form action={async (formData) => {
                "use server";
                await upsertGuest(formData);
            }} className="grid lg:grid-cols-3 gap-8">
                {/* ID Hidden Input */}
                {!isNew && <input type="hidden" name="id" value={guest.id} />}

                {/* Left Column: Core Info */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white border-2 border-sumi-950 p-8 space-y-6">
                        <h2 className="font-display text-sm font-bold uppercase tracking-widest border-b border-sumi-100 pb-2">
                            Basic Profile
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Full Name (English)</label>
                                <input
                                    name="name"
                                    defaultValue={guest?.name}
                                    className={inputClasses}
                                    required
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Full Name (Japanese)</label>
                                <input
                                    name="name_ja"
                                    defaultValue={guest?.name_ja}
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClasses}>URL Slug</label>
                            <input
                                name="slug"
                                defaultValue={guest?.slug}
                                className={inputClasses}
                                placeholder="hikari-nova"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClasses}>Role</label>
                                <select name="role" defaultValue={guest?.role} className={inputClasses}>
                                    <option value="Cosplayer">Cosplayer</option>
                                    <option value="Artist">Artist</option>
                                    <option value="Voice Actor">Voice Actor</option>
                                    <option value="DJ">DJ</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClasses}>Grid Span</label>
                                <select name="span" defaultValue={guest?.span || "small"} className={inputClasses}>
                                    <option value="small">Small Card</option>
                                    <option value="medium">Medium Card</option>
                                    <option value="large">Large Card (Featured)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className={labelClasses}>Tagline</label>
                            <input
                                name="tagline"
                                defaultValue={guest?.tagline}
                                className={inputClasses}
                                placeholder="Award-winning cosplayer..."
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Biography (Markdown)</label>
                            <textarea
                                name="bio"
                                defaultValue={guest?.bio}
                                rows={6}
                                className={cn(inputClasses, "resize-none font-mono text-sm")}
                            />
                        </div>
                    </section>

                    <section className="bg-white border-2 border-sumi-950 p-8 space-y-6">
                        <h2 className="font-display text-sm font-bold uppercase tracking-widest border-b border-sumi-100 pb-2">
                            Social Links
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className={labelClasses}>Twitter</label>
                                <input
                                    name="twitter"
                                    defaultValue={guest?.social_links?.twitter}
                                    className={inputClasses}
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Instagram</label>
                                <input
                                    name="instagram"
                                    defaultValue={guest?.social_links?.instagram}
                                    className={inputClasses}
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>YouTube</label>
                                <input
                                    name="youtube"
                                    defaultValue={guest?.social_links?.youtube}
                                    className={inputClasses}
                                    placeholder="ChannelID"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Sidebar / Meta */}
                <div className="space-y-8">
                    <section className="bg-white border-2 border-sumi-950 p-8 space-y-6">
                        <h2 className="font-display text-sm font-bold uppercase tracking-widest border-b border-sumi-100 pb-2">
                            Image & Stats
                        </h2>

                        <div>
                            <label className={labelClasses}>Image URL</label>
                            <input
                                name="image_url"
                                defaultValue={guest?.image_url}
                                className={inputClasses}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className={labelClasses}>Event Count</label>
                                <input
                                    type="number"
                                    name="stats_events"
                                    defaultValue={guest?.stats?.events || 0}
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Followers (Formatted)</label>
                                <input
                                    name="stats_followers"
                                    defaultValue={guest?.stats?.followers || "0"}
                                    className={inputClasses}
                                    placeholder="e.g. 2.8M"
                                />
                            </div>
                            <div>
                                <label className={labelClasses}>Awards</label>
                                <input
                                    type="number"
                                    name="stats_awards"
                                    defaultValue={guest?.stats?.awards || 0}
                                    className={inputClasses}
                                />
                            </div>
                        </div>
                    </section>

                    <div className="sticky top-24 space-y-4">
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-sumi-950 text-washi-100 font-bold uppercase tracking-widest hover:bg-shu-600 transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
                        >
                            <Save size={18} />
                            Save Changes
                        </button>

                        {!isNew && (
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-sumi-200 text-sumi-400 font-bold uppercase tracking-widest hover:border-shu-600 hover:text-shu-600 transition-colors"
                            >
                                <Trash2 size={18} />
                                Delete Guest
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

import { createClient } from "@/lib/supabase/supabase-server";
import { Plus } from "lucide-react";
import Link from "next/link";
import { deleteGuest } from "./actions";
import GuestsTable from "./_table";

export default async function GuestsAdminPage() {
    const supabase = await createClient();

    const { data: guests } = await supabase
        .from("guests")
        .select("*")
        .order("name", { ascending: true });

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="font-display text-4xl font-black tracking-tight uppercase text-sumi-950">
                        Guests
                    </h1>
                    <p className="mt-1 font-serif text-lg text-sumi-400">ゲスト管理</p>
                </div>
                <Link
                    href="/admin/guests/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-shu-600 text-washi-100 text-xs font-bold uppercase tracking-widest hover:bg-shu-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                    <Plus size={16} />
                    Add New Guest
                </Link>
            </header>

            {/* Client component handles search + delete interactivity */}
            <GuestsTable guests={guests ?? []} deleteAction={deleteGuest} />
        </div>
    );
}
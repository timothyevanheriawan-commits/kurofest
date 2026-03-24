"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2, Search, User, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Guest = {
    id: string;
    name: string;
    name_ja: string;
    slug: string;
    role: string;
    image_url?: string;
};

export default function GuestsTable({
    guests,
    deleteAction,
}: {
    guests: Guest[];
    deleteAction: (id: string) => Promise<{ error?: string; success?: boolean }>;
}) {
    const [query, setQuery] = useState("");
    const [pending, startTransition] = useTransition();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filtered = guests.filter((g) =>
        g.name.toLowerCase().includes(query.toLowerCase()) ||
        g.role.toLowerCase().includes(query.toLowerCase())
    );

    const handleDelete = (id: string, name: string) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
        setDeletingId(id);
        startTransition(async () => {
            const result = await deleteAction(id);
            if (result.error) alert(`Failed: ${result.error}`);
            setDeletingId(null);
        });
    };

    return (
        <>
            {/* Search toolbar */}
            <div className="flex flex-col sm:flex-row bg-white border-2 border-sumi-950 p-4 gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sumi-300" size={16} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or role..."
                        className="w-full pl-10 pr-4 py-2 bg-transparent text-sm focus:outline-none"
                    />
                </div>
                <span className="flex items-center sm:px-4 font-mono text-xs text-sumi-400">
                    {filtered.length} / {guests.length}
                </span>
            </div>

            {/* Table */}
            <div className="bg-white border-2 border-sumi-950">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-sumi-50 border-b-2 border-sumi-950">
                            {["Guest", "Role", "Status", "Actions"].map((h, i) => (
                                <th key={h} className={cn(
                                    "px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-sumi-400",
                                    i === 3 && "text-right"
                                )}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-sumi-100">
                        {filtered.map((guest) => (
                            <tr key={guest.id} className="group hover:bg-washi-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 bg-washi-200 border border-sumi-200 overflow-hidden shrink-0">
                                            {guest.image_url ? (
                                                <Image src={guest.image_url} alt={guest.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <User size={18} className="text-sumi-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sumi-950">{guest.name}</div>
                                            <div className="text-xs text-sumi-400 font-serif">{guest.name_ja}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-bold tracking-wider uppercase text-sumi-600 bg-sumi-100 px-2 py-1">
                                        {guest.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-shu-600" />
                                        <span className="text-xs text-sumi-500">Live</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link
                                            href={`/admin/guests/${guest.id}`}
                                            className="p-2 text-sumi-400 hover:text-sumi-950 hover:bg-sumi-50 transition-colors"
                                            title="Edit"
                                        >
                                            <Edit size={15} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(guest.id, guest.name)}
                                            disabled={deletingId === guest.id || pending}
                                            className="p-2 text-sumi-400 hover:text-shu-600 hover:bg-shu-50 transition-colors disabled:opacity-40"
                                            title="Delete"
                                        >
                                            {deletingId === guest.id
                                                ? <Loader2 size={15} className="animate-spin" />
                                                : <Trash2 size={15} />
                                            }
                                        </button>
                                        <Link
                                            href={`/guests/${guest.slug}`}
                                            target="_blank"
                                            className="p-2 text-sumi-400 hover:text-sumi-950 hover:bg-sumi-50 transition-colors"
                                            title="View public profile"
                                        >
                                            <ExternalLink size={15} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-sumi-400 font-serif italic">
                                    {query ? `No guests matching "${query}"` : "No guests found."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
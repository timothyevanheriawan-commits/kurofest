import { createClient } from "@/lib/supabase/supabase-server";
import { Plus, Edit, Trash2, Calendar as CalendarIcon, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function NewsAdminPage() {
    const supabase = await createClient();

    const { data: news } = await supabase
        .from("news")
        .select("*")
        .order("published_at", { ascending: false });

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="font-display text-4xl font-black tracking-tight uppercase text-sumi-950">
                        News
                    </h1>
                    <p className="mt-2 font-serif text-lg text-sumi-400">ニュース管理</p>
                </div>

                <Link
                    href="/admin/news/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-shu-600 text-washi-100 text-xs font-bold uppercase tracking-widest hover:bg-shu-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                    <Plus size={16} />
                    Create Article
                </Link>
            </header>

            <div className="grid gap-6">
                {news?.map((article) => (
                    <div
                        key={article.id}
                        className="bg-white border-2 border-sumi-950 p-6 flex flex-col md:flex-row gap-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all group"
                    >
                        <div className="relative w-full md:w-48 h-32 bg-washi-100 border border-sumi-200 overflow-hidden shrink-0">
                            {article.image_url ? (
                                <Image
                                    src={article.image_url}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-sumi-200 uppercase font-black text-[10px] tracking-widest">
                                    No Image
                                </div>
                            )}
                        </div>

                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-[10px] font-bold tracking-widest uppercase text-shu-600 flex items-center gap-1">
                                    <Tag size={12} />
                                    {article.category}
                                </span>
                                <span className="text-[10px] font-bold tracking-widest uppercase text-sumi-400 flex items-center gap-1">
                                    <CalendarIcon size={12} />
                                    {new Date(article.published_at).toLocaleDateString("ja-JP")}
                                </span>
                                {article.is_featured && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-sumi-950 text-washi-100 uppercase tracking-tighter">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h2 className="font-display text-xl font-bold text-sumi-950 group-hover:text-shu-600 transition-colors">
                                {article.title}
                            </h2>
                            <p className="text-sm text-sumi-500 mt-2 line-clamp-2 font-serif italic italic-shadow">
                                {article.excerpt}
                            </p>
                        </div>

                        <div className="flex md:flex-col items-center justify-end gap-2 border-t md:border-t-0 md:border-l border-sumi-100 pt-4 md:pt-0 md:pl-6">
                            <Link
                                href={`/admin/news/${article.id}`}
                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 border-2 border-sumi-950 text-[10px] font-bold uppercase tracking-widest hover:bg-sumi-950 hover:text-washi-100 transition-all"
                            >
                                <Edit size={14} />
                                Edit
                            </Link>
                            <button
                                className="flex-1 md:flex-none p-2 text-sumi-300 hover:text-shu-600 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {(!news || news.length === 0) && (
                    <div className="bg-white border-2 border-dashed border-sumi-200 p-20 text-center">
                        <p className="text-sumi-400 font-serif italic">No news articles published yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

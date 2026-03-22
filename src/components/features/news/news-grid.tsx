"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MOCK_NEWS, CATEGORY_LABELS, NewsItem } from "@/lib/mock-news";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar } from "lucide-react";
import { EASING } from "@/lib/motion-config";

type Category = NewsItem["category"] | "all";

const CATEGORIES: Category[] = ["all", "announcement", "guest", "schedule", "tickets"];

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });
}

export function NewsGrid() {
    const [activeCategory, setActiveCategory] = useState<Category>("all");

    const filtered =
        activeCategory === "all"
            ? MOCK_NEWS
            : MOCK_NEWS.filter((item) => item.category === activeCategory);

    const [hero, pair1, pair2, ...rest] = filtered;

    return (
        <div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-4 py-2 text-[10px] font-semibold tracking-[0.15em] uppercase",
                            "border-2 transition-all duration-300",
                            activeCategory === cat
                                ? "bg-sumi-950 text-washi-100 border-sumi-950"
                                : "bg-transparent text-sumi-600 border-sumi-200 hover:border-sumi-950"
                        )}
                    >
                        {cat === "all" ? "All" : CATEGORY_LABELS[cat].en}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: EASING.expoOut }}
                >
                    {filtered.length === 0 && (
                        <p className="py-20 text-center text-sm text-sumi-400">No articles in this category yet.</p>
                    )}

                    {/* ── Hero card (first article) ── */}
                    {hero && <HeroCard item={hero} />}

                    {/* ── Side-by-side pair ── */}
                    {(pair1 || pair2) && (
                        <div className="mt-4 grid sm:grid-cols-2 gap-4">
                            {pair1 && <CompactCard item={pair1} />}
                            {pair2 && <CompactCard item={pair2} />}
                        </div>
                    )}

                    {/* ── Remaining list ── */}
                    {rest.length > 0 && (
                        <div className="mt-4 space-y-4">
                            {rest.map((item, i) => (
                                <ListCard key={item.id} item={item} index={i} />
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────
   HERO CARD — full-width, large image, drop-cap excerpt
───────────────────────────────────────────────────────────────────────── */
function HeroCard({ item }: { item: NewsItem }) {
    const categoryLabel = CATEGORY_LABELS[item.category];

    return (
        <Link
            href={`/news/${item.slug}`}
            className={cn(
                "group relative block overflow-hidden",
                "border-2 border-sumi-950",
                "transition-all duration-300",
                "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            )}
        >
            {/* Image */}
            {item.image ? (
                <div className="relative w-full h-72 md:h-96 overflow-hidden">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        priority
                        className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700"
                    />
                    {/* Gradient overlay so text reads cleanly */}
                    <div className="absolute inset-0 bg-gradient-to-t from-sumi-950/90 via-sumi-950/30 to-transparent" />

                    {/* Floating badges */}
                    <div className="absolute top-0 left-0 flex items-center gap-0">
                        {item.featured && (
                            <span className="px-3 py-2 bg-shu-600 text-washi-100 text-[10px] font-bold tracking-[0.15em] uppercase">
                                Featured
                            </span>
                        )}
                        <span className="px-3 py-2 bg-sumi-950 text-washi-100 text-[10px] font-bold tracking-[0.15em] uppercase">
                            {categoryLabel.en}
                        </span>
                    </div>

                    {/* Title overlaid on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <p className="font-serif text-sm text-washi-100/60 mb-2">{categoryLabel.ja}</p>
                        <h2 className="font-display text-2xl md:text-4xl font-black tracking-tight text-washi-100 leading-tight">
                            {item.title}
                        </h2>
                        <div className="mt-4 flex items-center justify-between">
                            <time className="flex items-center gap-2 text-xs font-mono text-washi-100/50">
                                <Calendar size={12} />
                                {formatDate(item.date)}
                            </time>
                            <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-shu-500">
                                Read More
                                <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                /* Fallback: no image — dark background card */
                <div className="p-8 md:p-12 bg-sumi-950">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-shu-500">
                        {categoryLabel.en}
                    </span>
                    <h2 className="mt-4 font-display text-3xl md:text-4xl font-black tracking-tight text-washi-100">
                        {item.title}
                    </h2>
                    {/* Drop-cap excerpt */}
                    <p className="mt-6 text-base text-washi-100/60 leading-relaxed">
                        <span className="float-left mr-3 font-serif text-5xl font-bold text-shu-600 leading-none mt-1">
                            {item.excerpt.charAt(0)}
                        </span>
                        {item.excerpt.slice(1)}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                        <time className="text-xs font-mono text-washi-100/40">{formatDate(item.date)}</time>
                        <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-shu-500">
                            Read More <ArrowRight size={12} />
                        </span>
                    </div>
                </div>
            )}
        </Link>
    );
}

/* ─────────────────────────────────────────────────────────────────────────
   COMPACT CARD — 50/50 pair, medium image top
───────────────────────────────────────────────────────────────────────── */
function CompactCard({ item }: { item: NewsItem }) {
    const categoryLabel = CATEGORY_LABELS[item.category];

    return (
        <Link
            href={`/news/${item.slug}`}
            className={cn(
                "group flex flex-col overflow-hidden h-full",
                "border-2 border-sumi-200 bg-washi-100",
                "transition-all duration-300",
                "hover:border-sumi-950 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            )}
        >
            {item.image && (
                <div className="relative w-full h-44 overflow-hidden shrink-0">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                </div>
            )}
            <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-2 mb-3">
                    <span className={cn(
                        "px-2 py-1 text-[10px] font-bold tracking-[0.1em] uppercase",
                        item.category === "guest" ? "bg-shu-600 text-washi-100" : "bg-sumi-950 text-washi-100"
                    )}>
                        {categoryLabel.en}
                    </span>
                    <span className="font-serif text-xs text-sumi-400">{categoryLabel.ja}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-sumi-950 leading-tight line-clamp-2">
                    {item.title}
                </h3>
                <p className="mt-2 text-sm text-sumi-600 leading-relaxed line-clamp-2 flex-1">
                    {item.excerpt}
                </p>

                <div className="mt-4 pt-3 border-t border-sumi-100 flex items-center justify-between">
                    <time className="text-[11px] font-mono text-sumi-400">{formatDate(item.date)}</time>
                    <span className="flex items-center gap-1 text-xs font-semibold tracking-[0.1em] uppercase text-shu-600">
                        Read <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

/* ─────────────────────────────────────────────────────────────────────────
   LIST CARD — remaining articles, horizontal layout
───────────────────────────────────────────────────────────────────────── */
function ListCard({ item, index }: { item: NewsItem; index: number }) {
    const categoryLabel = CATEGORY_LABELS[item.category];

    return (
        <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4, ease: EASING.expoOut }}
            className={cn(
                "group border-2 border-sumi-200 bg-washi-100",
                "transition-all duration-300",
                "hover:border-sumi-950 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            )}
        >
            <Link href={`/news/${item.slug}`} className="flex flex-col sm:flex-row">
                {item.image && (
                    <div className="relative w-full sm:w-48 h-40 sm:h-auto shrink-0 overflow-hidden">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                )}
                <div className="flex flex-1 flex-col justify-center p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                            "px-2 py-1 text-[10px] font-bold tracking-[0.1em] uppercase",
                            item.category === "guest" ? "bg-shu-600 text-washi-100" : "bg-sumi-950 text-washi-100"
                        )}>
                            {categoryLabel.en}
                        </span>
                        <time className="text-[11px] font-mono text-sumi-400">{formatDate(item.date)}</time>
                    </div>
                    <h3 className="font-display text-lg font-bold text-sumi-950 leading-snug">
                        {item.title}
                    </h3>
                    <p className="mt-1 font-serif text-sm text-sumi-400">{item.title_ja}</p>
                    <p className="mt-2 text-sm text-sumi-600 leading-relaxed line-clamp-1">{item.excerpt}</p>
                </div>
                <div className="hidden sm:flex items-center pr-6">
                    <ArrowRight size={16} className="text-sumi-300 transition-all duration-300 group-hover:text-shu-600 group-hover:translate-x-1" />
                </div>
            </Link>
        </motion.article>
    );
}
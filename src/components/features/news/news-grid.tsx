"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MOCK_NEWS, CATEGORY_LABELS, NewsItem } from "@/lib/mock-news";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Category = NewsItem["category"] | "all";

export function NewsGrid() {
    const [activeCategory, setActiveCategory] = useState<Category>("all");

    const categories: Category[] = ["all", "announcement", "guest", "schedule", "tickets"];

    const filteredNews =
        activeCategory === "all"
            ? MOCK_NEWS
            : MOCK_NEWS.filter((item) => item.category === activeCategory);

    return (
        <div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
                {categories.map((cat) => (
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

            {/* News Cards */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    className="space-y-6"
                >
                    {filteredNews.map((item, index) => (
                        <NewsCard key={item.id} item={item} index={index} />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
    const categoryLabel = CATEGORY_LABELS[item.category];

    // Format date
    const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className={cn(
                "group border-2 border-sumi-200 bg-washi-100",
                "transition-all duration-300",
                "hover:border-sumi-950 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            )}
        >
            <Link href={`/news/${item.slug}`} className="block">
                <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    {item.image && (
                        <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            {/* Featured badge */}
                            {item.featured && (
                                <div className="absolute top-0 left-0 px-3 py-1.5 bg-shu-600 text-washi-100 text-[10px] font-bold tracking-[0.15em] uppercase">
                                    Featured
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-6">
                        {/* Category Tag - Primary visual */}
                        <div className="flex items-center gap-3 mb-4">
                            <span
                                className={cn(
                                    "px-3 py-1.5",
                                    "text-[10px] font-bold tracking-[0.15em] uppercase",
                                    item.category === "guest"
                                        ? "bg-shu-600 text-washi-100"
                                        : "bg-sumi-950 text-washi-100"
                                )}
                            >
                                {categoryLabel.en}
                            </span>
                            <span className="font-serif text-xs text-sumi-400">
                                {categoryLabel.ja}
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-xl md:text-2xl font-bold text-sumi-950 leading-tight group-hover:text-shu-700 transition-colors">
                            {item.title}
                        </h2>

                        {/* Japanese Title */}
                        <p className="mt-1 font-serif text-sm text-sumi-400">
                            {item.title_ja}
                        </p>

                        {/* Excerpt */}
                        <p className="mt-3 text-sm text-sumi-600 leading-relaxed line-clamp-2">
                            {item.excerpt}
                        </p>

                        {/* Footer - Date moved here, much lighter */}
                        <div className="mt-5 pt-4 border-t border-sumi-100 flex items-center justify-between">
                            {/* Date - Smaller and lighter */}
                            <time
                                dateTime={item.date}
                                className="text-[11px] font-mono text-sumi-400 tracking-wide"
                            >
                                {formattedDate}
                            </time>

                            {/* Read More */}
                            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-shu-600">
                                <span>Read More</span>
                                <ArrowRight
                                    size={12}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getNewsItem, MOCK_NEWS, CATEGORY_LABELS } from "@/lib/mock-news";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/features/layout/footer";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
    return MOCK_NEWS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const item = getNewsItem(slug);

    if (!item) return { title: "News Not Found" };

    return {
        title: item.title,
        description: item.excerpt,
    };
}

export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const item = getNewsItem(slug);

    if (!item) return notFound();

    const categoryLabel = CATEGORY_LABELS[item.category];

    // Format date
    const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Parse content into paragraphs
    const paragraphs = item.content.split("\n\n");

    return (
        <>
            <main className="min-h-screen bg-washi-100 pt-28 pb-24">
                <article className="mx-auto max-w-3xl px-4 md:px-8">
                    {/* Back Link */}
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-sumi-500 hover:text-sumi-950 transition-colors mb-10"
                    >
                        <ArrowLeft size={14} />
                        Back to News
                    </Link>

                    {/* Header */}
                    <header className="mb-10">
                        {/* Category */}
                        <div className="flex items-center gap-3 mb-5">
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
                            <span className="font-serif text-sm text-sumi-400">
                                {categoryLabel.ja}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight text-sumi-950 leading-[1.1]">
                            {item.title}
                        </h1>

                        {/* Japanese Title */}
                        <p className="mt-3 font-serif text-xl text-sumi-400">
                            {item.title_ja}
                        </p>

                        {/* Date - Below title, subtle */}
                        <time
                            dateTime={item.date}
                            className="block mt-6 text-sm font-mono text-sumi-500"
                        >
                            {formattedDate}
                        </time>

                        {/* Divider */}
                        <div className="mt-6 w-20 h-0.5 bg-shu-600" />
                    </header>

                    {/* Featured Image */}
                    {item.image && (
                        <div className="relative w-full aspect-video mb-12 border-2 border-sumi-950 overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Content - Editorial Typography */}
                    <div className="prose-custom">
                        {paragraphs.map((paragraph, idx) => {
                            // Check for bold headers (markdown style)
                            if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                                return (
                                    <h3
                                        key={idx}
                                        className="font-display text-xl font-bold text-sumi-950 mt-10 mb-4"
                                    >
                                        {paragraph.replace(/\*\*/g, "")}
                                    </h3>
                                );
                            }

                            // Check for list items
                            if (paragraph.includes("\n- ")) {
                                const lines = paragraph.split("\n");
                                const title = lines[0].replace(/\*\*/g, "");
                                const items = lines.slice(1).filter((line) => line.startsWith("- "));

                                return (
                                    <div key={idx} className="mt-8 mb-6">
                                        {title && (
                                            <h3 className="font-display text-lg font-bold text-sumi-950 mb-4">
                                                {title}
                                            </h3>
                                        )}
                                        <ul className="space-y-2 pl-0">
                                            {items.map((line, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-3 text-sumi-700 leading-relaxed"
                                                >
                                                    <span className="mt-2 w-1.5 h-1.5 bg-shu-600 shrink-0" />
                                                    <span>{line.replace("- ", "")}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            }

                            // Regular paragraph - with drop cap for first one
                            if (idx === 0) {
                                const firstLetter = paragraph.charAt(0);
                                const restOfParagraph = paragraph.slice(1);

                                return (
                                    <p
                                        key={idx}
                                        className="text-lg text-sumi-700 leading-[1.9] mb-6"
                                    >
                                        <span
                                            className={cn(
                                                "float-left mr-3 mt-1",
                                                "font-serif text-5xl font-bold text-sumi-950",
                                                "leading-none"
                                            )}
                                        >
                                            {firstLetter}
                                        </span>
                                        {restOfParagraph}
                                    </p>
                                );
                            }

                            return (
                                <p
                                    key={idx}
                                    className="text-base md:text-lg text-sumi-700 leading-[1.9] mb-6"
                                >
                                    {paragraph}
                                </p>
                            );
                        })}
                    </div>

                    {/* Share Section */}
                    <div className="mt-16 pt-8 border-t-2 border-sumi-200">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <span className="text-sm text-sumi-500">Share this article</span>
                            <div className="flex gap-2">
                                {["Twitter", "Facebook", "LINE"].map((platform) => (
                                    <button
                                        key={platform}
                                        className={cn(
                                            "px-4 py-2",
                                            "border-2 border-sumi-200",
                                            "text-[10px] font-semibold tracking-[0.15em] uppercase text-sumi-600",
                                            "transition-all duration-300",
                                            "hover:bg-sumi-950 hover:text-washi-100 hover:border-sumi-950"
                                        )}
                                    >
                                        {platform}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Related Articles Placeholder */}
                    <div className="mt-16 pt-8 border-t border-sumi-200">
                        <h2 className="text-[10px] font-semibold tracking-[0.2em] text-sumi-400 uppercase mb-6">
                            More News
                        </h2>
                        <div className="flex gap-4">
                            {MOCK_NEWS.filter((n) => n.slug !== slug)
                                .slice(0, 2)
                                .map((related) => (
                                    <Link
                                        key={related.id}
                                        href={`/news/${related.slug}`}
                                        className="flex-1 p-4 border border-sumi-200 hover:border-sumi-950 transition-colors"
                                    >
                                        <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-shu-600">
                                            {CATEGORY_LABELS[related.category].en}
                                        </span>
                                        <h3 className="mt-2 font-display font-bold text-sumi-950 line-clamp-2">
                                            {related.title}
                                        </h3>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </>
    );
}
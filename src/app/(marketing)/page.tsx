import { HeroSection } from "@/components/features/hero/hero-section";
import { GuestGrid } from "@/components/features/guests/guest-grid";
import { CountdownTimer } from "@/components/features/countdown/countdown-timer";
import { FAQSection } from "@/components/features/faq/faq-section";
import { MarqueeDivider } from "@/components/ui/marquee-divider";
import { TextReveal, SlideReveal } from "@/components/ui/text-reveal";
import { CTAButton } from "@/components/ui/cta-button";
import { getFeaturedNews, MOCK_NEWS } from "@/lib/mock-news";
import { getFeaturedEvents } from "@/lib/mock-schedule";
import { Footer } from "@/components/features/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MarketingPage() {
    const featuredNews = getFeaturedNews();
    // Hero news card = first featured item; side list = next 3 from all news
    const heroNews = featuredNews[0] ?? MOCK_NEWS[0];
    const sideNews = MOCK_NEWS.filter((n) => n.id !== heroNews?.id).slice(0, 3);
    const featuredEvents = getFeaturedEvents().slice(0, 4);

    return (
        <>
            {/* ── 1. Hero ─────────────────────────────────────────────────── */}
            <HeroSection />

            {/* ── 2. Countdown — flows directly from hero (same bg) ─────── */}
            <section className="bg-sumi-950 border-t border-washi-100/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 py-12 md:py-16">
                        <div>
                            <span className="text-[10px] font-semibold tracking-[0.4em] text-washi-100/30 uppercase">
                                開催まであと — Event Starts In
                            </span>
                            <div className="mt-4 flex items-center gap-4">
                                <div className="w-1 h-10 bg-shu-600 shrink-0" />
                                <div>
                                    <p className="font-display text-2xl md:text-3xl font-black text-washi-100 leading-tight">
                                        August 15–16, 2026
                                    </p>
                                    <p className="font-serif text-washi-100/40 mt-1">
                                        Tokyo Big Sight — East Hall 1–8
                                    </p>
                                </div>
                            </div>
                        </div>
                        <CountdownTimer />
                    </div>
                </div>
            </section>

            {/* ── 3. Guest showcase ───────────────────────────────────────── */}
            <section className="bg-washi-100 py-24 md:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
                    <header className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <SlideReveal>
                                <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase">
                                    Featured Artists
                                </span>
                            </SlideReveal>
                            <TextReveal
                                as="h2"
                                className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-sumi-950"
                            >
                                Special Guests
                            </TextReveal>
                            <SlideReveal delay={0.2}>
                                <p className="mt-2 font-serif text-xl md:text-2xl text-sumi-400">特別ゲスト</p>
                            </SlideReveal>
                            <SlideReveal delay={0.3}>
                                <div className="mt-4 w-20 h-0.5 bg-shu-600" />
                            </SlideReveal>
                        </div>
                        <SlideReveal delay={0.2} direction="left">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-sumi-950 flex flex-col items-center justify-center">
                                    <span className="font-display text-3xl md:text-4xl font-black text-sumi-950">6</span>
                                    <span className="text-[8px] md:text-[10px] tracking-[0.2em] text-sumi-500 uppercase">Guests</span>
                                </div>
                                <CTAButton href="/guests" variant="outline" size="lg">
                                    View All
                                    <ArrowRight size={14} className="ml-2" />
                                </CTAButton>
                            </div>
                        </SlideReveal>
                    </header>
                    <GuestGrid />
                </div>
            </section>

            {/* ── 4. Accent marquee ───────────────────────────────────────── */}
            <MarqueeDivider
                items={["COSPLAY", "PANELS", "CONCERTS", "ARTIST ALLEY", "MEET & GREET"]}
                variant="accent"
                speed={20}
            />

            {/* ── 5. Stats — inline row, numbers natural size ─────────────── */}
            <section className="bg-sumi-950 text-washi-100 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 pt-20 md:pt-28">
                    <SlideReveal>
                        <span className="text-[10px] font-semibold tracking-[0.4em] text-washi-100/30 uppercase">
                            About the Event
                        </span>
                    </SlideReveal>
                    <TextReveal
                        as="p"
                        delay={0.1}
                        className="mt-6 font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed text-washi-100/80 max-w-3xl"
                    >
                        {"Japan's premier celebration of anime, manga, and pop culture."}
                    </TextReveal>
                </div>

                <div className="mt-12 md:mt-16 border-t border-washi-100/10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-10 md:py-14">
                        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-x-8 sm:gap-x-14 md:gap-x-20 gap-y-8">
                            {[
                                { value: "50+", label: "Guests", labelJa: "ゲスト" },
                                { value: "100+", label: "Events", labelJa: "イベント" },
                                { value: "2", label: "Days", labelJa: "日間" },
                                { value: "30K+", label: "Attendees", labelJa: "来場者" },
                            ].map((stat, i) => (
                                <SlideReveal key={stat.label} delay={i * 0.08}>
                                    <div className="flex flex-col">
                                        <span className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-shu-500 leading-none tabular-nums">
                                            {stat.value}
                                        </span>
                                        <div className="mt-2">
                                            <span className="block text-[11px] tracking-[0.2em] uppercase text-washi-100/50 leading-tight">
                                                {stat.label}
                                            </span>
                                            <span className="block font-serif text-xs text-washi-100/20 mt-0.5">
                                                {stat.labelJa}
                                            </span>
                                        </div>
                                    </div>
                                </SlideReveal>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-14 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-t border-washi-100/10">
                    <SlideReveal>
                        <p className="font-serif text-lg text-washi-100/40">
                            日本最大のアニメ・漫画・ポップカルチャーの祭典
                        </p>
                    </SlideReveal>
                    <SlideReveal delay={0.15} direction="left">
                        <CTAButton href="/tickets" variant="primary" size="lg">
                            Get Your Pass
                            <ArrowRight size={14} className="ml-2" />
                        </CTAButton>
                    </SlideReveal>
                </div>
            </section>

            {/* ── 6. Featured events — visible cards on dark bg ───────────── */}
            <section className="bg-sumi-900 border-t border-sumi-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-16 md:py-20">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
                        <div>
                            <span className="text-[10px] font-semibold tracking-[0.4em] text-washi-100/30 uppercase">
                                Programme
                            </span>
                            <TextReveal
                                as="h2"
                                className="mt-2 font-display text-3xl md:text-4xl font-black tracking-tight text-washi-100"
                            >
                                Featured Events
                            </TextReveal>
                            <SlideReveal delay={0.1}>
                                <p className="mt-1 font-serif text-washi-100/40">注目イベント</p>
                            </SlideReveal>
                        </div>
                        <SlideReveal direction="left">
                            <Link
                                href="/schedule"
                                className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-washi-100/40 hover:text-washi-100 transition-colors"
                            >
                                Full Schedule <ArrowRight size={12} />
                            </Link>
                        </SlideReveal>
                    </div>

                    {/* Cards — solid borders, visible on dark bg */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {featuredEvents.map((event, i) => (
                            <SlideReveal key={event.id} delay={i * 0.07}>
                                <Link
                                    href="/schedule"
                                    className={cn(
                                        "group flex flex-col h-full p-5",
                                        "border-2 border-sumi-700 bg-sumi-800",
                                        "hover:border-shu-600 hover:bg-sumi-700",
                                        "transition-all duration-300",
                                        "shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)]",
                                        "hover:shadow-[4px_4px_0px_0px] hover:shadow-shu-600/30"
                                    )}
                                >
                                    {/* Time + day row */}
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-mono text-xs font-bold text-shu-500 tracking-wider">
                                            {event.time_start}
                                        </span>
                                        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 bg-sumi-950 text-washi-100/40">
                                            Day {event.day}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-display text-base md:text-lg font-black text-washi-100 leading-tight flex-1">
                                        {event.title}
                                    </h3>

                                    {event.title_ja && (
                                        <p className="mt-1 font-serif text-xs text-washi-100/30">
                                            {event.title_ja}
                                        </p>
                                    )}

                                    {/* Footer row */}
                                    <div className="mt-4 pt-3 border-t border-sumi-700 group-hover:border-shu-600/30 transition-colors flex items-center justify-between">
                                        <span className="text-xs text-washi-100/50 font-medium truncate">
                                            {event.location}
                                        </span>
                                        <ArrowRight
                                            size={12}
                                            className="text-washi-100/20 group-hover:text-shu-500 group-hover:translate-x-1 transition-all duration-300 shrink-0 ml-2"
                                        />
                                    </div>
                                </Link>
                            </SlideReveal>
                        ))}
                    </div>

                    <div className="mt-6 flex md:hidden">
                        <Link
                            href="/schedule"
                            className="flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-washi-100/40 hover:text-washi-100 transition-colors"
                        >
                            Full Schedule <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── 7. News — editorial layout ──────────────────────────────── */}
            <section className="bg-washi-100 py-24 md:py-32">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
                    <header className="mb-12 md:mb-16 flex gap-6 items-start">
                        <div className="hidden md:block w-px self-stretch bg-sumi-200 shrink-0" />
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                                <div>
                                    <SlideReveal>
                                        <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase">
                                            Latest Updates
                                        </span>
                                    </SlideReveal>
                                    <TextReveal
                                        as="h2"
                                        className="mt-3 font-display text-4xl md:text-5xl font-black tracking-tight text-sumi-950"
                                    >
                                        News
                                    </TextReveal>
                                    <SlideReveal delay={0.1}>
                                        <p className="mt-2 font-serif text-xl text-sumi-400">お知らせ</p>
                                    </SlideReveal>
                                    <SlideReveal delay={0.2}>
                                        <div className="mt-4 w-16 h-0.5 bg-shu-600" />
                                    </SlideReveal>
                                </div>
                                <SlideReveal delay={0.15} direction="left">
                                    <Link
                                        href="/news"
                                        className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-sumi-400 hover:text-sumi-950 transition-colors"
                                    >
                                        All News <ArrowRight size={12} />
                                    </Link>
                                </SlideReveal>
                            </div>
                        </div>
                    </header>

                    {heroNews && (
                        <div className="grid md:grid-cols-5 gap-4 md:gap-6">
                            {/* Hero card — 3 cols */}
                            <div className="md:col-span-3">
                                <SlideReveal>
                                    <Link
                                        href={`/news/${heroNews.slug}`}
                                        className={cn(
                                            "group block h-full",
                                            "border-2 border-sumi-200 bg-washi-100",
                                            "transition-all duration-300",
                                            "hover:border-sumi-950 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                                        )}
                                    >
                                        {heroNews.image && (
                                            <div className="relative h-64 md:h-80 overflow-hidden">
                                                <Image
                                                    src={heroNews.image}
                                                    alt={heroNews.title}
                                                    fill
                                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                />
                                                <div className="absolute top-0 left-0 px-3 py-1.5 bg-shu-600 text-washi-100 text-[10px] font-bold tracking-[0.15em] uppercase">
                                                    Featured
                                                </div>
                                            </div>
                                        )}
                                        <div className="p-6 md:p-8">
                                            <h3 className="font-display text-2xl md:text-3xl font-black text-sumi-950 leading-tight">
                                                {heroNews.title}
                                            </h3>
                                            <p className="mt-3 text-sm text-sumi-600 leading-relaxed line-clamp-3">
                                                {heroNews.excerpt}
                                            </p>
                                            <div className="mt-5 flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-shu-600">
                                                Read More
                                                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </Link>
                                </SlideReveal>
                            </div>

                            {/* Side list — 2 cols */}
                            <div className="md:col-span-2 flex flex-col gap-3">
                                {sideNews.map((item, i) => (
                                    <SlideReveal key={item.id} delay={i * 0.08}>
                                        <Link
                                            href={`/news/${item.slug}`}
                                            className={cn(
                                                "group flex gap-4 p-4 flex-1",
                                                "border-2 border-sumi-200 bg-washi-100",
                                                "transition-all duration-300",
                                                "hover:border-sumi-950 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                            )}
                                        >
                                            {item.image && (
                                                <div className="relative w-20 h-20 shrink-0 overflow-hidden">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex flex-col justify-between min-w-0 flex-1">
                                                <h4 className="font-display font-bold text-sumi-950 leading-tight line-clamp-2 text-sm">
                                                    {item.title}
                                                </h4>
                                                <div className="flex items-center gap-1 mt-2 text-xs font-semibold tracking-[0.1em] uppercase text-shu-600">
                                                    Read <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>
                                    </SlideReveal>
                                ))}

                                <SlideReveal delay={0.25}>
                                    <Link
                                        href="/news"
                                        className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-sumi-200 text-xs font-semibold tracking-[0.15em] uppercase text-sumi-400 hover:border-sumi-950 hover:text-sumi-950 transition-all"
                                    >
                                        All News <ArrowRight size={12} />
                                    </Link>
                                </SlideReveal>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── 8. Ticket CTA ───────────────────────────────────────────── */}
            <section className="bg-sumi-950 border-t-2 border-shu-600 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12 py-20 md:py-28">
                    <div className="grid md:grid-cols-3 gap-8 md:gap-0 items-start">
                        <div className="md:col-span-1 md:border-r border-washi-100/10 md:pr-12">
                            <TextReveal
                                as="h2"
                                className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-washi-100 leading-none"
                            >
                                {"Secure\nYour Pass"}
                            </TextReveal>
                            <SlideReveal delay={0.2}>
                                <p className="mt-4 font-serif text-lg text-washi-100/40">
                                    入場券を確保する
                                </p>
                                <div className="mt-6 w-16 h-0.5 bg-shu-600" />
                            </SlideReveal>
                        </div>

                        <div className="md:col-span-2 md:pl-12">
                            <div className="space-y-3">
                                {[
                                    { name: "Standard Pass", nameJa: "一般入場券", price: "¥8,500", features: "2-Day Access · Exhibition Hall · Main Stage", highlight: false },
                                    { name: "Premium Pass", nameJa: "プレミアムパス", price: "¥15,000", features: "Priority Entry · Meet & Greet · Merch Pack", highlight: true },
                                    { name: "VIP Pass", nameJa: "VIPパス", price: "¥35,000", features: "Backstage Tour · Private Lounge · Signed Poster", highlight: false },
                                ].map((tier, i) => (
                                    <SlideReveal key={tier.name} delay={i * 0.08}>
                                        <Link
                                            href="/tickets"
                                            className={cn(
                                                "group flex flex-col sm:flex-row sm:items-center sm:justify-between p-5 border-2 transition-all duration-300",
                                                tier.highlight
                                                    ? "border-shu-600 bg-shu-600/10 hover:bg-shu-600/20"
                                                    : "border-washi-100/10 hover:border-washi-100/30"
                                            )}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                {tier.highlight && (
                                                    <span className="shrink-0 text-[9px] font-bold tracking-[0.1em] uppercase bg-shu-600 text-washi-100 px-2 py-1">
                                                        Popular
                                                    </span>
                                                )}
                                                <div className="min-w-0">
                                                    <span className="block font-display font-black text-washi-100 text-lg leading-none">
                                                        {tier.name}
                                                    </span>
                                                    <span className="block font-serif text-xs text-washi-100/40 mt-0.5 leading-relaxed">
                                                        {tier.features}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 mt-4 sm:mt-0 border-t sm:border-t-0 border-washi-100/5 pt-4 sm:pt-0">
                                                <span className="font-mono text-xl font-bold text-washi-100">
                                                    {tier.price}
                                                </span>
                                                <ArrowRight
                                                    size={16}
                                                    className="text-washi-100/20 group-hover:text-shu-500 group-hover:translate-x-1 transition-all duration-300"
                                                />
                                            </div>
                                        </Link>
                                    </SlideReveal>
                                ))}
                            </div>

                            <SlideReveal delay={0.3}>
                                <div className="mt-10 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                                    <p className="text-[10px] sm:text-xs text-washi-100/30 font-mono">
                                        Early Bird ends July 31 · All sales final
                                    </p>
                                    <CTAButton href="/tickets" variant="primary" size="lg" className="w-full sm:w-auto">
                                        Buy Tickets
                                        <ArrowRight size={14} className="ml-2" />
                                    </CTAButton>
                                </div>
                            </SlideReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 9. FAQ ──────────────────────────────────────────────────── */}
            <FAQSection />

            {/* ── 10. Closing marquee ─────────────────────────────────────── */}
            <MarqueeDivider
                items={["SEE YOU IN TOKYO", "東京で会いましょう", "KUROFEST 2026"]}
                variant="light"
                speed={30}
            />

            <Footer />
        </>
    );
}
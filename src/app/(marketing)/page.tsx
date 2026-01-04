import { HeroSection } from "@/components/features/hero/hero-section";
import { GuestGrid } from "@/components/features/guests/guest-grid";
import { CountdownTimer } from "@/components/features/countdown/countdown-timer";
import { FAQSection } from "@/components/features/faq/faq-section";
import { MarqueeDivider } from "@/components/ui/marquee-divider";
import { TextReveal, SlideReveal } from "@/components/ui/text-reveal";
import { MagneticCTA } from "@/components/ui/magnetic-button";
import { getFeaturedNews } from "@/lib/mock-news";
import { Footer } from "@/components/features/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MarketingPage() {
    const featuredNews = getFeaturedNews();

    return (
        <>
            <HeroSection />


            {/* Countdown Section */}
            <section className="bg-sumi-950 py-16 md:py-24">
                <div className="mx-auto max-w-4xl px-6 text-center">
                    <SlideReveal>
                        <div className="flex justify-center items-center gap-6 mb-8">
                            <div className="w-px h-12 bg-washi-100/20" />
                            <span className="font-serif text-lg md:text-xl text-washi-100/50 writing-vertical-lr">
                                開催まであと
                            </span>
                            <div className="w-px h-12 bg-washi-100/20" />
                        </div>
                    </SlideReveal>

                    <SlideReveal delay={0.1}>
                        <span className="text-[10px] md:text-xs font-semibold tracking-[0.4em] text-washi-100/40 uppercase">
                            Event Starts In
                        </span>
                    </SlideReveal>

                    <div className="mt-8 flex justify-center">
                        <CountdownTimer />
                    </div>
                </div>
            </section>

            {/* Guest Showcase */}
            <section className="bg-washi-100 py-24 md:py-32">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <header className="mb-12 md:mb-16">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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
                                    <p className="mt-2 font-serif text-xl md:text-2xl text-sumi-400">
                                        特別ゲスト
                                    </p>
                                </SlideReveal>

                                <SlideReveal delay={0.3}>
                                    <div className="mt-4 w-20 h-0.5 bg-shu-600" />
                                </SlideReveal>
                            </div>

                            <SlideReveal delay={0.2} direction="left">
                                <div className="w-20 h-20 md:w-24 md:h-24 border-2 border-sumi-950 flex flex-col items-center justify-center">
                                    <span className="font-display text-3xl md:text-4xl font-black text-sumi-950">
                                        6
                                    </span>
                                    <span className="text-[8px] md:text-[10px] tracking-[0.2em] text-sumi-500 uppercase">
                                        Guests
                                    </span>
                                </div>
                            </SlideReveal>
                        </div>
                    </header>

                    <GuestGrid />

                    <div className="mt-12 flex justify-end">
                        <MagneticCTA href="/guests" variant="outline" size="lg" suppressHydrationWarning
>
                            View All Guests
                            <ArrowRight size={16} className="ml-2" />
                        </MagneticCTA>
                    </div>
                </div>
            </section>

            {/* Marquee - Energy Break */}
            <MarqueeDivider
                items={["COSPLAY", "PANELS", "CONCERTS", "ARTIST ALLEY", "MEET & GREET"]}
                variant="accent" // This will now work perfectly
                speed={20}
            />

            {/* Latest News */}
            {/* Latest News */}
            <section className="bg-washi-200 py-24 md:py-32">
                <div className="mx-auto max-w-5xl px-6 md:px-12">
                    {/* FIX: Use flex-col + items-center for strict physical centering */}
                    <header className="flex flex-col items-center text-center mb-12 md:mb-16">
                        <SlideReveal>
                            {/* FIX: Added pl-[0.4em] to balance the tracking-[0.4em] */}
                            <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase pl-[0.4em]">
                                Latest Updates
                            </span>
                        </SlideReveal>

                        <TextReveal
                            as="h2"
                            className="mt-3 font-display text-4xl md:text-5xl font-black tracking-tight text-sumi-950"
                        >
                            News
                        </TextReveal>

                        <SlideReveal delay={0.2}>
                            {/* FIX: Added tracking-widest for style + pl-[0.2em] to center it */}
                            <p className="mt-2 font-serif text-xl text-sumi-400 tracking-widest pl-[0.2em]">
                                お知らせ
                            </p>
                        </SlideReveal>

                        <SlideReveal delay={0.3}>
                            <div className="mt-4 mx-auto w-16 h-0.5 bg-shu-600" />
                        </SlideReveal>
                    </header>

                    <div className="grid md:grid-cols-2 gap-6">
                        {featuredNews.slice(0, 2).map((item, index) => (
                            <SlideReveal key={item.id} delay={index * 0.1}>
                                <Link
                                    href={`/news/${item.slug}`}
                                    data-cursor="Read"
                                    className={cn(
                                        "group block h-full",
                                        "border-2 border-sumi-200 bg-washi-100",
                                        "transition-all duration-300",
                                        "hover:border-sumi-950 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                    )}
                                >
                                    {item.image && (
                                        <div className="relative h-48 md:h-56 overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                            />
                                            {item.featured && (
                                                <div className="absolute top-0 left-0 px-3 py-1.5 bg-shu-600 text-washi-100 text-[10px] font-bold tracking-[0.15em] uppercase">
                                                    Featured
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-xs text-sumi-400 mb-3">
                                            <Calendar size={12} />
                                            {new Date(item.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </div>
                                        <h3 className="font-display text-xl font-bold text-sumi-950 leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-sumi-600 line-clamp-2">
                                            {item.excerpt}
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-shu-600">
                                            <span>Read More</span>
                                            <ArrowRight
                                                size={12}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </SlideReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* About / Stats Section */}
            <section className="bg-sumi-950 text-washi-100 py-24 md:py-32">
                <div className="mx-auto max-w-5xl px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div>
                            <SlideReveal>
                                <span className="text-[10px] font-semibold tracking-[0.4em] text-washi-100/40 uppercase">
                                    About the Event
                                </span>
                            </SlideReveal>

                            <TextReveal
                                as="h2"
                                delay={0.1}
                                className="mt-6 font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-washi-100/90"
                            >
                                {"Japan's premier celebration of anime, manga, and pop culture."}
                            </TextReveal>

                            <SlideReveal delay={0.3}>
                                <p className="mt-4 text-base text-washi-100/60 leading-relaxed">
                                    Two days of world-class performances, insightful panels, exclusive
                                    merchandise, and unforgettable experiences with fellow fans from
                                    around the globe.
                                </p>
                            </SlideReveal>

                            <SlideReveal delay={0.4}>
                                <p className="mt-4 font-serif text-lg text-washi-100/40">
                                    日本最大のアニメ・漫画・ポップカルチャーの祭典
                                </p>
                            </SlideReveal>

                            <SlideReveal delay={0.5}>
                                <div className="mt-8 w-20 h-0.5 bg-shu-600" />
                            </SlideReveal>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 md:gap-8">
                            {[
                                { value: "50+", label: "Guests", labelJa: "ゲスト" },
                                { value: "100+", label: "Events", labelJa: "イベント" },
                                { value: "2", label: "Days", labelJa: "日間" },
                                { value: "30K+", label: "Attendees", labelJa: "来場者" },
                            ].map((stat, index) => (
                                <SlideReveal key={stat.label} delay={0.1 * index}>
                                    <div className="text-center md:text-left">
                                        <span className="block font-display text-5xl md:text-6xl lg:text-7xl font-black text-shu-500">
                                            {stat.value}
                                        </span>
                                        <span className="block mt-2 text-[10px] md:text-xs tracking-[0.2em] uppercase text-washi-100/50">
                                            {stat.label}
                                        </span>
                                        <span className="block font-serif text-sm text-washi-100/30">
                                            {stat.labelJa}
                                        </span>
                                    </div>
                                </SlideReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQSection />

            {/* Newsletter Section */}
            <section className="bg-washi-100 py-24 border-t-2 border-sumi-200">
                <div className="mx-auto max-w-xl px-6 text-center">
                    <SlideReveal>
                        <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase">
                            Stay Updated
                        </span>
                    </SlideReveal>

                    <TextReveal
                        as="h2"
                        className="mt-3 font-display text-3xl md:text-4xl font-black tracking-tight text-sumi-950"
                    >
                        Newsletter
                    </TextReveal>

                    <SlideReveal delay={0.2}>
                        <p className="mt-2 font-serif text-lg text-sumi-400">
                            ニュースレター
                        </p>
                        <p className="mt-4 text-sm text-sumi-600">
                            Be the first to know about guest announcements, schedule updates, and
                            exclusive offers.
                        </p>
                    </SlideReveal>

                    <SlideReveal delay={0.3}>
                        <form className="mt-8 flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className={cn(
                                    "flex-1 px-0 py-4",
                                    "bg-transparent",
                                    "border-0 border-b-2 border-sumi-300",
                                    "text-sumi-950 placeholder:text-sumi-400",
                                    "focus:border-sumi-950 focus:outline-none",
                                    "transition-colors duration-300",
                                    "text-center sm:text-left"
                                )}
                                required
                            />
                            <MagneticCTA
                                variant="secondary"
                                size="lg"
                                suppressHydrationWarning
                            >
                                Subscribe
                            </MagneticCTA>
                        </form>
                    </SlideReveal>

                    <SlideReveal delay={0.4}>
                        <p className="mt-4 text-xs text-sumi-400">
                            No spam. Unsubscribe anytime.
                        </p>
                    </SlideReveal>
                </div>
            </section>

            {/* Final Marquee */}
            <MarqueeDivider
                items={["SEE YOU IN TOKYO", "東京で会いましょう", "KUROFEST 2026"]}
                variant="light"
                speed={30}
            />

            <Footer />
        </>
    );
}
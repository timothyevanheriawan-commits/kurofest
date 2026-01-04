import type { Metadata } from "next";
import { Footer } from "@/components/features/layout/footer";
import { SlideReveal, TextReveal } from "@/components/ui/text-reveal";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Rules and regulations for KuroFest 2026",
};

export default function TermsPage() {
    const terms = [
        {
            id: "01",
            title: "Ticket Validity",
            titleJa: "チケットの有効性",
            content: "Each ticket is unique and tied to a digital confirmation code. Transfer of tickets is only permitted through our official platform. Counterfeit tickets will be denied entry without refund."
        },
        {
            id: "02",
            title: "Code of Conduct",
            titleJa: "行動規範",
            content: "KuroFest is a safe space for all fans. Harassment, unauthorized professional photography, or props that violate our weapon safety policy are strictly prohibited."
        },
        {
            id: "03",
            title: "Media Release",
            titleJa: "メディア掲載",
            content: "By entering the venue, you acknowledge that you may be filmed or photographed as part of the event atmosphere for promotional purposes by KuroFest 2026."
        }
    ];

    return (
        <>
            <main className="min-h-screen bg-washi-100 px-6 pt-32 pb-24 md:px-12">
                <div className="mx-auto max-w-4xl">
                    <header className="mb-16 border-b-2 border-sumi-950 pb-12">
                        <SlideReveal>
                            <span className="font-mono text-xs tracking-[0.3em] text-sumi-400 uppercase">
                                User Agreement / T-01
                            </span>
                        </SlideReveal>
                        <TextReveal as="h1" className="mt-4 text-5xl md:text-7xl font-black uppercase tracking-tighter text-sumi-950">
                            Terms of Service
                        </TextReveal>
                        <p className="mt-4 font-serif text-2xl text-sumi-400 tracking-widest pl-[0.1em]">
                            利用規約
                        </p>
                    </header>

                    <div className="space-y-16">
                        {terms.map((item) => (
                            <SlideReveal key={item.id}>
                                <section className="grid md:grid-cols-12 gap-8">
                                    <div className="md:col-span-3">
                                        <span className="font-mono text-4xl font-bold text-shu-600/20">
                                            {item.id}
                                        </span>
                                    </div>
                                </section>
                                <div className="md:col-span-9">
                                    <h2 className="text-xl font-bold text-sumi-950 uppercase tracking-wide">
                                        {item.title}
                                    </h2>
                                    <p className="font-serif text-sm text-sumi-400 mt-1">
                                        {item.titleJa}
                                    </p>
                                    <p className="mt-6 text-sumi-700 leading-relaxed text-lg">
                                        {item.content}
                                    </p>
                                </div>
                            </SlideReveal>
                        ))}
                </div>

                <div className="mt-20 p-8 bg-sumi-950 text-washi-100">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] opacity-60">Important Note</p>
                    <p className="mt-4 text-sm leading-relaxed italic">
                        KuroFest 2026 reserves the right to update these terms at any time. Significant changes will be communicated via the email address associated with your ticket purchase.
                    </p>
                </div>
            </div>
        </main >
            <Footer />
        </>
    );
}
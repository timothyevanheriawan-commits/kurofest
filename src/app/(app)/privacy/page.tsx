import type { Metadata } from "next";
import { Footer } from "@/components/features/layout/footer";
import { SlideReveal, TextReveal } from "@/components/ui/text-reveal";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "How we handle your data at KuroFest 2026",
};

export default function PrivacyPage() {
    const sections = [
        {
            id: "01",
            title: "Data Collection",
            titleJa: "情報の収集",
            content: "We collect information you provide directly to us when you purchase tickets, subscribe to our newsletter, or contact us. This includes your name, email, and payment information processed through our secure partners."
        },
        {
            id: "02",
            title: "Use of Information",
            titleJa: "情報の利用目的",
            content: "Your data is used solely to manage your event access, provide updates regarding KuroFest 2026, and improve our platform experience. We do not sell your personal data to third parties."
        },
        {
            id: "03",
            title: "Cookies & Analytics",
            titleJa: "クッキーと分析",
            content: "We use essential cookies to maintain your session and security. Minimal analytics are used to understand site traffic and ensure our performance targets (Core Web Vitals) are met for all users."
        }
    ];

    return (
        <>
            <main className="min-h-screen bg-washi-100 px-6 pt-32 pb-24 md:px-12">
                <div className="mx-auto max-w-4xl">
                    <header className="mb-16 border-b-2 border-sumi-950 pb-12">
                        <SlideReveal>
                            <span className="font-mono text-xs tracking-[0.3em] text-sumi-400 uppercase">
                                Legal Document / P-01
                            </span>
                        </SlideReveal>
                        <TextReveal as="h1" className="mt-4 text-5xl md:text-7xl font-black uppercase tracking-tighter text-sumi-950">
                            Privacy Policy
                        </TextReveal>
                        <p className="mt-4 font-serif text-2xl text-sumi-400 tracking-widest pl-[0.1em]">
                            プライバシーポリシー
                        </p>
                    </header>

                    <div className="space-y-16">
                        {sections.map((section) => (
                            <SlideReveal key={section.id}>
                                <section className="grid md:grid-cols-12 gap-8">
                                    <div className="md:col-span-3">
                                        <span className="font-mono text-4xl font-bold text-sumi-200">
                                            {section.id}
                                        </span>
                                    </div>
                                </section>
                                <div className="md:col-span-9">
                                    <h2 className="text-xl font-bold text-sumi-950 uppercase tracking-wide">
                                        {section.title}
                                    </h2>
                                    <p className="font-serif text-sm text-sumi-400 mt-1">
                                        {section.titleJa}
                                    </p>
                                    <p className="mt-6 text-sumi-700 leading-relaxed text-lg">
                                        {section.content}
                                    </p>
                                </div>
                            </SlideReveal>
                        ))}
                </div>

                <footer className="mt-20 pt-12 border-t border-sumi-200 text-xs text-sumi-400 font-mono uppercase tracking-widest">
                    Last Updated: Jan 04, 2026 • KuroFest Systems
                </footer>
            </div>
        </main >
            <Footer />
        </>
    );
}
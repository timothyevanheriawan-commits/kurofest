import type { Metadata } from "next";
import { Footer } from "@/components/features/layout/footer";
import { SlideReveal, TextReveal } from "@/components/ui/text-reveal";

export const metadata: Metadata = {
    title: "Accessibility",
    description: "Universal design and inclusion at KuroFest 2026",
};

export default function AccessibilityPage() {
    const features = [
        {
            id: "01",
            title: "Venue Access",
            titleJa: "会場のアクセシビリティ",
            content: "Tokyo Big Sight is fully equipped with ramps, elevators, and wide corridors. Priority seating is available at the Main Stage and all panel rooms for attendees with mobility needs."
        },
        {
            id: "02",
            title: "Digital Experience",
            titleJa: "デジタル体験",
            content: "Our platform is built to WCAG 2.1 Level AA standards. We support screen readers, full keyboard navigation (via Cmd+K), and have implemented a 'Reduced Motion' mode that respects your system settings."
        },
        {
            id: "03",
            title: "Sensory Support",
            titleJa: "感覚サポート",
            content: "We provide designated 'Quiet Zones' for attendees who need a break from the high-energy environment. Strobe lighting warnings are clearly marked on the digital timetable for all performances."
        },
        {
            id: "04",
            title: "Assistance",
            titleJa: "サポート体制",
            content: "Service animals are welcome. Multilingual staff and sign language interpreters (JSL/ASL) are available at the information desk in the East Exhibition Hall."
        }
    ];

    return (
        <>
            <main className="min-h-screen bg-washi-100 px-6 pt-32 pb-24 md:px-12">
                <div className="mx-auto max-w-4xl">
                    <header className="mb-16 border-b-2 border-sumi-950 pb-12">
                        <SlideReveal>
                            <span className="font-mono text-xs tracking-[0.3em] text-sumi-400 uppercase">
                                Universal Design / A-01
                            </span>
                        </SlideReveal>
                        <TextReveal as="h1" className="mt-4 text-5xl md:text-7xl font-black uppercase tracking-tighter text-sumi-950">
                            Accessibility
                        </TextReveal>
                        {/* Optical centering fix applied here */}
                        <p className="mt-4 font-serif text-2xl text-sumi-400 tracking-widest pl-[0.1em]">
                            アクセシビリティ
                        </p>
                    </header>

                    <div className="space-y-16">
                        {features.map((item) => (
                            <SlideReveal key={item.id}>
                                <section className="grid md:grid-cols-12 gap-8">
                                    <div className="md:col-span-3">
                                        {/* Stylized background number */}
                                        <span className="font-mono text-4xl font-bold text-sumi-200">
                                            {item.id}
                                        </span>
                                    </div>
                                    <div className="md:col-span-9">
                                        <h2 className="text-xl font-bold text-sumi-950 uppercase tracking-wide">
                                            {item.title}
                                        </h2>
                                        <p className="font-serif text-sm text-sumi-400 mt-1 italic">
                                            {item.titleJa}
                                        </p>
                                        <p className="mt-6 text-sumi-700 leading-relaxed text-lg">
                                            {item.content}
                                        </p>
                                    </div>
                                </section>
                            </SlideReveal>
                        ))}
                    </div>

                    <div className="mt-20 border-2 border-sumi-950 p-8 bg-washi-50">
                        <div className="flex items-start gap-4">
                            <div className="w-1.5 h-1.5 bg-shu-600 mt-2 shrink-0" />
                            <div>
                                <h3 className="font-bold text-sumi-950 uppercase text-sm tracking-widest">Feedback</h3>
                                <p className="mt-2 text-sm text-sumi-600 leading-relaxed">
                                    We are committed to continuous improvement. If you encounter any barriers on our website or have suggestions for the physical event, please contact our inclusion team at <a href="mailto:access@kurofest.jp" className="text-shu-600 font-bold hover:underline">access@kurofest.jp</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
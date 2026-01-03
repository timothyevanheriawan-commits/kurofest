"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItem {
    question: string;
    questionJa: string;
    answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
    {
        question: "What are the event dates and times?",
        questionJa: "イベントの日程と時間は？",
        answer:
            "KuroFest 2026 will be held on August 15-16, 2026 at Tokyo Big Sight. Doors open at 9:00 AM and the event runs until 9:00 PM both days.",
    },
    {
        question: "How do I get to the venue?",
        questionJa: "会場へのアクセス方法は？",
        answer:
            "Tokyo Big Sight is accessible via the Rinkai Line (Kokusai-Tenjijo Station) or Yurikamome Line (Tokyo Big Sight Station). From Tokyo Station, take the Keiyo Line to Shin-Kiba, then transfer to the Rinkai Line.",
    },
    {
        question: "Are there age restrictions?",
        questionJa: "年齢制限はありますか？",
        answer:
            "The main event is open to all ages. However, the After Party on Day 2 (8:00 PM onwards) is restricted to ages 18 and above. Valid ID is required for entry.",
    },
    {
        question: "Can I bring props or costumes?",
        questionJa: "小道具やコスチュームは持ち込めますか？",
        answer:
            "Cosplay is encouraged! Props must be peace-bonded at our Cosplay Check-in area. Weapons over 1 meter in length are not permitted. Changing rooms are available in the Cosplay Zone.",
    },
    {
        question: "What payment methods are accepted?",
        questionJa: "どのような支払い方法が利用できますか？",
        answer:
            "We accept credit cards (Visa, Mastercard, JCB, AMEX), IC cards (Suica, PASMO), and cash. Some artist alley booths may be cash-only.",
    },
    {
        question: "Is there food available at the venue?",
        questionJa: "会場内で食事はできますか？",
        answer:
            "Yes! Our Food Court in Hall 7 features a variety of Japanese street food, bento boxes, and refreshments. Outside food is also permitted.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 md:py-32 bg-washi-200">
            <div className="mx-auto max-w-3xl px-6 md:px-12">
                {/* Header */}
                <header className="text-center mb-12 md:mb-16">
                    <span className="text-[10px] font-semibold tracking-[0.4em] text-sumi-400 uppercase">
                        Common Questions
                    </span>
                    <h2 className="mt-4 font-display text-4xl md:text-5xl font-black tracking-tight text-sumi-950">
                        FAQ
                    </h2>
                    <p className="mt-2 font-serif text-xl md:text-2xl text-sumi-400">
                        よくある質問
                    </p>
                    <div className="mt-6 mx-auto w-16 h-0.5 bg-shu-600" />
                </header>

                {/* Accordion Items */}
                <div className="space-y-4">
                    {FAQ_ITEMS.map((item, index) => (
                        <FAQAccordion
                            key={index}
                            item={item}
                            index={index}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQAccordion({
    item,
    index,
    isOpen,
    onToggle,
}: {
    item: FAQItem;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.19, 1, 0.22, 1],
            }}
            className={cn(
                "border-2 bg-washi-100 transition-all duration-300",
                isOpen
                    ? "border-sumi-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    : "border-sumi-200 hover:border-sumi-400"
            )}
        >
            <button
                title="-"
                onClick={onToggle}
                className="w-full flex items-start justify-between p-5 md:p-6 text-left gap-4"
                // Use String() to ensure the output is a literal string "true" or "false"
                aria-expanded={String(isOpen) as "true" | "false"}
            >
                <div className="flex-1">
                    <h3 className="font-display text-base md:text-lg font-bold text-sumi-950 leading-snug">
                        {item.question}
                    </h3>
                    <p className="mt-1 font-serif text-sm text-sumi-400">
                        {item.questionJa}
                    </p>
                </div>

                {/* Toggle Icon - Larger with rotation */}
                <div
                    className={cn(
                        "shrink-0 w-10 h-10 md:w-12 md:h-12",
                        "flex items-center justify-center",
                        "border-2 border-sumi-950",
                        "transition-all duration-300",
                        isOpen && "bg-sumi-950"
                    )}
                >
                    <motion.svg
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className={cn(
                            "transition-colors duration-300",
                            isOpen ? "text-washi-100" : "text-sumi-950"
                        )}
                    >
                        <path
                            d="M10 4V16M4 10H16"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="square"
                        />
                    </motion.svg>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                            <div className="w-full h-px bg-sumi-200 mb-4" />
                            <p className="text-sm md:text-base text-sumi-700 leading-relaxed">
                                {item.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
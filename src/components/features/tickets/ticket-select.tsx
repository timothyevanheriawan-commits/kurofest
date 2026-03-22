"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { TICKET_OPTIONS, stepVariants, type TicketType } from "./ticket-types";

interface TicketSelectProps {
    selected: TicketType | null;
    onSelect: (id: TicketType) => void;
}

export function TicketSelect({ selected, onSelect }: TicketSelectProps) {
    return (
        <motion.div
            key="select"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-4"
        >
            <div className="mb-6">
                <h2 className="font-display text-xl font-bold text-sumi-950">
                    Choose Your Pass
                </h2>
                <p className="mt-1 font-serif text-sm text-sumi-500">パスを選択してください</p>
            </div>

            {TICKET_OPTIONS.map((option) => (
                <button
                    key={option.id}
                    onClick={() => onSelect(option.id)}
                    className={cn(
                        "w-full p-4 text-left",
                        "border-2 transition-all duration-300",
                        "relative overflow-hidden",
                        selected === option.id
                            ? "border-sumi-950 bg-washi-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            : "border-sumi-200 hover:border-sumi-400",
                        option.highlight && selected !== option.id && "border-shu-600/30"
                    )}
                >
                    {option.highlight && (
                        <div className="absolute top-0 right-0 px-2 py-1 bg-shu-600 text-washi-100 text-[8px] font-bold tracking-[0.1em] uppercase">
                            Popular
                        </div>
                    )}

                    <div className="flex items-start justify-between">
                        <div>
                            <span className="block font-display font-bold text-sumi-950">
                                {option.name}
                            </span>
                            <span className="block font-serif text-sm text-sumi-500">
                                {option.nameJa}
                            </span>
                        </div>
                        <span className="font-mono text-xl font-bold text-sumi-950">
                            ¥{option.price.toLocaleString("en-US")}
                        </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {option.features.map((feature) => (
                            <span
                                key={feature}
                                className="text-[10px] px-2 py-1 bg-sumi-100 text-sumi-600 tracking-wide"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>

                    {selected === option.id && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 w-6 h-6 bg-sumi-950 flex items-center justify-center"
                        >
                            <Check size={14} className="text-washi-100" strokeWidth={3} />
                        </motion.div>
                    )}
                </button>
            ))}
        </motion.div>
    );
}
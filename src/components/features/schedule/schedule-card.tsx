"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, User } from "lucide-react";
import { ScheduleItem, EVENT_TYPE_LABELS } from "@/lib/mock-schedule";
import { cn } from "@/lib/utils";

interface ScheduleCardProps {
    item: ScheduleItem;
}

export function ScheduleCard({ item }: ScheduleCardProps) {
    const typeLabel = EVENT_TYPE_LABELS[item.type];

    return (
        <motion.article
            variants={{
                hidden: { opacity: 0, x: -30 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
                },
            }}
            className="group relative flex gap-4 md:gap-6"
        >
            {/* Timeline Column */}
            <div className="relative flex flex-col items-center">
                <div className="flex flex-col items-end w-16 md:w-20">
                    <span className="font-mono text-sm md:text-base font-bold text-sumi-950">
                        {item.time_start}
                    </span>
                    <span className="font-mono text-xs text-sumi-400">
                        {item.time_end}
                    </span>
                </div>

                <div
                    className={cn(
                        "mt-3 w-2 h-2",
                        "transition-colors duration-300",
                        item.is_live ? "bg-shu-600" : "bg-sumi-300 group-hover:bg-sumi-950"
                    )}
                />

                <div className="flex-1 w-px bg-sumi-200 mt-2" />
            </div>

            {/* Content Card */}
            <div
                className={cn(
                    "relative flex-1 mb-6",
                    "bg-washi-100 border-2",
                    "p-4 md:p-5",
                    "transition-all duration-300",
                    item.is_live
                        ? "border-shu-600 shadow-[4px_4px_0px_0px] shadow-shu-600/30"
                        : "border-sumi-200 group-hover:border-sumi-950 group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                )}
            >
                {item.is_live && (
                    <div
                        className={cn(
                            "absolute -top-3 right-4",
                            "flex items-center gap-2",
                            "px-3 py-1",
                            "bg-shu-600 text-washi-100",
                            "text-[10px] font-bold tracking-[0.15em] uppercase"
                        )}
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping bg-washi-100 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 bg-washi-100" />
                        </span>
                        Live Now
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <span
                        className={cn(
                            "px-2 py-1",
                            "bg-sumi-100 text-sumi-600",
                            "text-[10px] font-semibold tracking-[0.1em] uppercase"
                        )}
                    >
                        {typeLabel.en}
                    </span>
                    <span className="font-serif text-xs text-sumi-400">
                        {typeLabel.ja}
                    </span>
                </div>

                <h3 className="mt-3 font-display text-lg md:text-xl font-bold text-sumi-950 leading-tight">
                    {item.title}
                </h3>

                {item.title_ja && (
                    <p className="mt-1 font-serif text-sm text-sumi-400">
                        {item.title_ja}
                    </p>
                )}

                {item.speaker && (
                    <div className="mt-3 flex items-center gap-2">
                        <User size={14} className="text-sumi-400" />
                        {item.speaker_slug ? (
                            <Link
                                href={`/guests/${item.speaker_slug}`}
                                className={cn(
                                    "text-sm font-medium text-sumi-700",
                                    "underline underline-offset-2 decoration-sumi-300",
                                    "transition-colors duration-300",
                                    "hover:text-shu-600 hover:decoration-shu-600"
                                )}
                            >
                                {item.speaker}
                            </Link>
                        ) : (
                            <span className="text-sm text-sumi-600">{item.speaker}</span>
                        )}
                    </div>
                )}

                <div className="mt-3 flex items-center gap-2">
                    <MapPin size={14} className="text-shu-600" />
                    <span className="text-xs font-semibold tracking-[0.1em] uppercase text-shu-600">
                        {item.location}
                    </span>
                </div>

                {item.description && (
                    <p className="mt-3 text-sm text-sumi-500 leading-relaxed line-clamp-2">
                        {item.description}
                    </p>
                )}

                {item.capacity && (
                    <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-sumi-400">
                        <span>Capacity:</span>
                        <span className="font-mono font-bold">{item.capacity}</span>
                    </div>
                )}
            </div>
        </motion.article>
    );
}
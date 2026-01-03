"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Command,
    Search,
    Calendar,
    Users,
    Map,
    Ticket,
    Newspaper,
    Home,
    ArrowRight,
    Keyboard,
    X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_GUESTS } from "@/lib/mock-data";
import { MOCK_SCHEDULE } from "@/lib/mock-schedule";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */

interface CommandItem {
    id: string;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    action: () => void;
    category: "navigation" | "guests" | "schedule" | "actions";
    keywords?: string[];
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    // Build command items
    const commands: CommandItem[] = useMemo(() => {
        const navigationItems: CommandItem[] = [
            {
                id: "home",
                title: "Home",
                subtitle: "Go to homepage",
                icon: <Home size={18} />,
                action: () => router.push("/"),
                category: "navigation",
                keywords: ["home", "main", "start"],
            },
            {
                id: "schedule",
                title: "Schedule",
                subtitle: "View event timetable",
                icon: <Calendar size={18} />,
                action: () => router.push("/schedule"),
                category: "navigation",
                keywords: ["schedule", "timetable", "events", "program"],
            },
            {
                id: "guests",
                title: "Guests",
                subtitle: "Browse all guests",
                icon: <Users size={18} />,
                action: () => router.push("/guests"),
                category: "navigation",
                keywords: ["guests", "artists", "performers"],
            },
            {
                id: "map",
                title: "Venue Map",
                subtitle: "Interactive floor plan",
                icon: <Map size={18} />,
                action: () => router.push("/map"),
                category: "navigation",
                keywords: ["map", "venue", "floor", "location", "where"],
            },
            {
                id: "news",
                title: "News",
                subtitle: "Latest announcements",
                icon: <Newspaper size={18} />,
                action: () => router.push("/news"),
                category: "navigation",
                keywords: ["news", "announcements", "updates"],
            },
            {
                id: "tickets",
                title: "Get Tickets",
                subtitle: "Purchase your pass",
                icon: <Ticket size={18} />,
                action: () => router.push("/tickets"),
                category: "navigation",
                keywords: ["tickets", "buy", "purchase", "pass"],
            },
        ];

        const guestItems: CommandItem[] = MOCK_GUESTS.map((guest) => ({
            id: `guest-${guest.id}`,
            title: guest.name,
            subtitle: `${guest.role} • ${guest.name_ja}`,
            icon: <Users size={18} />,
            action: () => router.push(`/guests/${guest.slug}`),
            category: "guests" as const,
            keywords: [guest.name.toLowerCase(), guest.role.toLowerCase(), guest.name_ja],
        }));

        const scheduleItems: CommandItem[] = MOCK_SCHEDULE.slice(0, 5).map((event) => ({
            id: `event-${event.id}`,
            title: event.title,
            subtitle: `${event.time_start} • ${event.location}`,
            icon: <Calendar size={18} />,
            action: () => router.push("/schedule"),
            category: "schedule" as const,
            keywords: [event.title.toLowerCase(), event.location.toLowerCase()],
        }));

        return [...navigationItems, ...guestItems, ...scheduleItems];
    }, [router]);

    // Filter commands based on query
    const filteredCommands = useMemo(() => {
        if (!query) return commands.slice(0, 10);

        const lowerQuery = query.toLowerCase();
        return commands
            .filter((cmd) => {
                const matchTitle = cmd.title.toLowerCase().includes(lowerQuery);
                const matchSubtitle = cmd.subtitle?.toLowerCase().includes(lowerQuery);
                const matchKeywords = cmd.keywords?.some((kw) =>
                    kw.toLowerCase().includes(lowerQuery)
                );
                return matchTitle || matchSubtitle || matchKeywords;
            })
            .slice(0, 10);
    }, [query, commands]);

    // Group filtered commands by category
    const groupedCommands = useMemo(() => {
        const groups: Record<string, CommandItem[]> = {};
        filteredCommands.forEach((cmd) => {
            if (!groups[cmd.category]) {
                groups[cmd.category] = [];
            }
            groups[cmd.category].push(cmd);
        });
        return groups;
    }, [filteredCommands]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with Cmd+K or Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }

            // Close with Escape
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }

            // Navigate with arrow keys
            if (isOpen) {
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelectedIndex((prev) =>
                        prev < filteredCommands.length - 1 ? prev + 1 : 0
                    );
                }
                if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelectedIndex((prev) =>
                        prev > 0 ? prev - 1 : filteredCommands.length - 1
                    );
                }
                if (e.key === "Enter" && filteredCommands[selectedIndex]) {
                    e.preventDefault();
                    filteredCommands[selectedIndex].action();
                    setIsOpen(false);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex]);

    // FIX 1: Removed useEffect for query change.
    // Index reset is now handled in the input onChange event.

    // Reset when closing
    const handleClose = useCallback(() => {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
    }, []);

    const categoryLabels: Record<string, { en: string; ja: string }> = {
        navigation: { en: "Navigation", ja: "ナビゲーション" },
        guests: { en: "Guests", ja: "ゲスト" },
        schedule: { en: "Schedule", ja: "スケジュール" },
        actions: { en: "Actions", ja: "アクション" },
    };

    return (
        <>
            {/* Floating trigger button (mobile) */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 md:hidden",
                    "w-14 h-14",
                    "bg-sumi-950 text-washi-100",
                    "border-2 border-sumi-950",
                    "flex items-center justify-center",
                    "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]",
                    "active:translate-y-1 active:shadow-none"
                )}
                aria-label="Open command palette"
            >
                <Command size={24} />
            </button>

            {/* Keyboard hint (desktop) */}
            <div className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-2 text-xs text-sumi-400">
                <Keyboard size={14} />
                <span>Press</span>
                <kbd className="px-2 py-1 bg-sumi-100 border border-sumi-200 font-mono">
                    ⌘K
                </kbd>
                <span>to search</span>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 z-[100] bg-sumi-950/60 backdrop-blur-sm"
                        />

                        {/* Palette */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
                            className={cn(
                                "fixed z-[101]",
                                "top-[10%] left-1/2 -translate-x-1/2",
                                "w-[calc(100%-2rem)] max-w-xl",
                                "bg-washi-100 border-2 border-sumi-950",
                                "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                                "overflow-hidden"
                            )}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Command palette"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-sumi-950">
                                <Search size={18} className="text-sumi-400" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setSelectedIndex(0); // Fix 1: Reset index here
                                    }}
                                    placeholder="Search commands, guests, events..."
                                    className={cn(
                                        "flex-1 bg-transparent",
                                        "text-sumi-950 placeholder:text-sumi-400",
                                        "focus:outline-none",
                                        "text-sm"
                                    )}
                                    autoFocus
                                />
                                <button
                                    onClick={handleClose}
                                    className="p-1 hover:bg-sumi-100 transition-colors"
                                    aria-label="Close" // FIX 2: Accessibility Label
                                >
                                    <X size={18} className="text-sumi-400" />
                                </button>
                            </div>

                            {/* Results */}
                            <div className="max-h-[60vh] overflow-y-auto">
                                {Object.entries(groupedCommands).length > 0 ? (
                                    Object.entries(groupedCommands).map(([category, items]) => (
                                        <div key={category}>
                                            {/* Category Header */}
                                            <div className="px-4 py-2 bg-sumi-50 border-b border-sumi-100">
                                                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-sumi-400">
                                                    {categoryLabels[category]?.en || category}
                                                </span>
                                                <span className="ml-2 font-serif text-xs text-sumi-300">
                                                    {categoryLabels[category]?.ja}
                                                </span>
                                            </div>

                                            {/* Items */}
                                            {/* FIX 3: Removed unused idx parameter */}
                                            {items.map((item) => {
                                                const globalIndex = filteredCommands.indexOf(item);
                                                const isSelected = globalIndex === selectedIndex;

                                                return (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => {
                                                            item.action();
                                                            handleClose();
                                                        }}
                                                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                        className={cn(
                                                            "w-full flex items-center gap-3 px-4 py-3",
                                                            "text-left transition-colors",
                                                            isSelected
                                                                ? "bg-sumi-950 text-washi-100"
                                                                : "hover:bg-sumi-100"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "shrink-0",
                                                                isSelected ? "text-washi-100" : "text-sumi-400"
                                                            )}
                                                        >
                                                            {item.icon}
                                                        </span>
                                                        <div className="flex-1 min-w-0">
                                                            <span
                                                                className={cn(
                                                                    "block font-semibold text-sm truncate",
                                                                    isSelected ? "text-washi-100" : "text-sumi-950"
                                                                )}
                                                            >
                                                                {item.title}
                                                            </span>
                                                            {item.subtitle && (
                                                                <span
                                                                    className={cn(
                                                                        "block text-xs truncate",
                                                                        isSelected
                                                                            ? "text-washi-100/60"
                                                                            : "text-sumi-500"
                                                                    )}
                                                                >
                                                                    {item.subtitle}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <ArrowRight
                                                            size={14}
                                                            className={cn(
                                                                "shrink-0",
                                                                isSelected ? "text-washi-100" : "text-sumi-300"
                                                            )}
                                                        />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-12 text-center">
                                        <p className="text-sm text-sumi-500">No results found</p>
                                        <p className="mt-1 font-serif text-xs text-sumi-400">
                                            検索結果がありません
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2 bg-sumi-50 border-t border-sumi-200 flex items-center justify-between text-xs text-sumi-400">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1 py-0.5 bg-washi-100 border border-sumi-200 font-mono text-[10px]">
                                            ↑↓
                                        </kbd>
                                        Navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1 py-0.5 bg-washi-100 border border-sumi-200 font-mono text-[10px]">
                                            ↵
                                        </kbd>
                                        Select
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1 py-0.5 bg-washi-100 border border-sumi-200 font-mono text-[10px]">
                                            Esc
                                        </kbd>
                                        Close
                                    </span>
                                </div>
                                <span className="font-serif">案内</span>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
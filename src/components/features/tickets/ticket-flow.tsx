"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Check, ChevronRight, CreditCard, User, Mail, Calendar, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASING } from "@/lib/motion-config";
import Link from "next/link";
import { submitOrder } from "@/app/(app)/tickets/actions";

/* ── Types ─────────────────────────────────────────────────────────────── */

type TicketType = "standard" | "premium" | "vip";
type Step = "select" | "details" | "confirm";

interface TicketOption {
    id: TicketType;
    name: string;
    nameJa: string;
    price: number;
    features: string[];
    highlight?: boolean;
}

/* ── Data ──────────────────────────────────────────────────────────────── */

const TICKET_OPTIONS: TicketOption[] = [
    {
        id: "standard",
        name: "Standard Pass",
        nameJa: "一般入場券",
        price: 8500,
        features: ["2-Day Access", "Exhibition Hall", "Main Stage"],
    },
    {
        id: "premium",
        name: "Premium Pass",
        nameJa: "プレミアムパス",
        price: 15000,
        features: ["2-Day Access", "Priority Entry", "Meet & Greet", "Merch Pack"],
        highlight: true,
    },
    {
        id: "vip",
        name: "VIP Pass",
        nameJa: "VIPパス",
        price: 35000,
        features: ["All Premium Benefits", "Backstage Tour", "Private Lounge", "Signed Poster"],
    },
];

const STEPS: Step[] = ["select", "details", "confirm"];

const STEP_LABELS: Record<Step, string> = {
    select: "Select Pass",
    details: "Your Details",
    confirm: "Complete",
};

/* ── Validation ────────────────────────────────────────────────────────── */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidCardNumber(card: string) {
    const digits = card.replace(/\s+/g, "");
    if (!/^\d{13,19}$/.test(digits)) return false;
    let sum = 0, shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
        let d = Number(digits[i]);
        if (shouldDouble) { d *= 2; if (d > 9) d -= 9; }
        sum += d;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

function isValidExpiry(expiry: string) {
    const m = expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
    if (!m) return false;
    const month = Number(m[1]), year = Number(m[2]) + 2000;
    if (month < 1 || month > 12) return false;
    return new Date(year, month, 0, 23, 59, 59) >= new Date();
}

function isValidCVC(cvc: string) { return /^\d{3,4}$/.test(cvc); }

function formatCardNumber(v: string) {
    return v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

/* ── Step variants ─────────────────────────────────────────────────────── */

const stepVariants: Variants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASING.expoOut } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: EASING.expoOut } },
};

const inputClass = cn(
    "w-full bg-transparent border-0 border-b-2 border-sumi-200 py-3",
    "text-sumi-950 placeholder:text-sumi-300",
    "focus:border-sumi-950 focus:outline-none transition-colors rounded-none"
);

/* ── Component ─────────────────────────────────────────────────────────── */

export function TicketFlow() {
    const [currentStep, setCurrentStep] = useState<Step>("select");
    const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
    const [formData, setFormData] = useState({
        name: "", email: "", cardNumber: "", expiry: "", cvc: "",
    });

    // Set by the server action after successful insert
    const [confirmationCode, setConfirmationCode] = useState<string>("");

    // Submission state
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const currentStepIndex = STEPS.indexOf(currentStep);

    const isDetailsValid = useMemo(() =>
        formData.name.trim().length > 0 &&
        emailRegex.test(formData.email) &&
        isValidCardNumber(formData.cardNumber) &&
        isValidExpiry(formData.expiry) &&
        isValidCVC(formData.cvc),
        [formData]);

    const selectedOption = TICKET_OPTIONS.find((t) => t.id === selectedTicket);

    const handleNext = async () => {
        if (currentStep === "select" && selectedTicket) {
            setCurrentStep("details");
            return;
        }

        if (currentStep === "details" && isDetailsValid && selectedOption) {
            setSubmitting(true);
            setSubmitError(null);

            const result = await submitOrder({
                customerName: formData.name,
                customerEmail: formData.email,
                ticketType: selectedOption.id,
            });

            setSubmitting(false);

            if (!result.success) {
                setSubmitError(result.error);
                return;
            }

            // Store the real confirmation code from the server
            setConfirmationCode(result.confirmationCode);
            // Clear payment fields — don't keep card data in state longer than needed
            setFormData((prev) => ({ ...prev, cardNumber: "", expiry: "", cvc: "" }));
            setCurrentStep("confirm");
        }
    };

    const handleBack = () => {
        if (currentStep === "details") setCurrentStep("select");
    };

    const nextDisabled =
        submitting ||
        (currentStep === "select" && !selectedTicket) ||
        (currentStep === "details" && !isDetailsValid);

    return (
        <div className={cn("border-2 border-sumi-950 bg-washi-100", "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]")}>

            {/* Step indicator */}
            <div className="flex border-b-2 border-sumi-950">
                {STEPS.map((step, index) => (
                    <div
                        key={step}
                        className={cn(
                            "flex-1 py-3 text-center text-[10px] font-semibold tracking-[0.15em] uppercase",
                            "border-r-2 border-sumi-950 last:border-r-0 transition-colors duration-300",
                            index <= currentStepIndex
                                ? "bg-sumi-950 text-washi-100"
                                : "bg-washi-100 text-sumi-400"
                        )}
                    >
                        <span className="hidden sm:inline">{STEP_LABELS[step]}</span>
                        <span className="sm:hidden">{index + 1}</span>
                    </div>
                ))}
            </div>

            {/* Step content */}
            <div className="p-6 min-h-[420px]">
                <AnimatePresence mode="wait">

                    {/* ── Step 1: Select ──────────────────────────────────── */}
                    {currentStep === "select" && (
                        <motion.div key="select" variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4">
                            <div className="mb-6">
                                <h2 className="font-display text-xl font-bold text-sumi-950">Choose Your Pass</h2>
                                <p className="mt-1 font-serif text-sm text-sumi-500">パスを選択してください</p>
                            </div>
                            {TICKET_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setSelectedTicket(option.id)}
                                    className={cn(
                                        "w-full p-4 text-left border-2 transition-all duration-300 relative overflow-hidden",
                                        selectedTicket === option.id
                                            ? "border-sumi-950 bg-washi-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                            : "border-sumi-200 hover:border-sumi-400",
                                        option.highlight && selectedTicket !== option.id && "border-shu-600/30"
                                    )}
                                >
                                    {option.highlight && (
                                        <div className="absolute top-0 right-0 px-2 py-1 bg-shu-600 text-washi-100 text-[8px] font-bold tracking-[0.1em] uppercase">
                                            Popular
                                        </div>
                                    )}
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="block font-display font-bold text-sumi-950">{option.name}</span>
                                            <span className="block font-serif text-sm text-sumi-500">{option.nameJa}</span>
                                        </div>
                                        <span className="font-mono text-xl font-bold text-sumi-950">
                                            ¥{option.price.toLocaleString("en-US")}
                                        </span>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {option.features.map((f) => (
                                            <span key={f} className="text-[10px] px-2 py-1 bg-sumi-100 text-sumi-600 tracking-wide">{f}</span>
                                        ))}
                                    </div>
                                    {selectedTicket === option.id && (
                                        <motion.div
                                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                                            className="absolute top-4 right-4 w-6 h-6 bg-sumi-950 flex items-center justify-center"
                                        >
                                            <Check size={14} className="text-washi-100" strokeWidth={3} />
                                        </motion.div>
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {/* ── Step 2: Details ─────────────────────────────────── */}
                    {currentStep === "details" && (
                        <motion.div key="details" variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
                            <div className="mb-6">
                                <h2 className="font-display text-xl font-bold text-sumi-950">Your Information</h2>
                                <p className="mt-1 font-serif text-sm text-sumi-500">お客様情報</p>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase mb-1">Full Name</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-0 bottom-3 text-sumi-400" />
                                        <input type="text" value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your full name"
                                            className={cn(inputClass, "pl-7")} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-0 bottom-3 text-sumi-400" />
                                        <input type="email" value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            className={cn(inputClass, "pl-7")} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-2">
                                <div className="flex-1 h-px bg-sumi-200" />
                                <span className="text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase">Payment</span>
                                <div className="flex-1 h-px bg-sumi-200" />
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase mb-1">Card Number</label>
                                    <div className="relative">
                                        <CreditCard size={16} className="absolute left-0 bottom-3 text-sumi-400" />
                                        <input type="text" value={formData.cardNumber}
                                            onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                                            inputMode="numeric" autoComplete="cc-number"
                                            placeholder="4242 4242 4242 4242"
                                            className={cn(inputClass, "pl-7 font-mono tracking-wider")} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase mb-1">Expiry</label>
                                        <div className="relative">
                                            <Calendar size={16} className="absolute left-0 bottom-3 text-sumi-400" />
                                            <input type="text" value={formData.expiry}
                                                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                                placeholder="MM / YY"
                                                className={cn(inputClass, "pl-7 font-mono")} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase mb-1">CVC</label>
                                        <input type="text" value={formData.cvc}
                                            onChange={(e) => setFormData({ ...formData, cvc: e.target.value.replace(/\D/g, "") })}
                                            placeholder="000" maxLength={4}
                                            className={cn(inputClass, "px-0 font-mono text-center tracking-[0.5em]")} />
                                    </div>
                                </div>
                            </div>

                            {/* Selected ticket summary */}
                            {selectedOption && (
                                <div className="mt-6 p-4 bg-sumi-50 border-l-4 border-sumi-950">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase">Selected Pass</span>
                                            <span className="block font-display font-bold text-sumi-950 mt-1">{selectedOption.name}</span>
                                        </div>
                                        <span className="font-mono text-xl font-bold text-sumi-950">
                                            ¥{selectedOption.price.toLocaleString("en-US")}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Server error */}
                            {submitError && (
                                <div className="flex items-start gap-3 p-4 bg-shu-50 border-l-4 border-shu-600">
                                    <AlertCircle size={16} className="text-shu-600 shrink-0 mt-0.5" />
                                    <p className="text-sm text-shu-700">{submitError}</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ── Step 3: Confirm ─────────────────────────────────── */}
                    {currentStep === "confirm" && (
                        <motion.div key="confirm" variants={stepVariants} initial="enter" animate="center" exit="exit" className="text-center py-6">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                className="w-24 h-24 mx-auto bg-shu-600 text-washi-100 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <Check size={48} strokeWidth={3} />
                            </motion.div>

                            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                className="mt-8 font-display text-3xl font-black text-sumi-950 tracking-tight">
                                {"YOU'RE IN!"}
                            </motion.h2>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="mt-2 font-serif text-lg text-sumi-500">
                                ご予約ありがとうございます
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                                className="mt-8 p-5 bg-washi-50 border-2 border-sumi-950 text-left">
                                <div className="flex items-center justify-between pb-4 border-b border-sumi-200">
                                    <span className="text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase">Confirmation Code</span>
                                    <span className="font-mono text-lg font-bold text-sumi-950 tracking-wider">{confirmationCode}</span>
                                </div>
                                {selectedOption && (
                                    <div className="pt-4 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-sumi-600">Pass Type</span>
                                            <span className="font-semibold text-sumi-950">{selectedOption.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-sumi-600">Event Date</span>
                                            <span className="font-mono text-sumi-950">Aug 15–16, 2026</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-sumi-600">Total Paid</span>
                                            <span className="font-mono font-bold text-sumi-950">
                                                ¥{selectedOption.price.toLocaleString("en-US")}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                                className="mt-6 text-sm text-sumi-500">
                                A confirmation email has been sent to{" "}
                                <span className="font-semibold text-sumi-950">{formData.email || "your email"}</span>
                            </motion.p>

                            <motion.div initial={{ opacity: 0, rotate: -20, scale: 0.8 }} animate={{ opacity: 1, rotate: -8, scale: 1 }}
                                transition={{ delay: 0.8 }} className="mt-8 inline-flex items-center justify-center">
                                <div className="w-16 h-16 border-2 border-shu-600 flex items-center justify-center text-shu-600 font-serif text-xl font-bold">
                                    <span className="writing-vertical">認証</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            {currentStep !== "confirm" ? (
                <div className="flex border-t-2 border-sumi-950">
                    {currentStep !== "select" && (
                        <button onClick={handleBack}
                            className={cn(
                                "flex-1 py-4 bg-washi-100 text-sumi-950",
                                "text-xs font-semibold tracking-[0.15em] uppercase",
                                "border-r-2 border-sumi-950",
                                "transition-colors hover:bg-sumi-100 active:bg-sumi-200"
                            )}>
                            Back
                        </button>
                    )}
                    <button onClick={handleNext} disabled={nextDisabled}
                        className={cn(
                            "flex-1 py-4 flex items-center justify-center gap-2",
                            "bg-sumi-950 text-washi-100",
                            "text-xs font-semibold tracking-[0.15em] uppercase",
                            "transition-all hover:bg-shu-600",
                            "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-sumi-950",
                            "active:scale-[0.98]"
                        )}>
                        {submitting
                            ? <><Loader2 size={15} className="animate-spin" /> Processing...</>
                            : <>{currentStep === "select" ? "Continue" : "Complete Purchase"} <ChevronRight size={16} /></>
                        }
                    </button>
                </div>
            ) : (
                <div className="border-t-2 border-sumi-950">
                    <Link href="/"
                        className={cn(
                            "block w-full py-4 text-center",
                            "bg-sumi-950 text-washi-100",
                            "text-xs font-semibold tracking-[0.15em] uppercase",
                            "transition-colors hover:bg-shu-600"
                        )}>
                        Return to Homepage
                    </Link>
                </div>
            )}
        </div>
    );
}
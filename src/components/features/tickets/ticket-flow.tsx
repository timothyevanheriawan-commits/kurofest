"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Check, ChevronRight, CreditCard, User, Mail, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

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

/* ═══════════════════════════════════════════════════════════════════════════
   MOTION VARIANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const stepVariants: Variants = {
    enter: { opacity: 0, x: 20 },
    center: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.19, 1, 0.22, 1] as const,
        },
    },
    exit: {
        opacity: 0,
        x: -20,
        transition: {
            duration: 0.3,
            ease: [0.19, 1, 0.22, 1] as const,
        },
    },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidCardNumber(card: string) {
    const digits = card.replace(/\s+/g, "");
    if (!/^\d{13,19}$/.test(digits)) return false;

    // Luhn check
    let sum = 0;
    let shouldDouble = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = Number(digits[i]);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

function isValidExpiry(expiry: string) {
    const match = expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
    if (!match) return false;

    const month = Number(match[1]);
    const year = Number(match[2]) + 2000;

    if (month < 1 || month > 12) return false;

    const now = new Date();

    // Card expires at END of expiry month
    const expiryDate = new Date(year, month, 0, 23, 59, 59);

    return expiryDate >= now;


}


function isValidCVC(cvc: string) {
    return /^\d{3,4}$/.test(cvc);
}


/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export function TicketFlow() {
    const [currentStep, setCurrentStep] = useState<Step>("select");
    const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
    });

    const isStep2Valid = useMemo(() => {
        return (
            formData.name.trim().length > 0 &&
            emailRegex.test(formData.email) &&
            isValidCardNumber(formData.cardNumber) &&
            isValidExpiry(formData.expiry) &&
            isValidCVC(formData.cvc)
        );
    }, [formData]);



    // Fix for hydration stability (Confirmation code generated once)
    const [confirmationCode] = useState(() =>
        `KF26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    );

    const steps: Step[] = ["select", "details", "confirm"];
    const currentStepIndex = steps.indexOf(currentStep);

    const handleSelectTicket = (ticketId: TicketType) => {
        setSelectedTicket(ticketId);
    };

    const handleNext = () => {
        console.log("STEP2 VALID:", isStep2Valid, {
            name: formData.name,
            email: emailRegex.test(formData.email),
            card: isValidCardNumber(formData.cardNumber.replace(/\s+/g, "")),
            expiry: isValidExpiry(formData.expiry),
            cvc: isValidCVC(formData.cvc),
        });

        
        if (currentStep === "select") {
            if (!selectedTicket) return;
            setCurrentStep("details");
            return;
        }

        if (currentStep === "details") {
            console.log({
                name: formData.name,
                email: emailRegex.test(formData.email),
                card: isValidCardNumber(formData.cardNumber),
                expiry: isValidExpiry(formData.expiry),
                cvc: isValidCVC(formData.cvc),
            });

            if (!isStep2Valid) return;

            setCurrentStep("confirm");
            return;
        }
    };

    function formatCardNumber(value: string) {
        const digits = value.replace(/\D/g, "");
        const limited = digits.slice(0, 19); // max PAN length
        return limited.replace(/(.{4})/g, "$1 ").trim();
    }


    const handleBack = () => {
        if (currentStep === "details") {
            setCurrentStep("select");
        }
        else if (currentStep === "confirm") {
            setFormData((prev) => ({
                ...prev,
                cardNumber: "",
                expiry: "",
                cvc: "",
            }));
            setCurrentStep("details");
        }
    }

    const selectedOption = TICKET_OPTIONS.find((t) => t.id === selectedTicket);

    return (
        <div
            className={cn(
                "border-2 border-sumi-950 bg-washi-100",
                "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            )}
        >
            {/* ─────────────────────────────────────────────────────────────────────
          STEP INDICATOR
          ───────────────────────────────────────────────────────────────────── */}
            <div className="flex border-b-2 border-sumi-950">
                {steps.map((step, index) => (
                    <div
                        key={step}
                        className={cn(
                            "flex-1 py-3 text-center text-[10px] font-semibold tracking-[0.15em] uppercase",
                            "border-r-2 border-sumi-950 last:border-r-0",
                            "transition-colors duration-300",
                            index <= currentStepIndex
                                ? "bg-sumi-950 text-washi-100"
                                : "bg-washi-100 text-sumi-400"
                        )}
                    >
                        <span className="hidden sm:inline">
                            {step === "select" && "Select Pass"}
                            {step === "details" && "Your Details"}
                            {step === "confirm" && "Complete"}
                        </span>
                        <span className="sm:hidden">{index + 1}</span>
                    </div>
                ))}
            </div>

            {/* ─────────────────────────────────────────────────────────────────────
          CONTENT AREA
          ───────────────────────────────────────────────────────────────────── */}
            <div className="p-6 min-h-[420px]">
                <AnimatePresence mode="wait">
                    {/* ═══════════════════════════════════════════════════════════════
              STEP 1: SELECT TICKET
              ═══════════════════════════════════════════════════════════════ */}
                    {currentStep === "select" && (
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
                                <p className="mt-1 font-serif text-sm text-sumi-500">
                                    パスを選択してください
                                </p>
                            </div>

                            {TICKET_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleSelectTicket(option.id)}
                                    className={cn(
                                        "w-full p-4 text-left",
                                        "border-2 transition-all duration-300",
                                        "relative overflow-hidden",
                                        selectedTicket === option.id
                                            ? "border-sumi-950 bg-washi-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                            : "border-sumi-200 hover:border-sumi-400",
                                        option.highlight && selectedTicket !== option.id && "border-shu-600/30"
                                    )}
                                >
                                    {/* Popular tag */}
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
                                        <div className="text-right">
                                            <span className="font-mono text-xl font-bold text-sumi-950">
                                                {/* FIX: Force 'en-US' for comma consistency */}
                                                ¥{option.price.toLocaleString("en-US")}
                                            </span>
                                        </div>
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

                                    {/* Selection indicator */}
                                    {selectedTicket === option.id && (
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
                    )}

                    {/* ═══════════════════════════════════════════════════════════════
              STEP 2: DETAILS
              ═══════════════════════════════════════════════════════════════ */}
                    {currentStep === "details" && (
                        <motion.div
                            key="details"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="space-y-6"
                        >
                            <div className="mb-6">
                                <h2 className="font-display text-xl font-bold text-sumi-950">
                                    Your Information
                                </h2>
                                <p className="mt-1 font-serif text-sm text-sumi-500">
                                    お客様情報
                                </p>
                            </div>

                            {/* Personal Info Section */}
                            <div className="space-y-5">
                                <div className="relative">
                                    <label className="block text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-0 bottom-3 text-sumi-400" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your full name"
                                            className={cn(
                                                "w-full bg-transparent",
                                                "border-0 border-b-2 border-sumi-200",
                                                "pl-7 pr-0 py-3",
                                                "text-sumi-950 placeholder:text-sumi-300",
                                                "focus:border-sumi-950 focus:outline-none",
                                                "transition-colors duration-300",
                                                "rounded-none"
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="relative">
                                    <label className="block text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-0 bottom-3 text-sumi-400" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            className={cn(
                                                "w-full bg-transparent",
                                                "border-0 border-b-2 border-sumi-200",
                                                "pl-7 pr-0 py-3",
                                                "text-sumi-950 placeholder:text-sumi-300",
                                                "focus:border-sumi-950 focus:outline-none",
                                                "transition-colors duration-300",
                                                "rounded-none"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="flex items-center gap-4 py-2">
                                <div className="flex-1 h-px bg-sumi-200" />
                                <span className="text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase">
                                    Payment
                                </span>
                                <div className="flex-1 h-px bg-sumi-200" />
                            </div>

                            {/* Payment Section */}
                            <div className="space-y-5">
                                <div className="relative">
                                    <label className="block text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase mb-1">
                                        Card Number
                                    </label>
                                    <div className="relative">
                                        <CreditCard size={16} className="absolute left-0 bottom-3 text-sumi-400" />
                                        <input
                                            type="text"
                                            value={formData.cardNumber}
                                            onChange={(e) => {
                                                const formatted = formatCardNumber(e.target.value);
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    cardNumber: formatted,
                                                }));
                                            }}
                                            inputMode="numeric"
                                            autoComplete="cc-number"
                                            placeholder="4242 4242 4242 4242"
                                            className={cn(
                                                "w-full bg-transparent",
                                                "border-0 border-b-2 border-sumi-200",
                                                "pl-7 pr-0 py-3",
                                                "text-sumi-950 placeholder:text-sumi-300 font-mono",
                                                "focus:border-sumi-950 focus:outline-none",
                                                "transition-colors duration-300",
                                                "rounded-none tracking-wider"
                                            )}
                                        />
                                        {/* <input
                                            type="text"
                                            value={formData.cardNumber}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^\d\s]/g, "");
                                                setFormData({ ...formData, cardNumber: value });
                                            }}
                                            placeholder="0000 0000 0000 0000"
                                            className={cn(
                                                "w-full bg-transparent",
                                                "border-0 border-b-2 border-sumi-200",
                                                "pl-7 pr-0 py-3",
                                                "text-sumi-950 placeholder:text-sumi-300 font-mono",
                                                "focus:border-sumi-950 focus:outline-none",
                                                "transition-colors duration-300",
                                                "rounded-none tracking-wider"
                                            )}
                                        /> */}

                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="relative">
                                        <label className="block text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase mb-1">
                                            Expiry Date
                                        </label>
                                        <div className="relative">
                                            <Calendar size={16} className="absolute left-0 bottom-3 text-sumi-400" />
                                            <input
                                                type="text"
                                                value={formData.expiry}
                                                onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                                placeholder="MM / YY"
                                                className={cn(
                                                    "w-full bg-transparent",
                                                    "border-0 border-b-2 border-sumi-200",
                                                    "pl-7 pr-0 py-3",
                                                    "text-sumi-950 placeholder:text-sumi-300 font-mono",
                                                    "focus:border-sumi-950 focus:outline-none",
                                                    "transition-colors duration-300",
                                                    "rounded-none"
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase mb-1">
                                            CVC
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.cvc}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, "");
                                                setFormData({ ...formData, cvc: value });
                                            }}
                                            placeholder="000"
                                            maxLength={4}
                                            className={cn(
                                                "w-full bg-transparent",
                                                "border-0 border-b-2 border-sumi-200",
                                                "px-0 py-3",
                                                "text-sumi-950 placeholder:text-sumi-300 font-mono",
                                                "focus:border-sumi-950 focus:outline-none",
                                                "transition-colors duration-300",
                                                "rounded-none text-center tracking-[0.5em]"
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Selected ticket summary */}
                            {selectedOption && (
                                <div className="mt-6 p-4 bg-sumi-50 border-l-4 border-sumi-950">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase">
                                                Selected Pass
                                            </span>
                                            <span className="block font-display font-bold text-sumi-950 mt-1">
                                                {selectedOption.name}
                                            </span>
                                        </div>
                                        <span className="font-mono text-xl font-bold text-sumi-950">
                                            {/* FIX: Force 'en-US' */}
                                            ¥{selectedOption.price.toLocaleString("en-US")}
                                        </span>
                                    </div>
                                </div>
                            )}

                        </motion.div>
                    )}

                    {/* ═══════════════════════════════════════════════════════════════
              STEP 3: CONFIRMATION (STANDARD LAYOUT)
              ═══════════════════════════════════════════════════════════════ */}
                    {currentStep === "confirm" && (
                        <motion.div
                            key="confirm"
                            variants={stepVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="text-center py-6"
                        >
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.2,
                                }}
                                className={cn(
                                    "w-24 h-24 mx-auto",
                                    "bg-shu-600 text-washi-100",
                                    "flex items-center justify-center",
                                    "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                )}
                            >
                                <Check size={48} strokeWidth={3} />
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8 font-display text-3xl font-black text-sumi-950 tracking-tight"
                            >
                                {"YOU'RE IN!"}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-2 font-serif text-lg text-sumi-500"
                            >
                                ご予約ありがとうございます
                            </motion.p>

                            {/* Standard Confirmation Box */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8 p-5 bg-washi-50 border-2 border-sumi-950 text-left"
                            >
                                <div className="flex items-center justify-between pb-4 border-b border-sumi-200">
                                    <span className="text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase">
                                        Confirmation Code
                                    </span>
                                    <span className="font-mono text-lg font-bold text-sumi-950 tracking-wider">
                                        {confirmationCode}
                                    </span>
                                </div>

                                {selectedOption && (
                                    <div className="pt-4 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-sumi-600">Pass Type</span>
                                            <span className="font-semibold text-sumi-950">{selectedOption.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-sumi-600">Event Date</span>
                                            <span className="font-mono text-sumi-950">Aug 15-16, 2026</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-sumi-600">Total Paid</span>
                                            <span className="font-mono font-bold text-sumi-950">
                                                {/* FIX: Force 'en-US' */}
                                                ¥{selectedOption.price.toLocaleString("en-US")}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* Email notice */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-6 text-sm text-sumi-500"
                            >
                                A confirmation email has been sent to{" "}
                                <span className="font-semibold text-sumi-950">
                                    {formData.email || "your email"}
                                </span>
                            </motion.p>

                            {/* Hanko stamp decoration */}
                            <motion.div
                                initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                                animate={{ opacity: 1, rotate: -8, scale: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-8 inline-flex items-center justify-center"
                            >
                                <div
                                    className={cn(
                                        "w-16 h-16",
                                        "border-2 border-shu-600",
                                        "flex items-center justify-center",
                                        "text-shu-600 font-serif text-xl font-bold"
                                    )}
                                >
                                    <span className="writing-vertical">認証</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ─────────────────────────────────────────────────────────────────────
          NAVIGATION BUTTONS
          ───────────────────────────────────────────────────────────────────── */}
            {currentStep !== "confirm" && (
                <div className="flex border-t-2 border-sumi-950">
                    {currentStep !== "select" && (
                        <button
                            onClick={handleBack}
                            className={cn(
                                "flex-1 py-4",
                                "bg-washi-100 text-sumi-950",
                                "text-xs font-semibold tracking-[0.15em] uppercase",
                                "border-r-2 border-sumi-950",
                                "transition-colors duration-300",
                                "hover:bg-sumi-100",
                                "active:bg-sumi-200"
                            )}
                        >
                            Back
                        </button>
                    )}

                    <button
                        onClick={handleNext}
                        disabled={
                            currentStep === "select"
                                ? !selectedTicket
                                : currentStep === "details"
                                    ? !isStep2Valid
                                    : false
                        }


                        className={cn(
                            "flex-1 py-4",
                            "flex items-center justify-center gap-2",
                            "bg-sumi-950 text-washi-100",
                            "text-xs font-semibold tracking-[0.15em] uppercase",
                            "transition-all duration-300",
                            "hover:bg-shu-600",
                            "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-sumi-950",
                            "active:scale-[0.98]"
                        )}
                    >
                        {currentStep === "select" ? "Continue" : "Complete Purchase"}
                        <ChevronRight size={16} />
                    </button>
                </div>
            )
            }

            {/* Done button for confirmation */}
            {
                currentStep === "confirm" && (
                    <div className="border-t-2 border-sumi-950">
                        <Link
                            href="/"
                            className={cn(
                                "block w-full py-4 text-center",
                                "bg-sumi-950 text-washi-100",
                                "text-xs font-semibold tracking-[0.15em] uppercase",
                                "transition-colors duration-300",
                                "hover:bg-shu-600"
                            )}
                        >
                            Return to Homepage
                        </Link>
                    </div>
                )
            }
        </div >
    );
}
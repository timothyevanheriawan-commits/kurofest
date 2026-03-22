"use client";

import { motion } from "framer-motion";
import { User, Mail, CreditCard, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    stepVariants,
    formatCardNumber,
    TICKET_OPTIONS,
    type FormData,
    type TicketType,
} from "./ticket-types";

interface TicketDetailsProps {
    formData: FormData;
    onChange: (data: FormData) => void;
    selectedTicket: TicketType | null;
}

const inputClass = cn(
    "w-full bg-transparent",
    "border-0 border-b-2 border-sumi-200",
    "py-3",
    "text-sumi-950 placeholder:text-sumi-300",
    "focus:border-sumi-950 focus:outline-none",
    "transition-colors duration-300",
    "rounded-none"
);

export function TicketDetails({ formData, onChange, selectedTicket }: TicketDetailsProps) {
    const selectedOption = TICKET_OPTIONS.find((t) => t.id === selectedTicket);

    return (
        <motion.div
            key="details"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
        >
            <div className="mb-6">
                <h2 className="font-display text-xl font-bold text-sumi-950">Your Information</h2>
                <p className="mt-1 font-serif text-sm text-sumi-500">お客様情報</p>
            </div>

            {/* Personal Info */}
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
                            onChange={(e) => onChange({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                            className={cn(inputClass, "pl-7")}
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
                            onChange={(e) => onChange({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            className={cn(inputClass, "pl-7")}
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

            {/* Payment */}
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
                            onChange={(e) =>
                                onChange({ ...formData, cardNumber: formatCardNumber(e.target.value) })
                            }
                            inputMode="numeric"
                            autoComplete="cc-number"
                            placeholder="4242 4242 4242 4242"
                            className={cn(inputClass, "pl-7 font-mono tracking-wider")}
                        />
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
                                onChange={(e) => onChange({ ...formData, expiry: e.target.value })}
                                placeholder="MM / YY"
                                className={cn(inputClass, "pl-7 font-mono")}
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
                            onChange={(e) =>
                                onChange({ ...formData, cvc: e.target.value.replace(/\D/g, "") })
                            }
                            placeholder="000"
                            maxLength={4}
                            className={cn(inputClass, "px-0 font-mono text-center tracking-[0.5em]")}
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
                            ¥{selectedOption.price.toLocaleString("en-US")}
                        </span>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Ticket, Mail, Calendar } from "lucide-react";
import {
    stepVariants,
    TICKET_OPTIONS,
    type TicketType,
} from "./ticket-types";

interface TicketConfirmProps {
    selectedTicket: TicketType | null;
    email: string;
    confirmationCode: string;
}

export function TicketConfirm({ selectedTicket, email, confirmationCode }: TicketConfirmProps) {
    const selectedOption = TICKET_OPTIONS.find((t) => t.id === selectedTicket);

    return (
        <motion.div
            key="confirm"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center text-center space-y-6"
        >
            <div className="w-16 h-16 bg-sumi-950 flex items-center justify-center rounded-none mb-2">
                <CheckCircle2 size={32} className="text-washi-100" />
            </div>

            <div>
                <h2 className="font-display text-2xl font-bold text-sumi-950">Purchase Successful!</h2>
                <p className="mt-1 font-serif text-sm text-sumi-500">ご購入ありがとうございます</p>
            </div>

            <div className="w-full bg-sumi-50 border-2 border-dashed border-sumi-300 p-6 space-y-4">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-sumi-400 uppercase mb-1">
                        Confirmation Order
                    </span>
                    <span className="text-xl font-mono font-bold text-sumi-950 tracking-wider">
                        {confirmationCode}
                    </span>
                </div>

                <div className="h-px bg-sumi-200 w-full" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start gap-3">
                        <Ticket size={18} className="text-sumi-400 mt-0.5" />
                        <div>
                            <span className="block text-[8px] font-semibold tracking-wider text-sumi-400 uppercase">
                                Ticket Type
                            </span>
                            <span className="block font-bold text-sumi-950 leading-tight">
                                {selectedOption?.name || "Standard Pass"}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Mail size={18} className="text-sumi-400 mt-0.5" />
                        <div>
                            <span className="block text-[8px] font-semibold tracking-wider text-sumi-400 uppercase">
                                Sent To
                            </span>
                            <span className="block font-bold text-sumi-950 leading-tight truncate max-w-[150px]">
                                {email}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Calendar size={18} className="text-sumi-400 mt-0.5" />
                        <div>
                            <span className="block text-[8px] font-semibold tracking-wider text-sumi-400 uppercase">
                                Event Date
                            </span>
                            <span className="block font-bold text-sumi-950 leading-tight">
                                Oct 24-25, 2026
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xs text-sumi-400 max-w-sm">
                A confirmation email has been sent to your address with your digital ticket and entry QR code.
                Please present it at the main entrance.
            </p>
        </motion.div>
    );
}
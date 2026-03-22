import type { Variants } from "framer-motion";
import { EASING } from "@/lib/motion-config";

export type TicketType = "standard" | "premium" | "vip";
export type Step = "select" | "details" | "confirm";

export interface TicketOption {
  id: TicketType;
  name: string;
  nameJa: string;
  price: number;
  features: string[];
  highlight?: boolean;
}

export interface FormData {
  name: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export const TICKET_OPTIONS: TicketOption[] = [
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
    features: [
      "All Premium Benefits",
      "Backstage Tour",
      "Private Lounge",
      "Signed Poster",
    ],
  },
];

export const STEPS: Step[] = ["select", "details", "confirm"];

export const stepVariants: Variants = {
  enter: { opacity: 0, x: 20 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASING.expoOut },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3, ease: EASING.expoOut },
  },
};

// Validation helpers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string) {
  return emailRegex.test(email);
}

export function isValidCardNumber(card: string) {
  const digits = card.replace(/\s+/g, "");
  if (!/^\d{13,19}$/.test(digits)) return false;
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

export function isValidExpiry(expiry: string) {
  const match = expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!match) return false;
  const month = Number(match[1]);
  const year = Number(match[2]) + 2000;
  if (month < 1 || month > 12) return false;
  const expiryDate = new Date(year, month, 0, 23, 59, 59);
  return expiryDate >= new Date();
}

export function isValidCVC(cvc: string) {
  return /^\d{3,4}$/.test(cvc);
}

export function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  const limited = digits.slice(0, 19);
  return limited.replace(/(.{4})/g, "$1 ").trim();
}

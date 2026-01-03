/**
 * KUROFEST 2026 - Utility Functions
 * 和モダン Design System
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/* ═══════════════════════════════════════════════════════════════════════════
   CLASS NAME UTILITY
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Merge Tailwind classes with clsx and tailwind-merge
 * Handles conditional classes and deduplication
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/* ═══════════════════════════════════════════════════════════════════════════
   STRING UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Convert string to URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/* ═══════════════════════════════════════════════════════════════════════════
   NUMBER UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Format large numbers with K/M suffix
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Pad number with leading zeros
 */
export function padZero(num: number, length: number = 2): string {
  return String(num).padStart(length, "0");
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATE/TIME UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Format time string (HH:MM) for display
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

/**
 * Format date for Japanese display
 */
export function formatDateJapanese(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ARRAY UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Shuffle array (Fisher-Yates)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DOM UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Check if code is running on client
 */
export const isClient = typeof window !== "undefined";

/**
 * Check if code is running on server
 */
export const isServer = typeof window === "undefined";

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (isServer) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get viewport dimensions
 */
export function getViewport(): { width: number; height: number } {
  if (isServer) return { width: 0, height: 0 };
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCESSIBILITY UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Generate unique ID for accessibility
 */
let idCounter = 0;
export function generateId(prefix: string = "kf"): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * Create aria-label for time range
 */
export function createTimeAriaLabel(start: string, end: string): string {
  return `From ${formatTime(start)} to ${formatTime(end)}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOTION UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Calculate stagger delay for animations
 */
export function staggerDelay(index: number, baseDelay: number = 0.08): number {
  return index * baseDelay;
}

/**
 * Create CSS transition string with Wa-Modern easing
 */
export function createTransition(
  properties: string[],
  duration: number = 0.5
): string {
  const easing = "cubic-bezier(0.19, 1, 0.22, 1)";
  return properties.map((prop) => `${prop} ${duration}s ${easing}`).join(", ");
}

/* ═══════════════════════════════════════════════════════════════════════════
   VALIDATION UTILITIES
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Check if value is not null or undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Check if string is not empty
 */
export function isNotEmpty(value: string | null | undefined): value is string {
  return isDefined(value) && value.trim().length > 0;
}

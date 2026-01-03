/**
 * KUROFEST 2026 - Motion Configuration
 * 和モダン Design System
 *
 * Sharp, decisive transitions. No bounce. Clean like paper edges.
 */

import type { Transition, Variants } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   EASING CURVES
   Expo/Quint family - No springs, no bounce
   ═══════════════════════════════════════════════════════════════════════════ */

export const EASING = {
  /** Primary - Sharp deceleration (most common) */
  expoOut: [0.19, 1, 0.22, 1] as const,

  /** Secondary - Slightly softer */
  quintOut: [0.23, 1, 0.32, 1] as const,

  /** Mechanical - Precise, robotic */
  circOut: [0, 0.55, 0.45, 1] as const,

  /** Symmetrical - For reveals */
  sharp: [0.77, 0, 0.175, 1] as const,

  /** Enter - For exit animations */
  expoIn: [0.95, 0.05, 0.795, 0.035] as const,
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   DURATION TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */

export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  reveal: 1.0,
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   TRANSITION PRESETS
   ═══════════════════════════════════════════════════════════════════════════ */

export const TRANSITION = {
  /** Default for most animations */
  default: {
    duration: DURATION.normal,
    ease: EASING.expoOut,
  } satisfies Transition,

  /** Quick UI feedback */
  fast: {
    duration: DURATION.fast,
    ease: EASING.expoOut,
  } satisfies Transition,

  /** Slow, dramatic reveals */
  slow: {
    duration: DURATION.slow,
    ease: EASING.expoOut,
  } satisfies Transition,

  /** Hero/splash screen reveals */
  reveal: {
    duration: DURATION.reveal,
    ease: EASING.sharp,
  } satisfies Transition,

  /** Stagger container timing */
  stagger: {
    staggerChildren: 0.08,
    delayChildren: 0.1,
  } satisfies Transition,
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANT PRESETS
   ═══════════════════════════════════════════════════════════════════════════ */

/** Fade up - Standard entrance */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION.default,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: TRANSITION.fast,
  },
};

/** Fade in - No movement */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: TRANSITION.default,
  },
  exit: {
    opacity: 0,
    transition: TRANSITION.fast,
  },
};

/** Slide from right */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITION.default,
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: TRANSITION.fast,
  },
};

/** Slide from left */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITION.default,
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: TRANSITION.fast,
  },
};

/** Reveal with clip-path (vertical) */
export const revealVertical: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: TRANSITION.slow,
  },
  exit: {
    clipPath: "inset(100% 0 0 0)",
    transition: TRANSITION.fast,
  },
};

/** Reveal with clip-path (horizontal) */
export const revealHorizontal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: TRANSITION.slow,
  },
  exit: {
    clipPath: "inset(0 0 0 100%)",
    transition: TRANSITION.fast,
  },
};

/** Scale with reveal */
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION.slow,
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: TRANSITION.fast,
  },
};

/** Ink brush line */
export const inkBrush: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: TRANSITION.slow,
  },
};

/** Stagger container */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: TRANSITION.stagger,
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   MODAL VARIANTS
   ═══════════════════════════════════════════════════════════════════════════ */

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.fast, ease: "linear" },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.fast, ease: "linear" },
  },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: TRANSITION.default,
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: TRANSITION.fast,
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE TRANSITION VARIANTS
   ═══════════════════════════════════════════════════════════════════════════ */

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: TRANSITION.default,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: TRANSITION.fast,
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   RED SUN VARIANTS (Wa-Modern specific)
   ═══════════════════════════════════════════════════════════════════════════ */

export const redSunExpand: Variants = {
  rest: { scale: 0, opacity: 0 },
  hover: {
    scale: 3,
    opacity: 0.85,
    transition: TRANSITION.slow,
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   LEGACY COMPATIBILITY
   For existing code using PHYSICS.spring
   ═══════════════════════════════════════════════════════════════════════════ */

export const PHYSICS = {
  /** @deprecated Use TRANSITION.default instead */
  spring: TRANSITION.default,
} as const;

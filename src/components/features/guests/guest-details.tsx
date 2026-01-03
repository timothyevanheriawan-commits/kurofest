'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Twitter, Instagram, Youtube, Globe } from 'lucide-react';
import { Guest } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════════════════════════════
MOTION CONFIGURATION - Sharp Easing Only
═══════════════════════════════════════════════════════════════════════════ */
const easing = {
    expoOut: [0.19, 1, 0.22, 1] as const,
    expoIn: [0.95, 0.05, 0.795, 0.035] as const,
};

const duration = {
    fast: 0.3,
    normal: 0.5,
    slow: 0.7,
};

/* ═══════════════════════════════════════════════════════════════════════════
ANIMATION VARIANTS
═══════════════════════════════════════════════════════════════════════════ */
const staggerContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.3,
        },
    },
};

const staggerItemVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: duration.normal,
            ease: easing.expoOut,
        },
    },
};

/* ═══════════════════════════════════════════════════════════════════════════
COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
interface GuestDetailsProps {
    guest: Guest;
    isModal?: boolean;
}

export function GuestDetails({ guest, isModal = false }: GuestDetailsProps) {
    const router = useRouter();

    const handleClose = () => {
        if (isModal) {
            router.back();
        } else {
            router.push('/');
        }
    };

    return (
        <motion.article
            layoutId={`card-${guest.id}`}
            className={cn(
                'relative flex flex-col md:flex-row overflow-hidden',
                'bg-washi-100',
                'border-2 border-sumi-950',
                'w-full max-w-5xl',
                'h-[90vh] md:min-h-[600px] md:max-h-[800px]',
                'rounded-none',
                'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
            )}
        >
            {/* ─────────────────────────────────────────────────────────────────────
      CLOSE BUTTON
      ───────────────────────────────────────────────────────────────────── */}
            <motion.button
                onClick={handleClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: duration.fast, delay: 0.3 }}
                className={cn(
                    'absolute top-4 right-4 z-50',
                    'w-10 h-10',
                    'flex items-center justify-center',
                    'bg-sumi-950 text-washi-100',
                    'border-2 border-sumi-950',
                    'transition-colors duration-300',
                    'hover:bg-shu-600 hover:border-shu-600',
                    'focus-visible:outline-offset-2'
                )}
                aria-label="Close"
            >
                <X size={20} strokeWidth={2.5} />
            </motion.button>

            {/* ─────────────────────────────────────────────────────────────────────
      LEFT: IMAGE SECTION
      ───────────────────────────────────────────────────────────────────── */}
            <motion.div
                layoutId={`image-container-${guest.id}`}
                className="relative h-[40%] w-full md:h-full md:w-[45%] overflow-hidden shrink-0"
            >
                <Image
                    src={guest.image_url}
                    alt={guest.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className={cn('object-cover object-top', 'grayscale-[20%]')}
                />

                {/* Gradient overlay */}
                <div
                    className={cn(
                        'absolute inset-0',
                        'from-washi-100 via-transparent to-transparent opacity-60'
                    )}
                />

                {/* Role Label */}
                <motion.div
                    layoutId={`role-${guest.id}`}
                    className={cn(
                        'absolute top-0 left-0',
                        'px-4 py-3',
                        'bg-sumi-950 text-washi-100',
                        'text-[11px] font-semibold tracking-[0.2em] uppercase'
                    )}
                >
                    {guest.role}
                </motion.div>

                {/* Vertical Japanese Name Overlay */}
                <div className={cn(
                    'absolute top-16 left-6',
                    'writing-vertical',
                    'hidden md:block'
                )}>
                    <span className={cn(
                        'font-serif text-5xl font-black',
                        'text-sumi-950 opacity-10',
                        'select-none'
                    )}>
                        {guest.name_ja}
                    </span>
                </div>
            </motion.div>

            {/* ─────────────────────────────────────────────────────────────────────
      RIGHT: CONTENT SECTION
      ───────────────────────────────────────────────────────────────────── */}
            <div className="flex flex-1 flex-col p-6 md:p-12 overflow-y-auto bg-washi-100">
                {/* Header */}
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[10px] font-bold text-shu-600 tracking-[0.3em] uppercase mb-2"
                    >
                        Guest Spotlight 2026
                    </motion.div>

                    <motion.h1
                        layoutId={`title-${guest.id}`}
                        className={cn(
                            'font-display text-4xl md:text-6xl font-black',
                            'tracking-tighter uppercase',
                            'text-sumi-950 leading-none'
                        )}
                    >
                        {guest.name}
                    </motion.h1>

                    <div className="flex items-center gap-4 mt-4">
                        <div className="h-[2px] w-12 bg-sumi-950" />
                        <span className="font-serif text-xl font-medium text-sumi-600">{guest.name_ja}</span>
                    </div>
                </div>

                {/* Animated content */}
                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-10 flex-1 space-y-8"
                >
                    {/* Bio Section */}
                    <motion.div variants={staggerItemVariants} className="space-y-4">
                        <h3 className="text-[11px] font-bold text-sumi-400 tracking-[0.2em] uppercase">Biography</h3>
                        <p className={cn(
                            'text-lg leading-relaxed font-medium',
                            'text-sumi-950 italic border-l-4 border-shu-600 pl-4'
                        )}>
                            {guest.tagline}
                        </p>
                        <p className={cn(
                            'text-base leading-relaxed',
                            'text-sumi-700',
                            'max-w-prose'
                        )}>
                            {guest.bio}
                        </p>
                    </motion.div>

                    {/* Stats Row */}
                    {guest.stats && (
                        <motion.div
                            variants={staggerItemVariants}
                            className="grid grid-cols-3 gap-4 py-6 border-y border-sumi-200"
                        >
                            {[
                                { label: 'Appearances', value: guest.stats.events },
                                { label: 'Followers', value: guest.stats.followers },
                                { label: 'Awards', value: guest.stats.awards },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <span className="text-[9px] font-bold tracking-[0.15em] text-sumi-400 uppercase block mb-1">
                                        {stat.label}
                                    </span>
                                    <span className="text-2xl font-black text-sumi-950 block">
                                        {stat.value}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Appearance Card */}
                    {guest.appearance && (
                        <motion.div
                            variants={staggerItemVariants}
                            className={cn(
                                'p-6 relative overflow-hidden',
                                'bg-sumi-950 text-washi-100',
                            )}
                        >
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <span className="text-[9px] font-bold tracking-[0.2em] text-shu-500 uppercase block mb-2">
                                        Schedule
                                    </span>
                                    <h4 className="font-display text-2xl font-bold tracking-tight">
                                        {guest.appearance.location}
                                    </h4>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <span className="block text-[10px] uppercase opacity-50">Date</span>
                                        <span className="font-mono text-xl font-bold">Day 0{guest.appearance.day}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-[10px] uppercase opacity-50">Time</span>
                                        <span className="font-mono text-xl font-bold text-shu-500">{guest.appearance.time}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Background accent */}
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <Globe size={80} />
                            </div>
                        </motion.div>
                    )}

                    {/* Social Links */}
                    <motion.div
                        variants={staggerItemVariants}
                        className="flex flex-wrap gap-3"
                    >
                        {guest.social?.twitter && (
                            <SocialButton href={`https://twitter.com/${guest.social.twitter}`} icon={<Twitter size={14} />} label="Twitter" />
                        )}
                        {guest.social?.instagram && (
                            <SocialButton href={`https://instagram.com/${guest.social.instagram}`} icon={<Instagram size={14} />} label="Instagram" />
                        )}
                        {guest.social?.youtube && (
                            <SocialButton href={`https://youtube.com/c/${guest.social.youtube}`} icon={<Youtube size={14} />} label="YouTube" />
                        )}
                    </motion.div>
                </motion.div>

                {/* Footer Hanko */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: duration.normal, delay: 0.8 }}
                    className="mt-12 flex justify-end"
                >
                    <div className="relative group">
                        <div className="absolute inset-0" />
                        <div className={cn(
                            'relative w-16 h-16',
                            'flex items-center justify-center',
                            'border-[3px] border-shu-600',
                            'text-shu-600 rotate-[-12deg]',
                            'font-serif text-xl font-black'
                        )}>
                            <span className="writing-vertical leading-none">招待</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.article>
    );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'flex items-center gap-2 px-5 py-3',
                'text-[10px] font-bold tracking-[0.15em] uppercase',
                'text-sumi-950 bg-white',
                'border-2 border-sumi-950',
                'transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
                'active:translate-y-0 active:translate-x-0 active:shadow-none'
            )}
        >
            {icon}
            {label}
        </a>
    );
}
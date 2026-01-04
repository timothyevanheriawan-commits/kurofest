'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Twitter, Instagram, Youtube, MapPin, Clock, Calendar } from 'lucide-react';
import { Guest, ROLE_LABELS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const easing = { expoOut: [0.19, 1, 0.22, 1] as const };
const duration = { fast: 0.3, normal: 0.5, slow: 0.7 };

const staggerContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const staggerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: easing.expoOut } },
};

export function GuestDetails({ guest, isModal = false }: { guest: Guest; isModal?: boolean }) {
    const router = useRouter();
    const roleLabel = ROLE_LABELS[guest.role];

    const handleClose = () => isModal ? router.back() : router.push('/');

    return (
        <motion.article
            layoutId={`card-${guest.id}`}
            className="relative flex flex-col md:flex-row overflow-hidden bg-washi-100 border-2 border-sumi-950 w-full max-w-5xl h-[90vh] md:h-[600px] rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
            <motion.button
                onClick={handleClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-sumi-950 text-washi-100 border-2 border-sumi-950 hover:bg-shu-600 transition-colors"
            >
                <X size={20} strokeWidth={2.5} />
            </motion.button>

            {/* LEFT: IMAGE SECTION */}
            <motion.div layoutId={`image-container-${guest.id}`} className="relative h-[35%] w-full md:h-full md:w-[45%] overflow-hidden">
                <Image src={guest.image_url} alt={guest.name} fill priority className="object-cover object-top grayscale-[20%]" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-washi-100 via-transparent to-transparent" />
                
                <motion.div layoutId={`role-${guest.id}`} className="absolute top-0 left-0 px-4 py-3 bg-sumi-950 text-washi-100 text-[11px] font-semibold tracking-[0.2em] uppercase">
                    {roleLabel.en}
                </motion.div>

                <div className="absolute top-16 right-4 writing-vertical hidden md:block">
                    <span className="font-serif text-4xl font-bold text-washi-100 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.9)]">
                        {guest.name_ja}
                    </span>
                </div>
            </motion.div>

            {/* RIGHT: CONTENT SECTION */}
            <div className="flex flex-1 flex-col p-6 md:p-10 overflow-y-auto">
                <header>
                    <motion.h1 layoutId={`title-${guest.id}`} className="font-display text-4xl md:text-5xl font-black tracking-tight uppercase text-sumi-950 leading-[0.95]">
                        {guest.name}
                    </motion.h1>
                    <div className="mt-3 w-16 h-0.5 bg-shu-600" />
                </header>

                <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible" className="mt-8 flex-1 space-y-6">
                    {/* Bio Sync */}
                    <motion.div variants={staggerItemVariants}>
                        <p className="text-base leading-relaxed text-sumi-700 max-w-prose">
                            {guest.bio || guest.tagline}
                        </p>
                    </motion.div>

                    {/* Stats Sync */}
                    {guest.stats && (
                        <motion.div variants={staggerItemVariants} className="flex gap-8 py-4 border-y border-sumi-200">
                            <div>
                                <span className="text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase block">Events</span>
                                <span className="text-2xl font-bold text-sumi-950 block mt-1">{guest.stats.events}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase block">Followers</span>
                                <span className="text-2xl font-bold text-sumi-950 block mt-1">{guest.stats.followers}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase block">Awards</span>
                                <span className="text-2xl font-bold text-sumi-950 block mt-1">{guest.stats.awards}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Appearance Sync */}
                    {guest.appearance && (
                        <motion.div variants={staggerItemVariants} className="p-5 bg-washi-200 border-2 border-sumi-950">
                            <span className="text-[10px] font-semibold tracking-[0.15em] text-sumi-400 uppercase block">Appearance</span>
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <MapPin size={18} className="text-shu-600" />
                                    <div>
                                        <span className="font-display text-lg font-bold text-sumi-950 block">{guest.appearance.location}</span>
                                        <span className="text-xs text-sumi-500 uppercase tracking-widest">Main Stage</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1 text-shu-600 font-mono font-bold">
                                        <Clock size={14} />
                                        <span>{guest.appearance.time}</span>
                                    </div>
                                    <span className="text-xs text-sumi-500">Day {guest.appearance.day}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Socials Sync */}
                    <motion.div variants={staggerItemVariants} className="flex flex-wrap gap-3">
                        {guest.social?.twitter && (
                            <a href={`https://twitter.com/${guest.social.twitter}`} target="_blank" className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sumi-950 border border-sumi-300 hover:bg-sumi-950 hover:text-washi-100 transition-all">
                                <Twitter size={12} /> Twitter
                            </a>
                        )}
                        {guest.social?.instagram && (
                            <a href={`https://instagram.com/${guest.social.instagram}`} target="_blank" className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sumi-950 border border-sumi-300 hover:bg-sumi-950 hover:text-washi-100 transition-all">
                                <Instagram size={12} /> Instagram
                            </a>
                        )}
                        {guest.social?.youtube && (
                            <a href={`https://youtube.com/${guest.social.youtube}`} target="_blank" className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-sumi-950 border border-sumi-300 hover:bg-sumi-950 hover:text-washi-100 transition-all">
                                <Youtube size={12} /> YouTube
                            </a>
                        )}
                    </motion.div>
                </motion.div>

                {/* Hanko Stamp */}
                <motion.div initial={{ opacity: 0, rotate: -10, scale: 0.8 }} animate={{ opacity: 1, rotate: -5, scale: 1 }} className="mt-auto pt-6 flex justify-end">
                    <div className="w-14 h-14 flex items-center justify-center border-2 border-shu-600 text-shu-600 font-serif text-lg font-bold">
                        <span className="writing-vertical">認証</span>
                    </div>
                </motion.div>
            </div>
        </motion.article>
    );
}
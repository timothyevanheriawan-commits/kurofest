/**
 * KUROFEST 2026 - Guest Data Model
 * 和モダン Design System
 */

export type GuestRole = "Cosplayer" | "Artist" | "Voice Actor" | "DJ";

export interface Guest {
  id: string;
  slug: string;
  name: string;
  name_ja: string; // Japanese name for vertical typography
  role: GuestRole;
  tagline: string; // Short description for cards
  bio?: string; // Full biography for detail pages
  image_url: string;
  span: "small" | "medium" | "large"; // Controls grid size
  social?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  stats?: {
    events: number;
    followers: string;
    awards: number;
  };
  appearance?: {
    day: 1 | 2;
    time: string;
    location: string;
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROLE CONFIGURATION - Label Mappings
   ═══════════════════════════════════════════════════════════════════════════ */

export const ROLE_LABELS: Record<GuestRole, { en: string; ja: string }> = {
  Cosplayer: { en: "COSPLAYER", ja: "コスプレイヤー" },
  Artist: { en: "ARTIST", ja: "アーティスト" },
  "Voice Actor": { en: "VOICE ACTOR", ja: "声優" },
  DJ: { en: "DJ", ja: "ディージェー" },
};

/* ═══════════════════════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════════════════════ */

export const MOCK_GUESTS: Guest[] = [
  {
    id: "1",
    slug: "hikari-nova",
    name: "Hikari Nova",
    name_ja: "光ノヴァ",
    role: "Cosplayer",
    tagline: "Award-winning cosplayer known for hyper-detailed armor builds",
    bio: "With over a decade of experience in competitive cosplay, Hikari Nova has become synonymous with craftsmanship excellence. Her work blends traditional Japanese aesthetics with futuristic design elements.",
    image_url:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    span: "large",
    social: {
      twitter: "hikarinova",
      instagram: "hikari.nova",
      youtube: "HikariNovaOfficial",
    },
    stats: {
      events: 156,
      followers: "2.8M",
      awards: 23,
    },
    appearance: {
      day: 1,
      time: "14:00",
      location: "Main Stage",
    },
  },
  {
    id: "2",
    slug: "cyber-ken",
    name: "Cyber Ken",
    name_ja: "サイバー健",
    role: "DJ",
    tagline: "Pioneering the future of anime-influenced electronic music",
    bio: "Cyber Ken fuses classic anime soundtracks with cutting-edge electronic production. His sets have become legendary at conventions across Asia and Europe.",
    image_url:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop",
    span: "small",
    social: {
      twitter: "cyberken_dj",
      instagram: "cyberken",
    },
    stats: {
      events: 89,
      followers: "1.2M",
      awards: 7,
    },
    appearance: {
      day: 2,
      time: "22:00",
      location: "Neon District",
    },
  },
  {
    id: "3",
    slug: "neon-v",
    name: "Neon V",
    name_ja: "ネオンV",
    role: "Artist",
    tagline: "Digital illustrator blending ukiyo-e with cyberpunk aesthetics",
    bio: "Neon V's work has graced the covers of major anime publications and international galleries. Her unique style bridges Edo-period woodblock prints with modern digital techniques.",
    image_url:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    span: "medium",
    social: {
      twitter: "neon_v_art",
      instagram: "neon.v.art",
      youtube: "NeonVStudio",
    },
    stats: {
      events: 67,
      followers: "890K",
      awards: 15,
    },
    appearance: {
      day: 1,
      time: "11:00",
      location: "Artist Alley",
    },
  },
  {
    id: "4",
    slug: "aira-blue",
    name: "Aira Blue",
    name_ja: "藍良ブルー",
    role: "Voice Actor",
    tagline: "Voice behind iconic characters in modern anime",
    bio: "Aira Blue has voiced over 40 characters in major anime productions. Known for her versatile range, she brings depth and emotion to every role.",
    image_url:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    span: "small",
    social: {
      twitter: "airablue_va",
      instagram: "aira.blue",
    },
    stats: {
      events: 203,
      followers: "3.1M",
      awards: 31,
    },
    appearance: {
      day: 2,
      time: "15:00",
      location: "Stage B",
    },
  },
  {
    id: "5",
    slug: "takeshi-mori",
    name: "Takeshi Mori",
    name_ja: "森武",
    role: "Artist",
    tagline: "Master calligrapher and contemporary ink artist",
    bio: "Bridging centuries of tradition with modern expression, Takeshi Mori's live calligraphy performances have mesmerized audiences worldwide.",
    image_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    span: "medium",
    social: {
      instagram: "takeshi.mori.ink",
    },
    stats: {
      events: 112,
      followers: "456K",
      awards: 8,
    },
    appearance: {
      day: 1,
      time: "16:00",
      location: "Workshop A",
    },
  },
  {
    id: "6",
    slug: "yuki-tanaka",
    name: "Yuki Tanaka",
    name_ja: "田中雪",
    role: "Cosplayer",
    tagline: "Transformative makeup artist and costume designer",
    bio: "Yuki Tanaka specializes in character transformations that blur the line between fantasy and reality. Her tutorials have inspired millions.",
    image_url:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
    span: "small",
    social: {
      twitter: "yukitanaka_cos",
      instagram: "yuki.tanaka",
      youtube: "YukiTanakaCosplay",
    },
    stats: {
      events: 78,
      followers: "1.5M",
      awards: 12,
    },
    appearance: {
      day: 2,
      time: "13:00",
      location: "Main Stage",
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Find a guest by their URL slug
 */
export function getGuestBySlug(slug: string): Guest | undefined {
  return MOCK_GUESTS.find((guest) => guest.slug === slug);
}

/**
 * Find a guest by their ID
 */
export function getGuestById(id: string): Guest | undefined {
  return MOCK_GUESTS.find((guest) => guest.id === id);
}

/**
 * Get guests filtered by role
 */
export function getGuestsByRole(role: GuestRole): Guest[] {
  return MOCK_GUESTS.filter((guest) => guest.role === role);
}

/**
 * Get featured guests (large span)
 */
export function getFeaturedGuests(): Guest[] {
  return MOCK_GUESTS.filter((guest) => guest.span === "large");
}

/**
 * Get all unique roles
 */
export function getAllRoles(): GuestRole[] {
  return [...new Set(MOCK_GUESTS.map((guest) => guest.role))];
}

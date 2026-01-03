/**
 * KUROFEST 2026 - Schedule Data Model
 * 和モダン Design System
 */

export type EventType =
  | "performance"
  | "panel"
  | "workshop"
  | "meetup"
  | "dj-set";

export interface ScheduleItem {
  id: string;
  title: string;
  title_ja?: string; // Japanese title for display
  time_start: string; // "10:00" format
  time_end: string;
  location: string;
  location_ja?: string;
  type: EventType;
  speaker?: string;
  speaker_slug?: string; // Links to guest profile
  description?: string;
  day: 1 | 2;
  is_live?: boolean; // Currently happening
  is_featured?: boolean; // Highlighted event
  capacity?: number;
}

/* ═══════════════════════════════════════════════════════════════════════════
   EVENT TYPE CONFIGURATION
   ═══════════════════════════════════════════════════════════════════════════ */

export const EVENT_TYPE_LABELS: Record<EventType, { en: string; ja: string }> =
  {
    performance: { en: "PERFORMANCE", ja: "公演" },
    panel: { en: "PANEL", ja: "パネル" },
    workshop: { en: "WORKSHOP", ja: "ワークショップ" },
    meetup: { en: "MEET & GREET", ja: "交流会" },
    "dj-set": { en: "DJ SET", ja: "DJセット" },
  };

/* ═══════════════════════════════════════════════════════════════════════════
   LOCATION CONFIGURATION
   ═══════════════════════════════════════════════════════════════════════════ */

export const LOCATIONS = {
  "main-stage": { en: "Main Stage", ja: "メインステージ" },
  "stage-b": { en: "Stage B", ja: "ステージB" },
  "workshop-a": { en: "Workshop A", ja: "ワークショップA" },
  "workshop-b": { en: "Workshop B", ja: "ワークショップB" },
  "artist-alley": { en: "Artist Alley", ja: "アーティストアレイ" },
  "neon-district": { en: "Neon District", ja: "ネオン地区" },
  "meeting-room-1": { en: "Meeting Room 1", ja: "会議室1" },
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════════════════════ */

export const MOCK_SCHEDULE: ScheduleItem[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // DAY 1 - Saturday
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "e1",
    title: "Opening Ceremony",
    title_ja: "開会式",
    time_start: "09:00",
    time_end: "10:00",
    location: "Main Stage",
    location_ja: "メインステージ",
    type: "performance",
    description:
      "The grand opening of KuroFest 2026 featuring special announcements and performances.",
    day: 1,
    is_featured: true,
  },
  {
    id: "e2",
    title: "The Art of Character Design",
    title_ja: "キャラクターデザインの技法",
    speaker: "Hikari Nova",
    speaker_slug: "hikari-nova",
    time_start: "10:30",
    time_end: "11:30",
    location: "Workshop A",
    location_ja: "ワークショップA",
    type: "panel",
    description:
      "Explore the creative process behind iconic character designs with award-winning cosplayer Hikari Nova.",
    day: 1,
    is_live: true,
    capacity: 200,
  },
  {
    id: "e3",
    title: "Live Ink: Calligraphy Performance",
    title_ja: "墨の舞：書道パフォーマンス",
    speaker: "Takeshi Mori",
    speaker_slug: "takeshi-mori",
    time_start: "11:00",
    time_end: "12:00",
    location: "Artist Alley",
    location_ja: "アーティストアレイ",
    type: "performance",
    description:
      "Watch master calligrapher Takeshi Mori create stunning large-scale works in real-time.",
    day: 1,
    is_featured: true,
  },
  {
    id: "e4",
    title: "Fashion Forward: Anime Meets Streetwear",
    title_ja: "ファッション・フォワード",
    time_start: "12:00",
    time_end: "13:00",
    location: "Main Stage",
    location_ja: "メインステージ",
    type: "performance",
    description:
      "A runway show featuring collaborations between anime studios and fashion designers.",
    day: 1,
  },
  {
    id: "e5",
    title: "Voice Acting Masterclass",
    title_ja: "声優マスタークラス",
    speaker: "Aira Blue",
    speaker_slug: "aira-blue",
    time_start: "14:00",
    time_end: "15:30",
    location: "Stage B",
    location_ja: "ステージB",
    type: "workshop",
    description:
      "Learn the techniques behind bringing animated characters to life from industry veteran Aira Blue.",
    day: 1,
    capacity: 150,
  },
  {
    id: "e6",
    title: "Digital Art: From Ukiyo-e to NFT",
    title_ja: "浮世絵からNFTへ",
    speaker: "Neon V",
    speaker_slug: "neon-v",
    time_start: "16:00",
    time_end: "17:00",
    location: "Workshop A",
    location_ja: "ワークショップA",
    type: "panel",
    description:
      "Neon V discusses the evolution of Japanese art forms in the digital age.",
    day: 1,
    capacity: 200,
  },
  {
    id: "e7",
    title: "Cosplay Meet & Greet",
    title_ja: "コスプレ交流会",
    speaker: "Hikari Nova",
    speaker_slug: "hikari-nova",
    time_start: "17:30",
    time_end: "18:30",
    location: "Meeting Room 1",
    location_ja: "会議室1",
    type: "meetup",
    description:
      "Exclusive meet and greet session with Hikari Nova. Limited capacity.",
    day: 1,
    capacity: 50,
  },
  {
    id: "e8",
    title: "Evening Showcase",
    title_ja: "イブニングショーケース",
    time_start: "19:00",
    time_end: "21:00",
    location: "Main Stage",
    location_ja: "メインステージ",
    type: "performance",
    description:
      "A spectacular evening of performances featuring all Day 1 guests.",
    day: 1,
    is_featured: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DAY 2 - Sunday
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "e9",
    title: "Sunrise Session",
    title_ja: "サンライズセッション",
    speaker: "Cyber Ken",
    speaker_slug: "cyber-ken",
    time_start: "08:00",
    time_end: "10:00",
    location: "Neon District",
    location_ja: "ネオン地区",
    type: "dj-set",
    description: "Start Day 2 with an energizing set from Cyber Ken.",
    day: 2,
  },
  {
    id: "e10",
    title: "Prop Building Workshop",
    title_ja: "小道具制作ワークショップ",
    speaker: "Yuki Tanaka",
    speaker_slug: "yuki-tanaka",
    time_start: "10:30",
    time_end: "12:00",
    location: "Workshop B",
    location_ja: "ワークショップB",
    type: "workshop",
    description:
      "Hands-on workshop teaching advanced prop-building techniques.",
    day: 2,
    capacity: 80,
  },
  {
    id: "e11",
    title: "Industry Insider Panel",
    title_ja: "業界インサイダーパネル",
    time_start: "12:30",
    time_end: "13:30",
    location: "Stage B",
    location_ja: "ステージB",
    type: "panel",
    description:
      "Behind-the-scenes insights from anime industry professionals.",
    day: 2,
  },
  {
    id: "e12",
    title: "Cosplay Championship Finals",
    title_ja: "コスプレ選手権決勝",
    time_start: "14:00",
    time_end: "16:00",
    location: "Main Stage",
    location_ja: "メインステージ",
    type: "performance",
    description: "The culmination of the KuroFest Cosplay Championship.",
    day: 2,
    is_featured: true,
  },
  {
    id: "e13",
    title: "Artist Signing Session",
    title_ja: "アーティストサイン会",
    speaker: "Neon V",
    speaker_slug: "neon-v",
    time_start: "15:00",
    time_end: "16:30",
    location: "Artist Alley",
    location_ja: "アーティストアレイ",
    type: "meetup",
    description: "Get your exclusive prints signed by Neon V.",
    day: 2,
    capacity: 100,
  },
  {
    id: "e14",
    title: "Closing Ceremony",
    title_ja: "閉会式",
    time_start: "17:00",
    time_end: "18:00",
    location: "Main Stage",
    location_ja: "メインステージ",
    type: "performance",
    description:
      "Farewell ceremony with awards, announcements, and a preview of KuroFest 2027.",
    day: 2,
    is_featured: true,
  },
  {
    id: "e15",
    title: "After Party: Neon Nights",
    title_ja: "アフターパーティー：ネオンナイト",
    speaker: "Cyber Ken",
    speaker_slug: "cyber-ken",
    time_start: "20:00",
    time_end: "00:00",
    location: "Neon District",
    location_ja: "ネオン地区",
    type: "dj-set",
    description: "The ultimate KuroFest afterparty. 18+ only.",
    day: 2,
    is_featured: true,
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Get schedule items for a specific day
 */
export function getScheduleByDay(day: 1 | 2): ScheduleItem[] {
  return MOCK_SCHEDULE.filter((item) => item.day === day).sort((a, b) =>
    a.time_start.localeCompare(b.time_start)
  );
}

/**
 * Get schedule items by event type
 */
export function getScheduleByType(type: EventType): ScheduleItem[] {
  return MOCK_SCHEDULE.filter((item) => item.type === type);
}

/**
 * Get featured events
 */
export function getFeaturedEvents(): ScheduleItem[] {
  return MOCK_SCHEDULE.filter((item) => item.is_featured);
}

/**
 * Get events for a specific speaker
 */
export function getEventsBySpeaker(speakerSlug: string): ScheduleItem[] {
  return MOCK_SCHEDULE.filter((item) => item.speaker_slug === speakerSlug);
}

/**
 * Get currently live events (for demo purposes)
 */
export function getLiveEvents(): ScheduleItem[] {
  return MOCK_SCHEDULE.filter((item) => item.is_live);
}

/**
 * Find a schedule item by ID
 */
export function getScheduleItemById(id: string): ScheduleItem | undefined {
  return MOCK_SCHEDULE.find((item) => item.id === id);
}

/**
 * Get all unique locations
 */
export function getAllLocations(): string[] {
  return [...new Set(MOCK_SCHEDULE.map((item) => item.location))];
}

/**
 * Format time range for display
 */
export function formatTimeRange(start: string, end: string): string {
  return `${start} — ${end}`;
}

/**
 * Parse time string to minutes for comparison
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/**
 * Check if an event is happening now (mock implementation)
 */
export function isEventLive(item: ScheduleItem): boolean {
  return item.is_live ?? false;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  title_ja: string;
  excerpt: string;
  content: string;
  category: "announcement" | "guest" | "schedule" | "tickets";
  date: string;
  image?: string;
  featured?: boolean;
}

export const CATEGORY_LABELS = {
  announcement: { en: "Announcement", ja: "お知らせ" },
  guest: { en: "Guest News", ja: "ゲスト情報" },
  schedule: { en: "Schedule Update", ja: "スケジュール" },
  tickets: { en: "Tickets", ja: "チケット" },
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: "1",
    slug: "phase-2-tickets-available",
    title: "Phase 2 Tickets Now Available",
    title_ja: "第2期チケット販売開始",
    excerpt:
      "Premium and VIP passes for KuroFest 2026 are now available. Early bird pricing ends July 31st.",
    content: `We're excited to announce that Phase 2 tickets are now available for purchase. This phase includes our Premium and VIP tier passes with exclusive benefits.

**Premium Pass Benefits:**
- Priority entry to all stages
- Exclusive meet & greet access
- Limited edition merchandise pack

**VIP Pass Benefits:**
- All Premium benefits
- Backstage tour access
- Private lounge access
- Signed poster from featured guests

Early bird pricing is available until July 31st, 2026. Don't miss your chance to secure the ultimate KuroFest experience.`,
    category: "tickets",
    date: "2026-06-15",
    image:
      "https://images.unsplash.com/photo-1707365782267-eb5583f8c361?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
  },
  {
    id: "2",
    slug: "hikari-nova-confirmed",
    title: "Hikari Nova Confirmed as Headline Guest",
    title_ja: "光ノヴァがヘッドラインゲストとして確定",
    excerpt:
      "Award-winning cosplayer Hikari Nova joins KuroFest 2026 for an exclusive two-day appearance.",
    content: `We are thrilled to announce that Hikari Nova, the internationally acclaimed cosplayer, will be joining us at KuroFest 2026 as our headline guest.

Known for her incredible craftsmanship and attention to detail, Hikari has won numerous awards including the World Cosplay Summit championship. At KuroFest, she will be hosting:

- A live prop-building demonstration
- Q&A panel session
- Exclusive meet & greet (VIP pass holders)
- Judging the Cosplay Championship Finals

This is her first convention appearance in Japan in over two years. Don't miss this incredible opportunity!`,
    category: "guest",
    date: "2026-06-10",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200",
    featured: true,
  },
  {
    id: "3",
    slug: "artist-alley-applications-open",
    title: "Artist Alley Applications Now Open",
    title_ja: "アーティストアレイ申請受付開始",
    excerpt:
      "Independent artists can now apply for booth space at KuroFest 2026 Artist Alley.",
    content: `Calling all artists! Applications for KuroFest 2026 Artist Alley are now open.

**Application Details:**
- Deadline: July 15th, 2026
- Booth sizes: Small (1 table), Medium (2 tables), Large (corner booth)
- All genres welcome: illustration, crafts, apparel, accessories

**Requirements:**
- Portfolio of at least 10 works
- Valid business registration (if applicable)
- Commitment to both convention days

Selected artists will be notified by August 1st. Apply through our official portal.`,
    category: "announcement",
    date: "2026-06-01",
  },
  {
    id: "4",
    slug: "schedule-preview-released",
    title: "Preliminary Schedule Released",
    title_ja: "暫定スケジュール公開",
    excerpt:
      "Get a first look at what's planned for both days of KuroFest 2026.",
    content: `We're excited to share a preliminary look at the KuroFest 2026 schedule!

**Day 1 Highlights:**
- Opening Ceremony (9:00 AM)
- Hikari Nova Panel (10:30 AM)
- Live Calligraphy Performance (11:00 AM)
- Cosplay Championship Preliminaries (2:00 PM)

**Day 2 Highlights:**
- Morning DJ Set with Cyber Ken (8:00 AM)
- Voice Acting Workshop (10:30 AM)
- Cosplay Championship Finals (2:00 PM)
- Closing Ceremony (5:00 PM)

Full schedule with all events will be released one month before the convention.`,
    category: "schedule",
    date: "2026-05-20",
  },
  {
    id: "5",
    slug: "venue-map-preview",
    title: "Tokyo Big Sight Venue Layout Revealed",
    title_ja: "東京ビッグサイト会場レイアウト公開",
    excerpt: "Explore the floor plan for this year's expanded venue space.",
    content: `KuroFest 2026 will occupy East Halls 1-8 at Tokyo Big Sight, our largest venue yet!

**Key Areas:**
- Main Stage: Hall 1-2 (5,000 capacity)
- Stage B: Hall 3 (2,000 capacity)
- Artist Alley: Hall 4-5
- Cosplay Zone: Hall 6
- Food Court: Hall 7
- Rest Areas & Merchandise: Hall 8

Interactive venue maps will be available in our mobile app (coming soon) and at all information desks during the event.`,
    category: "announcement",
    date: "2026-05-15",
  },
];

export function getNewsItem(slug: string): NewsItem | undefined {
  return MOCK_NEWS.find((item) => item.slug === slug);
}

export function getFeaturedNews(): NewsItem[] {
  return MOCK_NEWS.filter((item) => item.featured).map((item) => ({
    ...item,
    formattedDate: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(item.date)),
  }));
}


export function getNewsByCategory(category: NewsItem["category"]): NewsItem[] {
  return MOCK_NEWS.filter((item) => item.category === category);
}
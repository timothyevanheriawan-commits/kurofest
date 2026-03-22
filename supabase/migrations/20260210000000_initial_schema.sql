-- KuroFest 2026 Database Schema

-- 1. Create Custom Types
CREATE TYPE guest_role AS ENUM ('Cosplayer', 'Artist', 'Voice Actor', 'DJ');
CREATE TYPE event_type AS ENUM ('performance', 'panel', 'workshop', 'meetup', 'dj-set');
CREATE TYPE news_category AS ENUM ('announcement', 'guest', 'schedule', 'tickets');

-- 2. Guests Table
CREATE TABLE guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    name_ja TEXT,
    role guest_role NOT NULL,
    tagline TEXT,
    bio TEXT,
    image_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    stats JSONB DEFAULT '{ "events": 0, "followers": "0", "awards": 0 }'::jsonb,
    span TEXT DEFAULT 'small' CHECK (span IN ('small', 'medium', 'large')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Schedule Table
CREATE TABLE schedule (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    title_ja TEXT,
    time_start TIME NOT NULL,
    time_end TIME NOT NULL,
    location TEXT NOT NULL,
    location_ja TEXT,
    type event_type NOT NULL,
    speaker_id UUID REFERENCES guests(id) ON DELETE SET NULL,
    description TEXT,
    day INTEGER CHECK (day IN (1, 2)),
    is_live BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    capacity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. News Table
CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    title_ja TEXT,
    excerpt TEXT,
    content TEXT,
    category news_category NOT NULL,
    image_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Public can read all data
CREATE POLICY "Public Read Guests" ON guests FOR SELECT USING (true);
CREATE POLICY "Public Read Schedule" ON schedule FOR SELECT USING (true);
CREATE POLICY "Public Read News" ON news FOR SELECT USING (true);

-- Only authenticated users (Admins) can modify data
CREATE POLICY "Admin All Guests" ON guests FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Schedule" ON schedule FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All News" ON news FOR ALL TO authenticated USING (true);

-- 7. Initial Mock Data

-- Insert Guests
INSERT INTO guests (id, slug, name, name_ja, role, tagline, bio, image_url, social_links, stats, span)
VALUES
    ('00000000-0000-0000-0000-000000000001', 'hikari-nova', 'Hikari Nova', '光ノヴァ', 'Cosplayer', 'Award-winning cosplayer known for hyper-detailed armor builds', 'With over a decade of experience in competitive cosplay, Hikari Nova has become synonymous with craftsmanship excellence. Her work blends traditional Japanese aesthetics with futuristic design elements.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop', '{"twitter": "hikarinova", "instagram": "hikari.nova", "youtube": "HikariNovaOfficial"}', '{"events": 156, "followers": "2.8M", "awards": 23}', 'large'),
    ('00000000-0000-0000-0000-000000000002', 'cyber-ken', 'Cyber Ken', 'サイバー健', 'DJ', 'Pioneering the future of anime-influenced electronic music', 'Cyber Ken fuses classic anime soundtracks with cutting-edge electronic production. His sets have become legendary at conventions across Asia and Europe.', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1000&auto=format&fit=crop', '{"twitter": "cyberken_dj", "instagram": "cyberken"}', '{"events": 89, "followers": "1.2M", "awards": 7}', 'small'),
    ('00000000-0000-0000-0000-000000000003', 'neon-v', 'Neon V', 'ネオンV', 'Artist', 'Digital illustrator blending ukiyo-e with cyberpunk aesthetics', 'Neon V''s work has graced the covers of major anime publications and international galleries. Her unique style bridges Edo-period woodblock prints with modern digital techniques.', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop', '{"twitter": "neon_v_art", "instagram": "neon.v.art", "youtube": "NeonVStudio"}', '{"events": 67, "followers": "890K", "awards": 15}', 'medium'),
    ('00000000-0000-0000-0000-000000000004', 'aira-blue', 'Aira Blue', '藍良ブルー', 'Voice Actor', 'Voice behind iconic characters in modern anime', 'Aira Blue has voiced over 40 characters in major anime productions. Known for her versatile range, she brings depth and emotion to every role.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop', '{"twitter": "airablue_va", "instagram": "aira.blue"}', '{"events": 203, "followers": "3.1M", "awards": 31}', 'small'),
    ('00000000-0000-0000-0000-000000000005', 'takeshi-mori', 'Takeshi Mori', '森武', 'Artist', 'Master calligrapher and contemporary ink artist', 'Bridging centuries of tradition with modern expression, Takeshi Mori''s live calligraphy performances have mesmerized audiences worldwide.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop', '{"instagram": "takeshi.mori.ink"}', '{"events": 112, "followers": "456K", "awards": 8}', 'medium'),
    ('00000000-0000-0000-0000-000000000006', 'yuki-tanaka', 'Yuki Tanaka', '田中雪', 'Cosplayer', 'Transformative makeup artist and costume designer', 'Yuki Tanaka specializes in character transformations that blur the line between fantasy and reality. Her tutorials have inspired millions.', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop', '{"twitter": "yukitanaka_cos", "instagram": "yuki.tanaka", "youtube": "YukiTanakaCosplay"}', '{"events": 78, "followers": "1.5M", "awards": 12}', 'small');

-- Insert Schedule
INSERT INTO schedule (title, title_ja, time_start, time_end, location, location_ja, type, speaker_id, description, day, is_live, is_featured, capacity)
VALUES
    ('Opening Ceremony', '開会式', '09:00:00', '10:00:00', 'Main Stage', 'メインステージ', 'performance', NULL, 'The grand opening of KuroFest 2026 featuring special announcements and performances.', 1, false, true, NULL),
    ('The Art of Character Design', 'キャラクターデザインの技法', '10:30:00', '11:30:00', 'Workshop A', 'ワークショップA', 'panel', '00000000-0000-0000-0000-000000000001', 'Explore the creative process behind iconic character designs with award-winning cosplayer Hikari Nova.', 1, true, false, 200),
    ('Live Ink: Calligraphy Performance', '墨の舞：書道パフォーマンス', '11:00:00', '12:00:00', 'Artist Alley', 'アーティストアレイ', 'performance', '00000000-0000-0000-0000-000000000005', 'Watch master calligrapher Takeshi Mori create stunning large-scale works in real-time.', 1, false, true, NULL),
    ('Fashion Forward: Anime Meets Streetwear', 'ファッション・フォワード', '12:00:00', '13:00:00', 'Main Stage', 'メインステージ', 'performance', NULL, 'A runway show featuring collaborations between anime studios and fashion designers.', 1, false, false, NULL),
    ('Voice Acting Masterclass', '声優マスタークラス', '14:00:00', '15:30:00', 'Stage B', 'ステージB', 'workshop', '00000000-0000-0000-0000-000000000004', 'Learn the techniques behind bringing animated characters to life from industry veteran Aira Blue.', 1, false, false, 150),
    ('Digital Art: From Ukiyo-e to NFT', '浮世絵からNFTへ', '16:00:00', '17:00:00', 'Workshop A', 'ワークショップA', 'panel', '00000000-0000-0000-0000-000000000003', 'Neon V discusses the evolution of Japanese art forms in the digital age.', 1, false, false, 200),
    ('Cosplay Meet & Greet', 'コスプレ交流会', '17:30:00', '18:30:00', 'Meeting Room 1', '会議室1', 'meetup', '00000000-0000-0000-0000-000000000001', 'Exclusive meet and greet session with Hikari Nova. Limited capacity.', 1, false, false, 50),
    ('Evening Showcase', 'イブニングショーケース', '19:00:00', '21:00:00', 'Main Stage', 'メインステージ', 'performance', NULL, 'A spectacular evening of performances featuring all Day 1 guests.', 1, false, true, NULL),
    ('Sunrise Session', 'サンライズセッション', '08:00:00', '10:00:00', 'Neon District', 'ネオン地区', 'dj-set', '00000000-0000-0000-0000-000000000002', 'Start Day 2 with an energizing set from Cyber Ken.', 2, false, false, NULL),
    ('Prop Building Workshop', '小道具制作ワークショップ', '10:30:00', '12:00:00', 'Workshop B', 'ワークショップB', 'workshop', '00000000-0000-0000-0000-000000000006', 'Hands-on workshop teaching advanced prop-building techniques.', 2, false, false, 80),
    ('Industry Insider Panel', '業界インサイダーパネル', '12:30:00', '13:30:00', 'Stage B', 'ステージB', 'panel', NULL, 'Behind-the-scenes insights from anime industry professionals.', 2, false, false, NULL),
    ('Cosplay Championship Finals', 'コスプレ選手権決勝', '14:00:00', '16:00:00', 'Main Stage', 'メインステージ', 'performance', NULL, 'The culmination of the KuroFest Cosplay Championship.', 2, false, true, NULL),
    ('Artist Signing Session', 'アーティストサイン会', '15:00:00', '16:30:00', 'Artist Alley', 'アーティストアレイ', 'meetup', '00000000-0000-0000-0000-000000000003', 'Get your exclusive prints signed by Neon V.', 2, false, false, 100),
    ('Closing Ceremony', '閉会式', '17:00:00', '18:00:00', 'Main Stage', 'メインステージ', 'performance', NULL, 'Farewell ceremony with awards, announcements, and a preview of KuroFest 2027.', 2, false, true, NULL),
    ('After Party: Neon Nights', 'アフターパーティー：ネオンナイト', '20:00:00', '00:00:00', 'Neon District', 'ネオン地区', 'dj-set', '00000000-0000-0000-0000-000000000002', 'The ultimate KuroFest afterparty. 18+ only.', 2, false, true, NULL);

-- Insert News
INSERT INTO news (slug, title, title_ja, excerpt, content, category, image_url, is_featured, published_at)
VALUES
    ('phase-2-tickets-available', 'Phase 2 Tickets Now Available', '第2期チケット販売開始', 'Premium and VIP passes for KuroFest 2026 are now available. Early bird pricing ends July 31st.', 'We''re excited to announce that Phase 2 tickets are now available for purchase. This phase includes our Premium and VIP tier passes with exclusive benefits.

**Premium Pass Benefits:**
- Priority entry to all stages
- Exclusive meet & greet access
- Limited edition merchandise pack

**VIP Pass Benefits:**
- All Premium benefits
- Backstage tour access
- Private lounge access
- Signed poster from featured guests

Early bird pricing is available until July 31st, 2026. Don''t miss your chance to secure the ultimate KuroFest experience.', 'tickets', 'https://images.unsplash.com/photo-1707365782267-eb5583f8c361?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', true, '2026-06-15T00:00:00Z'),
    ('hikari-nova-confirmed', 'Hikari Nova Confirmed as Headline Guest', '光ノヴァがヘッドラインゲストとして確定', 'Award-winning cosplayer Hikari Nova joins KuroFest 2026 for an exclusive two-day appearance.', 'We are thrilled to announce that Hikari Nova, the internationally acclaimed cosplayer, will be joining us at KuroFest 2026 as our headline guest.

Known for her incredible craftsmanship and attention to detail, Hikari has won numerous awards including the World Cosplay Summit championship. At KuroFest, she will be hosting:

- A live prop-building demonstration
- Q&A panel session
- Exclusive meet & greet (VIP pass holders)
- Judging the Cosplay Championship Finals

This is her first convention appearance in Japan in over two years. Don''t miss this incredible opportunity!', 'guest', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200', true, '2026-06-10T00:00:00Z'),
    ('artist-alley-applications-open', 'Artist Alley Applications Now Open', 'アーティストアレイ申請受付開始', 'Independent artists can now apply for booth space at KuroFest 2026 Artist Alley.', 'Calling all artists! Applications for KuroFest 2026 Artist Alley are now open.

**Application Details:**
- Deadline: July 15th, 2026
- Booth sizes: Small (1 table), Medium (2 tables), Large (corner booth)
- All genres welcome: illustration, crafts, apparel, accessories

**Requirements:**
- Portfolio of at least 10 works
- Valid business registration (if applicable)
- Commitment to both convention days

Selected artists will be notified by August 1st. Apply through our official portal.', 'announcement', NULL, false, '2026-06-01T00:00:00Z'),
    ('schedule-preview-released', 'Preliminary Schedule Released', '暫定スケジュール公開', 'Get a first look at what''s planned for both days of KuroFest 2026.', 'We''re excited to share a preliminary look at the KuroFest 2026 schedule!

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

Full schedule with all events will be released one month before the convention.', 'schedule', NULL, false, '2026-05-20T00:00:00Z'),
    ('venue-map-preview', 'Tokyo Big Sight Venue Layout Revealed', '東京ビッグサイト会場レイアウト公開', 'Explore the floor plan for this year''s expanded venue space.', 'KuroFest 2026 will occupy East Halls 1-8 at Tokyo Big Sight, our largest venue yet!

**Key Areas:**
- Main Stage: Hall 1-2 (5,000 capacity)
- Stage B: Hall 3 (2,000 capacity)
- Artist Alley: Hall 4-5
- Cosplay Zone: Hall 6
- Food Court: Hall 7
- Rest Areas & Merchandise: Hall 8

Interactive venue maps will be available in our mobile app (coming soon) and at all information desks during the event.', 'announcement', NULL, false, '2026-05-15T00:00:00Z');

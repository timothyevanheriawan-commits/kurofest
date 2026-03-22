import { createStaticClient } from "./supabase/supabase-static";

/* ═══════════════════════════════════════════════════════════════════════════
   GUESTS DATA
   ═══════════════════════════════════════════════════════════════════════════ */

export async function getGuests() {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("name");

  if (error) console.error("Error fetching guests:", error);
  return data || [];
}

export async function getGuestBySlug(slug: string) {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) console.error("Error fetching guest:", error);
  return data;
}

export async function getFeaturedGuests() {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("span", "large");

  if (error) console.error("Error fetching featured guests:", error);
  return data || [];
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCHEDULE DATA
   ═══════════════════════════════════════════════════════════════════════════ */

export async function getScheduleByDay(day: number) {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("schedule")
    .select(
      `
            *,
            guests (
                name,
                slug,
                image_url
            )
        `,
    )
    .eq("day", day)
    .order("time_start");

  if (error) console.error(`Error fetching day ${day} schedule:`, error);
  return data || [];
}

export async function getFeaturedEvents() {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("schedule")
    .select("*")
    .eq("is_featured", true)
    .order("day")
    .order("time_start");

  if (error) console.error("Error fetching featured events:", error);
  return data || [];
}

/* ═══════════════════════════════════════════════════════════════════════════
   NEWS DATA
   ═══════════════════════════════════════════════════════════════════════════ */

export async function getNews() {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) console.error("Error fetching news:", error);
  return data || [];
}

export async function getNewsBySlug(slug: string) {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) console.error("Error fetching news article:", error);
  return data;
}

export async function getFeaturedNews() {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("is_featured", true)
    .order("published_at", { ascending: false });

  if (error) console.error("Error fetching featured news:", error);
  return data || [];
}

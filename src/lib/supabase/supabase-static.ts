import { createClient } from "@supabase/supabase-js";

/**
 * Static-friendly Supabase client.
 * Does not read cookies; safe for use in Server Components during static generation (build time).
 */
export function createStaticClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

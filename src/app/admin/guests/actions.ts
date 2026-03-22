"use server";

import { createClient } from "@/lib/supabase/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

export async function upsertGuest(formData: FormData) {
  const supabase = await requireAdmin();

  const id = formData.get("id") as string;
  const isNew = !id || id === "new";

  // Auto-sanitize slug — never trust user input directly
  const rawSlug = formData.get("slug") as string;
  const safeSlug = slugify(rawSlug || (formData.get("name") as string) || "");

  const guestData = {
    name: formData.get("name") as string,
    name_ja: formData.get("name_ja") as string,
    slug: safeSlug,
    role: formData.get("role") as string,
    tagline: formData.get("tagline") as string,
    bio: formData.get("bio") as string,
    image_url: formData.get("image_url") as string,
    span: formData.get("span") as "small" | "medium" | "large",
    social_links: {
      twitter: formData.get("twitter") as string,
      instagram: formData.get("instagram") as string,
      youtube: formData.get("youtube") as string,
    },
    stats: {
      events: parseInt((formData.get("stats_events") as string) || "0"),
      followers: formData.get("stats_followers") as string,
      awards: parseInt((formData.get("stats_awards") as string) || "0"),
    },
  };

  const { error } = isNew
    ? await supabase.from("guests").insert([guestData])
    : await supabase.from("guests").update(guestData).eq("id", id);

  if (error) {
    console.error("upsertGuest:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/guests");
  revalidatePath("/guests");
  revalidatePath(`/guests/${safeSlug}`);
  redirect("/admin/guests");
}

export async function deleteGuest(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("guests").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/guests");
  revalidatePath("/guests");
  return { success: true };
}

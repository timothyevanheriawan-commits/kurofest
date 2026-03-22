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

export async function upsertNews(formData: FormData) {
  const supabase = await requireAdmin();

  const id = formData.get("id") as string;
  const isNew = !id || id === "new";

  const rawSlug = formData.get("slug") as string;
  const safeSlug = slugify(rawSlug || (formData.get("title") as string) || "");

  const newsData = {
    title: formData.get("title") as string,
    title_ja: formData.get("title_ja") as string,
    slug: safeSlug,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    image_url: formData.get("image_url") as string,
    is_featured: formData.get("is_featured") === "on",
    published_at: formData.get("published_at")
      ? new Date(formData.get("published_at") as string).toISOString()
      : new Date().toISOString(),
  };

  const { error } = isNew
    ? await supabase.from("news").insert([newsData])
    : await supabase.from("news").update(newsData).eq("id", id);

  if (error) {
    console.error("upsertNews:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath(`/news/${safeSlug}`);
  revalidatePath("/");
  redirect("/admin/news");
}

export async function deleteNews(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  return { success: true };
}

"use server";

import { createClient } from "@/lib/supabase/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

export async function upsertEvent(formData: FormData) {
  const supabase = await requireAdmin();

  const id = formData.get("id") as string;
  const isNew = !id || id === "new";

  const eventData = {
    title: formData.get("title") as string,
    title_ja: formData.get("title_ja") as string,
    time_start: formData.get("time_start") as string,
    time_end: formData.get("time_end") as string,
    location: formData.get("location") as string,
    location_ja: formData.get("location_ja") as string,
    type: formData.get("type") as string,
    speaker_id: formData.get("speaker_id") || null,
    description: formData.get("description") as string,
    day: parseInt(formData.get("day") as string),
    is_live: formData.get("is_live") === "on",
    is_featured: formData.get("is_featured") === "on",
    capacity: formData.get("capacity")
      ? parseInt(formData.get("capacity") as string)
      : null,
  };

  const { error } = isNew
    ? await supabase.from("schedule").insert([eventData])
    : await supabase.from("schedule").update(eventData).eq("id", id);

  if (error) {
    console.error("upsertEvent:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/schedule");
  revalidatePath("/schedule");
  redirect("/admin/schedule");
}

export async function deleteEvent(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("schedule").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/schedule");
  revalidatePath("/schedule");
  return { success: true };
}

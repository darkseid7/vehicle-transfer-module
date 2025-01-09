"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteTransfer(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("transfers").delete().eq("id", id);

  if (error) {
    return { error: "Failed to delete transfer." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

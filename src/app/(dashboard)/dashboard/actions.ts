"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTransfer(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("transfers").delete().eq("id", id);

  if (error) {
    return { error: "Failed to delete transfer." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}

export async function logoutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error during logout:", error.message);
    throw new Error("Logout failed");
  }

  redirect("/login");
}

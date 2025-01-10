"use server";

import { createClient } from "@/utils/supabase/server";

export async function createTransfer(formData: FormData) {
  const supabase = await createClient();
  const plate = formData.get("plate") as string;
  const type = formData.get("type") as string;
  const client = formData.get("client") as string;
  const transmitter = formData.get("transmitter") as string;
  const service = Number(formData.get("service"));

  if (!plate || !type || !client || !transmitter || !service || service <= 0) {
    return { error: "All fields are required and must be valid." };
  }

  const { error } = await supabase.from("transfers").insert([
    {
      plate,
      type,
      client,
      transmitter,
      service,
    },
  ]);

  if (error) {
    console.error("Error creating transfer:", error.message);
    return { error: "Error creating transfer." };
  }
  return { success: true };
}

export async function updateTransfer(id: string, formData: FormData) {
  const supabase = await createClient();

  const plate = formData.get("plate") as string;
  const type = formData.get("type") as string;
  const client = formData.get("client") as string;
  const transmitter = formData.get("transmitter") as string;
  const service = Number(formData.get("service"));

  const dataToUpdate = {
    plate,
    type,
    client,
    transmitter,
    service,
  };

  const { error } = await supabase
    .from("transfers")
    .update(dataToUpdate)
    .eq("id", id)
    .single();

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { updateTransfer } from "../actions";
import TransferForm from "@/components/transfers/TransferForm";
import { createClient } from "@/utils/supabase/client";

export default function EditTransferPageClient() {
  const { id } = useParams() as { id: string };

  const [initialData, setInitialData] = useState({
    plate: "",
    type: "",
    client: "",
    transmitter: "",
    service: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransferData() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("transfers")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching transfer:", error);
      } else if (data) {
        setInitialData({
          plate: data.plate ?? "",
          type: data.type ?? "",
          client: data.client ?? "",
          transmitter: data.transmitter ?? "",
          service: data.service?.toString() ?? "",
        });
      }
      setLoading(false);
    }

    if (id) {
      fetchTransferData();
    }
  }, [id]);

  async function handleUpdate(formData: FormData) {
    return await updateTransfer(id, formData);
  }

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <TransferForm
      title="Edit Transfer"
      initialValues={initialData}
      onSubmit={handleUpdate}
    />
  );
}

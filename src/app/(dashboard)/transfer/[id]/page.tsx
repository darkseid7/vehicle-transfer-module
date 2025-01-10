"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateTransfer } from "../actions";
import TransferForm from "@/components/dashboard/TransferForm";
import { createClient } from "@/utils/supabase/client";
import CircularProgress from "@mui/material/CircularProgress";

export default function Page() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

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
    const response = await updateTransfer(id, formData);

    if (!response.error) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }

    return response;
  }

  if (loading) {
    return <CircularProgress size={24} />;
  }

  return (
    <TransferForm
      title="Edit Transfer"
      initialValues={initialData}
      onSubmit={handleUpdate}
    />
  );
}

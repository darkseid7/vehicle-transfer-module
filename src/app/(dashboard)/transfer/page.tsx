"use client";

import { createTransfer } from "./actions";
import { useRouter } from "next/navigation";
import TransferForm from "@/components/dashboard/TransferForm";

export default function Page() {
  const router = useRouter();
  async function handleCreate(formData: FormData) {
    const response = await createTransfer(formData);

    if (!response.error) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
    return response;
  }

  return (
    <TransferForm
      title="Create Transfer"
      initialValues={{
        plate: "",
        type: "",
        client: "",
        transmitter: "",
        service: "",
      }}
      onSubmit={handleCreate}
    />
  );
}

"use client";

import { createTransfer } from "./actions";
import TransferForm from "@/components/dashboard/TransferForm";

export default function Page() {
  async function handleCreate(formData: FormData) {
    const response = await createTransfer(formData);
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

"use client";

import { createTransfer } from "./actions";
import TransferForm from "@/components/transfers/TransferForm";

// Página de creación
export default function Page() {
  // Definimos la función que se ejecuta cuando se hace submit.
  // Como es una creación, sólo llamamos a `createTransfer`.
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

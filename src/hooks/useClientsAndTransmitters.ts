import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface Entity {
  id: string;
  document: string;
  name: string;
}

interface UseClientsAndTransmittersReturn {
  clients: Entity[];
  transmitters: Entity[];
  loading: boolean;
  error: string | null;
}

export function useClientsAndTransmitters(): UseClientsAndTransmittersReturn {
  const [clients, setClients] = useState<Entity[]>([]);
  const [transmitters, setTransmitters] = useState<Entity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      try {
        const { data: clientsData, error: clientsError } = await supabase
          .from("clients")
          .select("*");
        if (clientsError) throw clientsError;
        setClients(clientsData || []);

        const { data: transmittersData, error: transmittersError } =
          await supabase.from("transmitters").select("*");
        if (transmittersError) throw transmittersError;
        setTransmitters(transmittersData || []);
      } catch (error: unknown) {
        console.error("Error fetching clients and transmitters:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { clients, transmitters, loading, error };
}

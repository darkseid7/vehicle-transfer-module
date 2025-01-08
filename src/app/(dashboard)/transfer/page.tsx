"use client";

import React, { useState, useEffect, FormEvent } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { createTransfer } from "./actions";
import { createClient } from "@/utils/supabase/client";

export default function Page() {
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [transmitter, setTransmitter] = useState("");
  const [service, setService] = useState("");

  const [users, setUsers] = useState<any[]>([]);
  const [errors, setErrors] = useState({
    plate: "",
    type: "",
    client: "",
    transmitter: "",
    service: "",
  });

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("*");

      if (usersError) {
        console.error("Error fetching users:", usersError);
      } else {
        setUsers(usersData || []);
      }
    }

    fetchData();
  }, []);

  function validateForm() {
    let tempErrors = {
      plate: "",
      type: "",
      client: "",
      transmitter: "",
      service: "",
    };
    let isValid = true;

    if (!plate.trim()) {
      tempErrors.plate = "Plate is required";
      isValid = false;
    }

    if (!type.trim()) {
      tempErrors.type = "Transfer Type is required";
      isValid = false;
    }

    if (!client.trim()) {
      tempErrors.client = "Client is required";
      isValid = false;
    }

    if (!transmitter.trim()) {
      tempErrors.transmitter = "Transmitter is required";
      isValid = false;
    }

    if (!service.trim() || isNaN(Number(service)) || Number(service) <= 0) {
      tempErrors.service = "Service must be a positive number";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const formData = new FormData();
      formData.append("plate", plate);
      formData.append("type", type);
      formData.append("client", client);
      formData.append("transmitter", transmitter);
      formData.append("service", service);

      const response = await createTransfer(formData);

      if (response.error) {
        alert("Error creating transfer: " + response.error);
      } else {
        alert("Transfer created successfully!");
        setPlate("");
        setType("");
        setClient("");
        setTransmitter("");
        setService("");
      }
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ p: 4, width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h1" align="center">
            Create Transfer
          </Typography>

          <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="plate">Plate</FormLabel>
              <TextField
                id="plate"
                name="plate"
                placeholder="e.g., 2647KLR"
                fullWidth
                variant="outlined"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                error={Boolean(errors.plate)}
                helperText={errors.plate}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="type">Transfer Type</FormLabel>
              <Select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                error={Boolean(errors.type)}
              >
                <MenuItem value="">Select type</MenuItem>
                <MenuItem value="venta">Sale</MenuItem>
                <MenuItem value="cesion">Assignment</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="client">Client</FormLabel>
              <Select
                id="client"
                name="client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                fullWidth
                error={Boolean(errors.client)}
              >
                <MenuItem value="">Select client</MenuItem>
                {users.map((u: any) => (
                  <MenuItem key={u.id} value={u.document}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="transmitter">Transmitter</FormLabel>
              <Select
                id="transmitter"
                name="transmitter"
                value={transmitter}
                onChange={(e) => setTransmitter(e.target.value)}
                fullWidth
                error={Boolean(errors.transmitter)}
              >
                <MenuItem value="">Select transmitter</MenuItem>
                {users.map((u: any) => (
                  <MenuItem key={u.id} value={u.document}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="service">Vehicle Service</FormLabel>
              <TextField
                id="service"
                name="service"
                type="number"
                placeholder="e.g., 900"
                fullWidth
                variant="outlined"
                value={service}
                onChange={(e) => setService(e.target.value)}
                error={Boolean(errors.service)}
                helperText={errors.service}
              />
            </FormControl>

            <Button type="submit" variant="contained" color="primary">
              Create Transfer
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

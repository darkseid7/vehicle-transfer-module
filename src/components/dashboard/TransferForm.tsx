"use client";

import React, { useState, useTransition, FormEvent } from "react";

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
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useClientsAndTransmitters } from "@/hooks/useClientsAndTransmitters";

interface TransferFormProps {
  title?: string;
  initialValues?: {
    plate?: string;
    type?: string;
    client?: string;
    transmitter?: string;
    service?: string;
  };
  onSubmit: (data: FormData) => Promise<{ error?: string } | undefined>;
}

export default function TransferForm({
  title = "Create Transfer",
  initialValues = {},
  onSubmit,
}: TransferFormProps) {
  const [plate, setPlate] = useState(initialValues.plate || "");
  const [type, setType] = useState(initialValues.type || "");
  const [client, setClient] = useState(initialValues.client || "");
  const [transmitter, setTransmitter] = useState(
    initialValues.transmitter || ""
  );
  const [service, setService] = useState(initialValues.service || "");

  const { clients, transmitters, loading, error } = useClientsAndTransmitters();

  const [errors, setErrors] = useState({
    plate: "",
    type: "",
    client: "",
    transmitter: "",
    service: "",
  });

  const [isPending, startTransition] = useTransition();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error"
  );

  function validateForm() {
    const tempErrors = {
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
      startTransition(async () => {
        const formData = new FormData();
        formData.append("plate", plate);
        formData.append("type", type);
        formData.append("client", client);
        formData.append("transmitter", transmitter);
        formData.append("service", service);

        const response = await onSubmit(formData);
        if (response && response.error) {
          setSnackbarMessage("Error: " + response.error);
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage("Action completed successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        }
      });
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ p: 4, width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h1" align="center">
            {title}
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
                <MenuItem value="venta">Sale</MenuItem>
                <MenuItem value="cesion">Assignment</MenuItem>
              </Select>
              {errors.type && (
                <Typography color="error" variant="caption">
                  {errors.type}
                </Typography>
              )}
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
                {clients.map((c) => (
                  <MenuItem key={c.id} value={c.document}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.client && (
                <Typography color="error" variant="caption">
                  {errors.client}
                </Typography>
              )}
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
                {transmitters.map((t) => (
                  <MenuItem key={t.id} value={t.document}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.transmitter && (
                <Typography color="error" variant="caption">
                  {errors.transmitter}
                </Typography>
              )}
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
            >
              {isPending ? <CircularProgress size={24} /> : title}
            </Button>
          </Box>
        </Box>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

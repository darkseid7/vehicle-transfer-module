"use client";

import React, { useState, FormEvent } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  TextField,
  Box,
  FormControl,
  FormLabel,
} from "@mui/material";
import { login } from "./actions";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function validateForm() {
    let tempErrors = { email: "", password: "" };
    let isValid = true;

    if (!email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        tempErrors.email = "Invalid email address";
        isValid = false;
      }
    }

    if (!password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 6 characters";
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
      formData.append("email", email);
      formData.append("password", password);

      await login(formData);
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ p: 4, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h1" align="center">
            Login
          </Typography>

          {/* 4. Reemplaza la forma original con onSubmit manual */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                autoComplete="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                autoComplete="current-password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </FormControl>

            {/* 7. Botón de submit  */}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

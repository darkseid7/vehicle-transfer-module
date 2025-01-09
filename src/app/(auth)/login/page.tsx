"use client";

import React, { useState, FormEvent, useTransition } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { login } from "./actions";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    invalidCredentials: "",
  });

  const [isPending, startTransition] = useTransition();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const validateForm = () => {
    let tempErrors = { email: "", password: "", invalidCredentials: "" };
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
      tempErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const response = await login(formData);

        if (response.error === "Invalid login credentials") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            invalidCredentials: response.error,
          }));
          setSnackbarOpen(true);
        } else {
          console.log(response, " response from login function");
        }
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isPending}
              startIcon={isPending && <CircularProgress size={20} />}
            >
              {isPending ? "Logging in" : "Login"}
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
        <Alert onClose={handleSnackbarClose} severity="error">
          {errors.invalidCredentials}
        </Alert>
      </Snackbar>
    </Container>
  );
}

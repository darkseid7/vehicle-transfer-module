"use client";

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

export default function Page() {
  function redirect() {
    window.location.href = "/dashboard";
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

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              // error={false}
              // helperText={""}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              // color={false ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              // error={false}
              // helperText={""}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              // color={false ? "error" : "primary"}
            />
          </FormControl>
          <Button variant="contained" color="primary" onClick={redirect}>
            {/* Todo: spinner here */}
            Login
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

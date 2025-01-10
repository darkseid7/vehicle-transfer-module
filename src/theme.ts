"use client";

import { createTheme } from "@mui/material/styles";
import { Nunito_Sans } from "next/font/google";

const nunito_sans = Nunito_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    background: {
      default: "#1B2431",
      paper: "#273142",
    },
    primary: {
      main: "#4880FF",
    },
  },

  typography: {
    fontFamily: nunito_sans.style.fontFamily,
    allVariants: {
      color: "#fff",
    },
    h1: {
      fontSize: "32px",
      fontWeight: 600,
    },
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#273142",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          height: "48px",
          textTransform: "none",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          border: "none",
        },
        input: {
          color: "#fff",
          borderRadius: "4px",
          height: "15px",
          backgroundColor: "#323D4E",
          "&::placeholder": {
            color: "B6B6B6",
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#fff",
          borderBottom: "none",
          "&.MuiTableCell-head": {
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "1px",
            backgroundColor: "#323D4E",
          },
          "&.MuiTableCell-body": {
            fontSize: "14px",
            fontWeight: 500,
          },
        },
      },
    },
  },
});

export default theme;

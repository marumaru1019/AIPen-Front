// components/ClientThemeProvider.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: { main: "#FF6F61" },
    secondary: { main: "#6B5B95" },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "'Baloo 2', cursive, sans-serif",
  },
});

export default function ClientThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

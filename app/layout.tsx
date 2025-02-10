// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { PreviewProvider } from "./PreviewContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

// MUI のカスタムテーマ設定（角丸ボタンやポップな色合いに設定）
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6F61",
    },
    secondary: {
      main: "#6B5B95",
    },
  },
  shape: {
    borderRadius: 16, // 角丸を大きめに設定
  },
  typography: {
    fontFamily: "'Baloo 2', cursive, sans-serif",
  },
});

export const metadata = {
  title: "ワクワクする物語生成",
  description: "絵本・漫画を作ろう！",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PreviewProvider>
            {children}
          </PreviewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

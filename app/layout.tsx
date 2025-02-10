// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { PreviewProvider } from "./PreviewContext";
import ClientThemeProvider from "../components/ClientThemeProvider";
import Link from "next/link";

export const metadata = {
  title: "AIPen",
  description: "AIPen: 子供向け物語生成アプリ",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <PreviewProvider>
          <ClientThemeProvider>
            {/* 共通ヘッダー：背景色付き、ロゴは左寄せ（左右に適度な余白を確保） */}
            <header className="w-full py-4 bg-pink-200 text-white text-left text-2xl font-bold shadow-md px-6">
              <Link href="/" className="cursor-pointer hover:underline">
                AIPen
              </Link>
            </header>
            {children}
          </ClientThemeProvider>
        </PreviewProvider>
      </body>
    </html>
  );
}
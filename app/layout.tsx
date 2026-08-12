import type { Metadata } from "next";
import "./globals.css";
import { PointerEffects } from "./PointerEffects";
import { MediaProtection } from "./MediaProtection";

export const metadata: Metadata = {
  title: "岳崇政｜2026 设计作品集",
  description: "岳崇政的 UI / UX 设计作品集，涵盖体验设计、AI工作流、中后台与IP设计。",
  icons: {
    icon: "/favicon.gif",
    shortcut: "/favicon.gif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}<MediaProtection /><PointerEffects /></body>
    </html>
  );
}

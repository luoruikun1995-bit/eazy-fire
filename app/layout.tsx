import type { Metadata } from "next";
import "./globals.css";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });

export const metadata: Metadata = {
  title: "Eazy FIRE Planner",
  description: "现代风格的FIRE财务独立计算器"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={urbanist.variable}>
      <body>{children}</body>
    </html>
  );
}

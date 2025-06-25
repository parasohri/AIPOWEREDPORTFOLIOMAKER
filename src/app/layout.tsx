import React from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Portfolio | PARAS-OHRI",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>

      <body className="bg-black text-white">
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
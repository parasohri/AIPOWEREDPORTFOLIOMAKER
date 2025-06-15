import React from "react";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>

      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
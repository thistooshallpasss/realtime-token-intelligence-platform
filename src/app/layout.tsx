// src/app/layout.tsx (Updated)
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // [cite: 353]
import "./globals.css";

// Import the Providers component
import { Providers } from "@/components/templates/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); // [cite: 353]

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); // [cite: 354]

export const metadata: Metadata = {
  title: "Real-Time Token Intelligence Platform", // Updated title
  description: "A Master-Level High-Performance Token Trading Table", // Updated description
}; // [cite: 355]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap the entire app with the client-side providers */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
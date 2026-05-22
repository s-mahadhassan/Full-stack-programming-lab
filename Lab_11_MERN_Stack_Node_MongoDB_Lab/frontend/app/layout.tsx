import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hassan Tech Storefront - Decoupled MERN Ecommerce",
  description: "Lab 11 decoupled Full-Stack Ecommerce architecture featuring Mahad's Premium Mechanical Keyboard Pro (SKU: 232053-BSSE-6A) using Node.js, Express, Mongoose, and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#07060e] text-zinc-100">
        {children}
      </body>
    </html>
  );
}

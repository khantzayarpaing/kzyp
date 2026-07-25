import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { business } from "@/config/business";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${business.name} | ${business.headline}`,
  description: business.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-white font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}

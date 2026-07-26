import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { portfolioConfig } from "@/config/portfolio";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const { personal } = portfolioConfig;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kzyp.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${personal.name} — ${personal.title}`,
  description: personal.heroSupportingMessage,
  openGraph: {
    title: `${personal.name} — ${personal.title}`,
    description: personal.heroSupportingMessage,
    type: "profile",
    images: [{ url: personal.headshot }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-white font-sans text-[#1d1d1f] antialiased">
        {children}
      </body>
    </html>
  );
}

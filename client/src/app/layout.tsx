import type { Metadata } from "next";
import { Eczar, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProviders from "@/providers/AppProviders";
import { brand } from "@/constants/brand";

const eczar = Eczar({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
  variable: "--font-eczar",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: brand.seo.title,
  description: brand.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-eczar", eczar.variable, merriweather.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

import { Eczar, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProviders from "@/providers/AppProviders";
import { rootMetadata, rootViewport, siteJsonLd } from "@/lib/seo";

const eczar = Eczar({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
  variable: "--font-eczar",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = rootMetadata;
export const viewport = rootViewport;

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

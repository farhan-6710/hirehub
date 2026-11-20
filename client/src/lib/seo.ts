import type { Metadata, Viewport } from "next";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { brand } from "@/constants/brand";

/**
 * Absolute base for canonical and Open Graph URLs.
 * On Vercel, the production domain is set automatically; elsewhere the manifest's `siteUrl` is used.
 */
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : brand.siteUrl;

const shareImage = { ...brand.seo.image, type: "image/jpeg" };

// Next replaces (not merges) `openGraph` per segment, so pages reuse this whole object.
const openGraphBase: OpenGraph = {
  type: "website",
  siteName: brand.name,
  title: brand.seo.title,
  description: brand.seo.description,
  locale: brand.seo.locale,
  images: [shareImage],
};

/** Root metadata. Tab icons follow the OS colour scheme; `public/favicon.ico` is the legacy fallback. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: brand.seo.title, template: brand.seo.titleTemplate },
  description: brand.seo.description,
  applicationName: brand.name,
  keywords: brand.seo.keywords,
  openGraph: openGraphBase,
  twitter: {
    card: "summary_large_image",
    title: brand.seo.title,
    description: brand.seo.description,
    images: [shareImage],
  },
  icons: {
    icon: [
      { url: brand.logo.favicon.light, type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: brand.logo.favicon.dark, type: "image/png", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: brand.logo.appleTouch, sizes: "180x180", type: "image/png" }],
  },
};

/** Home page only: canonical and og:url must not leak onto child routes. */
export const homeMetadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...openGraphBase, url: "/" },
};

export const rootViewport: Viewport = {
  themeColor: brand.seo.themeColor,
};

/** schema.org Organization + WebSite for search engines. */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: brand.name,
      url: siteUrl,
      logo: `${siteUrl}${brand.logo.favicon.light}`,
      description: brand.seo.description,
    },
    { "@type": "WebSite", name: brand.name, url: siteUrl },
  ],
};

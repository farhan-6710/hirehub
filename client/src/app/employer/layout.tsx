import type { Metadata } from "next";

// Private dashboard: keep it out of search results.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return children;
}

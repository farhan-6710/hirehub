import BlurryBlobTwo from "@/components/shared/BlurryBlobTwo";

export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden bg-background"
    >
      {/* grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[48px_48px] opacity-30" />

      {/* blobs */}
      <BlurryBlobTwo
        className="rounded-xl opacity-45"
        firstBlobColor="bg-emerald-950"
        secondBlobColor="bg-emerald-900"
      />

      {/* Faded Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,var(--color-background)_95%)]" />
      {children}
    </section>
  );
}

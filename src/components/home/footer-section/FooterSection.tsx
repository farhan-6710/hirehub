import BlurryBlobSectionWrapper from "@/components/shared/BlurryBlobSectionWrapper";

const FOOTER_LINKS = {
  product: ["Find Jobs", "For Recruiters", "Pricing", "Success Stories"],
  resources: ["Help Center", "Blog", "Guides", "Hiring Templates"],
  company: ["About", "Contact", "Careers", "Privacy"],
};

export default function FooterSection() {
  return (
    <BlurryBlobSectionWrapper
      className="border-t border-border bg-card/60 backdrop-blur-sm"
      contentClassName="py-10 pb-0"
      withContainer={false}
      firstBlobColor="bg-primary/20"
      secondBlobColor="bg-chart-2/15"
      firstBlobClassName="h-24 w-24 right-3 top-1 sm:right-6 lg:right-10"
      secondBlobClassName="h-20 w-20 left-4 bottom-4 top-auto sm:left-8 lg:left-12"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 2v20" />
                <path d="m17 5-5-3-5 3v6l5 3 5-3z" />
                <path d="m17 13-5 3-5-3v6l5 3 5-3z" />
              </svg>
            </span>
            Hirehub
          </h3>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Modern hiring workflows for ambitious teams and talented candidates.
            Build your pipeline with confidence.
          </p>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground uppercase">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            </span>
            Product
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {FOOTER_LINKS.product.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground uppercase">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            </span>
            Resources
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {FOOTER_LINKS.resources.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground uppercase">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
            </span>
            Company
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {FOOTER_LINKS.company.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full border-t border-border px-4 py-6 text-center text-sm text-muted-foreground sm:px-6 lg:px-10">
        <p>Copyright 2026 Hirehub. All rights reserved.</p>
      </div>
    </BlurryBlobSectionWrapper>
  );
}

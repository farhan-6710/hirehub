import { Button } from "@/components/ui/button";
import BlurryBlobSectionWrapper from "@/components/shared/BlurryBlobSectionWrapper";

const METRICS = [
  {
    label: "Successful Placements",
    value: "12,400+",
    description: "Candidates hired through Hirehub in the last 12 months.",
  },
  {
    label: "Average Recruiter Response",
    value: "18 hrs",
    description: "Median first-response time on active applications.",
  },
  {
    label: "Active Hiring Companies",
    value: "1,850+",
    description: "Teams currently hiring across product, design, and tech.",
  },
  {
    label: "Interview Conversion Rate",
    value: "41%",
    description: "Qualified applications that move to interview stage.",
  },
];

export default function HiringMetricsSection() {
  return (
    <BlurryBlobSectionWrapper
      id="metrics"
      className="dark:bg-secondary-background border-b border-border"
      contentClassName="px-4 py-12 sm:px-6 lg:px-10"
      containerClassName="flex flex-col gap-8"
      firstBlobColor="bg-primary/25"
      secondBlobColor="bg-chart-2/20"
      firstBlobClassName="h-28 w-28 left-2 top-4 sm:left-6 lg:left-10"
      secondBlobClassName="h-24 w-24 right-4 bottom-4 top-auto sm:right-8 lg:right-12"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <p className="flex items-center gap-2 text-sm font-medium tracking-[0.18em] text-primary uppercase">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M12 20V10" />
              <path d="m18 20-6-6-6 6" />
              <path d="M4 4h16" />
            </svg>
          </span>
          Insights
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Hiring Metrics That Build Trust
        </h2>
        <p className="text-muted-foreground">
          Key platform numbers to help candidates and recruiters evaluate hiring
          momentum at a glance.
        </p>
      </div>

      <div className="w-full rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-4 lg:top-24">
            <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
              Hiring Metrics
            </p>
            <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Platform Results In Clear Numbers
            </h3>
            <p className="max-w-xl text-muted-foreground">
              Instead of assumptions, use these benchmarks to understand hiring
              speed and candidate quality across the platform.
            </p>
            <p className="text-sm text-muted-foreground">
              Updated monthly from active recruiter and candidate activity.
            </p>

            <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-background/40 px-3 py-2 text-sm text-foreground">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary">
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
                  <path d="M12 3 4 7v6c0 5 3.5 8.74 8 9 4.5-.26 8-4 8-9V7z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <p className="text-muted-foreground">
                Verified platform data with privacy-safe reporting.
              </p>
            </div>

            <div className="pt-1">
              <Button size="lg" variant="glow" className="w-full sm:w-auto">
                View Full Hiring Report
              </Button>
            </div>
          </div>

          <div className="divide-y divide-border rounded-2xl border border-border/80 bg-background/40">
            {METRICS.map((metric) => (
              <article
                key={metric.label}
                className="grid gap-2 px-5 py-5 sm:grid-cols-[210px_1fr] sm:items-center sm:gap-6"
              >
                <div>
                  <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {metric.value}
                  </p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  {metric.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </BlurryBlobSectionWrapper>
  );
}

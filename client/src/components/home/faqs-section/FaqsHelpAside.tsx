const HELP_POINTS = [
  "Priority support for active recruiters",
  "Live onboarding sessions twice a week",
  "Typical response time: under 24 hours",
];

const CheckIcon = () => (
  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  </span>
);

export function FaqsHelpAside() {
  return (
    <aside className="rounded-2xl border border-border bg-card p-6">
      <div className="space-y-4">
        <p className="text-sm font-medium tracking-[0.16em] text-primary uppercase">
          Need More Help?
        </p>
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          Talk To Our Team
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">
          If your question is not covered here, we are happy to guide you
          through setup, hiring workflows, or recruiter onboarding.
        </p>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        {HELP_POINTS.map((point) => (
          <div
            key={point}
            className="flex items-start gap-3 rounded-lg border border-border bg-background/40 px-4 py-3 text-muted-foreground"
          >
            <CheckIcon />
            {point}
          </div>
        ))}
      </div>
    </aside>
  );
}

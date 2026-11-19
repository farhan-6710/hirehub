import type { Job } from "@/types/jobs/jobs";
import type * as React from "react";
import { titleize, getStatusBadge } from "@/utils/jobs/utils";
import { JobFacts } from "./JobFacts";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon, Briefcase02Icon } from "@hugeicons/core-free-icons";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

export function JobDetailsSection({
  job,
  rightPanel,
}: {
  job: Job;
  rightPanel: React.ReactNode;
}) {
  const statusBadge = getStatusBadge(job.status);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-12 md:px-8 flex flex-col gap-8">
      {/* Top Header Centered */}
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <SectionEyebrow
          label="Job Details"
          icon={
            <>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </>
          }
        />
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
          {job.title}
        </h2>
        <p className="text-muted-foreground text-base">{job.description}</p>
      </div>

      {/* Main Content Grid (Contact Section Layout) */}
      <div className="grid w-full gap-8 rounded-3xl border border-border bg-background/40 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
        {/* Left Side: Details */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl text-foreground mb-3">
              {job.companyName}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={Location01Icon} className="h-4 w-4" />
                {job.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={Briefcase02Icon} className="h-4 w-4" />
                {titleize(job.workplaceType)}
              </span>
              <span>•</span>
              <Badge
                variant={statusBadge.variant}
                className={statusBadge.className}
              >
                {statusBadge.label}
              </Badge>
            </div>
          </div>

          <JobFacts job={job} />

          {[
            { title: "Requirements", items: job.requirements },
            { title: "Responsibilities", items: job.responsibilities },
          ].map((group) => (
            <div key={group.title} className="mt-2">
              <h4 className="text-lg font-semibold text-foreground mb-3">{group.title}</h4>
              <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}

          {job.skills && job.skills.length > 0 ? (
            <div className="mt-2">
              <h4 className="text-lg font-semibold text-foreground mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="rounded-lg px-3 py-1 text-xs capitalize">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Right Side: Apply Form */}
        <div className="flex flex-col h-full lg:col-span-5">{rightPanel}</div>
      </div>
    </section>
  );
}

import type { Job } from "@/types/jobs/jobs";
import type * as React from "react";
import { titleize, formatDate, getStatusBadge } from "@/utils/jobs/utils";
import { getExperienceLevelBracket } from "@/utils/jobs/job-details/experience";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon, Briefcase02Icon } from "@hugeicons/core-free-icons";

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
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          Job Details
        </p>
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
              {job.company_name}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={Location01Icon} className="h-4 w-4" />
                {job.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={Briefcase02Icon} className="h-4 w-4" />
                {titleize(job.workplace_type)}
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

          <div className="grid grid-cols-2 gap-4 text-sm mt-2 p-5 rounded-2xl bg-card/40 border border-border/50">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Posted on</span>
              <span className="font-medium text-foreground">
                {formatDate(job.created_at)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Deadline</span>
              <span className="font-medium text-foreground">
                {formatDate(job.application_deadline)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Employment</span>
              <span className="font-medium text-foreground">
                {titleize(job.job_type)}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Experience</span>
              <span className="font-medium text-foreground">
                {titleize(job.experience_level)}
                <span className="ml-1.5 font-normal text-muted-foreground/80">
                  {getExperienceLevelBracket(job.experience_level)}
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Salary</span>
              <span className="font-medium text-foreground">
                {job.min_salary.toLocaleString()} -{" "}
                {job.max_salary.toLocaleString()} {job.currency}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Applicants</span>
              <span className="font-medium text-foreground">
                {job.people_applied ?? 0}
              </span>
            </div>
          </div>

          <div className="mt-2">
            <h4 className="text-lg font-semibold text-foreground mb-3">
              Requirements
            </h4>
            <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1.5">
              {job.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <h4 className="text-lg font-semibold text-foreground mb-3">
              Responsibilities
            </h4>
            <ul className="list-disc pl-5 text-sm text-foreground/80 space-y-1.5">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Apply Form */}
        <div className="flex flex-col h-full lg:col-span-5">{rightPanel}</div>
      </div>
    </section>
  );
}

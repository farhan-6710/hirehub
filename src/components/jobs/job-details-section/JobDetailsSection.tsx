import type { Job } from "@/types/jobs/jobs";
import type * as React from "react";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function titleize(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
}

export function JobDetailsSection({
  job,
  rightPanel,
}: {
  job: Job;
  rightPanel: React.ReactNode;
}) {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-12 md:px-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="flex-1">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {job.title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {job.company_name}
                </span>
                <span className="mx-2">•</span>
                <span>{job.location}</span>
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <span className="text-foreground font-medium">Posted on:</span>{" "}
                {formatDate(job.created_at)}
              </div>
              <div>
                <span className="text-foreground font-medium">
                  People applied:
                </span>{" "}
                {job.people_applied ?? 0}
              </div>
              <div>
                <span className="text-foreground font-medium">Status:</span>{" "}
                {titleize(job.status)}
              </div>
              <div>
                <span className="text-foreground font-medium">Deadline:</span>{" "}
                {formatDate(job.application_deadline)}
              </div>
              <div>
                <span className="text-foreground font-medium">Workplace:</span>{" "}
                {titleize(job.workplace_type)}
              </div>
              <div>
                <span className="text-foreground font-medium">Employment:</span>{" "}
                {titleize(job.job_type)}
              </div>
              <div>
                <span className="text-foreground font-medium">Experience:</span>{" "}
                {titleize(job.experience_level)}
              </div>
              <div>
                <span className="text-foreground font-medium">Salary:</span>{" "}
                {job.min_salary.toLocaleString()} -{" "}
                {job.max_salary.toLocaleString()} {job.currency}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground">
                About the job
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {job.description}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground">
                Requirements
              </h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1">
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground">
                Responsibilities
              </h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-foreground/80 space-y-1">
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0">{rightPanel}</div>
      </div>
    </section>
  );
}

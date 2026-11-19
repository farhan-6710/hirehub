import type { Job } from "@/types/jobs/jobs";
import { titleize, formatDate } from "@/utils/jobs/utils";
import { getExperienceLevelBracket } from "@/utils/jobs/job-details/experience";

export function JobFacts({ job }: { job: Job }) {
  const facts = [
    { label: "Posted on", value: formatDate(job.createdAt) },
    { label: "Deadline", value: formatDate(job.applicationDeadline) },
    { label: "Employment", value: titleize(job.jobType) },
    {
      label: "Experience",
      value: titleize(job.experienceLevel),
      hint: getExperienceLevelBracket(job.experienceLevel),
    },
    {
      label: "Salary",
      value: `${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()} ${job.currency}`,
    },
    { label: "Applicants", value: String(job.peopleApplied ?? 0) },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 text-sm mt-2 p-5 rounded-2xl bg-card/40 border border-border/50">
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col gap-1">
          <span className="text-muted-foreground">{fact.label}</span>
          <span className="font-medium text-foreground">
            {fact.value}
            {fact.hint ? (
              <span className="ml-1.5 font-normal text-muted-foreground/80">{fact.hint}</span>
            ) : null}
          </span>
        </div>
      ))}
    </div>
  );
}

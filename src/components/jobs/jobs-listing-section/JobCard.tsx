import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase02Icon,
  FavouriteIcon,
  Location01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  formatDate,
  formatPeopleApplied,
  formatSalary,
  getStatusBadge,
  titleize,
} from "@/utils/jobs/utils";
import type { JobCardProps } from "@/types/jobs/components";

export function JobCard({ job }: JobCardProps) {
  const statusBadge = getStatusBadge(job.status);

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="group relative rounded-2xl border border-muted-foreground/20 bg-card/20 backdrop-blur-md p-6 transition-all">
        <Badge
          variant={statusBadge.variant}
          className={
            "absolute -top-2 right-2 z-10 " + (statusBadge.className ?? "")
          }
        >
          {statusBadge.label}
        </Badge>

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
            <HugeiconsIcon icon={Briefcase02Icon} className="h-6 w-6" />
          </div>

          {/* Content */}
          <div className="flex-1 pt-0.5">
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                {job.title}
              </h3>
              <button className="text-muted-foreground hover:text-foreground transition-colors ml-4 mt-1">
                <HugeiconsIcon icon={FavouriteIcon} className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mb-4">
              <span className="text-secondary-foreground font-medium">
                {job.company_name}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={Location01Icon} className="h-3.5 w-3.5" />
                {job.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
              <span>{formatDate(job.created_at)}</span>
              {formatPeopleApplied(job.people_applied) ? (
                <>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
                  <span>{formatPeopleApplied(job.people_applied)}</span>
                </>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge
                variant="outline"
                className="text-muted-foreground border-muted-foreground/30 font-medium rounded-lg px-3 py-1 text-xs"
              >
                {titleize(job.job_type)}
              </Badge>
              <Badge
                variant="outline"
                className="text-muted-foreground border-muted-foreground/30 font-medium rounded-lg px-3 py-1 text-xs capitalize"
              >
                {titleize(job.workplace_type)}
              </Badge>
              <Badge
                variant="outline"
                className="text-muted-foreground border-muted-foreground/30 font-medium rounded-lg px-3 py-1 text-xs capitalize"
              >
                {titleize(job.experience_level)}
              </Badge>
              <Badge
                variant="outline"
                className="text-muted-foreground border-muted-foreground/30 font-medium rounded-lg px-3 py-1 text-xs"
              >
                {formatSalary(job.min_salary, job.max_salary, job.currency)}
              </Badge>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">
              {job.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

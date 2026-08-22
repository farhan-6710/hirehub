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

export function JobCard({ job, onClick, href, footerActions }: JobCardProps) {
  const statusBadge = getStatusBadge(job.status);

  const content = (
    <div
      className={
        "group relative rounded-2xl border border-muted-foreground/20 bg-card/20 backdrop-blur-md p-6 transition-all hover:bg-card/30 " +
        (onClick ? "cursor-pointer" : "")
      }
    >
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
            {!onClick && (
              <button
                className="text-muted-foreground hover:text-foreground transition-colors ml-4 mt-1"
                aria-label="Save Job"
                onClick={(e) => e.preventDefault()}
              >
                <HugeiconsIcon icon={FavouriteIcon} className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground mb-4">
            <span className="text-secondary-foreground font-medium">
              {job.companyName}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={Location01Icon} className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
            <span>{formatDate(job.createdAt)}</span>
            {formatPeopleApplied(job.peopleApplied) ? (
              <>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
                <span>{formatPeopleApplied(job.peopleApplied)}</span>
              </>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge
              variant="outline"
              className="text-muted-foreground border-muted-foreground/30 font-medium rounded-lg px-3 py-1 text-xs"
            >
              {titleize(job.jobType)}
            </Badge>
            <Badge
              variant="outline"
              className="text-muted-foreground border-muted-foreground/30 font-medium rounded-lg px-3 py-1 text-xs capitalize"
            >
              {titleize(job.workplaceType)}
            </Badge>
            <Badge
              variant="outline"
              className="text-muted-foreground border-muted-foreground/30 font-medium rounded-lg px-3 py-1 text-xs capitalize"
            >
              {titleize(job.experienceLevel)}
            </Badge>
            <Badge
              variant="outline"
              className="text-muted-foreground border-muted-foreground/30 font-medium rounded-lg px-3 py-1 text-xs"
            >
              {formatSalary(job.minSalary, job.maxSalary, job.currency)}
            </Badge>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed">
            {job.description}
          </p>

          {footerActions ? (
            <div
              className="mt-5 border-t border-border/60 pt-4"
              onClick={(e) => e.stopPropagation()}
            >
              {footerActions}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="h-full focus:outline-none">
        {content}
      </div>
    );
  }

  if (footerActions) {
    return <div className="h-full">{content}</div>;
  }

  return <Link href={href ?? `/jobs/${job.id}`}>{content}</Link>;
}

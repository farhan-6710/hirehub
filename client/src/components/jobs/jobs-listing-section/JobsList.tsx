import * as React from "react";
import { JobCard } from "./JobCard";
import { JobsListProps } from "@/types/jobs/jobs";

export function JobsList({ jobs }: JobsListProps) {
  return (
    <div className="flex-1">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2 font-serif">
          Discover Jobs
        </h2>
        <p className="text-muted-foreground text-sm">
          Showing {jobs.length} recommended jobs matching your profile.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

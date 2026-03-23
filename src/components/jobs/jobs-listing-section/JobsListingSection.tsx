import * as React from "react";
import { FiltersPanel } from "./FiltersPanel";
import { JobsList } from "./JobsList";
import { jobs } from "@/constants/jobs";
import type { Job } from "@/types/jobs/jobs";

type JobsListingSectionProps = {
  stickyTopPx?: number;
};

export function JobsListingSection({ stickyTopPx }: JobsListingSectionProps) {
  const [renderedJobs, setRenderedJobs] = React.useState<Job[]>(jobs);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div
          className="lg:sticky lg:self-start lg:h-fit"
          style={stickyTopPx ? { top: stickyTopPx } : undefined}
        >
          <FiltersPanel jobs={jobs} onFilterChange={setRenderedJobs} />
        </div>
        <JobsList jobs={renderedJobs} />
      </div>
    </section>
  );
}

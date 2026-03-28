import * as React from "react";
import { FiltersPanel } from "./FiltersPanel";
import { JobsList } from "./JobsList";
import type { Job } from "@/types/jobs/jobs";
import type { JobsListingSectionProps } from "@/types/jobs/components";
import { jobsApi } from "@/services/jobsApi";
import { showToast } from "@/config/ToastConfig";

export function JobsListingSection({ stickyTopPx }: JobsListingSectionProps) {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [renderedJobs, setRenderedJobs] = React.useState<Job[]>([]);

  React.useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await jobsApi.getOpenJobs();
        const nextJobs = data.jobs ?? [];
        setJobs(nextJobs);
        setRenderedJobs(nextJobs);
      } catch {
        showToast({
          type: "error",
          title: "Failed to load jobs",
          description: "Please try again.",
        });
        setJobs([]);
        setRenderedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div
          className="lg:sticky lg:self-start lg:h-fit"
          style={stickyTopPx ? { top: stickyTopPx } : undefined}
        >
          <FiltersPanel jobs={jobs} onFilterChange={setRenderedJobs} />
        </div>
        {loading ? (
          <p className="text-muted-foreground">loading..</p>
        ) : renderedJobs.length === 0 ? (
          <div className="flex-1 rounded-2xl border border-dashed border-border bg-card/20 p-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              No jobs found currently
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try changing your filters or check back later.
            </p>
          </div>
        ) : (
          <JobsList jobs={renderedJobs} />
        )}
      </div>
    </section>
  );
}

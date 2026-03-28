import React, { useState } from "react";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { JobCard } from "@/components/jobs/jobs-listing-section/JobCard";
import { JobApplications } from "./JobApplications";
import { employerApi } from "@/services/employerApi";
import type { Job } from "@/types/jobs/jobs";
import { showToast } from "@/config/ToastConfig";
import { Button } from "@/components/ui/button";

export function MyJobsTab() {
  const [loading, setLoading] = useState(true);
  const [employerJobs, setEmployerJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  React.useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await employerApi.getMyJobs();
        setEmployerJobs(data.jobs ?? []);
      } catch {
        showToast({
          type: "error",
          title: "Failed to load jobs",
          description: "Please try again.",
        });
        setEmployerJobs([]);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, []);

  const selectedJob = employerJobs.find((j) => j.id === selectedJobId);

  if (selectedJob) {
    return (
      <PageBackgroundWrapper>
        <JobApplications
          job={selectedJob}
          onBack={() => setSelectedJobId(null)}
        />
      </PageBackgroundWrapper>
    );
  }

  return (
    <PageBackgroundWrapper>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Jobs
          </h1>
          <p className="text-muted-foreground">
            Manage your posted job listings and view applications
          </p>
        </div>

        {loading ? <p className="text-muted-foreground">loading..</p> : null}

        {!loading && employerJobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/20 p-8 text-center space-y-3">
            <p className="text-lg font-semibold text-foreground">
              No jobs posted yet
            </p>
            <p className="text-sm text-muted-foreground">
              Post a job so that it appears here.
            </p>
            <div>
              <Button onClick={() => setSelectedJobId(null)} variant="outline">
                Create your first job from Post Job tab
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {employerJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => setSelectedJobId(job.id)}
              />
            ))}
          </div>
        )}
      </div>
    </PageBackgroundWrapper>
  );
}

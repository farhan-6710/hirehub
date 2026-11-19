import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { JobCard } from "@/components/jobs/jobs-listing-section/JobCard";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import type { Job } from "@/types/jobs/jobs";
import { useEmployerJobs } from "@/hooks/useEmployerJobs";
import { JobApplications } from "./JobApplications";

export function MyJobsTab() {
  const router = useRouter();
  const { jobs, loading, deletingJobId, deleteJob } = useEmployerJobs();
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [pendingDeleteJob, setPendingDeleteJob] = useState<Job | null>(null);
  const selectedJob = jobs.find((job) => job.id === selectedJobId);

  if (selectedJob) {
    return (
      <PageBackgroundWrapper>
        <JobApplications job={selectedJob} onBack={() => setSelectedJobId(null)} />
      </PageBackgroundWrapper>
    );
  }

  return (
    <PageBackgroundWrapper>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Jobs</h1>
          <p className="text-muted-foreground">Manage your posted job listings and view applications</p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">loading..</p>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/20 p-8 text-center space-y-3">
            <p className="text-lg font-semibold text-foreground">No jobs posted yet</p>
            <p className="text-sm text-muted-foreground">Post a job so that it appears here.</p>
            <Button asChild variant="outline">
              <Link href="/employer?tab=post-job">Post your first job</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => router.push(`/jobs/${job.id}`)}
                footerActions={
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" onClick={() => setSelectedJobId(job.id)} className="h-9 flex-1 text-sm">
                      See Applications
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setPendingDeleteJob(job)}
                      className="h-9 flex-1 text-sm"
                      disabled={deletingJobId === job.id}
                    >
                      {deletingJobId === job.id ? "Deleting..." : "Delete Job"}
                    </Button>
                  </div>
                }
              />
            ))}
          </div>
        )}

        <ConfirmationModal
          open={Boolean(pendingDeleteJob)}
          onOpenChange={(open) => !open && setPendingDeleteJob(null)}
          title="Delete Job"
          description={`Are you sure you want to delete "${pendingDeleteJob?.title ?? "this job"}"? Its applications are deleted too. This cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={() => {
            if (pendingDeleteJob) void deleteJob(pendingDeleteJob.id);
            setPendingDeleteJob(null);
          }}
          onCancel={() => setPendingDeleteJob(null)}
          variant="destructive"
        />
      </div>
    </PageBackgroundWrapper>
  );
}

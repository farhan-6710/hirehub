import React, { useState } from "react";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { JobCard } from "@/components/jobs/jobs-listing-section/JobCard";
import { JobApplications } from "./JobApplications";
import { employerApi } from "@/services/employerApi";
import type { Job } from "@/types/jobs/jobs";
import { showToast } from "@/config/ToastConfig";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { useRouter } from "next/navigation";

export function MyJobsTab() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [employerJobs, setEmployerJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [pendingDeleteJob, setPendingDeleteJob] = useState<Job | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<number | null>(null);

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

  const handleDeleteJob = async () => {
    if (!pendingDeleteJob) return;

    try {
      setDeletingJobId(pendingDeleteJob.id);
      await employerApi.deleteJob(pendingDeleteJob.id);

      setEmployerJobs((prev) =>
        prev.filter((job) => job.id !== pendingDeleteJob.id),
      );

      showToast({
        type: "success",
        title: "Job deleted",
        description: "The job was removed successfully.",
      });
    } catch (error) {
      const apiError = (error as { response?: { data?: { error?: string } } })
        ?.response?.data?.error;

      showToast({
        type: "error",
        title: "Failed to delete job",
        description: apiError || "Please try again.",
      });
    } finally {
      setDeletingJobId(null);
      setPendingDeleteJob(null);
    }
  };

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
                onClick={() => router.push(`/jobs/${job.id}`)}
                footerActions={
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedJobId(job.id)}
                      className="h-9 flex-1 text-sm"
                    >
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
          onOpenChange={(open) => {
            if (!open) {
              setPendingDeleteJob(null);
            }
          }}
          title="Delete Job"
          description={
            pendingDeleteJob
              ? `Are you sure you want to delete \"${pendingDeleteJob.title}\"? This action cannot be undone.`
              : "Are you sure you want to delete this job?"
          }
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={() => {
            void handleDeleteJob();
          }}
          onCancel={() => setPendingDeleteJob(null)}
          variant="destructive"
        />
      </div>
    </PageBackgroundWrapper>
  );
}

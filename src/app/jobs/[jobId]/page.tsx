"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { JobApplyPanel } from "@/components/jobs/job-details-section/JobApplyPanel";
import { JobDetailsSection } from "@/components/jobs/job-details-section/JobDetailsSection";
import { PageBackgroundWrapper } from "@/components/shared/PageBackgroundWrapper";
import type { Job } from "@/types/jobs/jobs";
import { jobsApi } from "@/services/jobsApi";
import { showToast } from "@/config/ToastConfig";

export default function JobDetailsPage({
  params,
}: {
  params: { jobId: string };
}) {
  const { jobId } = params;
  const id = Number(jobId);
  if (!Number.isFinite(id)) notFound();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const data = await jobsApi.getOpenJobs();
        const found = (data.jobs ?? []).find((item) => item.id === id) ?? null;
        setJob(found);
      } catch {
        showToast({
          type: "error",
          title: "Failed to load job",
          description: "Please try again.",
        });
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    void run();
  }, [id]);

  if (loading) {
    return (
      <PageBackgroundWrapper>
        <p className="px-4 py-8 text-muted-foreground">loading..</p>
      </PageBackgroundWrapper>
    );
  }

  if (!job) notFound();

  return (
    <PageBackgroundWrapper>
      <JobDetailsSection job={job} rightPanel={<JobApplyPanel />} />
    </PageBackgroundWrapper>
  );
}

import { notFound } from "next/navigation";
import { jobs } from "@/constants/jobs";
import { JobApplyPanel } from "@/components/jobs/job-details-section/JobApplyPanel";
import { JobDetailsSection } from "@/components/jobs/job-details-section/JobDetailsSection";

export default async function JobDetailsPage({
  params,
}: {
  params: { jobId: string } | Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const id = Number(jobId);
  if (!Number.isFinite(id)) notFound();

  const job = jobs.find((j) => j.id === id);
  if (!job) notFound();

  return (
    <div className="min-h-screen bg-background">
      <JobDetailsSection job={job} rightPanel={<JobApplyPanel />} />
    </div>
  );
}

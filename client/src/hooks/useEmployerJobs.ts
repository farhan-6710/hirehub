import { useEffect, useState } from "react";
import { employerApi } from "@/services/employerApi";
import type { Job } from "@/types/jobs/jobs";
import { showToast } from "@/config/ToastConfig";
import { getApiErrorMessage } from "@/utils/apiError";

export function useEmployerJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingJobId, setDeletingJobId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await employerApi.getMyJobs();
        setJobs(data.jobs ?? []);
      } catch (error) {
        showToast({
          type: "error",
          title: "Failed to load jobs",
          description: getApiErrorMessage(error, "Please try again."),
        });
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const deleteJob = async (jobId: number) => {
    try {
      setDeletingJobId(jobId);
      await employerApi.deleteJob(jobId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      showToast({
        type: "success",
        title: "Job deleted",
        description: "The job was removed successfully.",
      });
    } catch (error) {
      showToast({
        type: "error",
        title: "Failed to delete job",
        description: getApiErrorMessage(error, "Please try again."),
      });
    } finally {
      setDeletingJobId(null);
    }
  };

  return { jobs, loading, deletingJobId, deleteJob };
}

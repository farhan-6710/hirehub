import { useEffect, useState } from "react";
import {
  employerApi,
  type ApplicationStatus,
  type EmployerJobApplication,
} from "@/services/employerApi";
import { showToast } from "@/config/ToastConfig";
import { getApiErrorMessage } from "@/utils/apiError";

export function useJobApplications(jobId: number) {
  const [apps, setApps] = useState<EmployerJobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingAppId, setUpdatingAppId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await employerApi.getJobApplications(jobId);
        setApps(data.applications ?? []);
      } catch (error) {
        showToast({
          type: "error",
          title: "Failed to load applications",
          description: getApiErrorMessage(error, "Please try again."),
        });
        setApps([]);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [jobId]);

  const updateStatus = async (
    applicationId: number,
    status: ApplicationStatus,
  ) => {
    try {
      setUpdatingAppId(applicationId);
      await employerApi.updateApplicationStatus(applicationId, status);
      setApps((prev) =>
        prev.map((app) => (app.id === applicationId ? { ...app, status } : app)),
      );
    } catch (error) {
      showToast({
        type: "error",
        title: "Failed to update application",
        description: getApiErrorMessage(error, "Please try again."),
      });
    } finally {
      setUpdatingAppId(null);
    }
  };

  return { apps, loading, updatingAppId, updateStatus };
}

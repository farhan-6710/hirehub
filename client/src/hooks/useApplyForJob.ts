import { useState } from "react";
import { jobsApi } from "@/services/jobsApi";
import { showToast } from "@/config/ToastConfig";
import { useAuth } from "@/providers/authContext";
import { useAuthModal } from "@/providers/AuthModalContext";
import { useCandidateAccess } from "@/providers/RoleAccessContext";
import { getApiErrorMessage } from "@/utils/apiError";

const HTTP_CONFLICT = 409;

const warn = (title: string, description: string) =>
  showToast({ type: "warning", title, description });

export function useApplyForJob(jobId: number) {
  const { user } = useAuth();
  const { openLoginModal } = useAuthModal();
  const { openCandidateAccessModal } = useCandidateAccess();
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!user) {
      warn("Login required", "Please login to apply for this job.");
      openLoginModal();
      return;
    }
    if (user.role !== "candidate") {
      openCandidateAccessModal();
      return;
    }
    if (!coverLetter.trim()) {
      warn("Cover letter required", "Please enter your cover letter.");
      return;
    }
    if (!resumeFile) {
      warn("Resume required", "Please attach your resume to continue.");
      return;
    }

    try {
      setIsSubmitting(true);
      await jobsApi.applyForJob(jobId, { coverLetter: coverLetter.trim(), resumeFile });
      showToast({
        type: "success",
        title: "Application submitted",
        description: "Your application has been sent successfully.",
      });
      setCoverLetter("");
      setResumeFile(null);
    } catch (error) {
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status === HTTP_CONFLICT) {
        warn("Already applied", getApiErrorMessage(error, "You have already applied for this job."));
        return;
      }
      showToast({
        type: "error",
        title: "Failed to submit application",
        description: getApiErrorMessage(error, "Please try again."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { coverLetter, setCoverLetter, resumeFile, setResumeFile, isSubmitting, submit };
}

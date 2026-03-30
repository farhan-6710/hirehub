"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { jobsApi } from "@/services/jobsApi";
import { showToast } from "@/config/ToastConfig";
import { useAuth } from "@/providers/authContext";
import { useAuthModal } from "@/providers/AuthModalContext";

export function JobApplyPanel({ jobId }: { jobId: number }) {
  const { user } = useAuth();
  const { openLoginModal } = useAuthModal();
  const [coverLetter, setCoverLetter] = React.useState("");
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    if (!user) {
      showToast({
        type: "warning",
        title: "Login required",
        description: "Please login to apply for this job.",
      });
      openLoginModal();
      return;
    }

    if (!coverLetter.trim()) {
      showToast({
        type: "warning",
        title: "Cover letter required",
        description: "Please enter your cover letter.",
      });
      return;
    }

    if (!resumeFile) {
      showToast({
        type: "warning",
        title: "Resume required",
        description: "Please attach your resume to continue.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await jobsApi.applyForJob(jobId, {
        coverLetter: coverLetter.trim(),
        resumeFile,
      });

      showToast({
        type: "success",
        title: "Application submitted",
        description: "Your application has been sent successfully.",
      });

      setCoverLetter("");
      setResumeFile(null);
    } catch (error) {
      const apiError = (error as { response?: { data?: { error?: string } } })
        ?.response?.data?.error;

      showToast({
        type: "error",
        title: "Failed to submit application",
        description: apiError || "Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mb-2">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl text-foreground">
          Submit Your Application
        </h3>
        <p className="text-sm text-muted-foreground">
          Stand out by telling us why you&apos;re a great fit for this role.
        </p>
      </div>

      <Textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Write your cover letter here..."
        className="min-h-56 rounded-xl border-border bg-background/50 focus:border-primary px-4 py-3 text-sm"
      />

      <div className="space-y-2 w-full">
        <label className="text-sm font-medium text-foreground">
          Resume Upload
        </label>

        <input
          id="resume-file-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            setResumeFile(file);
          }}
          className="sr-only"
        />

        <label
          htmlFor="resume-file-upload"
          className="flex h-24 w-full max-w-xs cursor-pointer items-center justify-center rounded-lg border border-dashed border-border bg-background/40 px-4 text-center hover:border-primary/70 hover:bg-background/60"
        >
          <span className="text-sm text-muted-foreground">
            Upload Resume File
          </span>
        </label>

        <p className="text-xs text-muted-foreground">
          Accepted formats: PDF, DOC, DOCX (max 5MB)
        </p>

        {resumeFile ? (
          <p className="text-xs text-foreground">Selected: {resumeFile.name}</p>
        ) : null}
      </div>

      <div className="pt-2">
        <Button
          className="w-full"
          size="lg"
          variant="default"
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useApplyForJob } from "@/hooks/useApplyForJob";
import { ResumeUploadContainer } from "./ResumeUploadContainer";

export function JobApplyPanel({ jobId }: { jobId: number }) {
  const { coverLetter, setCoverLetter, resumeFile, setResumeFile, isSubmitting, submit } =
    useApplyForJob(jobId);

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
        onChange={(event) => setCoverLetter(event.target.value)}
        placeholder="Write your cover letter here..."
        aria-label="Cover letter"
        className="min-h-56 rounded-xl border-border bg-background/50 focus:border-primary px-4 py-3 text-sm"
      />

      <ResumeUploadContainer resumeFile={resumeFile} setResumeFile={setResumeFile} />

      <div className="pt-2">
        <Button className="w-full" size="lg" type="button" onClick={() => void submit()} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>
    </div>
  );
}

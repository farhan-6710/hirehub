import React, { useState } from "react";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { jobs } from "@/constants/jobs";
import { JobCard } from "@/components/jobs/jobs-listing-section/JobCard";
import { JobApplications } from "./JobApplications";

export function MyJobsTab() {
  // Using the jobs array from constants as dummy data
  // Selecting a few items acting as the employer's own jobs
  const employerJobs = jobs.slice(0, 4);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {employerJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => setSelectedJobId(job.id)}
            />
          ))}
        </div>
      </div>
    </PageBackgroundWrapper>
  );
}

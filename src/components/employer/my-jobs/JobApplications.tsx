import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  Download01Icon,
  Tick01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import {
  applications as defaultApps,
  getApplicationStatusBadge,
  type Application,
} from "@/constants/applications";
import { formatDate } from "@/utils/jobs/utils";
import type { Job } from "@/types/jobs/jobs";

interface JobApplicationsProps {
  job: Job;
  onBack: () => void;
}

export function JobApplications({ job, onBack }: JobApplicationsProps) {
  const [apps, setApps] = useState<Application[]>(
    defaultApps.filter((app) => app.job_id === job.id),
  );

  const handleUpdateStatus = (
    appId: number,
    newStatus: Application["status"],
  ) => {
    setApps(
      apps.map((app) =>
        app.id === appId ? { ...app, status: newStatus } : app,
      ),
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="shrink-0 h-10 w-10"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} size={24} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {job.title}
            </h1>
            <p className="text-muted-foreground">Applications for this role</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="px-3 py-1.5 text-sm rounded-lg bg-card border-border"
          >
            Total Matches: {apps.length}
          </Badge>
        </div>
      </div>

      {/* Applications List */}
      {apps.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-2xl bg-card/20 pb-20">
          <p className="text-xl font-medium text-foreground py-4">
            No applications yet
          </p>
          <p className="text-muted-foreground mb-6 max-w-md">
            There are currently no candidates who have applied for this
            position. Check back later.
          </p>
          <Button onClick={onBack} variant="outline">
            Back to My Jobs
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {apps.map((app) => {
            const statusConfig = getApplicationStatusBadge(app.status);

            return (
              <div
                key={app.id}
                className="relative rounded-2xl border border-muted-foreground/20 bg-card/20 backdrop-blur-md p-6 flex flex-col md:flex-row gap-6"
              >
                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-3">
                        {app.applicant_name}
                        <Badge
                          variant={statusConfig.variant}
                          className={statusConfig.className}
                        >
                          {statusConfig.label}
                        </Badge>
                      </h3>
                      <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                        {app.applicant_email} &bull; Applied on{" "}
                        {formatDate(app.applied_date)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-background/40 p-4 rounded-xl text-sm text-foreground/80 leading-relaxed border border-border/50">
                    <p className="font-medium text-foreground mb-1">
                      Cover Letter
                    </p>
                    <p>{app.cover_letter}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 md:w-48 shrink-0 justify-center">
                  <Button
                    variant="outline"
                    className="w-full gap-2 justify-center"
                  >
                    <HugeiconsIcon icon={Download01Icon} size={18} />
                    View Resume
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      className={`flex-1 gap-1.5 ${app.status === "Accepted" ? "opacity-50 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                      onClick={() => handleUpdateStatus(app.id, "Accepted")}
                      disabled={app.status === "Accepted"}
                    >
                      <HugeiconsIcon icon={Tick01Icon} size={18} />
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1 gap-1.5"
                      onClick={() => handleUpdateStatus(app.id, "Rejected")}
                      disabled={app.status === "Rejected"}
                    >
                      <HugeiconsIcon icon={Cancel01Icon} size={18} />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

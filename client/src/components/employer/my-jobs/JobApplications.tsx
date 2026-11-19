import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import type { Job } from "@/types/jobs/jobs";
import { employerApi, type EmployerJobApplication } from "@/services/employerApi";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { useJobApplications } from "@/hooks/useJobApplications";
import { ApplicationCard, type ApplicationAction } from "./ApplicationCard";

interface JobApplicationsProps {
  job: Job;
  onBack: () => void;
}

const CONFIRM_COPY: Record<ApplicationAction, { title: string; description: string }> = {
  view: {
    title: "View Resume",
    description:
      "Open the applicant's resume? This will mark the application as reviewed if it is still pending.",
  },
  accepted: {
    title: "Accept Application",
    description: "Are you sure you want to mark this application as accepted?",
  },
  rejected: {
    title: "Reject Application",
    description: "Are you sure you want to reject this application?",
  },
};

interface PendingAction {
  app: EmployerJobApplication;
  action: ApplicationAction;
}

export function JobApplications({ job, onBack }: JobApplicationsProps) {
  const { apps, loading, updatingAppId, updateStatus } = useJobApplications(job.id);
  const [pending, setPending] = useState<PendingAction | null>(null);

  const runAction = ({ app, action }: PendingAction) => {
    if (action === "view") {
      // Opened synchronously from the click so pop-up blockers allow it.
      window.open(employerApi.getResumeUrl(app.id), "_blank", "noopener,noreferrer");
      if (app.status === "pending") void updateStatus(app.id, "reviewed");
      return;
    }
    if (app.status !== action) void updateStatus(app.id, action);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0 h-10 w-10">
            <HugeiconsIcon icon={ArrowLeft02Icon} size={24} />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{job.title}</h1>
            <p className="text-muted-foreground">Applications for this role</p>
          </div>
        </div>
        <Badge variant="outline" className="px-3 py-1.5 text-sm rounded-lg bg-card border-border">
          Total Applications: {apps.length}
        </Badge>
      </div>

      {loading ? (
        <p className="text-muted-foreground">loading..</p>
      ) : apps.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-2xl bg-card/20 pb-20">
          <p className="text-xl font-medium text-foreground py-4">No applications yet</p>
          <p className="text-muted-foreground mb-6 max-w-md">
            There are currently no candidates who have applied for this position. Check back later.
          </p>
          <Button onClick={onBack} variant="outline">Back to My Jobs</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {apps.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              isUpdating={updatingAppId === app.id}
              onAction={(action) => setPending({ app, action })}
            />
          ))}
        </div>
      )}

      <ConfirmationModal
        open={Boolean(pending)}
        onOpenChange={(open) => !open && setPending(null)}
        title={pending ? CONFIRM_COPY[pending.action].title : ""}
        description={pending ? CONFIRM_COPY[pending.action].description : ""}
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (pending) runAction(pending);
          setPending(null);
        }}
        onCancel={() => setPending(null)}
        variant={pending?.action === "rejected" ? "destructive" : "default"}
      />
    </div>
  );
}

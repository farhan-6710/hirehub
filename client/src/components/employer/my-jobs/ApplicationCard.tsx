import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  Tick01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { getApplicationStatusBadge } from "@/constants/applications";
import { formatDate } from "@/utils/jobs/utils";
import type { EmployerJobApplication } from "@/services/employerApi";

export type ApplicationAction = "view" | "accepted" | "rejected";

interface ApplicationCardProps {
  app: EmployerJobApplication;
  isUpdating: boolean;
  onAction: (action: ApplicationAction) => void;
}

export function ApplicationCard({
  app,
  isUpdating,
  onAction,
}: ApplicationCardProps) {
  const statusConfig = getApplicationStatusBadge(app.status);

  return (
    <div className="relative rounded-2xl border border-muted-foreground/20 bg-card/20 backdrop-blur-md p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-3">
            {app.applicantName}
            <Badge
              variant={statusConfig.variant}
              className={statusConfig.className}
            >
              {statusConfig.label}
            </Badge>
          </h3>
          <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
            {app.applicantEmail} &bull; Applied on {formatDate(app.appliedDate)}
          </p>
        </div>

        <div className="bg-background/40 p-4 rounded-xl text-sm text-foreground/80 leading-relaxed border border-border/50">
          <p className="font-medium text-foreground mb-1">Cover Letter</p>
          <p>{app.coverLetter}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:w-48 shrink-0 justify-center">
        <Button
          variant="outline"
          className="w-full gap-2 justify-center"
          onClick={() => onAction("view")}
          disabled={isUpdating || !app.hasResume}
          title={app.resumeFileName ?? "No resume file stored"}
        >
          <HugeiconsIcon icon={Download01Icon} size={18} />
          {app.hasResume ? "View Resume" : "No Resume"}
        </Button>

        <div className="flex gap-2">
          <Button
            variant="default"
            className="flex-1 gap-1.5 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => onAction("accepted")}
            disabled={isUpdating}
          >
            <HugeiconsIcon icon={Tick01Icon} size={18} />
            Accept
          </Button>
          <Button
            variant="destructive"
            className="flex-1 gap-1.5"
            onClick={() => onAction("rejected")}
            disabled={isUpdating}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} />
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}

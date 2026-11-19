import type { BadgeVariant } from "@/types/jobs/components";
import type { ApplicationStatus } from "@/services/employerApi";

export const getApplicationStatusBadge = (
  status: ApplicationStatus,
): { variant: BadgeVariant; label: string; className: string } => {
  switch (status) {
    case "accepted":
      return {
        variant: "default",
        label: "Accepted",
        className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
      };
    case "rejected":
      return {
        variant: "destructive",
        label: "Rejected",
        className: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
      };
    case "reviewed":
      return {
        variant: "secondary",
        label: "Reviewed",
        className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
      };
    default:
      return {
        variant: "outline",
        label: "Pending",
        className:
          "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 border-yellow-500/20",
      };
  }
};

import type { Dispatch, SetStateAction } from "react";

import type { Job } from "@/types/jobs/jobs";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost"
  | "link";

export interface StatusBadgeConfig {
  label: string;
  variant: BadgeVariant;
  className: string;
}

export interface JobCardProps {
  job: Job;
  onClick?: () => void;
  href?: string;
}

export interface FiltersPanelProps {
  jobs: Job[];
  onFilterChange: Dispatch<SetStateAction<Job[]>>;
}

export interface JobsListingSectionProps {
  stickyTopPx?: number;
}

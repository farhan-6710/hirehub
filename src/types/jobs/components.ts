import type { Dispatch, SetStateAction } from "react";

import type { JobListItem } from "@/types/jobs/jobs";

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
  job: JobListItem;
  onClick?: () => void;
  href?: string;
}

export interface FiltersPanelProps {
  jobs: JobListItem[];
  onFilterChange: Dispatch<SetStateAction<JobListItem[]>>;
}

export interface JobsListingSectionProps {
  stickyTopPx?: number;
}

export const WORKPLACE_TYPES = ["remote", "on_site", "hybrid"] as const;

export type WorkplaceType = (typeof WORKPLACE_TYPES)[number];

export const JOB_TYPES = [
  "full_time",
  "part_time",
  "internship",
  "freelance",
  "contract",
] as const;

export type JobType = (typeof JOB_TYPES)[number];

export const EXPERIENCE_LEVELS = [
  "fresher",
  "junior",
  "intermediate",
  "senior",
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export const JOB_STATUSES = ["open", "closed", "draft", "applied"] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export interface Job {
  id: number;
  postedByUserId: number;
  title: string;
  companyName: string;
  location: string;
  workplaceType: WorkplaceType;
  jobType: JobType;
  minSalary: number;
  maxSalary: number;
  currency: string;
  experienceLevel: ExperienceLevel;
  description: string;
  requirements: string[];
  responsibilities: string[];
  applicationDeadline: string;
  peopleApplied?: number;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;

  // UI-only metadata for mock data / listing badges
}

export interface JobsListProps {
  jobs: Job[];
}

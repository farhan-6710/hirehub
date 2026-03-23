export const JOB_TYPES = [
  "full-time",
  "part-time",
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

export const JOB_STATUSES = ["open", "closed", "draft"] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export interface Job {
  id: number;
  posted_by_user_id: number;
  title: string;
  company_name: string;
  location: string;
  workplace_type: string;
  job_type: JobType;
  min_salary: number;
  max_salary: number;
  currency: string;
  experience_level: ExperienceLevel;
  description: string;
  requirements: string[];
  responsibilities: string[];
  application_deadline: string;
  people_applied?: number;
  status: JobStatus;
  created_at: string;
  updated_at: string;

  // UI-only metadata for mock data / listing badges
}

export interface JobsListProps {
  jobs: Job[];
}

import { API_URL } from "@/constants/api";
import { axiosInstance } from "./axiosInstance";
import type { Job } from "@/types/jobs/jobs";

export interface JobsResponse {
  status: string;
  count: number;
  jobs: Job[];
  error?: string;
}

export interface CreateJobPayload {
  title: string;
  companyName: string;
  location: string;
  workplaceType: "remote" | "hybrid" | "on_site";
  jobType: "full_time" | "part_time" | "internship" | "freelance" | "contract";
  minSalary: number;
  maxSalary: number;
  currency: string;
  experienceLevel: "fresher" | "junior" | "intermediate" | "senior";
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  applicationDeadline: string;
}

interface CreateJobResponse {
  status: string;
  job: Job;
  error?: string;
}

export const jobsApi = {
  async getOpenJobs(): Promise<JobsResponse> {
    const response = await axiosInstance({
      method: API_URL.JOBS.LIST.type,
      url: API_URL.JOBS.LIST.url,
    });

    return response.data;
  },

  async createJob(payload: CreateJobPayload): Promise<CreateJobResponse> {
    const response = await axiosInstance({
      method: API_URL.JOBS.CREATE.type,
      url: API_URL.JOBS.CREATE.url,
      data: payload,
    });

    return response.data;
  },
};

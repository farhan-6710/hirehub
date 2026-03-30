import { API_URL } from "@/constants/api";
import { axiosInstance } from "./axiosInstance";
import type { Job, JobListItem } from "@/types/jobs/jobs";

export interface JobsListingResponse {
  status: string;
  count: number;
  jobs: JobListItem[];
  error?: string;
}

interface JobDetailsResponse {
  status: string;
  job: Job;
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

interface ApplyJobResponse {
  status: string;
  message: string;
  error?: string;
}

export const jobsApi = {
  async getJobsListing(): Promise<JobsListingResponse> {
    const response = await axiosInstance({
      method: API_URL.JOBS.LIST.type,
      url: API_URL.JOBS.LIST.url,
    });

    return response.data;
  },

  async getJobById(jobId: number): Promise<JobDetailsResponse> {
    const response = await axiosInstance({
      method: API_URL.JOBS.DETAIL.type,
      url: API_URL.JOBS.DETAIL.url(jobId),
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

  async applyForJob(
    jobId: number,
    payload: { coverLetter: string; resumeFile: File },
  ): Promise<ApplyJobResponse> {
    const formData = new FormData();
    formData.append("coverLetter", payload.coverLetter);
    formData.append("resumeFile", payload.resumeFile);

    const response = await axiosInstance({
      method: API_URL.JOBS.APPLY.type,
      url: API_URL.JOBS.APPLY.url(jobId),
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};

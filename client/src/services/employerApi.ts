import { API_URL } from "@/constants/api";
import { axiosInstance } from "./axiosInstance";
import type { Job } from "@/types/jobs/jobs";

export interface EmployerDashboardStats {
  activeJobs: number;
  totalApplicants: number;
  reviewedApplications: number;
  acceptedCandidates: number;
}

export type ApplicationStatus = "pending" | "reviewed" | "accepted" | "rejected";

export interface EmployerRecentApplication {
  id: number;
  candidateName: string;
  jobTitle: string;
  status: ApplicationStatus;
  appliedDate: string;
}

export interface EmployerProfile {
  companyName: string;
  companyLogo: string;
  industry: string;
  headquartersLocation: string;
  website: string;
  companyDescription: string;
  contactEmail: string;
  contactPhone: string;
}

export interface EmployerJobApplication {
  id: number;
  jobId: number;
  applicantId: number;
  applicantName: string;
  applicantEmail: string;
  status: ApplicationStatus;
  coverLetter: string | null;
  resumeFileName: string | null;
  hasResume: boolean;
  appliedDate: string;
}

interface EmployerDashboardResponse {
  status: string;
  dashboardStats: EmployerDashboardStats;
  recentApplications: EmployerRecentApplication[];
  error?: string;
}

interface EmployerProfileResponse {
  status: string;
  employerProfile: EmployerProfile | null;
  error?: string;
}

interface SaveEmployerProfileResponse {
  status: string;
  employerProfile: EmployerProfile;
  error?: string;
}

interface EmployerJobsResponse {
  status: string;
  count: number;
  jobs: Job[];
  error?: string;
}

interface EmployerJobApplicationsResponse {
  status: string;
  count: number;
  applications: EmployerJobApplication[];
  error?: string;
}

interface UpdateApplicationStatusResponse {
  status: string;
  application: { id: number; status: ApplicationStatus };
  error?: string;
}

interface DeleteEmployerJobResponse {
  status: string;
  message: string;
  error?: string;
}

export const employerApi = {
  async getDashboard(): Promise<EmployerDashboardResponse> {
    const response = await axiosInstance({
      method: API_URL.EMPLOYER.DASHBOARD.type,
      url: API_URL.EMPLOYER.DASHBOARD.url,
    });

    return response.data;
  },

  async getProfile(): Promise<EmployerProfileResponse> {
    const response = await axiosInstance({
      method: API_URL.EMPLOYER.PROFILE.type,
      url: API_URL.EMPLOYER.PROFILE.url,
    });

    return response.data;
  },

  async saveProfile(
    profile: EmployerProfile,
  ): Promise<SaveEmployerProfileResponse> {
    const response = await axiosInstance({
      method: API_URL.EMPLOYER.UPDATE_PROFILE.type,
      url: API_URL.EMPLOYER.UPDATE_PROFILE.url,
      data: profile,
    });

    return response.data;
  },

  // Opened directly in a new tab; the auth cookie authorises the request.
  getResumeUrl(applicationId: number): string {
    return API_URL.EMPLOYER.APPLICATION_RESUME.url(applicationId);
  },

  async getMyJobs(): Promise<EmployerJobsResponse> {
    const response = await axiosInstance({
      method: API_URL.EMPLOYER.MY_JOBS.type,
      url: API_URL.EMPLOYER.MY_JOBS.url,
    });

    return response.data;
  },

  async getJobApplications(
    jobId: number,
  ): Promise<EmployerJobApplicationsResponse> {
    const response = await axiosInstance({
      method: API_URL.EMPLOYER.JOB_APPLICATIONS.type,
      url: API_URL.EMPLOYER.JOB_APPLICATIONS.url(jobId),
    });

    return response.data;
  },

  async deleteJob(jobId: number): Promise<DeleteEmployerJobResponse> {
    const response = await axiosInstance({
      method: API_URL.EMPLOYER.DELETE_JOB.type,
      url: API_URL.EMPLOYER.DELETE_JOB.url(jobId),
    });

    return response.data;
  },

  async updateApplicationStatus(
    applicationId: number,
    status: ApplicationStatus,
  ): Promise<UpdateApplicationStatusResponse> {
    const response = await axiosInstance({
      method: API_URL.EMPLOYER.UPDATE_APPLICATION_STATUS.type,
      url: API_URL.EMPLOYER.UPDATE_APPLICATION_STATUS.url(applicationId),
      data: { status },
    });

    return response.data;
  },
};

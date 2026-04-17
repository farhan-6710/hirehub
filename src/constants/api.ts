// src/constants/api.ts

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") ||
  "http://localhost:5001/api/v1";

const withApiV1 = (path: string) => `${SERVER_URL}${path}`;

export const REQUEST_TYPE = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export const API_URL = {
  // Auth
  AUTH: {
    SIGNUP: {
      url: withApiV1("/auth/signup"),
      type: REQUEST_TYPE.POST,
    },
    LOGIN: {
      url: withApiV1("/auth/login"),
      type: REQUEST_TYPE.POST,
    },
    LOGOUT: {
      url: withApiV1("/auth/logout"),
      type: REQUEST_TYPE.POST,
    },
    ME: {
      url: withApiV1("/auth/me"),
      type: REQUEST_TYPE.GET,
    },
    GOOGLE_INIT: {
      url: withApiV1("/auth/google"),
      type: REQUEST_TYPE.GET,
    },
  },

  JOBS: {
    LIST: {
      url: withApiV1("/jobs"),
      type: REQUEST_TYPE.GET,
    },
    DETAIL: {
      type: REQUEST_TYPE.GET,
      url: (jobId: number) => withApiV1(`/jobs/${jobId}`),
    },
    APPLY: {
      type: REQUEST_TYPE.POST,
      url: (jobId: number) => withApiV1(`/jobs/${jobId}/apply`),
    },
    CREATE: {
      url: withApiV1("/jobs"),
      type: REQUEST_TYPE.POST,
    },
  },

  EMPLOYER: {
    DASHBOARD: {
      url: withApiV1("/employer/dashboard"),
      type: REQUEST_TYPE.GET,
    },
    PROFILE: {
      url: withApiV1("/employer/profile"),
      type: REQUEST_TYPE.GET,
    },
    MY_JOBS: {
      url: withApiV1("/employer/my-jobs"),
      type: REQUEST_TYPE.GET,
    },
    JOB_APPLICATIONS: {
      type: REQUEST_TYPE.GET,
      url: (jobId: number) => withApiV1(`/employer/jobs/${jobId}/applications`),
    },
    DELETE_JOB: {
      type: REQUEST_TYPE.DELETE,
      url: (jobId: number) => withApiV1(`/employer/jobs/${jobId}`),
    },
    UPDATE_APPLICATION_STATUS: {
      type: REQUEST_TYPE.PATCH,
      url: (applicationId: number) =>
        withApiV1(`/employer/applications/${applicationId}/status`),
    },
  },
} as const;

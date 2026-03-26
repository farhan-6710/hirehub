// src/constants/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5001";

export const REQUEST_TYPE = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export const API_URL = {
  // Auth
  AUTH: {
    SIGNUP: {
      url: BASE_URL + "signup",
      type: REQUEST_TYPE.POST,
    },
    LOGIN: {
      url: BASE_URL + "login",
      type: REQUEST_TYPE.POST,
    },
    LOGOUT: {
      url: BASE_URL + "logout",
      type: REQUEST_TYPE.POST,
    },
    ME: {
      url: BASE_URL + "me",
      type: REQUEST_TYPE.GET,
    },
    GOOGLE_INIT: {
      url: BASE_URL + "google",
      type: REQUEST_TYPE.GET,
    },
  },
} as const;

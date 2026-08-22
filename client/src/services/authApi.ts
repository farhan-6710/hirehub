import { API_URL } from "@/constants/api";
import { axiosInstance } from "./axiosInstance";
export interface AuthResponse {
  status: string;
  user: {
    id: number;
    name: string;
    email: string;
    picture?: string;
    role: "candidate" | "employer";
  };
  employerProfile: {
    companyName: string;
    companyLogo: string;
    industry: string;
    headquartersLocation: string;
    website: string;
    companyDescription: string;
    contactEmail: string;
    contactPhone: string;
  } | null;
  token?: string;
  error?: string;
}

export const authApi = {
  /**
   * Login user
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axiosInstance({
      method: API_URL.AUTH.LOGIN.type,
      url: API_URL.AUTH.LOGIN.url,
      data: { email, password },
    });
    return response.data;
  },

  /**
   * Signup user
   */
  async signup(
    email: string,
    password: string,
    name: string,
    role: "candidate" | "employer",
  ): Promise<AuthResponse> {
    const response = await axiosInstance({
      method: API_URL.AUTH.SIGNUP.type,
      url: API_URL.AUTH.SIGNUP.url,
      data: { email, password, name, role },
    });
    return response.data;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    const response = await axiosInstance({
      method: API_URL.AUTH.LOGOUT.type,
      url: API_URL.AUTH.LOGOUT.url,
    });
    return response.data;
  },

  /**
   * Get current auth user
   */
  async me(): Promise<AuthResponse> {
    const response = await axiosInstance({
      method: API_URL.AUTH.ME.type,
      url: API_URL.AUTH.ME.url,
      params: { _: Date.now() },
      headers: {
        "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    return response.data;
  },
};

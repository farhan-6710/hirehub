"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authApi, type AuthResponse } from "@/services/authApi";
import { API_URL } from "@/constants/api";
import { getApiErrorMessage } from "@/utils/apiError";

type Role = "candidate" | "employer";

interface AppUser {
  id: number;
  name: string;
  email: string;
  picture: string;
  role: Role;
  employerProfile: {
    companyName: string;
    headquartersLocation: string;
  } | null;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signInWithGoogle: (role?: Role) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName: string,
    role: Role,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const toAppUser = (data: AuthResponse): AppUser => ({
  id: data.user.id,
  name: data.user.name,
  email: data.user.email,
  picture: data.user.picture || "",
  role: data.user.role || "candidate",
  employerProfile: data.employerProfile
    ? {
        companyName: data.employerProfile.companyName,
        headquartersLocation: data.employerProfile.headquartersLocation,
      }
    : null,
});

// Redux persists AI chat and feedback; drop it so the next user starts clean.
const clearPersistedState = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("persist:root");
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const data = await authApi.me();
      setUser(data.status === "success" ? toAppUser(data) : null);
    } catch {
      // 401 means signed out, which is not an error here.
      setUser(null);
    }
  }, []);

  useEffect(() => {
    void refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const signInWithGoogle = async (role?: Role) => {
    const url = new URL(API_URL.AUTH.GOOGLE_INIT.url);
    if (role) {
      url.searchParams.set("role", role);
    }
    window.location.href = url.toString();
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setUser(toAppUser(await authApi.login(email, password)));
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Login failed"));
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName: string,
    role: Role,
  ) => {
    try {
      setUser(toAppUser(await authApi.signup(email, password, fullName, role)));
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Signup failed"));
    }
  };

  const signOut = async () => {
    clearPersistedState();
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout API failed, clearing local state anyway.", error);
    } finally {
      setUser(null);
    }
  };

  const deleteAccount = async () => {
    try {
      await authApi.deleteAccount();
      clearPersistedState();
      setUser(null);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Could not delete account"));
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    refreshUser,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

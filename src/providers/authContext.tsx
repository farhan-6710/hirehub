"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/services/authApi";
import { setMemoryAuthStatus } from "@/utils/auth";
import { API_URL } from "@/constants/api";

interface AppUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(false);

  const getApiErrorMessage = (error: unknown, fallback: string): string => {
    const apiError = (error as { response?: { data?: { error?: string } } })
      ?.response?.data?.error;

    if (typeof apiError === "string" && apiError.trim().length > 0) {
      return apiError;
    }

    if (error instanceof Error && error.message.trim().length > 0) {
      return error.message;
    }

    return fallback;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authApi.me();
        if (data.status === "success") {
          setUser({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            picture: data.user.picture || "",
          });
          setMemoryAuthStatus(true);
        } else {
          setMemoryAuthStatus(false);
        }
      } catch {
        // 401 is expected when user is not logged in — not an error
        setMemoryAuthStatus(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const signInWithGoogle = async () => {
    window.location.href = API_URL.AUTH.GOOGLE_INIT.url;
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const data = await authApi.login(email, password);
      if (data.status === "success") {
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          picture: data.user.picture || "",
        });
        setMemoryAuthStatus(true);
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Login failed"));
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName: string,
  ) => {
    try {
      const data = await authApi.signup(email, password, fullName);
      if (data.status === "success") {
        setUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          picture: data.user.picture || "",
        });
        setMemoryAuthStatus(true);
      } else {
        throw new Error(data.error || "Signup failed");
      }
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Signup failed"));
    }
  };

  const signOut = async () => {
    // Clear cart and wishlist locally BEFORE signing out to prevent API calls with invalid tokens
    if (typeof window !== "undefined") {
      localStorage.removeItem("persist:root");
    }

    try {
      await authApi.logout();
    } catch (e) {
      console.error("Logout API failed, but clearing local state anyway.", e);
    } finally {
      setUser(null);
      setMemoryAuthStatus(false);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
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

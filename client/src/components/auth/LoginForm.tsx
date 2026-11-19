"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/authContext";
import { showToast } from "@/config/ToastConfig";
import { AuthFormFooter } from "./AuthFormFooter";
import {
  AuthInput,
  AuthItem,
  PasswordInput,
  authFormVariants,
} from "./AuthFormParts";

interface LoginFormProps {
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
}

const LoginForm = ({ setShowLoginModal, setShowSignupModal }: LoginFormProps) => {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => emailRef.current?.focus());
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      await signInWithEmail(String(formData.get("email")), String(formData.get("password")));
      showToast({ type: "success", title: "Successfully Signed In", description: "Welcome back!" });
      setShowLoginModal(false);
    } catch (error) {
      showToast({
        type: "error",
        title: "Sign In Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <motion.form
        onSubmit={handleSubmit}
        aria-label="Login form"
        initial="hidden"
        animate="visible"
        variants={authFormVariants}
      >
        <div className="space-y-4 mb-4">
          <AuthInput ref={emailRef} id="login-email" name="email" type="email" label="Email" required autoComplete="email" />
          <PasswordInput id="login-password" name="password" label="Password" required autoComplete="current-password" />
        </div>

        <AuthItem>
          <Button type="submit" disabled={loading} className="w-full mb-4 h-10">
            {loading ? "Signing in..." : "Continue"}
          </Button>
        </AuthItem>

        <AuthFormFooter
          loading={loading}
          onGoogle={() => void signInWithGoogle()}
          switchPrompt="Don't have an account?"
          switchLabel="Sign Up"
          onSwitch={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
          termsAction="signing in"
        />
      </motion.form>
    </div>
  );
};

export default LoginForm;

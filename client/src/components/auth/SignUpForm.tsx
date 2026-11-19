"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/authContext";
import { showToast } from "@/config/ToastConfig";
import { brand } from "@/constants/brand";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/constants/auth";
import { AuthFormFooter } from "./AuthFormFooter";
import { RoleToggle, type Role } from "./RoleToggle";
import {
  AuthInput,
  AuthItem,
  PasswordInput,
  authFormVariants,
} from "./AuthFormParts";

interface SignUpFormProps {
  setShowLoginModal: (show: boolean) => void;
  setShowSignupModal: (show: boolean) => void;
}

const passwordRules = {
  required: true,
  minLength: PASSWORD_MIN_LENGTH,
  maxLength: PASSWORD_MAX_LENGTH,
  autoComplete: "new-password",
};

const SignUpForm = ({ setShowLoginModal, setShowSignupModal }: SignUpFormProps) => {
  const { signInWithGoogle, signUpWithEmail } = useAuth();
  const [role, setRole] = useState<Role>("candidate");
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => nameRef.current?.focus());
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("new-password"));

    if (password !== String(formData.get("confirm-password"))) {
      showToast({ type: "error", title: "Password Mismatch", description: "The passwords you entered do not match." });
      return;
    }

    try {
      setLoading(true);
      await signUpWithEmail(String(formData.get("new-email")), password, String(formData.get("full-name")), role);
      showToast({ type: "success", title: "Account Created", description: `Welcome to ${brand.name}!` });
      setShowSignupModal(false);
    } catch (error) {
      showToast({
        type: "error",
        title: "Sign Up Failed",
        description: error instanceof Error ? error.message : "Please check your information and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <motion.form onSubmit={handleSubmit} aria-label="Sign up form" initial="hidden" animate="visible" variants={authFormVariants}>
        <div className="space-y-4 mb-4">
          <RoleToggle value={role} onChange={setRole} />
          <AuthInput ref={nameRef} id="signup-name" name="full-name" label="Full name" required maxLength={100} autoComplete="name" />
          <AuthInput id="signup-email" name="new-email" type="email" label="Email" required autoComplete="email" />
          <PasswordInput id="signup-password" name="new-password" label={`Password (min ${PASSWORD_MIN_LENGTH} characters)`} {...passwordRules} />
          <PasswordInput id="confirm-password" name="confirm-password" label="Confirm Password" {...passwordRules} />
        </div>

        <AuthItem>
          <Button type="submit" disabled={loading} className="w-full mb-4 h-10">
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </AuthItem>

        <AuthFormFooter
          loading={loading}
          onGoogle={() => void signInWithGoogle(role)}
          switchPrompt="Already have an account?"
          switchLabel="Login"
          onSwitch={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
          termsAction="signing up"
        />
      </motion.form>
    </div>
  );
};

export default SignUpForm;

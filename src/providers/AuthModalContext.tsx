"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import Modal from "@/components/modals/Modal";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";

interface AuthModalContextValue {
  openLoginModal: () => void;
  openSignupModal: () => void;
  closeAllAuthModals: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | undefined>(
  undefined,
);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const value = useMemo<AuthModalContextValue>(
    () => ({
      openLoginModal: () => {
        setShowSignupModal(false);
        setShowLoginModal(true);
      },
      openSignupModal: () => {
        setShowLoginModal(false);
        setShowSignupModal(true);
      },
      closeAllAuthModals: () => {
        setShowLoginModal(false);
        setShowSignupModal(false);
      },
    }),
    [],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}

      <Modal
        open={showLoginModal}
        className="max-w-sm! p-8"
        onOpenChange={setShowLoginModal}
        title="Login to Your Account"
        description="Enter your credentials to access your account"
      >
        <LoginForm
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />
      </Modal>

      <Modal
        open={showSignupModal}
        className="max-w-sm! p-8"
        onOpenChange={setShowSignupModal}
        title="Create Your Account"
        description="Sign up to start applying for jobs"
      >
        <SignUpForm
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
        />
      </Modal>
    </AuthModalContext.Provider>
  );
}

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }

  return context;
};

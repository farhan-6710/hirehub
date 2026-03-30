"use client";

import React, { createContext, useContext, useState } from "react";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/providers/AuthModalContext";
import { useAuth } from "@/providers/authContext";

interface EmployerAccessContextValue {
  openEmployerAccessModal: () => void;
  closeEmployerAccessModal: () => void;
}

const EmployerAccessContext = createContext<
  EmployerAccessContextValue | undefined
>(undefined);

export function EmployerAccessProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showEmployerAccessModal, setShowEmployerAccessModal] = useState(false);
  const { openLoginModal } = useAuthModal();
  const { user } = useAuth();
  const isEmployer = Boolean(user?.roles.includes("employer"));

  const openEmployerAccessModal = () => {
    if (isEmployer) return;
    setShowEmployerAccessModal(true);
  };

  const closeEmployerAccessModal = () => {
    setShowEmployerAccessModal(false);
  };

  const value: EmployerAccessContextValue = {
    openEmployerAccessModal,
    closeEmployerAccessModal,
  };

  return (
    <EmployerAccessContext.Provider value={value}>
      {children}

      <Modal
        open={!isEmployer && showEmployerAccessModal}
        onOpenChange={setShowEmployerAccessModal}
        className="max-w-lg p-7"
        title="Login as Employer"
        description="Please login as an employer to post a job"
      >
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-foreground">
            Please login as an employer to continue.
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Create an employer account to post jobs, or use the credentials
            below to login as an employer.
          </p>

          <div className="rounded-xl border border-border bg-card/40 p-4 space-y-2 text-sm">
            <p>
              Email:{" "}
              <span className="text-secondary-foreground font-semibold">
                employer@gmail.com
              </span>
            </p>
            <p>
              Password:{" "}
              <span className="text-secondary-foreground font-semibold">
                employer1234
              </span>
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowEmployerAccessModal(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowEmployerAccessModal(false);
                openLoginModal();
              }}
            >
              Go to Employer Login
            </Button>
          </div>
        </div>
      </Modal>
    </EmployerAccessContext.Provider>
  );
}

export const useEmployerAccess = () => {
  const context = useContext(EmployerAccessContext);

  if (!context) {
    throw new Error(
      "useEmployerAccess must be used within EmployerAccessProvider",
    );
  }

  return context;
};

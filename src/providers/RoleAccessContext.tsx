"use client";

import React, { createContext, useContext, useState } from "react";
import Modal from "@/components/modals/Modal";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/providers/AuthModalContext";
import { useAuth } from "@/providers/authContext";

interface RoleAccessContextValue {
  openEmployerAccessModal: () => void;
  closeEmployerAccessModal: () => void;
  openCandidateAccessModal: () => void;
  closeCandidateAccessModal: () => void;
}

const RoleAccessContext = createContext<RoleAccessContextValue | undefined>(
  undefined,
);

export function RoleAccessProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showEmployerAccessModal, setShowEmployerAccessModal] = useState(false);
  const [showCandidateAccessModal, setShowCandidateAccessModal] =
    useState(false);
  const { openLoginModal } = useAuthModal();
  const { user } = useAuth();

  const isEmployer = user?.role === "employer";
  const isCandidate = user?.role === "candidate";

  const openEmployerAccessModal = () => {
    if (isEmployer) return;
    setShowEmployerAccessModal(true);
  };

  const closeEmployerAccessModal = () => {
    setShowEmployerAccessModal(false);
  };

  const openCandidateAccessModal = () => {
    if (isCandidate) return;
    setShowCandidateAccessModal(true);
  };

  const closeCandidateAccessModal = () => {
    setShowCandidateAccessModal(false);
  };

  const value: RoleAccessContextValue = {
    openEmployerAccessModal,
    closeEmployerAccessModal,
    openCandidateAccessModal,
    closeCandidateAccessModal,
  };

  return (
    <RoleAccessContext.Provider value={value}>
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
            <Button variant="outline" onClick={closeEmployerAccessModal}>
              Close
            </Button>
            <Button
              onClick={() => {
                closeEmployerAccessModal();
                openLoginModal();
              }}
            >
              Go to Employer Login
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={!isCandidate && showCandidateAccessModal}
        onOpenChange={setShowCandidateAccessModal}
        className="max-w-lg p-7"
        title="Login as Candidate"
        description="Please login as a candidate to apply for jobs"
      >
        <div className="space-y-5">
           <h3 className="text-xl font-semibold text-foreground">
            Please login as an candidate to continue.
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Create a candidate account to apply for jobs, or use the credentials
            below to login as a candidate.
          </p>

          <div className="rounded-xl border border-border bg-card/40 p-4 space-y-2 text-sm">
            <p>
              Email:{" "}
              <span className="text-secondary-foreground font-semibold">
                candidate@gmail.com
              </span>
            </p>
            <p>
              Password:{" "}
              <span className="text-secondary-foreground font-semibold">
                candidate1234
              </span>
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <Button variant="outline" onClick={closeCandidateAccessModal}>
              Close
            </Button>
            <Button
              onClick={() => {
                closeCandidateAccessModal();
                openLoginModal();
              }}
            >
              Go to Candidate Login
            </Button>
          </div>
        </div>
      </Modal>
    </RoleAccessContext.Provider>
  );
}

export const useRoleAccess = () => {
  const context = useContext(RoleAccessContext);

  if (!context) {
    throw new Error("useRoleAccess must be used within RoleAccessProvider");
  }

  return context;
};

export const useEmployerAccess = () => {
  const { openEmployerAccessModal, closeEmployerAccessModal } = useRoleAccess();
  return { openEmployerAccessModal, closeEmployerAccessModal };
};

export const useCandidateAccess = () => {
  const { openCandidateAccessModal, closeCandidateAccessModal } =
    useRoleAccess();
  return { openCandidateAccessModal, closeCandidateAccessModal };
};

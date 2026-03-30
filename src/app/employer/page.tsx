"use client";

import { MainLayout } from "./MainLayout";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardTab } from "@/components/employer/dashboard/DashboardTab";
import { MyJobsTab } from "@/components/employer/my-jobs/MyJobsTab";
import { PostJobTab } from "@/components/employer/post-job/PostJobTab";
import { ProfileTab } from "@/components/employer/profile/ProfileTab";
import { SettingsTab } from "@/components/employer/settings/SettingsTab";
import { useAuth } from "@/providers/authContext";
import { useEmployerAccess } from "@/providers/EmployerAccessContext";

export default function EmployerPage() {
  const { user, loading } = useAuth();
  const { openEmployerAccessModal } = useEmployerAccess();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    const tab = searchParams.get("tab");
    const allowedTabs = [
      "dashboard",
      "my-jobs",
      "post-job",
      "profile",
      "settings",
    ];

    return tab && allowedTabs.includes(tab) ? tab : "dashboard";
  });

  const isEmployer = Boolean(user?.roles.includes("employer"));

  useEffect(() => {
    if (!loading && !isEmployer) {
      openEmployerAccessModal();
    }
  }, [isEmployer, loading, openEmployerAccessModal]);

  if (loading) {
    return <div className="p-6 text-muted-foreground">loading..</div>;
  }

  if (!isEmployer) {
    return (
      <div className="p-6">
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-card/20 p-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            Employer access required
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Please login as an employer to continue.
          </p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardTab />;
      case "my-jobs":
        return <MyJobsTab />;
      case "post-job":
        return <PostJobTab />;
      case "profile":
        return <ProfileTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };
  return (
    <MainLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  );
}

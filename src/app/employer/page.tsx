"use client";

import { MainLayout } from "./MainLayout";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardTab } from "@/components/employer/dashboard/DashboardTab";
import { MyJobsTab } from "@/components/employer/my-jobs/MyJobsTab";
import { PostJobTab } from "@/components/employer/post-job/PostJobTab";
import { ProfileTab } from "@/components/employer/profile/ProfileTab";
import { SettingsTab } from "@/components/employer/settings/SettingsTab";

export default function EmployerPage() {
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

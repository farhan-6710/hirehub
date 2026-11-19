"use client";

import { MainLayout } from "./MainLayout";
import { useEffect, type ComponentType } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardTab } from "@/components/employer/dashboard/DashboardTab";
import { MyJobsTab } from "@/components/employer/my-jobs/MyJobsTab";
import { PostJobTab } from "@/components/employer/post-job/PostJobTab";
import { ProfileTab } from "@/components/employer/profile/ProfileTab";
import { SettingsTab } from "@/components/employer/settings/SettingsTab";
import { useAuth } from "@/providers/authContext";
import { useEmployerAccess } from "@/providers/RoleAccessContext";

// Keys match the tab ids in shared/brand/brandManifest.json.
const TABS: Record<string, ComponentType> = {
  dashboard: DashboardTab,
  "my-jobs": MyJobsTab,
  "post-job": PostJobTab,
  profile: ProfileTab,
  settings: SettingsTab,
};
const DEFAULT_TAB = "dashboard";

export default function EmployerPage() {
  const { user, loading } = useAuth();
  const { openEmployerAccessModal } = useEmployerAccess();
  const router = useRouter();
  const searchParams = useSearchParams();

  // The URL is the source of truth, so links to ?tab=... switch tabs too.
  const requestedTab = searchParams.get("tab") ?? DEFAULT_TAB;
  const currentPage = requestedTab in TABS ? requestedTab : DEFAULT_TAB;
  const CurrentTab = TABS[currentPage];

  const navigateTo = (tab: string) =>
    router.replace(`/employer?tab=${tab}`, { scroll: false });

  const isEmployer = user?.role === "employer";
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

  return (
    <MainLayout currentPage={currentPage} onNavigate={navigateTo}>
      <CurrentTab />
    </MainLayout>
  );
}

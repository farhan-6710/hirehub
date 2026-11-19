import { useEffect, useState } from "react";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase02Icon,
  UserGroupIcon,
  Calendar02Icon,
  CheckListIcon,
} from "@hugeicons/core-free-icons";
import {
  employerApi,
  type EmployerDashboardStats,
  type EmployerRecentApplication,
} from "@/services/employerApi";
import { showToast } from "@/config/ToastConfig";
import { getApiErrorMessage } from "@/utils/apiError";
import { RecentApplicationsTable } from "./RecentApplicationsTable";

const EMPTY_STATS: EmployerDashboardStats = {
  activeJobs: 0,
  totalApplicants: 0,
  reviewedApplications: 0,
  acceptedCandidates: 0,
};

const STAT_CARDS = [
  { key: "activeJobs", label: "Active Jobs", icon: Briefcase02Icon, tone: "text-blue-500 bg-blue-500/10" },
  { key: "totalApplicants", label: "Total Applicants", icon: UserGroupIcon, tone: "text-primary bg-primary/10" },
  { key: "reviewedApplications", label: "Reviewed", icon: Calendar02Icon, tone: "text-amber-500 bg-amber-500/10" },
  { key: "acceptedCandidates", label: "Accepted", icon: CheckListIcon, tone: "text-green-500 bg-green-500/10" },
] as const;

export function DashboardTab() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(EMPTY_STATS);
  const [recent, setRecent] = useState<EmployerRecentApplication[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await employerApi.getDashboard();
        setStats(data.dashboardStats);
        setRecent(data.recentApplications ?? []);
      } catch (error) {
        showToast({
          type: "error",
          title: "Failed to load dashboard",
          description: getApiErrorMessage(error, "Please try again."),
        });
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <PageBackgroundWrapper>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your hiring activity</p>
        </div>

        {loading ? <p className="text-muted-foreground">loading..</p> : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STAT_CARDS.map((card) => (
            <div
              key={card.key}
              className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 shadow-sm flex items-center gap-4"
            >
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${card.tone}`}>
                <HugeiconsIcon icon={card.icon} size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                <h3 className="text-2xl font-bold text-foreground">{stats[card.key]}</h3>
              </div>
            </div>
          ))}
        </div>

        <RecentApplicationsTable applications={recent} />
      </div>
    </PageBackgroundWrapper>
  );
}

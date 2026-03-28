import React from "react";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import {
  dashboardStats,
  recentApplications,
} from "@/constants/employerDummyData";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase02Icon,
  UserGroupIcon,
  Calendar02Icon,
  CheckListIcon,
} from "@hugeicons/core-free-icons";

export function DashboardTab() {
  const stats = [
    {
      label: "Active Jobs",
      value: dashboardStats.activeJobs,
      icon: Briefcase02Icon,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Applicants",
      value: dashboardStats.totalApplicants,
      icon: UserGroupIcon,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Reviewed",
      value: dashboardStats.reviewedApplications,
      icon: Calendar02Icon,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Accepted",
      value: dashboardStats.acceptedCandidates,
      icon: CheckListIcon,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <PageBackgroundWrapper>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your hiring activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 shadow-sm flex items-center gap-4"
            >
              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}
              >
                <HugeiconsIcon icon={stat.icon} size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold text-foreground">
                  {stat.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Applications Table/List */}
        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm shadow-sm overflow-hidden mt-8">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30">
                <tr>
                  <th className="px-6 py-4 font-medium text-muted-foreground">
                    Candidate
                  </th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">
                    Job Role
                  </th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">
                    Applied Date
                  </th>
                  <th className="px-6 py-4 font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {app.candidateName}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {app.jobTitle}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {app.appliedDate}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                          app.status === "reviewed"
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : app.status === "accepted"
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : app.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                        }`}
                      >
                        {app.status.charAt(0).toUpperCase() +
                          app.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageBackgroundWrapper>
  );
}

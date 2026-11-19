import { Badge } from "@/components/ui/badge";
import { getApplicationStatusBadge } from "@/constants/applications";
import type { EmployerRecentApplication } from "@/services/employerApi";

const COLUMNS = ["Candidate", "Job Role", "Applied Date", "Status"];

interface RecentApplicationsTableProps {
  applications: EmployerRecentApplication[];
}

export function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm shadow-sm overflow-hidden mt-8">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold">Recent Applications</h2>
      </div>
      {applications.length === 0 ? (
        <div className="p-6 text-sm text-muted-foreground">No applications yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/30">
              <tr>
                {COLUMNS.map((column) => (
                  <th key={column} className="px-6 py-4 font-medium text-muted-foreground">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applications.map((app) => {
                const badge = getApplicationStatusBadge(app.status);
                return (
                  <tr key={app.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{app.candidateName}</td>
                    <td className="px-6 py-4 text-muted-foreground">{app.jobTitle}</td>
                    <td className="px-6 py-4 text-muted-foreground">{app.appliedDate}</td>
                    <td className="px-6 py-4">
                      <Badge variant={badge.variant} className={badge.className}>
                        {badge.label}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

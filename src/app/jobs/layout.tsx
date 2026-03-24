"use client";

import * as React from "react";
import { JobsPageHeader } from "@/components/jobs/JobsPageHeader";

export const JobHeaderContext = React.createContext({ headerHeight: 0 });

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerHeight, setHeaderHeight] = React.useState(0);

  return (
    <div className="flex min-h-screen flex-col">
      <JobsPageHeader onHeightChange={setHeaderHeight} />
      <JobHeaderContext.Provider value={{ headerHeight }}>
        <main className="flex-1">{children}</main>
      </JobHeaderContext.Provider>
    </div>
  );
}

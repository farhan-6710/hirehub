"use client";

import * as React from "react";

import { JobsListingSection } from "@/components/jobs/jobs-listing-section/JobsListingSection";
import { JobsPageHeader } from "@/components/jobs/JobsPageHeader";
import { PageBackgroundWrapper } from "@/components/shared/PageBackgroundWrapper";

export default function JobsPage() {
  const [headerHeight, setHeaderHeight] = React.useState(0);

  return (
    <PageBackgroundWrapper>
      <JobsPageHeader onHeightChange={setHeaderHeight} />
      <main>
        <JobsListingSection
          stickyTopPx={headerHeight > 0 ? headerHeight + 32 : undefined}
        />
      </main>
    </PageBackgroundWrapper>
  );
}

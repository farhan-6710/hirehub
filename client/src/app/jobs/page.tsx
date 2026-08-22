"use client";

import * as React from "react";
import { JobsListingSection } from "@/components/jobs/jobs-listing-section/JobsListingSection";
import { PageBackgroundWrapper } from "@/components/shared/PageBackgroundWrapper";
import { JobHeaderContext } from "./layout";

export default function JobsPage() {
  const { headerHeight } = React.useContext(JobHeaderContext);

  return (
    <PageBackgroundWrapper>
      <JobsListingSection
        stickyTopPx={headerHeight > 0 ? headerHeight + 32 : undefined}
      />
    </PageBackgroundWrapper>
  );
}

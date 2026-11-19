import { useEffect } from "react";
import { Search01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { EXPERIENCE_LEVELS, JOB_TYPES } from "@/types/jobs/jobs";
import type { FiltersPanelProps } from "@/types/jobs/components";
import { useJobsFilters } from "@/hooks/useJobsFilters";
import { CheckboxGroup, IconInput } from "./FilterControls";

export function FiltersPanel({ jobs, onFilterChange }: FiltersPanelProps) {
  const filters = useJobsFilters(jobs);
  const { filteredJobs } = filters;

  useEffect(() => {
    onFilterChange(filteredJobs);
  }, [filteredJobs, onFilterChange]);

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-2 border border-border rounded-xl p-6 bg-card/20 backdrop-blur-md">
      <IconInput
        label="Search"
        icon={Search01Icon}
        placeholder="Job title or company..."
        value={filters.searchQuery}
        onChange={filters.setSearchQuery}
      />
      <IconInput
        label="Location"
        icon={Location01Icon}
        placeholder="City, State or Remote..."
        value={filters.locationQuery}
        onChange={filters.setLocationQuery}
      />
      <CheckboxGroup
        label="Job Type"
        options={JOB_TYPES}
        selected={filters.selectedJobTypes}
        onToggle={filters.toggleJobType}
      />
      <CheckboxGroup
        label="Experience Level"
        options={EXPERIENCE_LEVELS}
        selected={filters.selectedExperienceLevels}
        onToggle={filters.toggleExperienceLevel}
      />
      <Button size="lg" variant="outline" onClick={filters.resetFilters}>
        Reset Filters
      </Button>
    </aside>
  );
}

import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { titleize } from "@/utils/jobs/utils";
import { EXPERIENCE_LEVELS, JOB_TYPES } from "@/types/jobs/jobs";
import type { FiltersPanelProps } from "@/types/jobs/components";
import { useJobsFilters } from "@/hooks/useJobsFilters";

export function FiltersPanel({ jobs, onFilterChange }: FiltersPanelProps) {
  const {
    searchQuery,
    setSearchQuery,
    locationQuery,
    setLocationQuery,
    selectedJobTypes,
    toggleJobType,
    selectedExperienceLevels,
    toggleExperienceLevel,
    filteredJobs,
    resetFilters,
  } = useJobsFilters(jobs);

  React.useEffect(() => {
    onFilterChange(filteredJobs);
  }, [filteredJobs, onFilterChange]);

  return (
    <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-2 border border-border rounded-xl p-6 bg-card/20 backdrop-blur-md">
      <div>
        {/* Search */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-3 block text-foreground">
            Search
          </label>
          <div className="relative">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            />
            <Input
              placeholder="Job Title, Skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-transparent border-input h-9 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-3 block text-foreground">
            Location
          </label>
          <div className="relative">
            <HugeiconsIcon
              icon={Location01Icon}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            />
            <Input
              placeholder="City, State or Remote..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="pl-9 bg-transparent border-input h-9 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Job Type */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-4 block text-foreground">
            Job Type
          </label>
          <div className="flex flex-col gap-2">
            {JOB_TYPES.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={selectedJobTypes.includes(type)}
                  onCheckedChange={() => toggleJobType(type)}
                  className="rounded p-0.5 border-muted-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {titleize(type)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="mb-2">
          <label className="text-sm font-medium mb-4 block text-foreground">
            Experience Level
          </label>
          <div className="flex flex-col gap-2">
            {EXPERIENCE_LEVELS.map((level) => (
              <label
                key={level}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={selectedExperienceLevels.includes(level)}
                  onCheckedChange={() => toggleExperienceLevel(level)}
                  className="rounded p-0.5 border-muted-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {titleize(level)}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <Button
        size="lg"
        variant="outline"
        onClick={() => {
          resetFilters();
        }}
      >
        Reset Filters
      </Button>
    </aside>
  );
}

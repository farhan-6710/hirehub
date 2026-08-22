import { useMemo, useState } from "react";
import type { ExperienceLevel, JobListItem, JobType } from "@/types/jobs/jobs";

export function useJobsFilters(jobs: JobListItem[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<
    ExperienceLevel[]
  >([]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search Match
      const searchLower = searchQuery.toLowerCase();
      const matchSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchLower) ||
        job.companyName.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower);

      // Location Match
      const locationLower = locationQuery.toLowerCase();
      const matchLocation =
        !locationQuery || job.location.toLowerCase().includes(locationLower);

      // Job Type Match
      const matchType =
        selectedJobTypes.length === 0 || selectedJobTypes.includes(job.jobType);

      // Experience match
      const matchExp =
        selectedExperienceLevels.length === 0 ||
        selectedExperienceLevels.includes(job.experienceLevel);

      const matchStatus = job.status !== "closed";

      return (
        matchSearch && matchLocation && matchType && matchExp && matchStatus
      );
    });
  }, [
    jobs,
    searchQuery,
    locationQuery,
    selectedJobTypes,
    selectedExperienceLevels,
  ]);

  const toggleJobType = (type: JobType) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleExperienceLevel = (level: ExperienceLevel) => {
    setSelectedExperienceLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level],
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
  };

  return {
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
  };
}

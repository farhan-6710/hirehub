import type { ExperienceLevel } from "@/types/jobs/jobs";

export function getExperienceLevelBracket(level: ExperienceLevel): string {
  switch (level) {
    case "fresher":
      return "(0 years)";
    case "junior":
      return "(0-2 years)";
    case "intermediate":
      return "(2-4 years)";
    case "senior":
      return "(4+ years)";
    default:
      return "";
  }
}

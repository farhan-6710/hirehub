"use client";

import React, { useState } from "react";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusSignIcon, Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { jobsApi } from "@/services/jobsApi";
import { showToast } from "@/config/ToastConfig";
import { useAuth } from "@/providers/authContext";

export function PostJobTab() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const [requirements, setRequirements] = useState<string[]>([]);
  const [currentRequirement, setCurrentRequirement] = useState("");

  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [currentResponsibility, setCurrentResponsibility] = useState("");

  const addToList = (
    currentValue: string,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
    setCurrentValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (currentValue.trim()) {
      if (!list.includes(currentValue.trim())) {
        setList([...list, currentValue.trim()]);
      }
      setCurrentValue("");
    }
  };

  const removeListItem = (
    itemToRemove: string,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
  ) => {
    setList(list.filter((item) => item !== itemToRemove));
  };

  const finalizeList = (list: string[], currentValue: string) => {
    const trimmedCurrent = currentValue.trim();
    if (!trimmedCurrent) return list;
    if (list.includes(trimmedCurrent)) return list;
    return [...list, trimmedCurrent];
  };

  const handlePostJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      setIsSubmitting(true);

      const formData = new FormData(form);
      const title = String(formData.get("title") ?? "").trim();
      const workplaceType = String(formData.get("workplaceType") ?? "") as
        | "remote"
        | "hybrid"
        | "on_site";
      const jobType = String(formData.get("jobType") ?? "") as
        | "full_time"
        | "part_time"
        | "internship"
        | "freelance"
        | "contract";
      const experienceLevel = String(formData.get("experienceLevel") ?? "") as
        | "fresher"
        | "junior"
        | "intermediate"
        | "senior";
      const currency = String(formData.get("currency") ?? "INR");
      const minSalary = Number(formData.get("minSalary") ?? 0);
      const maxSalary = Number(formData.get("maxSalary") ?? 0);
      const description = String(formData.get("description") ?? "").trim();
      const applicationDeadline = String(
        formData.get("applicationDeadline") ?? "",
      );

      const finalizedRequirements = finalizeList(
        requirements,
        currentRequirement,
      );
      const finalizedResponsibilities = finalizeList(
        responsibilities,
        currentResponsibility,
      );
      const finalizedSkills = finalizeList(skills, currentSkill);

      // Keep UI in sync if user typed an item but clicked submit directly.
      if (finalizedRequirements.length !== requirements.length) {
        setRequirements(finalizedRequirements);
        setCurrentRequirement("");
      }
      if (finalizedResponsibilities.length !== responsibilities.length) {
        setResponsibilities(finalizedResponsibilities);
        setCurrentResponsibility("");
      }
      if (finalizedSkills.length !== skills.length) {
        setSkills(finalizedSkills);
        setCurrentSkill("");
      }

      if (
        !user?.employerProfile?.companyName ||
        !user?.employerProfile?.headquartersLocation
      ) {
        showToast({
          type: "warning",
          title: "Employer profile required",
          description:
            "Please complete your employer profile with company name and headquarters location before posting a job.",
        });
        return;
      }

      const descriptionLines = description.split(/\r\n|\r|\n/).length;
      if (descriptionLines > 180) {
        showToast({
          type: "warning",
          title: "Description too long",
          description: "Job description must not exceed 180 lines.",
        });
        return;
      }

      if (
        finalizedRequirements.length === 0 ||
        finalizedResponsibilities.length === 0 ||
        finalizedSkills.length === 0
      ) {
        showToast({
          type: "warning",
          title: "Missing list fields",
          description:
            "Please add at least one requirement, responsibility, and skill.",
        });
        return;
      }

      await jobsApi.createJob({
        title,
        workplaceType,
        jobType,
        minSalary,
        maxSalary,
        currency,
        experienceLevel,
        description,
        requirements: finalizedRequirements,
        responsibilities: finalizedResponsibilities,
        skills: finalizedSkills,
        applicationDeadline,
      });

      showToast({
        type: "success",
        title: "Job posted",
        description: "Your job is now live.",
      });

      form.reset();
      setSkills([]);
      setCurrentSkill("");
      setRequirements([]);
      setCurrentRequirement("");
      setResponsibilities([]);
      setCurrentResponsibility("");
    } catch (error) {
      const apiError = (error as { response?: { data?: { error?: string } } })
        ?.response?.data?.error;

      showToast({
        type: "error",
        title: "Failed to post job",
        description: apiError || "Please check your input and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageBackgroundWrapper>
      <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Post a New Job
          </h1>
          <p className="text-muted-foreground">
            Fill out the form below to publish a new job listing.
          </p>
        </div>

        <form
          onSubmit={handlePostJob}
          className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 md:p-10 shadow-sm space-y-10"
        >
          {/* Job Basics */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-border pb-2">
              {user?.employerProfile?.companyName || "Company Not Set"}
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="text-muted-foreground text-base font-medium">
                {user?.employerProfile?.headquartersLocation ||
                  "Location Not Set"}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Job Title
                </label>
                <Input
                  name="title"
                  placeholder="e.g. Senior Frontend Developer"
                  required
                />
              </div>
              <div className="space-y-2 flex flex-col justify-end">
                <label className="text-sm font-medium text-foreground">
                  Workplace Type
                </label>
                <Select name="workplaceType" defaultValue="remote">
                  <SelectTrigger className="w-full bg-background/50 h-10">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="on_site">On-site</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 flex flex-col justify-end">
                <label className="text-sm font-medium text-foreground">
                  Job Type
                </label>
                <Select name="jobType" defaultValue="full_time">
                  <SelectTrigger className="w-full bg-background/50 h-10">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full-time</SelectItem>
                    <SelectItem value="part_time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 flex flex-col justify-end">
                <label className="text-sm font-medium text-foreground">
                  Experience Level
                </label>
                <Select name="experienceLevel" defaultValue="intermediate">
                  <SelectTrigger className="w-full bg-background/50 h-10">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Salary Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-border pb-2">
              Compensation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 flex flex-col justify-end">
                <label className="text-sm font-medium text-foreground">
                  Currency
                </label>
                <Select name="currency" defaultValue="INR">
                  <SelectTrigger className="w-full bg-background/50 h-10">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Min Salary
                </label>
                <Input
                  name="minSalary"
                  type="number"
                  placeholder="e.g. 500000"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Max Salary
                </label>
                <Input
                  name="maxSalary"
                  type="number"
                  placeholder="e.g. 1000000"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description & Responsibilities */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-border pb-2">
              Job Details
            </h2>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Job Description
              </label>
              <Textarea
                name="description"
                placeholder="Describe the role comprehensively (max 180 lines)..."
                className="min-h-32 bg-background/50 text-foreground"
                rows={8}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Requirements
              </label>
              <div className="flex gap-2 isolate">
                <Input
                  value={currentRequirement}
                  onChange={(e) => setCurrentRequirement(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addToList(
                        currentRequirement,
                        setRequirements,
                        requirements,
                        setCurrentRequirement,
                      );
                    }
                  }}
                  placeholder="e.g. 3+ years of experience in React"
                  className="bg-background/50"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    addToList(
                      currentRequirement,
                      setRequirements,
                      requirements,
                      setCurrentRequirement,
                    )
                  }
                  className="shrink-0 gap-2 px-6"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                  Add
                </Button>
              </div>
              {requirements.length > 0 && (
                <ul className="space-y-2 mt-3 p-4 bg-background/30 rounded-xl border border-border/50">
                  {requirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start justify-between text-sm text-foreground/90 gap-4 group"
                    >
                      <span className="flex items-start gap-2 flex-1">
                        <span className="text-primary mt-0.5 shrink-0">•</span>
                        <span>{req}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          removeListItem(req, setRequirements, requirements)
                        }
                        className="text-destructive hover:text-destructive/80 shrink-0 transition-colors"
                        title="Remove"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium text-foreground">
                Responsibilities
              </label>
              <div className="flex gap-2 isolate">
                <Input
                  value={currentResponsibility}
                  onChange={(e) => setCurrentResponsibility(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addToList(
                        currentResponsibility,
                        setResponsibilities,
                        responsibilities,
                        setCurrentResponsibility,
                      );
                    }
                  }}
                  placeholder="e.g. Build reusable frontend components"
                  className="bg-background/50"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    addToList(
                      currentResponsibility,
                      setResponsibilities,
                      responsibilities,
                      setCurrentResponsibility,
                    )
                  }
                  className="shrink-0 gap-2 px-6"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                  Add
                </Button>
              </div>
              {responsibilities.length > 0 && (
                <ul className="space-y-2 mt-3 p-4 bg-background/30 rounded-xl border border-border/50">
                  {responsibilities.map((res, idx) => (
                    <li
                      key={idx}
                      className="flex items-start justify-between text-sm text-foreground/90 gap-4 group"
                    >
                      <span className="flex items-start gap-2 flex-1">
                        <span className="text-primary mt-0.5 shrink-0">•</span>
                        <span>{res}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          removeListItem(
                            res,
                            setResponsibilities,
                            responsibilities,
                          )
                        }
                        className="text-destructive hover:text-destructive/80 shrink-0 transition-colors"
                        title="Remove"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium text-foreground">
                Skills Needed
              </label>
              <div className="flex gap-2 isolate">
                <Input
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addToList(
                        currentSkill,
                        setSkills,
                        skills,
                        setCurrentSkill,
                      );
                    }
                  }}
                  placeholder="e.g. React, Node.js"
                  className="bg-background/50"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() =>
                    addToList(currentSkill, setSkills, skills, setCurrentSkill)
                  }
                  className="shrink-0 gap-2 px-6"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                  Add
                </Button>
              </div>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 pl-3 pr-2 py-1.5 rounded-full text-sm font-medium animate-in fade-in zoom-in-95"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeListItem(skill, setSkills, skills)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-full p-0.5 transition-colors"
                        title="Remove"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2 pt-4 border-t border-border/50 max-w-full md:max-w-xs">
              <label className="text-sm font-medium text-foreground">
                Application Deadline
              </label>
              <Input
                name="applicationDeadline"
                type="date"
                required
                className="w-full bg-background/50 block"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              className="w-full sm:w-auto h-11 px-8"
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 w-full sm:w-auto h-11 px-10 shadow-md"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={18} />
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </PageBackgroundWrapper>
  );
}

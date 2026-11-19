"use client";

import Link from "next/link";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useAuth } from "@/providers/authContext";
import { usePostJob } from "@/hooks/usePostJob";
import {
  CURRENCY_OPTIONS,
  EXPERIENCE_LEVEL_OPTIONS,
  JOB_TYPE_OPTIONS,
  MAX_DESCRIPTION_LINES,
  WORKPLACE_TYPE_OPTIONS,
} from "@/constants/postJob";
import { SelectField } from "./SelectField";
import { ListInput } from "./ListInput";

const SECTION_TITLE = "text-xl font-semibold border-b border-border pb-2";
const FIELD_LABEL = "text-sm font-medium text-foreground";

export function PostJobTab() {
  const { user } = useAuth();
  const company = user?.employerProfile;
  const { isSubmitting, requirements, responsibilities, skills, handleSubmit } = usePostJob();

  return (
    <PageBackgroundWrapper>
      <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Post a New Job</h1>
          <p className="text-muted-foreground">Fill out the form below to publish a new job listing.</p>
        </div>

        {!company?.companyName || !company.headquartersLocation ? (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card/20 space-y-4">
            <h2 className="text-xl font-semibold">Add your company profile first</h2>
            <p className="text-sm text-muted-foreground">
              Jobs use your company name and headquarters location.
            </p>
            <Button asChild>
              <Link href="/employer?tab=profile">Go to Company Profile</Link>
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 md:p-10 shadow-sm space-y-10"
          >
            <div className="space-y-4">
              <h2 className={SECTION_TITLE}>
                {company.companyName}
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-muted-foreground text-base font-medium">{company.headquartersLocation}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={FIELD_LABEL}>Job Title</label>
                  <Input name="title" placeholder="e.g. Senior Frontend Developer" required />
                </div>
                <SelectField name="workplaceType" label="Workplace Type" options={WORKPLACE_TYPE_OPTIONS} defaultValue="remote" />
                <SelectField name="jobType" label="Job Type" options={JOB_TYPE_OPTIONS} defaultValue="full_time" />
                <SelectField name="experienceLevel" label="Experience Level" options={EXPERIENCE_LEVEL_OPTIONS} defaultValue="intermediate" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className={SECTION_TITLE}>Compensation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField name="currency" label="Currency" options={CURRENCY_OPTIONS} defaultValue="INR" />
                <div className="space-y-2">
                  <label className={FIELD_LABEL}>Min Salary</label>
                  <Input name="minSalary" type="number" placeholder="e.g. 500000" min="0" required />
                </div>
                <div className="space-y-2">
                  <label className={FIELD_LABEL}>Max Salary</label>
                  <Input name="maxSalary" type="number" placeholder="e.g. 1000000" min="0" required />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className={SECTION_TITLE}>Job Details</h2>
              <div className="space-y-2">
                <label className={FIELD_LABEL}>Job Description</label>
                <Textarea
                  name="description"
                  placeholder={`Describe the role comprehensively (max ${MAX_DESCRIPTION_LINES} lines)...`}
                  className="min-h-32 bg-background/50 text-foreground"
                  rows={8}
                  required
                />
              </div>
              <ListInput label="Requirements" placeholder="e.g. 3+ years of experience in React" state={requirements} />
              <ListInput label="Responsibilities" placeholder="e.g. Build reusable frontend components" state={responsibilities} />
              <ListInput label="Skills Needed" placeholder="e.g. React, Node.js" state={skills} variant="chips" />
              <div className="space-y-2 pt-4 border-t border-border/50 max-w-full md:max-w-xs">
                <label className={FIELD_LABEL}>Application Deadline</label>
                <Input name="applicationDeadline" type="date" required className="w-full bg-background/50 block" />
              </div>
            </div>

            <div className="pt-6 border-t border-border flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="gap-2 w-full sm:w-auto h-11 px-10 shadow-md">
                <HugeiconsIcon icon={PlusSignIcon} size={18} />
                {isSubmitting ? "Posting..." : "Post Job"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </PageBackgroundWrapper>
  );
}

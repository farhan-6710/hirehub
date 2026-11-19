import { useState, type FormEvent } from "react";
import { jobsApi, type CreateJobPayload } from "@/services/jobsApi";
import { showToast } from "@/config/ToastConfig";
import { getApiErrorMessage } from "@/utils/apiError";
import { MAX_DESCRIPTION_LINES } from "@/constants/postJob";
import { useListInput } from "./useListInput";

const warn = (title: string, description: string) =>
  showToast({ type: "warning", title, description });

export function usePostJob() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const requirements = useListInput();
  const responsibilities = useListInput();
  const skills = useListInput();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    const lists = {
      requirements: requirements.finalize(),
      responsibilities: responsibilities.finalize(),
      skills: skills.finalize(),
    };
    const description = text("description");

    if (description.split(/\r\n|\r|\n/).length > MAX_DESCRIPTION_LINES) {
      warn("Description too long", `Keep the description under ${MAX_DESCRIPTION_LINES} lines.`);
      return;
    }
    if (Object.values(lists).some((list) => list.length === 0)) {
      warn("Missing list fields", "Add at least one requirement, responsibility, and skill.");
      return;
    }

    const payload: CreateJobPayload = {
      title: text("title"),
      workplaceType: text("workplaceType") as CreateJobPayload["workplaceType"],
      jobType: text("jobType") as CreateJobPayload["jobType"],
      experienceLevel: text("experienceLevel") as CreateJobPayload["experienceLevel"],
      currency: text("currency") || "INR",
      minSalary: Number(text("minSalary")),
      maxSalary: Number(text("maxSalary")),
      description,
      applicationDeadline: text("applicationDeadline"),
      ...lists,
    };

    try {
      setIsSubmitting(true);
      await jobsApi.createJob(payload);
      showToast({ type: "success", title: "Job posted", description: "Your job is now live." });
      form.reset();
      [requirements, responsibilities, skills].forEach((list) => list.reset());
    } catch (error) {
      showToast({
        type: "error",
        title: "Failed to post job",
        description: getApiErrorMessage(error, "Please check your input and try again."),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, requirements, responsibilities, skills, handleSubmit };
}

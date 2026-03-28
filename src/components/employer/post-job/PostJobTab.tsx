import React, { useState } from "react";
import { PageBackgroundWrapper } from "../../shared/PageBackgroundWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusSignIcon, Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function PostJobTab() {
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const [requirements, setRequirements] = useState<string[]>([]);
  const [currentRequirement, setCurrentRequirement] = useState("");

  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [currentResponsibility, setCurrentResponsibility] = useState("");

  const addListItem = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentValue: string,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
    setCurrentValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    if (e.key === "Enter" && currentValue.trim()) {
      e.preventDefault();
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

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Job posted successfully (Dummy)!");
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
              Basic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Job Title
                </label>
                <Input placeholder="e.g. Senior Frontend Developer" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Company Name
                </label>
                <Input placeholder="e.g. TechCorp" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Location
                </label>
                <Input placeholder="e.g. New York, Remote, etc." required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Workplace Type
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="remote">Remote</option>
                  <option value="on_site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Job Type
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="full_time">Full-time</option>
                  <option value="part_time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Experience Level
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="fresher">Fresher</option>
                  <option value="junior">Junior</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>
          </div>

          {/* Salary Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-border pb-2">
              Compensation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Currency
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Min Salary
                </label>
                <Input
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
                placeholder="Describe the role comprehensively..."
                className="min-h-[120px] bg-background/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Requirements (Press Enter to add)
              </label>
              <Input
                value={currentRequirement}
                onChange={(e) => setCurrentRequirement(e.target.value)}
                onKeyDown={(e) =>
                  addListItem(
                    e,
                    currentRequirement,
                    setRequirements,
                    requirements,
                    setCurrentRequirement,
                  )
                }
                placeholder="e.g. 3+ years of experience in React"
              />
              {requirements.length > 0 && (
                <ul className="space-y-1 mt-2 p-4 bg-background/30 rounded-lg border border-border">
                  {requirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start justify-between text-sm text-foreground/80 gap-4"
                    >
                      <span className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        {req}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          removeListItem(req, setRequirements, requirements)
                        }
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Responsibilities (Press Enter to add)
              </label>
              <Input
                value={currentResponsibility}
                onChange={(e) => setCurrentResponsibility(e.target.value)}
                onKeyDown={(e) =>
                  addListItem(
                    e,
                    currentResponsibility,
                    setResponsibilities,
                    responsibilities,
                    setCurrentResponsibility,
                  )
                }
                placeholder="e.g. Build reusable frontend components"
              />
              {responsibilities.length > 0 && (
                <ul className="space-y-1 mt-2 p-4 bg-background/30 rounded-lg border border-border">
                  {responsibilities.map((res, idx) => (
                    <li
                      key={idx}
                      className="flex items-start justify-between text-sm text-foreground/80 gap-4"
                    >
                      <span className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        {res}
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
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Skills Needed (Press Enter to add)
              </label>
              <Input
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={(e) =>
                  addListItem(
                    e,
                    currentSkill,
                    setSkills,
                    skills,
                    setCurrentSkill,
                  )
                }
                placeholder="e.g. React, Node.js"
              />
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeListItem(skill, setSkills, skills)}
                      className="hover:text-foreground"
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium text-foreground">
                Application Deadline
              </label>
              <Input
                type="date"
                required
                className="w-full md:w-1/3 bg-background/50"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              className="w-full sm:w-auto"
            >
              Save as Draft
            </Button>
            <Button type="submit" className="gap-2 w-full sm:w-auto shadow-md">
              <HugeiconsIcon icon={PlusSignIcon} size={18} />
              Post Job
            </Button>
          </div>
        </form>
      </div>
    </PageBackgroundWrapper>
  );
}

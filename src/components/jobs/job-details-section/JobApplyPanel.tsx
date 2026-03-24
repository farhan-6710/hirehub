"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function JobApplyPanel() {
  const [coverLetter, setCoverLetter] = React.useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mb-2">
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl text-foreground">
          Submit Your Application
        </h3>
        <p className="text-sm text-muted-foreground">
          Stand out by telling us why you&apos;re a great fit for this role.
        </p>
      </div>

      <Textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Write your cover letter here..."
        className="min-h-56 rounded-xl border-border bg-background/50 focus:border-primary px-4 py-3 text-sm"
      />

      <div className="pt-2">
        <Button className="w-full" size="lg" variant="default" type="button">
          Apply Now
        </Button>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function JobApplyPanel() {
  const [coverLetter, setCoverLetter] = React.useState("");

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">
          Cover Letter
        </h3>
      </div>

      <Textarea
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
        placeholder="Write your cover letter here..."
        className="min-h-56 rounded-xl"
      />

      <Button className="mt-4 w-full" size="lg" type="button">
        Apply
      </Button>
    </div>
  );
}

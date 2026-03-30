import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DocumentAttachmentIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface ResumeUploadContainerProps {
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
}

export function ResumeUploadContainer({
  resumeFile,
  setResumeFile,
}: ResumeUploadContainerProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
  };

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Resume</label>
        {resumeFile && (
          <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} />
            File Selected
          </span>
        )}
      </div>

      <input
        id="resume-file-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="sr-only"
      />

      <label
        htmlFor="resume-file-upload"
        className={cn(
          "group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all",
          resumeFile
            ? "border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10"
            : "border-border bg-background/40 hover:border-primary/50 hover:bg-background/60",
        )}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div
            className={cn(
              "rounded-full p-3 transition-colors",
              resumeFile
                ? "bg-emerald-500/20 text-emerald-600"
                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
            )}
          >
            <HugeiconsIcon icon={DocumentAttachmentIcon} size={24} />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              {resumeFile ? "Change file" : "Upload your resume"}
            </p>
            {!resumeFile && (
              <p className="text-xs text-muted-foreground">
                Drag and drop or click to browse
              </p>
            )}
          </div>
        </div>

        {resumeFile && (
          <div className="absolute inset-x-0 bottom-0 translate-y-1/2 flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <span className="rounded-full bg-background border shadow-sm px-3 py-1 text-xs font-medium">
              Click to replace
            </span>
          </div>
        )}
      </label>

      {resumeFile && (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm overflow-hidden">
          <HugeiconsIcon
            icon={DocumentAttachmentIcon}
            size={16}
            className="text-muted-foreground shrink-0"
          />
          <span className="truncate flex-1 font-medium">{resumeFile.name}</span>
          <span className="text-xs text-muted-foreground shrink-0">
            {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
          </span>
        </div>
      )}

      {!resumeFile && (
        <p className="text-xs text-muted-foreground flex justify-between px-1">
          <span>Accepted: PDF, DOC, DOCX</span>
          <span>Max size: 5MB</span>
        </p>
      )}
    </div>
  );
}

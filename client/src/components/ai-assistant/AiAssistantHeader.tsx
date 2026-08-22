"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { BotIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface AiAssistantHeaderProps {
  title: string;
  isLoading: boolean;
}

const AiAssistantHeader = ({ title, isLoading }: AiAssistantHeaderProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10">
        <HugeiconsIcon
          icon={BotIcon}
          strokeWidth={2}
          className="w-5 h-5 text-primary"
        />
      </div>
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p
          className={cn(
            "text-xs",
            isLoading ? "text-green-400" : "text-muted-foreground",
          )}
        >
          {isLoading ? "Typing" : "Active"}
          <span className="ml-1 text-green-500 animate-pulse">●</span>
        </p>
      </div>
    </div>
  );
};

export default AiAssistantHeader;

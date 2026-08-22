"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { BotIcon } from "@hugeicons/core-free-icons";

const AiAssistantWelcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <HugeiconsIcon
          icon={BotIcon}
          strokeWidth={2}
          className="w-8 h-8 text-primary"
        />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Welcome to HireHub Assistant
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">
        I&apos;m here to help you discover relevant roles and opportunities. Ask
        me about jobs, companies, applications, or anything else!
      </p>
    </div>
  );
};

export default AiAssistantWelcome;

"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { BotIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import AiAssistant from "@/components/ai-assistant/AiAssistant";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { brand } from "@/constants/brand";

interface AiAssistantSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerClassName?: string;
}

export function AiAssistantSheet({
  open,
  onOpenChange,
  triggerClassName,
}: AiAssistantSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="md"
          className={triggerClassName}
          aria-label={`Open ${brand.assistant.name}`}
        >
          <HugeiconsIcon icon={BotIcon} strokeWidth={2} className="size-4.5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        title={brand.assistant.fullName}
        className="w-full sm:max-w-md h-full p-0 outline-none"
      >
        <AiAssistant
          className="h-full border-0 rounded-none shadow-none"
          title={brand.assistant.name}
          placeholder="Ask about jobs, companies, or applications..."
          context={[]}
        />
      </SheetContent>
    </Sheet>
  );
}

import { toast } from "sonner";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  MultiplicationSignCircleIcon,
  InformationCircleIcon,
  Alert02Icon,
} from "@hugeicons/core-free-icons";

type ToastIconType = typeof CheckmarkCircle02Icon;

interface ToastOptions {
  type?: "success" | "error" | "info" | "warning";
  title: string;
  description: string;
  duration?: number;
}

const getIconAndColor = (
  type: "success" | "error" | "info" | "warning",
): { icon: ToastIconType; iconColor: string; bgColor: string } => {
  const config = {
    success: {
      icon: CheckmarkCircle02Icon,
      iconColor: "text-green-500",
      bgColor: "bg-background",
    },
    error: {
      icon: MultiplicationSignCircleIcon,
      iconColor: "text-red-500",
      bgColor: "bg-background",
    },
    info: {
      icon: InformationCircleIcon,
      iconColor: "text-blue-500",
      bgColor: "bg-background",
    },
    warning: {
      icon: Alert02Icon,
      iconColor: "text-yellow-500",
      bgColor: "bg-background",
    },
  };

  return config[type];
};

export const showToast = ({
  type = "info",
  title,
  description,
  duration = 3000,
}: ToastOptions) => {
  const { icon, iconColor, bgColor } = getIconAndColor(type);

  toast.custom(
    () => (
      <div
        className={`flex items-start gap-3 ${bgColor} border rounded-lg p-4 shadow-md min-w-[320px] max-w-105`}
      >
        <div className="mt-0.5 shrink-0">
          <HugeiconsIcon
            icon={icon}
            strokeWidth={2}
            className={`h-5 w-5 ${iconColor}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-none">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    ),
    { duration },
  );
};

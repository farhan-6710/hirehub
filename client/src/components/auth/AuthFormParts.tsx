"use client";

import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { slideInItem } from "@/animations";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";

export { staggerContainer as authFormVariants } from "@/animations";

const INPUT_CLASS =
  "w-full px-4 py-2 border rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary bg-card! text-foreground autofill:bg-background! autofill:text-foreground";

export function AuthItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={slideInItem} className={className}>
      {children}
    </motion.div>
  );
}

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  function AuthInput({ id, label, ...props }, ref) {
    return (
      <AuthItem>
        <label htmlFor={id} className="sr-only">{label}</label>
        <input ref={ref} id={id} placeholder={label} className={INPUT_CLASS} {...props} />
      </AuthItem>
    );
  },
);

export function PasswordInput({ id, label, ...props }: AuthInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthItem>
      <label htmlFor={id} className="sr-only">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={label}
          className={`${INPUT_CLASS} pr-10`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <HugeiconsIcon icon={visible ? ViewOffSlashIcon : ViewIcon} className="size-4.5" />
        </button>
      </div>
    </AuthItem>
  );
}

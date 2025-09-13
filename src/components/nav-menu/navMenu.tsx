import { buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

export type NavContentType = {
  label: string;
  icon?: React.ReactElement;
  href: string;
};

/* type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon"; */

type NavMenuPropsType = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof buttonVariants>;

export function NavMenu({ className, children }: NavMenuPropsType) {
  return (
    <nav className={cn("", className)}>
      <ul className="flex items-center gap-2">{children}</ul>
    </nav>
  );
}

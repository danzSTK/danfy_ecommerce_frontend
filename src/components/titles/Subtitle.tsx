import { cn } from "@/lib/utils";
import { JSX } from "react";

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
  as?: Extract<keyof JSX.IntrinsicElements, `p` | `span` | `div`>;
}

const SubtitleComponent = ({
  children,
  className,
  as: Component = "p",
}: SubtitleProps) => {
  return (
    <Component
      className={cn(
        "truncate text-sm text-muted-foreground font-light font-serif",
        className
      )}
    >
      {children}
    </Component>
  );
};

export default SubtitleComponent;

import { cn } from "@/lib/utils";
import React, { JSX } from "react";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
  as?: Extract<keyof JSX.IntrinsicElements, `h${1 | 2 | 3 | 4 | 5 | 6}`>;
} & React.HtmlHTMLAttributes<HTMLHeadingElement>;

const TitleComponent = ({
  children,
  className,
  as: Component = "h2",
  ...props
}: TitleProps) => {
  return (
    <Component
      className={cn(
        `text-base md:text-lg capitalize text-foreground font-bold truncate`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default TitleComponent;

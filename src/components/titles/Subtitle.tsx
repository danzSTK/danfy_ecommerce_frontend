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
      className={`text-sm text-muted-foreground font-light font-serif ${className} truncate
`}
    >
      {children}
    </Component>
  );
};

export default SubtitleComponent;

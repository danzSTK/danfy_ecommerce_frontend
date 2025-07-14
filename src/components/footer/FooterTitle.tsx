import React from "react";

type Props = {
  children: string;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const FooterTitle = ({ children, className, ...others }: Props) => {
  return (
    <h2 className={`${className} text-background font-bold text-2xl mb-4`} {...others}>
      {children}
    </h2>
  );
};

export default FooterTitle;

const CardTitle = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <h4
      className={`text-base capitalize text-foreground font-bold truncate ${className}`}
    >
      {children}
    </h4>
  );
};

export default CardTitle;

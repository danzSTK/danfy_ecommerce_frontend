const CardSub = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <h3
      className={`text-sm text-muted-foreground font-light font-serif ${className} truncate
`}
    >
      {children}
    </h3>
  );
};

export default CardSub;

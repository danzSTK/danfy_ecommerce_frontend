const SectionTitle = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <h2
      className={`sectionTitle relative pl-3 md:pl-5 text-xl md:text-3xl  lg:text-4xl font-bold ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;

type CarouselItemProps = {
  index: number;
  length: number;
  children: React.ReactNode;
};

export function CarouselInfinity({ index, length, children }: CarouselItemProps) {
  const delay = (20 / length) * (length - index) * -1;

  return (
    <li
      className="absolute flex items-center h-24 rounded-md animate-scroll-left"
      style={{
        left: `max(calc(100px * ${length}), 100%)`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </li>
  );
}

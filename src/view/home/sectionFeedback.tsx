"use client";

import CardForFeedBack from "@/components/cards/cardForFeedback";
import CarouselWrapper from "@/components/carousel/carousel";
import SectionTitle from "@/components/titles/SectionTitle";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";

export type Feedback = {
  name: string;
  comment: string;
  userPhoto: string;
  alt?: string;
};

type FeedbackSectionProps = {
  feedbacks: Feedback[];
};

function groupInChunks<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const SectionFeedback = ({ feedbacks }: FeedbackSectionProps) => {
  const isMobile = useIsMobile();
  const chunkSize = isMobile ? 1 : 3;
  const feedbacksGrouped = groupInChunks<Feedback>(feedbacks, chunkSize);

  const slides: ReactNode[] = feedbacksGrouped.map((group, index) => (
    <div
      key={index}
      className="h-full items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4"
    >
      {group.map((feedback, index) => (
        <CardForFeedBack key={index} feedback={feedback} />
      ))}
    </div>
  ));
  return (
    // TODO: corrigir esse  "teste" achar uma forma dinamica de reutilizar esse carousel mudando apenas a propriedade h para auto
    <section className="container">
      <SectionTitle className="mb-8">Feedback dos usuários</SectionTitle>
      <CarouselWrapper
        autoplay={false}
        sliders={slides}
        className="overflow-hidden pb-10"
        variant="default"
        teste={true}
      />
    </section>
  );
};

export default SectionFeedback;

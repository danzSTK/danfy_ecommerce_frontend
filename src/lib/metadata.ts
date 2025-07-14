import type { Metadata } from "next";

import defaultShareImage from "../../public/images/logos-parceiras/Logo_NIKE.svg";

export const defaultMetadata: Metadata = {
  metadataBase: new URL("https://danfy.vercel.app"),
  title: {
    default: "Danfy | Moda com autenticidade",
    template: "%s | Danfy",
  },
  description:
    "Confira a nova coleção de roupas da Danfy. Roupas com estilo, conforto e qualidade",
  keywords: ["moda", "roupas", "ecommerce", "danfy"],
  authors: [
    {
      name: "Daniel Felix",
      url: "https://github.com/danzSTK",
    },
  ],
  creator: "Daniel Felix",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Danfy",
    title: "Danfy | Moda com autenticidade",
    description:
      "Confira a nova coleção de roupas da Danfy. Roupas com estilo, conforto e qualidade",
    url: "http://localhost:3000",
    images: [
      {
        url: defaultShareImage.src,
        width: 1200,
        height: 630,
        alt: "imagem de destaque do Danfy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danfy | Moda com autenticidade",
    description:
      "Confira a nova coleção de roupas da Danfy. Roupas com estilo, conforto e qualidade",
    images: [defaultShareImage.src],
    creator: "@danielFelix",
  },
  icons: {
    icon: defaultShareImage.src,
  },
};

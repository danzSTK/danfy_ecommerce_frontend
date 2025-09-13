"use client";

import { ImageWithFallback } from "@/components/fallbacks/imageWithFallback";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useGetOneProductQuery } from "@/services/routes/products";
import { useParams } from "next/navigation";
import {
  MessageSquareText,
  Repeat,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Truck,
} from "lucide-react";
import SectionTitle from "@/components/titles/SectionTitle";
import React from "react";
import { useCart } from "@/hooks/useCart";

const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export default function ProductDetailsSection() {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, error, isLoading } = useGetOneProductQuery(productId);
  const { addProduct } = useCart();
  const [selectedVariantId, setSelectedVariantId] = React.useState<
    string | null
  >(null);

  const handleAddToCart = () => {
    if (!product) return;

    const variantToAdd =
      product.variants.find((v) => v.id === selectedVariantId) ||
      product.variants[0]; // Adiciona a primeira variante se nenhuma estiver selecionada

    const data = {
      productId: product.id,
      variantId: variantToAdd.id,
      quantity: 1,
    };

    if (variantToAdd) {
      addProduct(data);
    }
  };

  // TODO
  const currentVariant = selectedVariantId
    ? product?.variants?.find((v) => v.id === selectedVariantId)
    : null; // Mudança: null permite voltar ao padrão

  const mainImage =
    currentVariant?.imageUrl ||
    product?.defaultImageUrl ||
    "/images/placeholder.png";

  // Preço dinâmico baseado na variante ou preço base
  const currentPrice = currentVariant?.price || product?.basePrice || 0;

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  // TODO: Melhorar tratamento de erro
  if (error || !product) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-bold text-red-500">Ops! Algo deu errado</h2>
        <p className="text-gray-600">Não foi possível carregar o produto</p>
      </div>
    );
  }

  return (
    <div className="container">
      <section className=" mt-24 mb-5 overflow-y-hidden">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Breadcrumb */}

          {/* Left Column - Images */}
          <div className="flex gap-4 mr-7">
            {/* Carousel vertical para thumbnails das variantes */}
            <div className="w-24">
              <Carousel
                orientation="vertical"
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full max-w-24"
              >
                <CarouselContent className="-mt-1 h-[380px]">
                  {/* Botão para voltar ao padrão */}
                  <CarouselItem className="pt-1 basis-auto">
                    <div className="p-1">
                      <button
                        onClick={() => setSelectedVariantId(null)}
                        className={cn(
                          "w-20 h-20 rounded-md overflow-hidden border-2 transition-all relative",
                          !selectedVariantId
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                        title="Imagem padrão"
                      >
                        <ImageWithFallback
                          src={product.defaultImageUrl}
                          alt={`${product.name} - Padrão`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full hover:opacity-80 transition-opacity"
                        />
                        {!selectedVariantId && (
                          <div className="absolute inset-0 bg-primary/10 flex items-end justify-center pb-1">
                            <span className="text-xs font-medium bg-primary/90 text-primary-foreground px-1 rounded">
                              Ativo
                            </span>
                          </div>
                        )}
                      </button>
                    </div>
                  </CarouselItem>

                  {/* Variantes */}
                  {product.variants?.map((variant) => (
                    <CarouselItem key={variant.id} className="pt-1 basis-auto">
                      <div className="p-1">
                        <button
                          onClick={() => setSelectedVariantId(variant.id)}
                          className={cn(
                            "w-20 h-20 rounded-md overflow-hidden border-2 transition-all relative",
                            selectedVariantId === variant.id
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                          title={variant.color}
                        >
                          <ImageWithFallback
                            src={variant.imageUrl}
                            alt={`${product.name} - ${variant.color}`}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full hover:opacity-80 transition-opacity"
                          />
                          {selectedVariantId === variant.id && (
                            <div className="absolute inset-0 bg-primary/10 flex items-end justify-center pb-1">
                              <span className="text-xs font-medium bg-primary/90 text-primary-foreground px-1 rounded">
                                Ativo
                              </span>
                            </div>
                          )}
                        </button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Setas de navegação vertical - só aparecem quando há mais de 4 itens */}
                {(product.variants?.length || 0) > 3 && (
                  <>
                    <CarouselPrevious className="left-1/2 -translate-x-1/2 -top-8 h-6 w-6" />
                    <CarouselNext className="left-1/2 -translate-x-1/2 -bottom-8 h-6 w-6" />
                  </>
                )}
              </Carousel>
            </div>
            <div className="flex w-full lg:w-96 rounded-lg overflow-hidden min-h-full md:min-h-auto">
              <ImageWithFallback
                src={mainImage}
                alt={
                  product.name +
                  (currentVariant ? ` - ${currentVariant.color}` : "")
                }
                width={600}
                height={500}
                className="rounded-lg object-cover transition-all duration-300"
              />
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:w-1/2 space-y-6 mt-5">
            <div className="space-y-4">
              <CardTitle className="text-3xl font-bold">
                {product.name}
              </CardTitle>

              {/* Mostrar cor da variante selecionada */}
              {currentVariant && (
                <p className="text-sm text-muted-foreground">
                  Cor:{" "}
                  <span className="font-medium text-foreground">
                    {currentVariant.color}
                  </span>
                </p>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-yellow-400"
                        /* i < 5 ? "opacity-100" : "opacity-30" */
                      )}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm">5.0</span>
                </div>
                <span className="flex gap-2 text-sm text-muted-foreground">
                  <MessageSquareText className="size-5" />
                  120 Comentarios
                </span>
              </div>
            </div>

            <Separator />

            {/* Size Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Selecionar Tamanho</h3>
                  <Button variant="link" className="text-sm">
                    Guia de Tamanhos →
                  </Button>
                </div>

                <RadioGroup defaultValue={SIZES[0]} className="flex gap-3">
                  {SIZES.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer hidden"
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full border",
                          "cursor-pointer transition-all",
                          "peer-checked:bg-primary peer-checked:text-primary-foreground",
                          "hover:bg-muted"
                        )}
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Color Selection - Carousel horizontal para cores */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Cores Disponíveis</h3>
                  <button
                    onClick={() => setSelectedVariantId(null)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Voltar ao padrão
                  </button>
                </div>

                {/* Carousel horizontal */}
                <Carousel
                  opts={{
                    align: "start",
                    loop: false,
                    slidesToScroll: 1,
                    containScroll: "trimSnaps",
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-1">
                    {/* Botão padrão */}
                    <CarouselItem className="pl-1 basis-auto">
                      <div className="p-1">
                        <button
                          onClick={() => setSelectedVariantId(null)}
                          className={cn(
                            "relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all",
                            !selectedVariantId
                              ? "border-primary ring-2 ring-primary/20 scale-105"
                              : "border-gray-200 hover:border-gray-300 hover:scale-105"
                          )}
                          title="Padrão"
                        >
                          <ImageWithFallback
                            src={product.defaultImageUrl}
                            alt="Padrão"
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <span className="text-xs text-white font-medium bg-black/70 px-1 rounded">
                              Original
                            </span>
                          </div>
                        </button>
                      </div>
                    </CarouselItem>

                    {/* Variantes */}
                    {product.variants.map((variant) => (
                      <CarouselItem
                        key={variant.id}
                        className="pl-1 basis-auto"
                      >
                        <div className="p-1">
                          <button
                            onClick={() => setSelectedVariantId(variant.id)}
                            className={cn(
                              "relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all",
                              selectedVariantId === variant.id
                                ? "border-primary ring-2 ring-primary/20 scale-105"
                                : "border-gray-200 hover:border-gray-300 hover:scale-105"
                            )}
                            title={variant.color}
                          >
                            <ImageWithFallback
                              src={variant.imageUrl}
                              alt={variant.color}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                            {/* Indicador de estoque */}
                            {variant.stock === 0 && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-xs text-white font-medium">
                                  Esgotado
                                </span>
                              </div>
                            )}
                          </button>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Setas de navegação horizontal - só aparecem quando há mais de 3 itens */}
                  {(product.variants?.length || 0) > 2 && (
                    <>
                      <CarouselPrevious className="hidden sm:flex -left-12" />
                      <CarouselNext className="hidden sm:flex -right-12" />
                    </>
                  )}
                </Carousel>
              </div>
            )}

            {/* Stock info for selected variant */}

            {/*TODO: Mostrar informação de estoque da variante selecionada */}
            {currentVariant && (
              <div className="text-sm">
                {currentVariant.stock > 0 ? (
                  <span className="text-green-600">
                    ✓ {currentVariant.stock} unidades em estoque
                  </span>
                ) : (
                  <span className="text-red-600">✗ Fora de estoque</span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-1 items-center gap-4">
              <data
                value={currentPrice}
                className="text-3xl font-semibold inline-flex flex-col text-primary "
              >
                <span>
                  R${" "}
                  {currentPrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <span className="text-xs text-muted-foreground">
                  Valor à vista no PIX
                  {currentVariant && (
                    <span className="block">
                      Variante: {currentVariant.color}
                    </span>
                  )}
                </span>
              </data>
              <Button
                className="flex-1"
                size="lg"
                disabled={
                  !product.isActive ||
                  !currentVariant ||
                  currentVariant.stock === 0
                }
                onClick={handleAddToCart}
              >
                {product.isActive &&
                currentVariant &&
                currentVariant.stock > 0 ? (
                  <span className="flex items-center gap-2">
                    Adicionar ao Carrinho
                    <ShoppingCart />
                  </span>
                ) : (
                  "Fora de Estoque"
                )}
              </Button>
            </div>

            <Separator />

            {/* Features */}
            <ul className="grid grid-cols-2 gap-4 pt-6">
              <li className="p-4 flex items-center gap-3">
                <span className="text-muted-foreground">
                  <ShieldCheck />
                </span>
                <span className="text-sm">Pagamento Seguro</span>
              </li>
              <li className="p-4 flex items-center gap-3">
                <span className="text-muted-foreground">
                  <Shirt />
                </span>
                <span className="text-sm">Tamanhos e ajustes</span>
              </li>
              <li className="p-4 flex items-center gap-3">
                <span className="text-muted-foreground">
                  <Truck />
                </span>
                <span className="text-sm">Frete Grátis</span>
              </li>
              <li className="p-4 flex items-center gap-3">
                <span className="text-muted-foreground">
                  <Repeat />
                </span>
                <span className="text-sm">Devolução Grátis</span>
              </li>
            </ul>

            {/* Description */}
          </div>
        </div>
      </section>
      <section className=" space-y-3">
        <SectionTitle>Descrição do produto</SectionTitle>
        <div className="text-muted-foreground max-w-none">
          <p>{product.description}</p>
        </div>
      </section>
    </div>
  );
}

function ProductDetailsSkeleton() {
  return (
    <section className="container px-4 py-10 md:py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="flex gap-4 mt-4">
            <Skeleton className="w-20 h-20 rounded-md" />
            <Skeleton className="w-20 h-20 rounded-md" />
            <Skeleton className="w-20 h-20 rounded-md" />
          </div>
        </div>

        <div className="lg:w-1/2 space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Separator />
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <div className="flex gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="w-10 h-10 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

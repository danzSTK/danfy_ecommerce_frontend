"use client";

import ProductGrid from "@/components/sections/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOneCategoryQuery } from "@/services/routes/categories";
import { useGetProductsByCategoryQuery } from "@/services/routes/products";
import { useParams } from "next/navigation";
import MuiSkeleton from "@mui/material/Skeleton";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CategoryList() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedFilterList, setSelectedFilterList] = useState<
    "new" | "recommended"
  >("new");
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(slug);
  const {
    data: category,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useGetOneCategoryQuery(slug);

  const onSelectFilterList = (filter: "new" | "recommended") => {
    setSelectedFilterList(filter);
  };
  return (
    <>
      {isLoading && loadingCategory && (
        <section className="container">
          <header className="flex justify-between my-10">
            <Skeleton className="w-[200px] h-6" />
            <ul className="flex gap-6">
              <li>
                <Skeleton className="w-[50px] h-6" />
              </li>
              <li>
                <Skeleton className="w-[100px] h-6" />
              </li>
            </ul>
          </header>
          <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="w-[324px] h-[380px]" />
            ))}
          </article>
        </section>
      )}
      {error && errorCategory && <div>Desculpe ocorreu um erro inesperado</div>}

      {products && category && (
        <section className="container">
          <header className="flex justify-between font-serif my-10">
            <h2 className="font-bold font-sans text-xl capitalize">
              Roupas {category.name}
            </h2>
            <ul className="flex gap-6">
              <li>
                <button
                  className={cn(
                    `font-medium text-lg transition-colors hover:text-primary cursor-pointer`,
                    selectedFilterList === "new" && "text-chart-3"
                  )}
                  type="button"
                  onClick={() => onSelectFilterList("new")}
                >
                  New
                </button>
              </li>
              <li>
                <button
                  className={cn(
                    `font-medium text-lg transition-colors hover:text-primary cursor-pointer`,
                    selectedFilterList === "recommended" && "text-chart-3"
                  )}
                  type="button"
                  onClick={() => onSelectFilterList("recommended")}
                >
                  Recommended
                </button>
              </li>
            </ul>
          </header>
          <ProductGrid products={products} />
        </section>
      )}
    </>
  );
}

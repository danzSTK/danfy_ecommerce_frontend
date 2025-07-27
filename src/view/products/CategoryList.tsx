"use client";

import ProductGrid from "@/components/sections/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOneCategoryQuery } from "@/services/routes/categories";
import { useGetProductsByCategoryQuery } from "@/services/routes/products";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import CategoryFilter from "@/components/sidebar/filtersSidebar";

const LoadingSkeleton = () => (
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
        <div key={index} className="flex flex-col gap-4">
          <Skeleton className="w-full h-[280px]" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      ))}
    </article>
  </section>
);

export const ErrorState = ({ message = "Desculpe, ocorreu um erro inesperado" }) => (
  <div className="container flex flex-col items-center justify-center min-h-[400px]">
    <svg
      className="w-16 h-16 text-gray-400 mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
    <p className="text-lg font-medium text-gray-600">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
    >
      Tentar novamente
    </button>
  </div>
);

export default function CategoryList() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedFilterList, setSelectedFilterList] = useState<
    "new" | "recommended"
  >("new");
  const [selectedCategory, setSelectedCategory] = useState(slug);
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(selectedCategory);
  const {
    data: category,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useGetOneCategoryQuery(slug);

  const onSelectFilterList = (filter: "new" | "recommended") => {
    setSelectedFilterList(filter);
  };

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
  return (
    <>
      {isLoading || (loadingCategory && <LoadingSkeleton />)}
      {(error || errorCategory) && (
        <ErrorState message="Não foi possível carregar os produtos" />
      )}
      {!error && !errorCategory && products && category && (
        <section className=" flex w-full">
          <CategoryFilter
            className="ml-7"
            categories={category.children}
            onSelectCategory={(categoryId) => setSelectedCategory(categoryId)}
            slug={slug}
          />
          <article className="container">
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
          </article>
        </section>
      )}
    </>
  );
}

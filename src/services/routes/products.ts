/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductResponseInterface } from "@/interfaces/Product";
import { api } from "../api";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductResponseInterface[], void>({
      query: () => "/products",
    }),
    getProductsByCategory: builder.query<ProductResponseInterface[], string>({
      query: (categoryId) => ({
        url: "/products",
        params: { categoryId },
      }),
    }),
    getOneProduct: builder.query<ProductResponseInterface, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
      async onQueryStarted(queryArgument, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("lastViewedProduct", JSON.stringify(data));
        } catch (error: any) {
          if (error?.error?.status === 404) {
            // Handle 404 error specifically
            console.log("Product not found");
            throw new Error("Product not found", { cause: error });
          }

          if (error?.error?.status === 401) {
            // Handle 401 error specifically
            console.log("Unauthorized access - perhaps redirect to login");
            throw new Error("Unauthorized access", { cause: error });
          }

          // Handle other errors
          console.log("An unexpected error occurred", error);
          throw new Error("An unexpected error occurred", { cause: error });
        }
      },
      keepUnusedDataFor: 120, // tempo em segundos que os dados ficam em cache após não serem mais usados
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetOneProductQuery,
} = productsApi;

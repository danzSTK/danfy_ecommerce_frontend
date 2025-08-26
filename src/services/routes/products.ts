import { ProductResponseInterface } from "@/interfaces/product";
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
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetOneProductQuery,
} = productsApi;

import { api } from "../api";

interface GetCategoryReponseInterface {
  id: string;
  name: string;
  children?: { name: string; id: string }[];
  parent?: { name: string; id: string }[];
}

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<GetCategoryReponseInterface[], void>({
      query: () => "/categories",
    }),
    getOneCategory: builder.query<GetCategoryReponseInterface, string>({
      query: (categoryId) => `/categories/${categoryId}`,
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetOneCategoryQuery } =
  categoriesApi;

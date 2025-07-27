import { api } from "../api";

interface GetCategoryReponseInterface {
  id: string;
  name: string;
  children: { name: string; id: string }[];
  parent: { name: string; id: string }[];
}

interface GetAllCategoriesParams {
  name?: string;
}

export const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      GetCategoryReponseInterface[],
      GetAllCategoriesParams
    >({
      query: (params) => ({
        url: "/categories",
        params,
      }),
    }),
    getOneCategory: builder.query<GetCategoryReponseInterface, string>({
      query: (categoryId) => `/categories/${categoryId}`,
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetOneCategoryQuery } =
  categoriesApi;

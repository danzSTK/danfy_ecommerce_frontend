import {
  IAddress,
  ICepResponse,
  ICreateAddressRequest,
  IUpdateAddressRequest,
} from "@/interfaces/Address.interface";
import { api } from "../api";

export const AddresApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAddressByCep: builder.query<ICepResponse, string>({
      query: (cep) => `address/cep/${cep}`,
    }),

    getAllAddress: builder.query<IAddress[], void>({
      query: () => `/address`,
      providesTags: ["Address"],
    }),

    getOneAddress: builder.query<IAddress, number>({
      query: (id) => `/address/${id}`,
      providesTags: ["Address"],
    }),

    createAddress: builder.mutation<IAddress, ICreateAddressRequest>({
      query: (address) => ({
        url: `/address/create`,
        method: "POST",

        body: address,
      }),
      invalidatesTags: ["Address"],
    }),

    updateAddress: builder.mutation<IAddress, IUpdateAddressRequest>({
      query: ({ id, ...address }) => ({
        url: `/address/${id}`,
        method: "PATCH",
        body: address,
      }),
      invalidatesTags: ["Address"],
    }),

    deleteAddress: builder.mutation<void, number>({
      query: (id) => ({
        url: `/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAddressByCepQuery,
  useGetAllAddressQuery,
  useGetOneAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = AddresApi;

import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./slices/exampleSlice";
import { api } from "@/services/api";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    example: exampleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

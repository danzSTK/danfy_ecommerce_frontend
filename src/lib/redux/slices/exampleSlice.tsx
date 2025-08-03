import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ExampleState = {
  count: number;
};

const initialState: ExampleState = {
  count: 0,
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { increment, setCount } = exampleSlice.actions;
export default exampleSlice.reducer;

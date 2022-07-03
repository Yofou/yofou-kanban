import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: [] as any[],
  reducers: {
    set: (_, payload: PayloadAction<any[]>) => payload.payload,
  },
});

export const { set } = boardSlice.actions;
export default boardSlice.reducer;

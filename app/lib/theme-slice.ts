import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "~/cookies";

export const theme = createSlice({
  name: "theme-slice",
  initialState: null as ThemeType | null,
  reducers: {
    set: (_, { payload }: PayloadAction<ThemeType>) => {
      return payload;
    },
  },
});

export const { set } = theme.actions;

export default theme.reducer;

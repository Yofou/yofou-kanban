import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth-slice",
  initialState: "login",
  reducers: {
    set: (_, { payload }: PayloadAction<string>) => {
      return payload;
    },
  },
});

export const { set } = authSlice.actions;
export default authSlice.reducer;

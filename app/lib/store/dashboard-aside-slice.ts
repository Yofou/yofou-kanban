import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const dashboardAside = createSlice({
  name: "dashboard-aside",
  initialState: true,
  reducers: {
    set: (_, { payload }: PayloadAction<boolean>) => {
      return payload;
    },
  },
});

export const { set } = dashboardAside.actions;

export default dashboardAside.reducer;
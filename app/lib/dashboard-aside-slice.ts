import { createSlice } from "@reduxjs/toolkit";

const dashboardAside = createSlice({
  name: "dashboard-aside",
  initialState: false,
  reducers: {
    toggle: (state) => {
      return !state;
    },
  },
});

export const { toggle } = dashboardAside.actions;

export default dashboardAside.reducer;

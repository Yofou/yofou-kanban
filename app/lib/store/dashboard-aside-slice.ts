import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const dashboardAside = createSlice({
	name: "dashboard-aside",
	initialState: { staggered: true, value: true },
	reducers: {
		setValue: (state, { payload }: PayloadAction<boolean>) => {
			state.value = payload;
		},
		setStaggered: (state, { payload }: PayloadAction<boolean>) => {
			state.staggered = payload;
		},
	},
});

export const { setValue, setStaggered } = dashboardAside.actions;

export default dashboardAside.reducer;

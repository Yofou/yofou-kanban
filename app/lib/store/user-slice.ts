import { User } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {} as Omit<User, "password">,
  reducers: {
    set: (_, { payload }: PayloadAction<Omit<User, "password">>) => payload,
  },
});

export const { set } = user.actions;
export default user.reducer;

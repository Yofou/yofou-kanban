import { Boards, Columns, Task } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Board = Boards & {
  columns: (Columns & {
    task: Task[];
  })[];
};

const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [] as Board[],
    selected: null as Board | null,
  },
  reducers: {
    set: (state, payload: PayloadAction<Board[]>) => {
      state.boards = payload.payload;
    },
    select: (state, payload: PayloadAction<Board>) => {
      state.selected = payload.payload;
    },
  },
});

export const { set, select } = boardSlice.actions;
export default boardSlice.reducer;

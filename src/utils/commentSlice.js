import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "commentsList",
  initialState: {
    comments: [],
  },
  reducers: {
    addComment: (state, { payload }) => {
      state?.comments.splice(20, 1);
      state?.comments.unshift({ ...payload });
    },
  },
});

export const { addComment } = commentSlice.actions;
export default commentSlice.reducer;

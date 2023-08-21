import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQueries: {},
  },
  reducers: {
    handleInputChange: (state, { payload }) => {
      state.searchQueries = { ...state.searchQueries, ...payload };
    },
  },
});

export const { handleInputChange } = searchSlice.actions;
export default searchSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    sideBarOpen: true,
    searchInput: "",
  },
  reducers: {
    toggle: (state) => {
      state.sideBarOpen = !state.sideBarOpen;
    },

    handleSearchInput: (state, { payload }) => {
      state.searchInput = payload;
    },
  },
});

export const { toggle, handleSearchInput } = appSlice.actions;
export default appSlice.reducer;

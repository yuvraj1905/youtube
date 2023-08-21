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
    toggleForWatchPage: (state, { payload }) => {
      console.log(payload, "payload");
      state.sideBarOpen = payload;
    },

    handleSearchInput: (state, { payload }) => {
      state.searchInput = payload;
    },
  },
});

export const { toggle, toggleForWatchPage, handleSearchInput } =
  appSlice.actions;
export default appSlice.reducer;

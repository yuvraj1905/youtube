import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
  name: "library",
  initialState: {
    likedVideos: localStorage.getItem("liked")
      ? JSON.parse(localStorage.getItem("liked"))
      : [],
    watchLater: localStorage.getItem("watchLater")
      ? JSON.parse(localStorage.getItem("watchLater"))
      : [],
    history: localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history"))
      : [],
  },
  reducers: {
    addToLikedVideos: (state, { payload }) => {
      state.likedVideos = [...state.likedVideos, { ...payload }];
      localStorage.setItem("liked", JSON.stringify([...state.likedVideos]));
    },
    addToWatchLaterVideos: (state, { payload }) => {
      state.watchLater = [...state.watchLater, { ...payload }];
      localStorage.setItem("watchLater", JSON.stringify([...state.watchLater]));
    },
    addToHistory: (state, { payload }) => {
      if (!state?.history?.find(({ id }) => id === payload.id)) {
        state.history = [...state.history, { ...payload }];
        localStorage.setItem("history", JSON.stringify([...state.history]));
      }
    },

    removeFromLikedVideos: (state, { payload }) => {
      const updatedData = state.likedVideos.filter((vid) => vid.id !== payload);
      state.likedVideos = [...updatedData];
      localStorage.setItem("liked", JSON.stringify(updatedData));
    },
    removeFromWatchLaterVideos: (state, { payload }) => {
      const updatedData = state.watchLater.filter((vid) => vid.id !== payload);
      state.watchLater = [...updatedData];
      localStorage.setItem("watchLater", JSON.stringify(updatedData));
    },
    clearHistory: (state) => {
      state.history = [];
      localStorage.removeItem("history");
    },
  },
});

export const {
  addToHistory,
  addToWatchLaterVideos,
  addToLikedVideos,
  removeFromLikedVideos,
  clearHistory,
  removeFromWatchLaterVideos,
} = librarySlice.actions;
export default librarySlice.reducer;

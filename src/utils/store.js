import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchReducer from "./searchSlice";
import libraryReducer from "./librarySlice";
import commentReducer from "./commentSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchReducer,
    commentsList: commentReducer,
    library: libraryReducer,
  },
});

export default store;

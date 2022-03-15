import { configureStore } from "@reduxjs/toolkit";
import items from "./itemSlice";

const store = configureStore({
  reducer: {
    items,
  },
});

export default store;

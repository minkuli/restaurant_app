import { configureStore } from "@reduxjs/toolkit";
import staffReducer from "./staff";

const store = configureStore({
  reducer: {
    staff: staffReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const stroe = configureStore({
  reducer: {
    user: userReducer,
  },
});

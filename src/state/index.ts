import { configureStore } from "@reduxjs/toolkit";
import { reducer as notificationsReducer } from "reapop";
import userReducer from "./user/userReducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    notifications: notificationsReducer(),
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

import { configureStore } from "@reduxjs/toolkit";
import users from "./features/user.slice"
import templates from "./features/template.slice"
import { mainApi } from "../service/api/api";

export const store = configureStore({
  reducer: {
    users,
    templates,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

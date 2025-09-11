import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "./slices/templateSlices";

export const store = configureStore({
  reducer: {
    templates: templateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

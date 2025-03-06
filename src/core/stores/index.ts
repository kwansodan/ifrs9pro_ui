import { combineReducers, configureStore } from "@reduxjs/toolkit";
import system from "./slices/system_slice";

const reducer = combineReducers({
  system,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

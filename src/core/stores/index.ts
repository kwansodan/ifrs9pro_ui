import { combineReducers, configureStore } from "@reduxjs/toolkit";
import system from "./slices/system_slice";
import ingestion from "./slices/ingestion_slice";

const reducer = combineReducers({
  system,
  ingestion,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

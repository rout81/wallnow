import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { photosApi } from "../services/photos";

const reducer = combineReducers({
  [photosApi.reducerPath]: photosApi.reducer,
});

export const store = configureStore({
  reducer,
});

setupListeners(store.dispatch);

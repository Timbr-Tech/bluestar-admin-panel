/* eslint-disable */
import authSlice from "./slices/authSlice";
import databaseSlice from "./slices/databaseSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice,
    database: databaseSlice,
  },
});

export default store;

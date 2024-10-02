/* eslint-disable */
import attendanceSlice from "./slices/attendanceSlice";
import authSlice from "./slices/authSlice";
import bookingSlice from "./slices/bookingSlice";
import databaseSlice from "./slices/databaseSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice,
    database: databaseSlice,
    booking: bookingSlice,
    attendance: attendanceSlice,
  },
});

export default store;

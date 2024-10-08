/* eslint-disable */

import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../utils/configureAxios";
import { notification } from "antd";
import { setIsAddEditDrawerClose } from "../redux/slices/bookingSlice";

export const addNewBooking = createAsyncThunk(
  "booking/addNewBooking",
  async (body: any, { dispatch }) => {
    console.log("body", body);
    const response = await apiClient.post("/booking", body);
    if (response.status === 201) {
      notification.success({
        message: "Success",
        description: "New Booking added successfully",
      });
      dispatch(setIsAddEditDrawerClose());

      return response.data;
    }
  }
);

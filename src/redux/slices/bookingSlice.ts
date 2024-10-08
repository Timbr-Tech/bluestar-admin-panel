/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../utils/configureAxios";

const initialState = {
  isAddEditDrawerOpen: false,
  currentSelectedBooking: {} as any, // as Ibooking later
  bookings: [],
  filters: {
    status: "",
    search: "",
  },
  isEditingBooking: true,
  bookingStates: { status: "idle", loading: false, error: "" },
  pagination: {
    total: 0,
    page: 0,
    limit: 10,
  },
};

export const getBookings = createAsyncThunk(
  "booking/getBookings",
  async (params: any) => {
    const response = await apiClient.get("/booking", { params });
    return response.data;
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingFilter: (state, action: PayloadAction<any | {}>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setIsAddEditDrawerOpen: (state) => {
      state.isAddEditDrawerOpen = true;
    },
    setIsEditingBooking: (state, action: PayloadAction<boolean>) => {
      state.isEditingBooking = action.payload;
    },
    setIsAddEditDrawerClose: (state) => {
      state.isAddEditDrawerOpen = false;
    },
    setCurrentSelectedBooking: (state, action: PayloadAction<any | {}>) => {
      state.currentSelectedBooking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create a New Vehicle Group
      .addCase(getBookings.pending, (state) => {
        state.bookingStates.status = "loading";
        state.bookingStates.loading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.bookingStates.status = "succeeded";
        state.bookingStates.loading = false;
        state.bookingStates.error = "";
        state.bookings = action.payload?.data as any;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          limit: action.payload.limit,
        };
      })
      .addCase(getBookings.rejected, (state) => {
        state.bookingStates.status = "failed";
        state.bookingStates.loading = false;
        state.bookingStates.error = "Error";
      });
  },
});
export const { actions, reducer } = bookingSlice;
export const {
  setIsAddEditDrawerOpen,
  setIsAddEditDrawerClose,
  setCurrentSelectedBooking,
  setBookingFilter,
  setIsEditingBooking,
} = actions;
export default bookingSlice.reducer;

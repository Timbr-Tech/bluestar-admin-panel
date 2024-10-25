/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../utils/configureAxios";
import { notification } from "antd";

const initialState = {
  isAddEditDrawerOpen: false,
  currentSelectedBooking: {} as any, // as Ibooking later
  bookings: [],
  filters: {
    status: undefined,
    search: undefined,
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
export const getSingleBookings = createAsyncThunk(
  "booking/getSingleBookings",
  async (params: any) => {
    const response = await apiClient.get("/booking", { params });
    return response.data;
  }
);
export const deleteBooking = createAsyncThunk(
  "booking/deleteBooking",
  async (params: any, { dispatch, getState }: any) => {
    const { booking } = getState();
    const response = await apiClient.delete(`/booking/${params.id}`);
    if (response.status === 200) {
      dispatch(setCurrentSelectedBooking({}));
      notification.success({
        message: "Success",
        description: "Booking deleted successfully",
      });
      const payload = {
        bookings: booking?.bookings?.filter(
          (each: any) => each._id !== params.id
        ),
      };

      dispatch(setBookings(payload));
    }
  }
);
export const addNewBooking = createAsyncThunk(
  "booking/addNewBooking",
  async (body: any, { dispatch }: any) => {
    const response = await apiClient.post("/booking", body);
    if (response.status === 201) {
      dispatch(setCurrentSelectedBooking({}));
      notification.success({
        message: "Success",
        description: "New Booking added successfully",
      });
      console.log("CLOSE");
      dispatch(setIsAddEditDrawerClose());
      dispatch(getBookings({ page: 1, search: "", limit: 10 }));
      return response.data;
    }
  }
);
export const updateBooking = createAsyncThunk(
  "booking/updateBooking",
  async (body: any, { dispatch }: any) => {
    const response = await apiClient.patch(`/booking/${body.id}`, body);
    if (response.status === 200) {
      dispatch(setCurrentSelectedBooking({}));
      notification.success({
        message: "Success",
        description: "Booking updated successfully",
      });
      dispatch(setIsAddEditDrawerClose());
      dispatch(getBookings({}));
      return response.data;
    }
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
    setBookings: (state, action: PayloadAction<any | {}>) => {
      return {
        ...state,
        bookings: action?.payload?.bookings,
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
      // get bookings
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
      })
      // single booking
      .addCase(getSingleBookings.pending, (state) => {
        state.bookingStates.status = "loading";
        state.bookingStates.loading = true;
      })
      .addCase(getSingleBookings.fulfilled, (state, action) => {
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
      .addCase(getSingleBookings.rejected, (state) => {
        state.bookingStates.status = "failed";
        state.bookingStates.loading = false;
        state.bookingStates.error = "Error";
      })
      // add new bookimg

      .addCase(addNewBooking.pending, (state) => {
        state.bookingStates.status = "loading";
        state.bookingStates.loading = true;
        state.bookingStates.error = "";
      })
      .addCase(addNewBooking.fulfilled, (state) => {
        state.bookingStates.status = "succeeded";
        state.bookingStates.loading = false;
        state.bookingStates.error = "";
      })
      .addCase(addNewBooking.rejected, (state) => {
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
  setBookings,
  setIsEditingBooking,
} = actions;
export default bookingSlice.reducer;

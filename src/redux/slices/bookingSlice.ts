/* eslint-disable */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface IBooking {
//   bookingId?: string;
//   customer?:string
//   vehicleGroup:
// }
const initialState = {
  isAddEditDrawerOpen: false,
  currentSelectedBooking: {} as any, // as Ibooking later
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setIsAddEditDrawerOpen: (state) => {
      state.isAddEditDrawerOpen = true;
    },
    setIsAddEditDrawerClose: (state) => {
      state.isAddEditDrawerOpen = false;
    },
    setCurrentSelectedBooking: (state, action: PayloadAction<any | {}>) => {
      state.currentSelectedBooking = action.payload;
    },
  },
});
export const { actions, reducer } = bookingSlice;
export const {
  setIsAddEditDrawerOpen,
  setIsAddEditDrawerClose,
  setCurrentSelectedBooking,
} = actions;
export default bookingSlice.reducer;

/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isViewDrawerOpen: false,
  duties: [],
  filters: {
    status: "",
    search: "",
  },
  currentSelectedDuties: {},
  dutiesState: { status: "idle", loading: false, error: "" },
  pagination: {
    total: 0,
    page: 0,
    limit: 10,
  },
};

export const getDuties = createAsyncThunk(
  "duties/getDuties",
  async (params: any) => {
    // const response = await apiClient.get("/auth/admin/login", { params });
    // return response.data;

    return {
      total: 10,
      page: 1,
      limit: 10,
      data: [
        {
          _id: "670bc8047ee5c8eb784ae10e",
          customBookingId: "hkhekhewkjw",
          customerId: {
            _id: "66de14c441dbbf838fb9c329",
            name: "Pratham",
          },
          bookedBy: {
            name: "Arunava Modak 2",
            phoneNumber: "1234567890",
            email: "a@gamil.com",
          },
          passengers: [
            {
              name: "Danish Bhai",
              phone: 1234567890,
            },
          ],
          vehicleGroupId: {
            _id: "66dd5588f99ce9a75770a2f0",
            name: "new 33445",
          },
          dutyTypeId: {
            _id: "66f191ca76e4cc284bdf23c7",
            name: "hello world 1",
          },
          assignAlternateVehicles: false,
          reportingAddress: "https://maps.app.goo.gl/4yJeXcy87uEagQug6",
          dropAddress: "https://maps.app.goo.gl/4yJeXcy87uEagQug6",
          isAirportBooking: true,
          duration: {
            startTime: "2024-09-02T10:30:00.000Z",
            endTime: "2024-09-02T10:30:00.000Z",
            startBefore: "1",
          },
          operatorNotes: "",
          driverNotes: "",
          isUnconfirmed: false,
          isDeleted: false,
          bookingStatus: "Booked",
          __v: 0,
        },
      ],
    };
  }
);

export const dutiesSlice = createSlice({
  name: "duties",
  initialState,
  reducers: {
    setAttendanceFilter: (state, action: PayloadAction<any | {}>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setIsViewDrawerOpen: (state) => {
      state.isViewDrawerOpen = true;
    },

    setIsViewDrawerClose: (state) => {
      state.isViewDrawerOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getDuties.pending, (state) => {
        state.dutiesState.status = "loading";
        state.dutiesState.loading = true;
      })
      .addCase(getDuties.fulfilled, (state, action) => {
        state.dutiesState.status = "succeeded";
        state.dutiesState.loading = false;
        state.dutiesState.error = "";
        state.duties = action.payload.data as any;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          limit: action.payload.limit,
        };
      })
      .addCase(getDuties.rejected, (state) => {
        state.dutiesState.status = "failed";
        state.dutiesState.loading = false;
        state.dutiesState.error = "Error";
      });
  },
});
export const { actions, reducer } = dutiesSlice;
export const {
  setAttendanceFilter,
  setIsViewDrawerClose,
  setIsViewDrawerOpen,
} = actions;
export default dutiesSlice.reducer;

/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../utils/configureAxios";

const initialState = {
  isViewDrawerOpen: false,
  isSlipDrawerOpen: false,
  attendance: [],
  filters: {
    status: "",
    q: "",
  },
  currentSelectedLogs: {},
  attendanceState: { status: "idle", loading: false, error: "" },
  pagination: {
    total: 0,
    page: 0,
    limit: 10,
  },
};

export const getAttendance = createAsyncThunk(
  "attendance/getAttendance",
  async (params: any) => {
    // const response = await apiClient.get("/auth/admin/login", { params });
    // return response.data;

    return {
      total: 10,
      page: 1,
      limit: 10,
      data: [
        {
          startDate: "2024-09-18",
          customer: "Oscar Black",
          passenger: "Sophia Black",
          vehicleGroup: "Sedan",
          dutyType: "City Commute",
          duties: "Office pickup",
          status: "on-going",
        },
      ],
    };
  }
);

export const attendanceSlice = createSlice({
  name: "attendance",
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
    setIsSlipDrawerOpen: (state) => {
      state.isSlipDrawerOpen = true;
    },

    setIsSlipDrawerClose: (state) => {
      state.isSlipDrawerOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAttendance.pending, (state) => {
        state.attendanceState.status = "loading";
        state.attendanceState.loading = true;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.attendanceState.status = "succeeded";
        state.attendanceState.loading = false;
        state.attendanceState.error = "";
        state.attendance = action.payload.data as any;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          limit: action.payload.limit,
        };
      })
      .addCase(getAttendance.rejected, (state) => {
        state.attendanceState.status = "failed";
        state.attendanceState.loading = false;
        state.attendanceState.error = "Error";
      });
  },
});
export const { actions, reducer } = attendanceSlice;
export const {
  setIsSlipDrawerOpen,
  setIsSlipDrawerClose,
  setAttendanceFilter,
  setIsViewDrawerClose,
  setIsViewDrawerOpen,
} = actions;
export default attendanceSlice.reducer;

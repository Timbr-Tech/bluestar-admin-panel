/* eslint-disable */

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/configureAxios";

export const addBankAccount = createAsyncThunk(
  "database/addBankAccount",
  async (body) => {
    const response = await apiClient.post("/database/bank-accounts", body);

    return response.data;
  }
);

export const addDutyType = createAsyncThunk(
  "database/addDutyType",
  async (body) => {
    const response = await apiClient.post("/database/duty-type", body);

    return response.data;
  }
);

export const addNewTax = createAsyncThunk(
  "database/addNewTax",
  async (body) => {
    const response = await apiClient.post("/database/tax", body);

    return response.data;
  }
);

export const addNewCustomer = createAsyncThunk(
  "database/addNewCustomer",
  async (body) => {
    const response = await apiClient.post("/database/customer", body);

    return response.data;
  }
);

export const addNewAllowance = createAsyncThunk(
  "database/addNewAllowance",
  async (body) => {
    const response = await apiClient.post("/database/allowance", body);

    return response.data;
  }
);

export const addNewVehicle = createAsyncThunk(
  "database/addNewVehicle",
  async (body) => {
    const response = await apiClient.post("/database/vehicle", body);

    return response.data;
  }
);

export const addNewDriver = createAsyncThunk(
  "database/addNewDriver",
  async (body) => {
    const response = await apiClient.post("/database/driver", body);

    return response.data;
  }
);

// Vehicle Group

export const addVehicleGroup = createAsyncThunk(
  "database/addVehicleGroup",
  async (body: any, { dispatch }) => {
    const response = await apiClient.post("/database/vehicle-group", body);

    dispatch(getVehicleGroup({ page: "1", search: "", limit: "" }));

    return response.data;
  }
);

export const getVehicleGroup = createAsyncThunk(
  "database/getVehicleGroup",

  async (params: any) => {
    const { page, limit, search } = params;

    const response = await apiClient.get(
      `/database/vehicle-group?page=${page}&limit=${limit}&search=${search}`
    );

    return response.data;
  }
);

export const deleteVehicleGroup = createAsyncThunk(
  "database/deleteVehicleGroup",

  async (params: any) => {
    const { id } = params;

    const response = await apiClient.delete(`/database/vehicle-group/${id}`);

    return response.data;
  }
);

export const getVehicleGroupOptions = createAsyncThunk(
  "database/getVehicleGroupOptions",

  async (params: any) => {
    const { page, size } = params;

    const response = await apiClient.get(
      `database/vehicle-group/names?page=${page}&size=${size}`
    );

    return response.data;
  }
);

const initialState: any = {
  vehicleGroupData: {},
  vehicleGroupOption: {},
  error: null,
  status: "idle",
};

export const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addVehicleGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addVehicleGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addVehicleGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getVehicleGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVehicleGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vehicleGroupData = action.payload;
      })
      .addCase(getVehicleGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getVehicleGroupOptions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVehicleGroupOptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vehicleGroupOption = action.payload;
      })
      .addCase(getVehicleGroupOptions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteVehicleGroup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteVehicleGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteVehicleGroup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default databaseSlice.reducer;

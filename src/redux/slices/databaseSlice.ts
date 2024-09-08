/* eslint-disable */

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/configureAxios";

// Bank Account APIs

export const addBankAccount = createAsyncThunk(
  "database/addBankAccount",
  async (body) => {
    const response = await apiClient.post("/database/bank-accounts", body);

    return response.data;
  }
);

export const getBankAccount = createAsyncThunk(
  "database/getBankAccount",
  async (params: any) => {
    const { page, limit, search } = params;
    const response = await apiClient.get(
      `/database/bank-accounts/?page=${page}&limit=${limit}&search=${search}`
    );

    return response.data;
  }
);

export const deleteBankAccount = createAsyncThunk(
  "database/deleteBankAccount",
  async (params: any) => {
    const { id } = params;

    const response = await apiClient.delete(`/database/bank-accounts/${id}`);

    return response.data;
  }
);

export const updateBankAccount = createAsyncThunk(
  "database/updateBankAccount",

  async (body: any) => {
    const { id, payload } = body;

    const response = await apiClient.patch(
      `/database/bank-accounts/${id}`,
      payload
    );

    return response.data;
  }
);

// Duty Type APIs

export const addDutyType = createAsyncThunk(
  "database/addDutyType",
  async (body) => {
    const response = await apiClient.post("/database/duty-type", body);

    return response.data;
  }
);

// Tax APIs

export const addNewTax = createAsyncThunk(
  "database/addNewTax",
  async (body) => {
    const response = await apiClient.post("/database/tax", body);

    return response.data;
  }
);

// Customer APIs

export const addNewCustomer = createAsyncThunk(
  "database/addNewCustomer",
  async (body: any) => {
    const response = await apiClient.post("/database/customer", body);

    return response.data;
  }
);

export const getCustomer = createAsyncThunk(
  "database/getCustomer",
  async (params: any) => {
    const { page, limit, search } = params;

    const response = await apiClient.get(
      `/database/customer?page=${page}&limit=${limit}&search=${search}`
    );

    return response.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "database/updateCustomer",
  async (body: any) => {
    const { payload, id } = body;

    const response = await apiClient.patch(`/database/customer/${id}`, payload);

    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "database/deleteCustomer",
  async (body: any) => {
    const { id } = body;

    const response = await apiClient.delete(`/database/customer/${id}`);

    return response.data;
  }
);

// Allowance APIs

export const addNewAllowance = createAsyncThunk(
  "database/addNewAllowance",
  async (body) => {
    const response = await apiClient.post("/database/allowance", body);

    return response.data;
  }
);

// Vehicle APIs

export const addNewVehicle = createAsyncThunk(
  "database/addNewVehicle",
  async (body) => {
    const response = await apiClient.post("/database/vehicle", body);

    return response.data;
  }
);

// Driver APIs

export const addNewDriver = createAsyncThunk(
  "database/addNewDriver",
  async (body) => {
    const response = await apiClient.post("/database/driver", body);

    return response.data;
  }
);

// Vehicle Group CRUD

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

  async (params: any, { dispatch }) => {
    const { id } = params;

    const response = await apiClient.delete(`/database/vehicle-group/${id}`);

    dispatch(getVehicleGroup({ page: "1", search: "", limit: "" }));

    return response.data;
  }
);

export const getVehicleGroupOptions = createAsyncThunk(
  "database/getVehicleGroupOptions",

  async (params: any) => {
    const { page, size } = params;

    const response = await apiClient.get(
      `/database/vehicle-group/names?page=${page}&size=${size}`
    );

    return response.data;
  }
);

export const updateVehicleGroup = createAsyncThunk(
  "database/updateVehicleGroup",

  async (body: any) => {
    const { payload, id } = body;

    const response = await apiClient.patch(
      `/database/vehicle-group/${id}`,
      payload
    );
    return response.data;
  }
);

const initialState: any = {
  vehicleGroupData: {},
  vehicleGroupOption: {},
  vehicleGroupStates: {
    status: "idle",
    loading: false,
    error: "",
  },
  vehicleGroupOptionStates: {
    status: "idle",
    loading: false,
    error: "",
  },
  deleteVehicleGroupStates: {
    status: "idle",
    loading: false,
    error: "",
  },
  updateVehicleGroupStates: {
    status: "idle",
    loading: false,
    error: "",
  },
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
      // Create a New Vehicle Group
      .addCase(addVehicleGroup.pending, (state) => {
        state.status = "loading";
        state.vehicleGroupStates.loading = true;
      })
      .addCase(addVehicleGroup.fulfilled, (state) => {
        state.status = "succeeded";
        state.vehicleGroupStates.loading = false;
        state.vehicleGroupStates.error = "";
      })
      .addCase(addVehicleGroup.rejected, (state) => {
        state.status = "failed";
        state.vehicleGroupStates.loading = false;
        state.vehicleGroupStates.error = "Error";
      })

      // Get Vehicle Group
      .addCase(getVehicleGroup.pending, (state) => {
        state.status = "loading";
        state.vehicleGroupStates.loading = true;
      })
      .addCase(getVehicleGroup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vehicleGroupStates.loading = false;
        state.vehicleGroupStates.error = "";
        state.vehicleGroupData = action.payload;
      })
      .addCase(getVehicleGroup.rejected, (state) => {
        state.status = "failed";
        state.vehicleGroupStates.loading = false;
        state.vehicleGroupStates.error = "Error";
      })

      // Get Vehicle Group Options
      .addCase(getVehicleGroupOptions.pending, (state) => {
        state.status = "loading";
        state.vehicleGroupOptionStates.loading = true;
        state.vehicleGroupOptionStates.error = "";
      })
      .addCase(getVehicleGroupOptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vehicleGroupOptionStates.loading = false;
        state.vehicleGroupOptionStates.error = "";
        state.vehicleGroupOption = action.payload;
      })
      .addCase(getVehicleGroupOptions.rejected, (state) => {
        state.status = "failed";
        state.vehicleGroupOptionStates.loading = false;
        state.vehicleGroupOptionStates.error = "Error";
      })

      // Delete the Vehicle Group
      .addCase(deleteVehicleGroup.pending, (state) => {
        state.status = "loading";
        state.deleteVehicleGroupStates.loading = true;
        state.deleteVehicleGroupStates.error = "";
      })
      .addCase(deleteVehicleGroup.fulfilled, (state) => {
        state.status = "succeeded";
        state.deleteVehicleGroupStates.loading = false;
        state.deleteVehicleGroupStates.error = "";
      })
      .addCase(deleteVehicleGroup.rejected, (state) => {
        state.status = "failed";
        state.deleteVehicleGroupStates.loading = false;
        state.deleteVehicleGroupStates.error = "Error";
      })

      // Update the Vehicle Group

      .addCase(updateVehicleGroup.pending, (state) => {
        state.status = "loading";
        state.updateVehicleGroupStates.loading = true;
        state.updateVehicleGroupStates.error = "";
      })
      .addCase(updateVehicleGroup.fulfilled, (state) => {
        state.status = "succeeded";
        state.updateVehicleGroupStates.loading = false;
        state.updateVehicleGroupStates.error = "";
      })
      .addCase(updateVehicleGroup.rejected, (state) => {
        state.status = "failed";
        state.updateVehicleGroupStates.loading = false;
        state.updateVehicleGroupStates.error = "Error";
      });
  },
});

export default databaseSlice.reducer;

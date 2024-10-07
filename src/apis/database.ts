/* eslint-disable */

import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../utils/configureAxios";
import { notification } from "antd";
import {
  setOpenSidePanel,
  setPagination,
  setDutyTypeOption,
  setDriverOption,
  setVehicleGroupOption,
  setCustomersOption,
} from "../redux/slices/databaseSlice";

// Bank Account APIs

export const addBankAccount = createAsyncThunk(
  "database/addBankAccount",
  async (body: any, { dispatch }) => {
    const response = await apiClient.post("/database/bank-accounts", body);

    if (response.status === 201) {
      dispatch(setOpenSidePanel(false));
      notification.success({
        message: "Success",
        description: "New bank account added successfully",
      });
      dispatch(getBankAccount({ page: 1, limit: 10 }));
      return response.data;
    }
  }
);

export const getBankAccount = createAsyncThunk(
  "database/getBankAccount",
  async (params: any, { dispatch }) => {
    console.log(params, "params");
    const response = await apiClient.get(`/database/bank-accounts/`, {
      params,
    });

    if (response.status == 200) {
      dispatch(
        setPagination({
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
        })
      );
      return response.data;
    }
  }
);

export const getBankAccountById = createAsyncThunk(
  "database/getBankAccountById",

  async (params: any) => {
    const { id } = params;

    const response = await apiClient.get(`/database/bank-accounts/${id}`);

    return response.data;
  }
);

export const deleteBankAccount = createAsyncThunk(
  "database/deleteBankAccount",
  async (params: any, { dispatch, getState }: any) => {
    const { id } = params;

    const response = await apiClient.delete(`/database/bank-accounts/${id}`);
    console.log(getState(), "getState()");
    const { database } = getState();
    const { pagination, q } = database;

    dispatch(
      getBankAccount({
        page: pagination.page,
        search: q,
        limit: pagination.limit,
      })
    );
    return response.data;
  }
);

export const updateBankAccount = createAsyncThunk(
  "database/updateBankAccount",

  async (body: any, { dispatch, getState }: any) => {
    const { id, payload } = body;

    const response = await apiClient.patch(
      `/database/bank-accounts/${id}`,
      payload
    );
    const { database } = getState();
    const { pagination, q } = database;

    if (response.status === 200) {
      dispatch(setOpenSidePanel(false));
      notification.success({
        message: "Success",
        description: "Bank account updated successfully",
      });
      dispatch(getBankAccount({ page: pagination.page, search: q, limit: 10 }));
      return response.data;
    }

    return response.data;
  }
);

// Duty Type APIs

export const addDutyType = createAsyncThunk(
  "database/addDutyType",
  async (body: any, { dispatch }) => {
    const response = await apiClient.post("/database/duty-type", body);

    if (response.status === 201) {
      dispatch(setOpenSidePanel(false));
      notification.success({
        message: "Success",
        description: "New Duty type added successfully",
      });
      dispatch(getAllDutyTypes({ page: "1", limit: 7, search: "" }));
      return response.data;
    }
  }
);

export const getAllDutyTypes = createAsyncThunk(
  "database/getAllDutyTypes",
  async (params: any, { dispatch, getState }) => {
    // const { page, limit, search } = params;

    // const response = await apiClient.get(
    //   `/database/duty-type?page=${page}&limit=${limit}&search=${search}`
    // );
    const response = await apiClient.get(`/database/duty-type`, { params });
    if (response.status === 200) {
      let option: Array<object> = response?.data?.data?.map((each: any) => ({
        value: each._id,
        label: each.name,
      }));

      dispatch(setDutyTypeOption(option));

      return response.data;
    }
  }
);

export const getDutyTypeById = createAsyncThunk(
  "database/getDutyTypeById",
  async (params: any) => {
    const { id } = params;
    const response = await apiClient.get(`/database/duty-type/${id}`);
    return response.data;
  }
);

export const updateDutyType = createAsyncThunk(
  "database/updateDutyType",

  async (body: any, { dispatch, getState }: any) => {
    const { payload, id } = body;

    const response = await apiClient.patch(
      `/database/duty-type/${id}`,
      payload
    );
    const { database } = getState();
    const { pagination, q } = database;

    if (response?.status === 200) {
      dispatch(setOpenSidePanel(false));
      notification.success({
        message: "Success",
        description: "Duty type updated successfully",
      });

      dispatch(
        getAllDutyTypes({ page: pagination.page, limit: 10, search: q })
      );
    }
  }
);

export const deleteDutyType = createAsyncThunk(
  "database/deleteDutyType",

  async (params: any, { dispatch, getState }: any) => {
    const { id } = params;

    const response = await apiClient.delete(`/database/duty-type/${id}`);
    const { database } = getState();
    const { pagination, q } = database;

    if (response?.status === 200) {
      dispatch(
        getAllDutyTypes({ page: pagination.page, limit: 10, search: q })
      );
    }
  }
);

// Tax APIs

export const addNewTax = createAsyncThunk(
  "database/addNewTax",
  async (body: any, { dispatch, getState }: any) => {
    const response = await apiClient.post("/database/tax", body);

    const { database } = getState();
    const { taxesStates } = database;
    const { pagination } = taxesStates;

    if (response.status === 201) {
      dispatch(setOpenSidePanel(false));
      notification.success({
        message: "Success",
        description: "New tax added successfully",
      });
      dispatch(
        getTaxes({
          page: 1,
          search: pagination.search,
          limit: 10,
        })
      );
      return response.data;
    }
  }
);

export const getTaxes = createAsyncThunk(
  "database/getTaxes",

  async (params: any, { dispatch }) => {
    const response = await apiClient.get(`/database/tax/`, { params });

    if (response.status === 200) {
      dispatch(
        setPagination({
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
        })
      );
      return response.data;
    }
  }
);

export const getTaxesOptions = createAsyncThunk(
  "database/getTaxesOptions",

  async (params: any) => {
    const { page, size } = params;

    const response = await apiClient.get(
      `/database/tax/names?page=${page}&size=${size}`
    );

    return response.data;
  }
);

export const deleteTax = createAsyncThunk(
  "database/deleteTax",

  async (params: any, { dispatch, getState }: any) => {
    const { id } = params;
    const response = await apiClient.delete(`/database/tax/${id}`);

    const { database } = getState();
    const { pagination, q } = database;

    dispatch(
      getTaxes({
        page: pagination.page,
        search: q,
        limit: 10,
      })
    );

    return response.data;
  }
);

export const updateTax = createAsyncThunk(
  "database/updateTax",
  async (body: any, { dispatch, getState }: any) => {
    const { id, payload } = body;

    const response = await apiClient.patch(`/database/tax/${id}`, payload);

    const { database } = getState();
    const { pagination, q } = database;

    if (response.status === 200) {
      dispatch(setOpenSidePanel(false));
      notification.success({
        message: "Success",
        description: "Tax updated successfully",
      });
      dispatch(
        getTaxes({
          page: pagination.page,
          search: q,
          limit: 10,
        })
      );
      return response.data;
    }
  }
);

export const getTaxesById = createAsyncThunk(
  "database/getTaxesById",
  async (params: any) => {
    const { id } = params;

    const response = await apiClient.get(`/database/tax/${id}`);

    return response.data;
  }
);

// Customer APIs

export const addNewCustomer = createAsyncThunk(
  "database/addNewCustomer",
  async (body: any, { dispatch }) => {
    const response = await apiClient.post("/database/customer", body);
    if (response.status === 201) {
      notification.success({
        message: "Success",
        description: "New customer added successfully",
      });
      dispatch(setOpenSidePanel(false));
      dispatch(getCustomer({ page: "1", search: "", limit: 10 }));
      return response.data;
    }
  }
);

export const getCustomer = createAsyncThunk(
  "database/getCustomer",
  async (params: any, { dispatch }) => {
    const response = await apiClient.get(`/database/customer`, { params });

    if (response.status === 200) {
      let option: Array<object> = response?.data?.data?.map((each: any) => ({
        value: each._id,
        label: each.name,
      }));

      dispatch(setCustomersOption(option));

      dispatch(
        setPagination({
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
        })
      );
      return response.data;
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "database/updateCustomer",
  async (body: any, { dispatch, getState }: any) => {
    const { payload, id } = body;

    const response = await apiClient.patch(`/database/customer/${id}`, payload);
    const { database } = getState();
    const { pagination, q } = database;
    if (response.status === 200) {
      notification.success({
        message: "Success",
        description: "Customer updated successfully",
      });
      dispatch(setOpenSidePanel(false));
      dispatch(getCustomer({ page: pagination.page, search: q, limit: 10 }));
      return response.data;
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "database/deleteCustomer",
  async (body: any, { dispatch, getState }: any) => {
    const { id } = body;
    const { database } = getState();
    const { pagination, q } = database;

    const response = await apiClient.delete(`/database/customer/${id}`);

    if (response.status === 200) {
      dispatch(getCustomer({ page: pagination.page, search: q, limit: 10 }));

      return response.data;
    }
  }
);

export const getCustomerById = createAsyncThunk(
  "database/getCustomerById",
  async (params: any) => {
    const { id } = params;

    const response = await apiClient.get(`/database/customer/${id}`);

    return response.data;
  }
);

// Allowance APIs
export const addNewAllowance = createAsyncThunk(
  "database/addNewAllowance",
  async (body: any, { dispatch }) => {
    const response = await apiClient.post("/database/allowance", body);

    if (response?.status === 201) {
      dispatch(setOpenSidePanel(false));
      notification.success({
        message: "Success",
        description: "Allowance added successfully",
      });
      dispatch(getAllowances({ page: "1", search: "", limit: 10 }));

      return response.data;
    }
  }
);

export const getAllowances = createAsyncThunk(
  "database/getAllowances",
  async (params: any, { dispatch }) => {
    const response = await apiClient.get(`/database/allowance`, { params });
    if (response.status === 200) {
      dispatch(
        setPagination({
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
        })
      );
      return response.data;
    }
  }
);

export const getAllowanceById = createAsyncThunk(
  "database/getAllowanceById",

  async (params: any) => {
    const { id } = params;

    const response = await apiClient.get(`/database/allowance/${id}`);

    return response.data;
  }
);

export const updateAllowance = createAsyncThunk(
  "database/updateAllowance",

  async (body: any, { dispatch, getState }: any) => {
    const { payload, id } = body;

    const response = await apiClient.patch(
      `/database/allowance/${id}`,
      payload
    );
    const { database } = getState();
    const { pagination, q } = database;

    if (response?.status === 200) {
      dispatch(setOpenSidePanel(false));
      notification.success({
        message: "Success",
        description: "Allowance updated successfully",
      });
      dispatch(getAllowances({ page: pagination.page, search: q, limit: 10 }));

      return response.data;
    }
  }
);

export const deleteAllowance = createAsyncThunk(
  "database/deleteAllowance",

  async (params: any, { dispatch, getState }: any) => {
    const { id } = params;

    const response = await apiClient.delete(`/database/allowance/${id}`);
    const { database } = getState();
    const { pagination, q } = database;
    dispatch(getAllowances({ page: pagination.page, search: q, limit: 10 }));

    return response.data;
  }
);

// Vehicle APIs
export const addNewVehicle = createAsyncThunk(
  "database/addNewVehicle",
  async (body: any, { dispatch }) => {
    const response = await apiClient.post("/database/vehicle", body);

    if (response?.status === 201) {
      dispatch(setOpenSidePanel(false));
      dispatch(getVehicle({ page: "1", search: "", limit: 10 }));
      return response.data;
    }
  }
);

export const getVehicle = createAsyncThunk(
  "database/getVehicle",

  async (params: any, { dispatch, getState }: any) => {
    const response = await apiClient.get(`/database/vehicle`, { params });

    if (response.status === 200) {
      dispatch(
        setPagination({
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
        })
      );
      return response.data;
    }
  }
);

export const getVehicleById = createAsyncThunk(
  "database/getVehicleById",

  async (params: any) => {
    const { id } = params;

    const response = await apiClient.get(`/database/vehicle/${id}`);

    return response.data;
  }
);

export const updateVehicle = createAsyncThunk(
  "database/updateVehicle",

  async (body: any, { dispatch, getState }: any) => {
    const { payload, id } = body;
    const response = await apiClient.patch(`/database/vehicle/${id}`, payload);
    const { database } = getState();
    const { pagination, q } = database;
    dispatch(getVehicle({ page: pagination.page, search: q, limit: 10 }));
    return response.data;
  }
);

export const deleteVehicle = createAsyncThunk(
  "database/deleteVehicle",

  async (body: any, { dispatch, getState }: any) => {
    const { id } = body;
    const response = await apiClient.delete(`/database/vehicle/${id}`);
    const { database } = getState();
    const { pagination, q } = database;

    dispatch(getVehicle({ page: pagination.page, search: q, limit: 10 }));
    return response.data;
  }
);

// Driver APIs
export const addNewDriver = createAsyncThunk(
  "database/addNewDriver",
  async (body: any, { dispatch, getState }: any) => {
    const response = await apiClient.post("/database/driver", body);

    const { database } = getState();
    const { pagination } = database;

    if (response.status === 201) {
      dispatch(setOpenSidePanel(false));
      dispatch(
        getDrivers({
          page: 1,
          search: "",
          limit: 10,
        })
      );

      return response.data;
    }
  }
);

export const getDrivers = createAsyncThunk(
  "database/getDrivers",
  async (params: any, { dispatch, getState }: any) => {
    const response = await apiClient.get(`/database/driver`, { params });

    if (response.status === 200) {
      let option: Array<object> = response?.data?.data?.map((each: any) => ({
        value: each._id,
        label: each.name,
      }));
      dispatch(
        setPagination({
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
        })
      );
      dispatch(setDriverOption(option));
      return response.data;
    }
  }
);

export const getDriverById = createAsyncThunk(
  "database/getDriverById",

  async (params: any) => {
    const { id } = params;

    const response = await apiClient.get(`/database/driver/${id}`);

    return response.data;
  }
);

export const updateDriver = createAsyncThunk(
  "database/updateDriver",

  async (body: any, { dispatch, getState }: any) => {
    const { payload, id } = body;

    const response = await apiClient.patch(`/database/driver/${id}`, payload);

    const { database } = getState();
    const { pagination } = database;
    dispatch(setOpenSidePanel(false));
    dispatch(
      getDrivers({
        page: pagination?.page,
        search: pagination?.search,
        limit: pagination?.limit,
      })
    );

    return response.data;
  }
);

export const deleteDriver = createAsyncThunk(
  "database/deleteDriver",

  async (params: any, { dispatch, getState }: any) => {
    const { id } = params;

    const response = await apiClient.delete(`/database/driver/${id}`);

    const { database } = getState();
    const { pagination, q } = database;

    dispatch(
      getDrivers({
        page: pagination?.page,
        search: q,
        limit: pagination?.limit,
      })
    );
    return response.data;
  }
);

// Vehicle Group CRUD
export const addVehicleGroup = createAsyncThunk(
  "database/addVehicleGroup",
  async (body: any, { dispatch }) => {
    const response = await apiClient.post("/database/vehicle-group", body);

    if (response.status === 201) {
      dispatch(setOpenSidePanel(false));
      notification.success({
        message: "Success",
        description: "Vehicle group added successfully",
      });
      dispatch(getVehicleGroup({ page: "1", search: "", limit: 10 }));
      return response.data;
    }
  }
);

export const getVehicleGroup = createAsyncThunk(
  "database/getVehicleGroup",

  async (params: any, { dispatch, getState }) => {
    const response = await apiClient.get(`/database/vehicle-group`, { params });

    if (response.status === 200) {
      let option: Array<object> = response?.data?.data?.map((each: any) => ({
        value: each._id,
        label: each.name,
      }));

      dispatch(
        setPagination({
          total: response.data.total,
          page: response.data.page,
          limit: response.data.limit,
        })
      );

      dispatch(setVehicleGroupOption(option));
      return response.data;
    }

    return response.data;
  }
);

export const getVehicleGroupById = createAsyncThunk(
  "database/getVehicleGroupById",

  async (params: any) => {
    const { id } = params;

    const response = await apiClient.get(`/database/vehicle-group/${id}`);

    return response.data;
  }
);

export const deleteVehicleGroup = createAsyncThunk(
  "database/deleteVehicleGroup",

  async (params: any, { dispatch, getState }: any) => {
    const { id } = params;
    console.log(id, "id");

    console.log(getState(), "getState");

    const { database } = getState();
    const { pagination, q } = database;

    console.log(id, "id");

    const response = await apiClient.delete(`/database/vehicle-group/${id}`);

    dispatch(getVehicleGroup({ page: pagination.page, search: q, limit: 10 }));

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

  async (body: any, { dispatch, getState }: any) => {
    const { payload, id } = body;

    console.log(body, "body");

    const response = await apiClient.patch(
      `/database/vehicle-group/${id}`,
      payload
    );
    const { database } = getState();
    const { pagination, q } = database;

    if (response.status === 200) {
      dispatch(setOpenSidePanel(false));
      notification.success({
        message: "Success",
        description: "Vehicle group updated successfully",
      });
      dispatch(
        getVehicleGroup({ page: pagination.page, search: q, limit: 10 })
      );
      return response.data;
    }

    return response.data;
  }
);

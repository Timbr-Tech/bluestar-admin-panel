/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../utils/configureAxios";
import { notification } from "antd";

export const getInvoices = createAsyncThunk(
  "invoices/getInvoices",
  async (params: any, { dispatch }) => {
    const response = await apiClient.get(`/invoice`, {
      params,
    });

    return response.data;
  }
);

export const getInvoiceById = createAsyncThunk(
  "invoices/getInvoiceById",
  async (params: any, { dispatch }) => {
    const { id } = params;
    const response = await apiClient.get(`/invoice/${id}`);

    return response.data;
  }
);

export const updateInvoiceById = createAsyncThunk(
  "invoices/updateInvoiceById",
  async (body: any, { dispatch, getState }: any) => {
    const { id, payload } = body;

    const response = await apiClient.patch(`/invoice${id}`);
  }
);

export const addInvoice = createAsyncThunk(
  "invoices/addInvoice",
  async (body: any, { dispatch }) => {
    const response = await apiClient.post("/invoice", body);
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (params: any, { dispatch, getState }: any) => {
    const { id } = params;

    const response = await apiClient.delete(`/invoice/${id}`);
  }
);

//
export const getReceipts = createAsyncThunk(
  "invoices/getReceipts",
  async (params: any, { dispatch }) => {
    const response = await apiClient.get(`/receipt`, {
      params,
    });

    return response.data;
  }
);

export const getReceiptById = createAsyncThunk(
  "invoices/getReceiptById",
  async (params: any, { dispatch }) => {
    const { id } = params;
    const response = await apiClient.get(`/receipt/${id}`);

    return response.data;
  }
);

export const updateReceiptById = createAsyncThunk(
  "invoices/updateReceiptById",
  async (body: any, { dispatch, getState }: any) => {
    const { id, payload } = body;

    const response = await apiClient.patch(`/receipt${id}`);
  }
);

export const addReceipt = createAsyncThunk(
  "invoices/addReceipt",
  async (body: any, { dispatch }) => {
    const response = await apiClient.post("/receipt", body);
  }
);

export const deleteReceipt = createAsyncThunk(
  "invoices/deleteReceipt",
  async (params: any, { dispatch, getState }: any) => {
    const { id } = params;

    const response = await apiClient.delete(`/receipt/${id}`);
  }
);

const initialState = {
  invoices: [],
  receipts: [],
  pagination: {
    total: 0,
    page: 0,
    limit: 10,
  },
  filters: {
    status: undefined,
    search: undefined,
  },
  billingStates: { status: "idle", loading: false, error: "" },
};

export const billingSlice = createSlice({
  name: "billings",
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<any | {}>) => {
      return {
        ...state,
        invoices: action?.payload?.invoices,
      };
    },
    setBillingFilter: (state, action: PayloadAction<any | {}>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    setReceipts: (state, action: PayloadAction<any | {}>) => {
      return {
        ...state,
        receipts: action?.payload?.receipts,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // get bookings
      .addCase(getInvoices.pending, (state) => {
        state.billingStates.status = "loading";
        state.billingStates.loading = true;
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.billingStates.status = "succeeded";
        state.billingStates.loading = false;
        state.billingStates.error = "";
        state.invoices = action.payload?.data as any;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          limit: action.payload.limit,
        };
      })
      .addCase(getInvoices.rejected, (state) => {
        state.billingStates.status = "failed";
        state.billingStates.loading = false;
        state.billingStates.error = "Error";
      });
  },
});
export const { actions, reducer } = billingSlice;
export const { setInvoices, setBillingFilter } = actions;
export default billingSlice.reducer;

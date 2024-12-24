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

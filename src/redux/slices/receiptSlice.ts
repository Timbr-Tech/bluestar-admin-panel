/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../utils/configureAxios";
import { notification } from "antd";

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

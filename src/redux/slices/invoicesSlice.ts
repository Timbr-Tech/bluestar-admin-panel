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
  }
);

export const getInvoiceById = createAsyncThunk(
  "invoices/getInvoiceById",

  async (params: any) => {
    const { id } = params;

    const response = await apiClient.get(`/invoice/${id}`);
  }
);

export const addInvoice = createAsyncThunk("invoices/addInvoice",
 
  async (params: any) => {

  }
)

export const updateInvoice = createAsyncThunk("invoices/updateInvoice",
  async (params: any) => {

  }
)

export const deleteInvoice = createAsyncThunk("",
   async (params: any) => {
    
   }
)

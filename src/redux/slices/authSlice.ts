/* eslint-disable */
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/configureAxios";

export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
  const response = await apiClient.post("/auth/admin/login", user);
  return response.data;
});

const initialState: any = {
  userName: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { actions, reducer } = authSlice;
export const { setUserName } = actions;
export default reducer;

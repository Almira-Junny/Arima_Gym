import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../api/auth";
import { showAlert } from "./alertSlice";

const initialState = {
  userInfo: {},
  token: "",
  isLoggedIn: false,
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await AuthService.login(data);
    thunkAPI.dispatch(
      showAlert({
        severity: "success",
        message: "Đăng nhập thành công",
      })
    );
    return res;
  } catch (err) {
    thunkAPI.dispatch(
      showAlert({
        severity: "error",
        message: err.response.data.message,
      })
    );
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await AuthService.signup(data);
      thunkAPI.dispatch(
        showAlert({
          severity: "success",
          message: "Đăng ký thành công",
        })
      );
      return res;
    } catch (err) {
      thunkAPI.dispatch(
        showAlert({
          severity: "error",
          message: err.response.data.message,
        })
      );
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const res = await AuthService.logout();
    return res;
  } catch (err) {
    thunkAPI.dispatch(
      showAlert({
        severity: "error",
        message: err.response.data.message,
      })
    );
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUserInfo: (state, action) => {
      const { data } = action.payload;
      state.userInfo = data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.userInfo = {};
        state.token = "";
        state.isLoggedIn = false;
      })
      // .addCase(register.fulfilled, (state, action) => {
      //   state.userInfo = action.payload.user;
      //   state.token = action.payload.token;
      //   state.isLoggedIn = true;
      // })
      .addCase(register.rejected, (state) => {
        state.userInfo = {};
        state.token = "";
        state.isLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = {};
        state.token = "";
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;

export const { changeUserInfo } = authSlice.actions;

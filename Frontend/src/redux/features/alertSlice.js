import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  severity: "info",
  message: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      const { severity, message } = action.payload;
      state.severity = severity;
      state.message = message;
    },
    clearAlert: (state) => {
      state.message = "";
    },
  },
});

const { actions, reducer } = alertSlice;
export const { showAlert, clearAlert } = actions;
export default reducer;

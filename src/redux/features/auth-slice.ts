import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/types/TwitterProps";
import { signInThunk, signUpThunk } from "./auth-thunk";

interface IInitialState {
  user?: User;
}

const initialState: IInitialState = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

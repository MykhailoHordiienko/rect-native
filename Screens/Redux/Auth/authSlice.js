import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickName: null,
  isLogInChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
    }),
    updateIsLoginChange: (state, { payload }) => ({
      ...state,
      isLogInChange: payload.stateChange,
    }),
    signOutProfile: (state) => initialState,
  },
});

export const { updateUserProfile, updateIsLoginChange, signOutProfile } =
  authSlice.actions;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// const user = useSelector((state) => state.auth.user);

const initialState = {
  isLoggedIn: false,
  user: null,
  clientsecret: ""
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state, payload) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
    switchLoginStatus:(state,{payload})=>{
     state.isLoggedIn = true;
    },
    setClientSecret: (state,{payload})=>{
      state.clientsecret = payload
    }

  }
});

export const {logoutUser,setUserData, switchLoginStatus,setClientSecret } = authSlice.actions;
export const authReducer = authSlice.reducer;

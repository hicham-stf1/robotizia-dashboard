import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { notification: null,blog:"" },
  reducers: {
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    setBlogData(state, action) {
      state.blog = {
        blog: action.payload
      };
    }
  },
});

export const {showNotification, setBlogData} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

const ratioSlice = createSlice({
  name: "ratio",
  initialState,
  reducers: {
    setRatio: (state, action) => {
      return { ratio: action.payload };
    }
  },
});

export const ratioReducer = ratioSlice.reducer;
export const { setRatio } = ratioSlice.actions;
// export default reducer;

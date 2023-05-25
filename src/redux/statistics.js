import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setStatistics: (state, action) => {
      return { statistics: action.payload };
    }
  },
});

export const statisticsReducer = statisticsSlice.reducer;
export const { setStatistics } = statisticsSlice.actions;
// export default reducer;

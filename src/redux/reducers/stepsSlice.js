import { createSlice } from "@reduxjs/toolkit";

export const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    isStepCompleted: false,
  },
  reducers: {
    completeStep: (state, action) => {
      state.isStepCompleted = action.payload;
    },
  },
});

export const { completeStep } = stepsSlice.actions;

export default stepsSlice.reducer;

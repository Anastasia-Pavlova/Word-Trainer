import { createSlice } from "@reduxjs/toolkit";

export const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    completedSteps: [],
  },
  reducers: {
    completeStep: (state, action) => {
      state.completedSteps = [
        ...state.completedSteps.filter((v) => v !== action.payload),
        action.payload,
      ];
    },
  },
});

export const { completeStep } = stepsSlice.actions;

export default stepsSlice.reducer;

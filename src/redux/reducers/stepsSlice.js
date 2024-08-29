import { createSlice } from "@reduxjs/toolkit";

export const stepsSlice = createSlice({
  name: "steps",
  initialState: {
    completedSteps: [],
  },
  reducers: {
    completeStep: (state, action) => {
      state.completedSteps = [
        ...state.completedSteps.filter((v) => v.step !== action.payload),
        { step: action.payload.step, isCompleted: action.payload.isCompleted },
      ];
    },

    resetSteps: (state) => {
      state.completedSteps = [];
    },
  },
});

export const { completeStep, resetSteps } = stepsSlice.actions;

export default stepsSlice.reducer;

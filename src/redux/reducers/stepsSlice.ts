import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type StepSliceState = {
  completedSteps: Array<{ step: number; isCompleted: boolean }>;
};

const initialState: StepSliceState = {
  completedSteps: [],
};

export const stepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    completeStep: (
      state,
      action: PayloadAction<{ step: number; isCompleted: boolean }>
    ) => {
      state.completedSteps = [
        ...state.completedSteps.filter((v) => v.step !== action.payload.step),
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

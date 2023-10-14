import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    algorithm: "darkAlgorithm",
  },
  reducers: {
    changeAlgorithm: (state, action) => {
      state.algorithm = action.payload;
    },
  },
});

export const { changeAlgorithm } = themeSlice.actions;

export default themeSlice.reducer;

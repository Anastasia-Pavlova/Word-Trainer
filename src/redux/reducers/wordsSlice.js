import { createSlice } from "@reduxjs/toolkit";

export const wordsSlice = createSlice({
  name: "words",
  initialState: {
    currentWord: "",
    list: [],
  },
  reducers: {
    addWords: (state, action) => {
      state.list = action.payload;
    },
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload;
    },
    setCurrentWordCompleted: (state) => {
      const wordIndex = state.list.findIndex(
        (word) => word.word === state.currentWord
      );
      state.list[wordIndex].isUsed = true;
    },
  },
});

export const { addWords, setCurrentWord, setCurrentWordCompleted } =
  wordsSlice.actions;

export default wordsSlice.reducer;

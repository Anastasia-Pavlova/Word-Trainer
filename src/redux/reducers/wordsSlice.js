import { createSlice } from '@reduxjs/toolkit';

export const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    currentWord: '',
    list: [
      {
        isUsed: false,
        isCompleted: false,
      },
    ],
  },
  reducers: {
    addWords: (state, action) => {
      state.list = action.payload;
    },
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload;
    },
    setCurrentWordCompleted: (state, action) => {
      const wordIndex = state.list.findIndex(
        (word) => word.word === state.currentWord
      );
      state.list[wordIndex].isUsed = true;
      state.list[wordIndex].isCompleted = action.payload;
    },
  },
});

export const { addWords, setCurrentWord, setCurrentWordCompleted } =
  wordsSlice.actions;

export default wordsSlice.reducer;

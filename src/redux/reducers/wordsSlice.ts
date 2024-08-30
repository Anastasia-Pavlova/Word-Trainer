import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WordSliceState = {
  currentWord: string;
  list: Array<{
    word: string;
    root?: string;
    isRegular?: boolean;
    translation?: boolean;
    grundformen?: boolean;
    examples?: Array<string>;
    isUsed: boolean;
    isCompleted: boolean;
  }>;
};

const initialState: WordSliceState = {
  currentWord: '',
  list: [
    {
      word: '',
      isUsed: false,
      isCompleted: false,
    },
  ],
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWords: (state, action) => {
      state.list = action.payload;
    },
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload;
    },
    setCurrentWordCompleted: (state, action: PayloadAction<boolean>) => {
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

import { combineReducers } from "redux";
import wordsSlice from "./wordsSlice";
import stepsSlice from "./stepsSlice";
import themeSlice from "./themeSlice";

const rootReducer = combineReducers({
  words: wordsSlice,
  steps: stepsSlice,
  theme: themeSlice,
});

export default rootReducer;

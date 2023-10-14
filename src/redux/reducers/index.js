import { combineReducers } from "redux";
import wordsSlice from "./wordsSlice";
import stepsSlice from "./stepsSlice";

const rootReducer = combineReducers({
  words: wordsSlice,
  steps: stepsSlice,
});

export default rootReducer;

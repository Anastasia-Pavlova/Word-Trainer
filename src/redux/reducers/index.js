import { combineReducers } from "redux";
import wordsSlice from "./wordsSlice";

const rootReducer = combineReducers({
  words: wordsSlice, // Add more reducers as needed
});

export default rootReducer;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

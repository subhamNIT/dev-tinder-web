import { configureStore } from "@reduxjs/toolkit";
import feedReducer from './feedSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer
  }
})

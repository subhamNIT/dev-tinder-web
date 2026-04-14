import { configureStore } from "@reduxjs/toolkit";
import connectionsReducer from './connectionsSlice';
import feedReducer from './feedSlice';
import requestsReducer from './requestsSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer
  }
})

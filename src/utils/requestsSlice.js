import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: 'connection',
  initialState: null,
  reducers:  {
    addRequests:(state, action) => {
      return action.payload;
    },
    removeRequests:(state, action) => {
      const newArr = state.filter(r => r.id !== action.payload)
      return newArr
    }
  }
})

export const {addRequests, removeRequests} = requestsSlice.actions

export default requestsSlice.reducer


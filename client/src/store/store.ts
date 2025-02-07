import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import searchSlice from './searchSlice'

export const store = configureStore({
  reducer: {
    userSlice:userSlice.reducer,
    searchSlice:searchSlice.reducer,
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppStore = typeof store;
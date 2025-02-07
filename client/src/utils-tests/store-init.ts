import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from '../store/userSlice'

const rootReducer = combineReducers({
  user: userSlice.reducer
})
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
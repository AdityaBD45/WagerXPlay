import { configureStore } from '@reduxjs/toolkit'
import betReducer from '../features/bets/betsSlice'
import authReducer from '../features/auth/authSlice'
import sidebarReducer from '../features/sidebar/sidebarSlice' // ✅ import sidebar reducer

export const store = configureStore({
  reducer: {
    bets: betReducer,
    auth: authReducer,
    sidebar: sidebarReducer, // ✅ add sidebar to store
  },
})

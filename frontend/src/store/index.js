import { configureStore } from '@reduxjs/toolkit'
import { appSlice, userSlice } from './slices'

export default configureStore({
  reducer: {
    app: appSlice,
    user: userSlice
  }
})
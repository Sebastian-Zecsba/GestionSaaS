import { configureStore } from '@reduxjs/toolkit'
import appSlice from './slices/app.slice'
import userSlice from './slices/user.slice'
import categorySlice from './slices/category.slice'

export default configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    category: categorySlice
  }
})
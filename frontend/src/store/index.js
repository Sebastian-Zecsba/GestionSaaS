import { configureStore } from '@reduxjs/toolkit'
import appSlice from './slices/app.slice'
import userSlice from './slices/user.slice'
import categorySlice from './slices/category.slice'
import productSlice from './slices/product.slice'
import warehouseSlice from './slices/warehouse.slice'
import inventorySlice from './slices/inventory.slice'

export default configureStore({
  reducer: {
    app: appSlice,
    user: userSlice,
    category: categorySlice,
    product: productSlice,
    warehouse: warehouseSlice,
    inventory: inventorySlice
  }
})
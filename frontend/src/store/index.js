import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user.slice'
import categorySlice from './slices/category.slice'
import productSlice from './slices/product.slice'
import warehouseSlice from './slices/warehouse.slice'
import inventorySlice from './slices/inventory.slice'
import movementSlice from './slices/movements.slice'
import supplierSlice from './slices/supplier.slice'


export default configureStore({
  reducer: {
    user: userSlice,
    category: categorySlice,
    product: productSlice,
    warehouse: warehouseSlice,
    inventory: inventorySlice,
    movement: movementSlice,
    supplier: supplierSlice
  }
})
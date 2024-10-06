import mongoose, { Schema } from "mongoose";

const inventorySchema = new mongoose.Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    },
    warehouse: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: [true, 'Warehouse is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

export const InventoryModel = mongoose.model('Inventory', inventorySchema)
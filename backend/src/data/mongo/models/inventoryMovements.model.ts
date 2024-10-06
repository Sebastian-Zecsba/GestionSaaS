import mongoose, { Schema } from "mongoose";

const inventoryMovementsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    warehouse: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    movement_type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

export const InventoryMovementsModel = mongoose.model('InventoryMovements', inventoryMovementsSchema)
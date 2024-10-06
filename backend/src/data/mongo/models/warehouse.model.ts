import mongoose, { Schema } from "mongoose";

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User is required']
    }
})

warehouseSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options){
        delete ret._id
    }
})

export const WarehouseModel = mongoose.model('Warehouse', warehouseSchema)
import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
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
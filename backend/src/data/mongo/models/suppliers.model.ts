import mongoose, { Schema } from "mongoose";

const supplier = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] 
    },
    phone: { 
        type: String, 
        required: [true, 'Phone is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'] 
    },
    address: { 
        type: String, 
        required: [true, 'Address is required'] 
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isDeletedDefinitely: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export const SupplierModel = mongoose.model('Supplier', supplier)
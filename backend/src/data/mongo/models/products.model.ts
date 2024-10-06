import mongoose, { Schema } from "mongoose";

const product = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] 
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'] 
    },
    price: { 
        type: Number, 
        required: [true, 'Price is required'] 
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

export const ProductModel = mongoose.model('Product', product)
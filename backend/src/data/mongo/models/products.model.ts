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
    cost: {
        type: Number,
        required: [true, 'Cost is required']
    },
    stock: {
        type: Number,
        required: [true, 'Satisfies is required']
    }, 
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
})

export const ProductModel = mongoose.model('Product', product)
import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'Name is required']
    },
    decription: { 
        type: String,
        required: [true, 'Description is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const CategoryModel = mongoose.model('Category', categorySchema)
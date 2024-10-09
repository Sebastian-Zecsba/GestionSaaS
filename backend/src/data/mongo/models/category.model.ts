import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'Name is required']
    },
    description: { 
        type: String,
        required: [true, 'Description is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isDeletedDefinitely: {
        type: Boolean,
        default: false
    }
})

categorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id
        delete ret.user
    }
})

export const CategoryModel = mongoose.model('Category', categorySchema)
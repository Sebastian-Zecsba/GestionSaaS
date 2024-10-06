import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [ true, 'Name is required' ]
    },
    email: { 
        type: String,
        required: [ true, 'Email is required' ],
        unique: true
    },
    password: { 
        type: String,
        required: [ true, 'Password is required' ]
    },
    role: { 
        type: [String],
        default: ['USER_ROLE'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options){
        delete ret._id
        delete ret.id
        delete ret.password
    }
})

export const UserModel = mongoose.model('User', userSchema)
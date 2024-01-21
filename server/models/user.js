import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter your name'],
    },
    email:{
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    role:{
        type: Number,
        default: 0 // 0 = user, 1 = admin
    }
}, {timestamps: true})

export default mongoose.model('User', UserSchema)
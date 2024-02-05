import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
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


UserSchema.virtual('confirmPassword')
    .get(function() { return this._confirmPassword; })
    .set(function(value) { this._confirmPassword = value; });

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


export default mongoose.model('User', UserSchema)
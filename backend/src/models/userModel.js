import mongoose,{ Schema } from "mongoose";

const UserSchema = new Schema({
    image:{
        type:String
    },
    fullname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'] 
    },
    password: {
       type:String,
       required: true,
       minlength: 6 
    },
    mobile: {
        type:String,
        minlength: 10
    }
})

export const User = mongoose.model('user',UserSchema);
import mongoose from 'mongoose'

const {Schema} = mongoose;

const userSchema = new Schema(
    
     {
        firstName: {
            type : String,
            required: true
        },
        lastName: {
            type : String
        },
        email : {
            type : String,
            required: true,
            unique: true
        },
        password: {
            type : String,
            required: true,
            unique: true
        },
        confirmPassword: {
            type : String,
            required: true,
            unique: true
        },
        isUser: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
       
    }, { timestamps: true })

    const userModel = mongoose.model('user', userSchema);
    export default userModel;
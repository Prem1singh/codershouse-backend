import mongoose from 'mongoose'
const UserSchema=mongoose.Schema({
    name:{
        type:String
    },
    userName:{
        type:String,
        // unique:true
    },
    fullName:{
        type:String,
        required:false,
        default:"Prem"
    },
    email:{
        type:String,
        // unique:true,
    },
    phone:{
        type:Number,
        unique:true,
        required:true
    },
    password:{
        type:String,
    },
    Avatar:{
        type:String,
    },
    Activated:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})
const UserModel=mongoose.model('user',UserSchema);
export default UserModel;
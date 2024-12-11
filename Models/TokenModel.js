import mongoose, { Schema } from "mongoose";

const tokenSchema=mongoose.Schema({
    token:{
        type:String,
        required:true,
    },
    userId:{
        type:Schema.ObjectId,
        ref:'user',
    }
},{
    timestamps:true,
})

export const TokenModel=mongoose.model("token",tokenSchema)
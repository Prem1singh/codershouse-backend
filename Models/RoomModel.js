import mongoose from "mongoose";
const RoomScema=mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    roomType:{
        type:String,
        // required:true
    },
    ownerId:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        // required:true
    },
    speakers:[{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    }],
    listners:[{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    }
    ]
})
const RoomModel=mongoose.model('rooms',RoomScema)
export default RoomModel

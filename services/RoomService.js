import RoomModel from "../Models/RoomModel.js"

const RoomService={
   async createRoom(ownerId,name,roomType){
       const room= await RoomModel.create({
            ownerId,name,roomType,speakers:ownerId
        })
        return room
    },
    async updateRoom(filter,query){
        await RoomModel.updateOne({filter},{query})
    },
    async addListner(id,list){
        const room = await RoomModel.findOne({ _id: id });
        
        if (room) {
            room.listners.push(list);
            const res=await room.save();
            return res;
        }
    },
    async removeListner(id,list){
        const room = await RoomModel.findOne({ _id: id });
        
        if (room) {
            room.listners.pop(list);
            const res=await room.save();
            return res;
        }
    },
    async getAllRooms(){
        const rooms=await RoomModel.find().populate("speakers listners");
        return rooms;
    },
    async getSingleRoom(filter){
        const room=await RoomModel.findOne(filter).populate("speakers listners");
        return room;
    }
}
export default RoomService;
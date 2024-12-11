import RoomService from "../services/RoomService.js";

const RoomController={
    async createRoom(req,res){
        const {userId,roomName,roomType}=req.body;
        const room=await RoomService.createRoom(userId,roomName,roomType)
        if(room){
            const allRooms=await RoomService.getAllRooms();
            res.json({msg:"room Created",allRooms})
        }
        

    },
    async getRooms(req,res){
        if(req.user){
            const rooms= await RoomService.getAllRooms();
            res.json({msg:"rooms found",rooms})
        }
    },
    async getSingleRoom(req,res){
        const {id}=req.body;
        if(id){
            const singleRoom=await RoomService.getSingleRoom({_id:id});
            res.json({msg:"room Found",singleRoom,status:1});
        }
    },
    async joinRoom(req,res){
        const {userId,roomId}=req.body;
        if(userId&&roomId){
        const result=  await RoomService.addListner(roomId,userId);
        if(result){
            res.json({msg:"joined Successfully" ,status:1})
        }else{
            res.json({msg:"unable to join" ,status:0})
        }
        
        }else{
            res.json({msg:"UserId and roomId is required" ,status:0})

        }
    },
    async leaveRoom(req,res){
        const {userId,roomId}=req.body;
        if(userId&&roomId){
        const result=  await RoomService.removeListner(roomId,userId);
        if(result){
            res.json({msg:"Leave Successfully" ,status:1})
        }else{
            res.json({msg:"unable to leave" ,status:0})
        }
        
        }else{
            res.json({msg:"UserId and roomId is required" ,status:0})

        }
    }
}
export default RoomController;
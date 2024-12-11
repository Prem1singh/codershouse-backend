import express from "express";
import AuthUser from "../middleware/AuthUser.js";
import RoomController from "../Controllers/RoomController.js";

const RoomRouter=express.Router();
RoomRouter.post("/room/create",AuthUser.verfifyToken,RoomController.createRoom);
RoomRouter.post("/room/get",AuthUser.verfifyToken,RoomController.getRooms);
RoomRouter.post("/singleRoom/get",AuthUser.verfifyToken,RoomController.getSingleRoom);
RoomRouter.post("/room/join",AuthUser.verfifyToken,RoomController.joinRoom);
RoomRouter.post("/room/leave",AuthUser.verfifyToken,RoomController.leaveRoom);


export default RoomRouter;
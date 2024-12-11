import express from "express";
import UserController from "../Controllers/UserController.js";
import AuthUser from "../middleware/AuthUser.js";

const UserRouter=express.Router();
UserRouter.post("/userInfo/get",AuthUser.verfifyToken,UserController.getUser);
UserRouter.post("/account/logout",AuthUser.verfifyToken,UserController.logoutUser);

export default UserRouter;
import express from "express";
import OtpController from "../Controllers/OtpController.js";
import AuthUser from "../middleware/AuthUser.js";
import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  })
  
const upload = multer({ storage: storage }).single('file')

  

const AuthRouter=express.Router();
AuthRouter.post("/otp/send",OtpController.SendOtp)
AuthRouter.post("/otp/verify",OtpController.verifyOtp)
AuthRouter.get("/token/refresh",OtpController.tokenRefresh)
AuthRouter.post('/profile/verify', AuthUser.verfifyToken, upload ,OtpController.Activate);

export default AuthRouter

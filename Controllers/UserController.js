import { TokenModel } from "../Models/TokenModel.js";
import tokenService from "../services/tokenService.js";

const UserController={
    getUser(req,res){
        const user=req.user;
        if(req.user){
            res.json({msg:"user updated",user,status:1})
        }else{
            res.json({msg:"unable to update",status:0});
        }
    },
    async logoutUser(req,res){
        if(req.user){
            const { accessToken,refreshToken } = req.cookies;
            await TokenModel.deleteMany({userId:req.user._id})
            res.clearCookie("accessToken",{
                httpOnly: true,
                secure:true,
                sameSite:"none"
            });
            res.clearCookie("refreshToken",{
                httpOnly: true,
                secure:true,
                sameSite:"none"
            });
            res.json({msg:"LogOut successfuly", status:1});
        }
    }
}
export default UserController;
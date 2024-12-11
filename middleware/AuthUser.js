import tokenService from "../services/tokenService.js";
import UserService from "../services/UserService.js";

const AuthUser={
   async verfifyToken(req,res,next){
        const { accessToken } = req.cookies;

        try{
            const {userId}= await tokenService.verifyAccessToken(accessToken);
            req.user=await UserService.findUser({_id:userId});
            if(userId){
                next();
            }else{
                res.status(401).json({msg:"Token expired"});
            }
        }
        catch(err){
            console.log(err.message);
        }
       
    }
}
export default AuthUser;
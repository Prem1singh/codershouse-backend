import jwt from 'jsonwebtoken'
import { TokenModel } from '../Models/TokenModel.js';
const tokenService={
   createToken(payload){
        const accessToken= jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1m'})
        const refreshToken=  jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30m'});
        return {accessToken,refreshToken}
    },
    verifyAccessToken(token){
        try{
            const res= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
                
                return {msg:"Authenticate",userId:res.userId}   
        }
       catch(err){
            return {msg:err}
       }
    },
   async verifyRefreshToken(token){
        try{
            const refresh=await TokenModel.findOne({token:token})
            if(!refresh){
                return{msg:"UnAuthenticate user"};
            }
            const res= jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
                return {msg:"Authenticate",userId:res.userId}   
        }
       catch(err){
            return {msg:err}
       }
    },
   

}
export default tokenService;

import { TokenModel } from "../Models/TokenModel.js";
import getUrl from "../services/GetUrl.js";
import HashService from "../services/Hash_service.js";
import OtpService from "../services/OtpService.js";
import tokenService from "../services/tokenService.js";
import UserService from "../services/UserService.js";
import cloudinary from 'cloudinary'
const OtpController = {
    async SendOtp(req, res, next) {
        // const email = req.body?.email;
        const email=req.body?.email
        if (!email) {
            res.json({ msg: "Please Enter phone number or email", status: 0 })
        }
        const otp = OtpService.generateOtp();
        const ttl = 1000 * 60 * 2; //time to leave 2 min
        const expires = Date.now() + ttl;
        const data = `${email}.${otp}.${expires}`;
        const hash = HashService.hashOtp(data);
        const hashed = `${hash}.${expires}`;
        console.log(hashed,email)
        try {
            await OtpService.SendEmail(email, otp)
            .then((success)=>{
                console.log(success)
                res.json({ email: email, status: 1, hash: hashed, msg: 'Otp sent successfully' });
            })
            .catch((err)=>{
                console.log(err.message)
            })
        }
        catch (err) {
            console.log(err)
            res.json({ msg: "Unable to send otp", status: 0 });
        }

    },
    async verifyOtp(req, res) {
        const { hash, email, otp } = req.body;
        if (!hash || !email || !otp) {
            res.json({ msg: "All fields are required", status: 0 })
        }
        const [hashed, expires] = hash.split('.');
        if (Date.now() > Number(expires)) {
            res.json({ msg: "Otp is expired ", status: 0 })
        }
        const data = `${email}.${otp}.${expires}`
        if (!OtpService.verifyOtp(hashed, data)) {
            res.json({ msg: "Invalid Otp", status: 0 });
        }
        let user;

        user = await UserService.findUser({ email: email })
        if (!user) {
            user = await UserService.createUser({ email: email });
        }
        const { accessToken, refreshToken } = tokenService.createToken({ email: user.email, Activated: user.Activated, userId: user._id });
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        await TokenModel.create({ token: refreshToken, userId: user._id })
        res.json({  user });
    },
    async Activate(req, res) {
        let user=req.user;
        
        if (req.body.FullName && req.file) {
            const file=req.file;
            const fileBuffer=getUrl(file);
            const cloud=await cloudinary.v2.uploader.upload(fileBuffer.content)
            console.log(cloud);
            // const prod=await new SingleProductCloudModel({
            //     public_id:cloud.public_id,
            //     url:cloud.secure_url
            // })
            user = await UserService.updateUser({ _id: req.user._id }, {
                public_id:cloud.public_id,
                fullName: req.body.FullName,
                Avatar: cloud.secure_url,
                Activated:true,
            })
          
        }
        res.json({user,status:1});
    },
    async tokenRefresh(req,res){
        const {refreshToken}=req.cookies;
        const {userId}= await tokenService.verifyRefreshToken(refreshToken);

        if(userId){
            const {accessToken,refreshToken} =await tokenService.createToken({userId:userId})
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });
            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });
            await TokenModel.updateOne({userId:userId},{token:refreshToken})
            res.json({msg:"Token Refreshed",status:1});
            
        }else{
            res.json({msg:"Token Expired ",status:0});
        }
    }

}
export default OtpController;

import { TokenModel } from "../Models/TokenModel.js";
import HashService from "../services/Hash_service.js";
import OtpService from "../services/OtpService.js";
import tokenService from "../services/tokenService.js";
import UserService from "../services/UserService.js";

const OtpController = {
    async SendOtp(req, res, next) {
        const phone = req.body.phone;
        if (!phone) {
            res.json({ msg: "Please Enter Phone number", status: 0 })
        }
        const otp = OtpService.generateOtp();
        const ttl = 1000 * 60 * 2; //time to leave 2 min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`
        const hash = HashService.hashOtp(data);
        const hashed = `${hash}.${expires}`;
        try {
            await OtpService.sendBySms(phone, otp)
            res.json({ phone: phone, status: 1, hash: hashed, otp: otp, msg: 'Otp sent successfully' });
        }
        catch (err) {
            res.json({ msg: "Unable to send otp", status: 0 });
        }

    },
    async verifyOtp(req, res) {
        const { hash, phone, otp } = req.body;
        if (!hash || !phone || !otp) {
            res.json({ msg: "All fields are required", status: 0 })
        }
        const [hashed, expires] = hash.split('.');
        if (Date.now() > Number(expires)) {
            res.json({ msg: "Otp is expired ", status: 0 })
        }
        const data = `${phone}.${otp}.${expires}`
        if (!OtpService.verifyOtp(hashed, data)) {
            res.json({ msg: "Invalid Otp", status: 0 });
        }
        let user;

        user = await UserService.findUser({ phone: phone })
        if (!user) {
            user = await UserService.createUser({ phone: phone });
        }
        const { accessToken, refreshToken } = tokenService.createToken({ phone: user.phone, Activated: user.Activated, userId: user._id });
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
            user = await UserService.updateUser({ _id: req.user._id }, {
                fullName: req.body.FullName,
                Avatar: `/uploads/${req.file.filename}`,
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
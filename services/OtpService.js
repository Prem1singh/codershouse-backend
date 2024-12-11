import crypto from 'crypto'
import HashService from './Hash_service.js';
import twilio from 'twilio'
import dotenv from 'dotenv'
dotenv.config();
const OtpService = {
    generateOtp() {
        const otp = crypto.randomInt(100000, 999999);
        return otp;
    },
    async sendBySms(phone, otp) {

    },
    verifyOtp(hash, data) {
        const newHash = HashService.hashOtp(data);
        return newHash == hash;
    }
}
export default OtpService


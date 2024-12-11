import crypto from 'crypto';

const HashService={
    hashOtp(data){
       return crypto.createHmac('sha256',process.env.HASH_SECRET).update(data).digest('hex');
    }
}
export default HashService
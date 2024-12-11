import mongoose from "mongoose";

async function connection(){
    const conn= await mongoose.connect(
        "mongodb+srv://birju2singh:targen1234@cluster0.t0yep.mongodb.net/"
        ,{
            dbName:'codershouse'
        }
    )
    return conn
}
export default connection
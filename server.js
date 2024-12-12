import express from 'express'
import connection from './connection.js'
import dotenv from 'dotenv'
import UserRouter from './Routers/UserRouter.js';
import AuthRouter from './Routers/AuthRouter.js';


import cors from 'cors'

dotenv.config();
const app=express();
import cookieParser from 'cookie-parser';
import RoomRouter from './Routers/RoomsRouter.js';
app.use(cookieParser());
app.use(cors({
    origin: 'https://codershouse-frontend.vercel.app', // Allow this origin
    methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
    credentials: true, // If cookies or authorization headers are needed
}));
app.use('/uploads',express.static('./uploads'));
app.use(express.json({limit:'8mb'}));
app.use('/auth',AuthRouter);
app.use('/user',UserRouter);
app.use('/rooms',RoomRouter);


connection()
.then(()=>{
    console.log("Db Connected");
})
.catch(()=>{
    console.log("unable to connect")
})
const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`Listening on ${PORT} port`));
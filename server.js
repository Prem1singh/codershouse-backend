import express from 'express'
import connection from './connection.js'
import dotenv from 'dotenv'
import UserRouter from './Routers/UserRouter.js';
import AuthRouter from './Routers/AuthRouter.js';
dotenv.config();
import cors from 'cors'
const app=express();
import cookieParser from 'cookie-parser';
import RoomRouter from './Routers/RoomsRouter.js';

app.use(cookieParser());
app.use(express.json({limit:'8mb'}));
app.use(cors({
    origin: [
        'https://codershouse-frontend.vercel.app',
        'http://localhost:5173' // Add development origin if needed
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

connection()
.then(()=>{
    console.log("Db Connected");
})
.catch((error)=>{
    console.log("unable to connect",error)
})

app.get("/",(req,res)=>res.json({messagae:"working"}))
app.use('/auth',AuthRouter);
app.use('/user',UserRouter);
app.use('/rooms',RoomRouter);



const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`Listening on ${PORT} port`));
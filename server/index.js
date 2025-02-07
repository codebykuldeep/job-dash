import express from 'express';
import constant from './constant.js';
import { connectDb } from './db/initDb.js';
//import { logger } from './middleware/utils middleware.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { adminAuth, auth } from './middleware/auth.js';
import {createServer} from 'node:http'


//ROUTES IMPORT
import commonRouter from './routes/common.js'
import employersRouter from './routes/employers.js'
import userRouter from './routes/users.js'
import adminRouter from './routes/admin.js'
import postingsRouter from './routes/postings.js'
import ChatRouter from './routes/messages.js'
import { createDirForData } from './utils/utils.js';
import morgan from 'morgan';
import { Server } from 'socket.io';
import connectSocketIo from './sockets/socketConnect.js';

const app = express();
const PORT  = constant.PORT || 8000 ;

const corsOptions ={
    origin:'*',
    exposedHeaders:['Content-Type','Authorization'],
    credentials:true,
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:false}));


app.use('/',commonRouter);
app.use('/users',auth,userRouter);
app.use('/employers',auth,employersRouter);
app.use('/admin',auth,adminAuth,adminRouter);
app.use('/posts',auth,postingsRouter);
app.use('/chat',auth,ChatRouter);


app.get('/',(req,res)=>{
    return res.json({message:"SERVER IS RUNNING"});
})

// app.listen(PORT,()=>{
//     console.log(`SERVER IS RUNNING AT ${PORT}`);
//     connectDb()
//     createDirForData();
// })

const server = createServer(app);

export const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
});



io.on('connection',connectSocketIo)



server.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT ${PORT}`);
    connectDb()
    createDirForData();
})

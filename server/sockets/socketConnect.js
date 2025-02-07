import { getChatsByRoomId, writeNewMessage } from "../lib/messages.js";

async function connectSocketIo(socket){
    console.log(socket.id);
    console.log('USER CONNECTED');


    socket.on('message',({room,message,sender,reciever})=>{
        
        writeNewMessage(sender,reciever,message,room);
        console.log('message : '  + message);
        socket.to(room).emit("receive", message);
    })
    socket.on('join-room',async (room)=>{
        console.log(`User - ${room} joined room - ${room}`);
        
        socket.join(room);
        const data = await getChatsByRoomId(room);
        
        socket.emit("get-chat",data);
    })
    socket.on('disconnect',()=>{
        console.log('disconnected - '  + socket.id);
    })
    
}


export default connectSocketIo;
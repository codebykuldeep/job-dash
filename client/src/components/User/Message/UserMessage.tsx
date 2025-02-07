import React, { useEffect, useMemo, useState } from 'react';
import classes from './user-Message.module.css'
import MessageContacts from './MessageContacts';
import ChatBox from './ChatBox';
import { Box } from '@mui/material';
import { io } from 'socket.io-client';
import { IMessage, IUserWithRoom } from '../../../types/dataTypes';
import EmptyBox from './EmptyBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';


function UserMessage() {
    const user = useSelector((state:RootState)=>state.userSlice.user);
    const socket = useMemo(()=>io('http://localhost:8000'),[])
    const [selectUser,setSelectUser] = useState<IUserWithRoom>();
    const [room,setRoom] = useState<string>('');
    const [serverMessage,setServerMessage] = useState<IMessage[]>([]);

    function setData(data:IUserWithRoom){
        const room_id = data.room_id;
        setRoom(room_id);
        setSelectUser(data);
        socket.emit('join-room',room_id);
    }
    function sendMessage(text:string){
        const newMessage:IMessage={
            content:text,
            created_at:new Date().toDateString(),
            sender:user!.role,
        }
        setServerMessage(prev=>[...prev,newMessage]);
    }
    useEffect(()=>{
        socket.connect();
        socket.on('receive',(message)=>{
            console.log(message);
            const newMessage:IMessage={
                content:message,
                created_at:new Date().toDateString(),
                sender:user!.role === "user" ? "employer" :'user'
            }
            setServerMessage(prev=>[...prev,newMessage]);
        })
        socket.on('get-chat',(data)=>{
            setServerMessage(data)
        })
        return ()=>{
            console.log('scoket disconnected');
            socket.disconnect();
        }
    },[socket,user])
  return (
    <Box className={classes.container}>
        <MessageContacts dataUrl={'chat/'+user!.role} setData={setData} />
        {selectUser && room && <ChatBox room={room} socket={socket} messages={serverMessage} send={sendMessage} person={selectUser} user={user!}/>}
        {!selectUser && !room && <EmptyBox/>}
    </Box>
  )
}

export default UserMessage
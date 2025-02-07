import { Box, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import classes from "./chatbox.module.css";
import dummyUser from "../../../assets/dummy-user.jpg";
import SendIcon from "@mui/icons-material/Send";
import { Socket } from "socket.io-client";
import { IMessage, IUser, IUserWithRoom } from "../../../types/dataTypes";
import { chatDateFormat } from "../../../utils/utilsFunctions";

interface ChatBoxProps {
  socket: Socket;
  room:string;
  messages:IMessage[]
  person:IUserWithRoom;
  user:IUser,
  send:(text:string)=>void;
}

function ChatBox({ socket,room,messages,person,user,send }: ChatBoxProps) {
  const [message,setMessage] = useState('');
  const chatBoxRef=useRef<HTMLElement>()
  
  function sendMessage(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    socket.emit('message',{room,message,sender:user,reciever:person});
    send(message);
    setMessage('');
    setTimeout(()=>scrollToBottom,200)
  }
  function handleMessageChange(event:React.ChangeEvent<HTMLInputElement>){
    const text = event.target.value;
    setMessage(text);
  }

  function scrollToBottom(){
    const height = chatBoxRef.current?.scrollHeight;
    if(chatBoxRef.current && height){
      chatBoxRef.current.scrollTop = height + 50;
    }
    
  }
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Box className={classes.person}>
          <Box className={classes.person_img}>
            <img src={person.image || dummyUser} alt="user img" />
          </Box>
          <Typography>{person.name}</Typography>
        </Box>
      </Box>
      <Box className={classes.message_container}>
        <Box className={classes.message_box} sx={{ bgcolor: "var(--dull-bg)" }} ref={chatBoxRef}>
          {messages.map((msg, ind) => (
            <div
              key={ind}
              className={msg.sender === user!.role ? classes.send : classes.recieved}
            >
              <p className={classes.msg_date}>{chatDateFormat(msg.created_at)}</p>
              <p className={classes.message} >
                {msg.content}
              </p>
            </div>
          ))}
        </Box>
        <form className={classes.message_input} onSubmit={sendMessage}>
          <Box className={classes.message_field}>
            <TextField
              fullWidth
              id="message"
              label=""
              variant="outlined"
              placeholder="Type your message here ..."
              value={message}
              onChange={handleMessageChange}
            />
          </Box>
          <button className={classes.message_btn} type="submit">
            <SendIcon fontSize="large" />
          </button>
        </form>
      </Box>
    </Box>
  );
}

export default ChatBox;

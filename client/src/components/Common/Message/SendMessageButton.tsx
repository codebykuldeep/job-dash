import React from "react";
import { userServerConnect } from "../../../utils/http-methods/userMethods";
import { useLocation, useNavigate } from "react-router-dom";
import classes from './send-message.module.css'

interface Props {
  chatId: string;
  children:React.ReactNode
}

function SendMessageButton({ chatId,children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  async function handleClick() {
    await userServerConnect("GET", `chat/create-room?id=${chatId}`);
    if(location.pathname.includes('user')){
      navigate(`/user/messages?chat=${chatId}`)
    }
    else{
      navigate(`/employer/messages?chat=${chatId}`)
    }
  }
  return (
    <button onClick={handleClick} className={classes.send_btn}>
      {children}
    </button>
  );
}

export default SendMessageButton;

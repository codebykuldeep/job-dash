import React from 'react';
import classes from './chatbox.module.css';
import chatImg from '../../../assets/chat.png'
import { Typography } from '@mui/material';

function EmptyBox() {
  return (
    <div className={classes.container}>
        <div className={classes.empty_box}>
          <div className={classes.empty_img}>
            <img src={chatImg} alt="chat img" />
          </div>
          <Typography variant='h4' sx={{color:'var(--grey)'}} >Please select a chat</Typography>
        </div>
    </div>
  )
}

export default EmptyBox
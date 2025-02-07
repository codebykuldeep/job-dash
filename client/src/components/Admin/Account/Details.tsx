import React from 'react'
import { IUser } from '../../../types/dataTypes'
import classes from './details.module.css'
import { nameFormatter } from '../../../helper/helperFunctions';
import nameImage from '../../../assets/admin/name.png';
import emailImage from '../../../assets/admin/email.png';
import roleImage from '../../../assets/admin/role.png';
import { Box } from '@mui/material';

const imageArr = [nameImage,roleImage,emailImage,roleImage];
const itemArr = ['admin_id','name','email','role'];

interface DetailsProps{
    user:IUser;
}
function Details({user}:DetailsProps) {
    
  return (
    <Box className={classes.container} sx={{bgcolor:'action.selected',borderRadius:'15px'}}>
      <Box className={classes.heading} >ACCOUNT DETAILS</Box>
      <Box className={classes.detail} >
        {itemArr.map((key, index) => (
          <div key={index} className={classes.card}>
            <div><img src={imageArr[index]} alt="img for title" /></div>
            <div>
              <h2>{nameFormatter(key)}</h2>
              <p>{user[key]}</p>
            </div>
          </div>
        ))}
      </Box>
    </Box>
  );
}

export default Details
import React from 'react';
import classes from './message-contacts.module.css'
import { Box, Typography } from '@mui/material';
import dummyUser from '../../../assets/dummy-user.jpg'
import { useFetch } from '../../../utils/custom-hooks/useFetch';
import { IUserWithRoom } from '../../../types/dataTypes';

interface MessageContactsProps{
  dataUrl:string;
  setData:(data:IUserWithRoom)=>void;
}

function MessageContacts({dataUrl,setData}:MessageContactsProps) {
  const [data,loading,error] = useFetch<IUserWithRoom[]>(dataUrl);
  if(error){
    return <p>Error while getting chats</p>
  }

  return (
    <Box className={classes.contacts}>
        <Box className={classes.header}>
          <Typography variant='h5'>
            Messages
          </Typography>
        </Box>
        <Box className={classes.list}>
            {
                loading ? (<>loading</>) : (
                  <>
                  {data && data.map((person)=>(
                    <Box key={person.room_id} className={classes.person} onClick={()=>setData(person)}>
                      <Box className={classes.person_img}>
                        <img src={person.image || dummyUser} alt='user img' loading='lazy'/>
                      </Box>
                      <Typography>{person.name}</Typography>
                    </Box>
                  ))}
                  </>
                )
            }
        </Box>
    </Box>
  )
}

export default MessageContacts
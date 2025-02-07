import React, { useCallback, useEffect } from 'react';
import classes from './message-contacts.module.css'
import { Box, Typography } from '@mui/material';
import dummyUser from '../../../assets/dummy-user.jpg'
import { useFetch } from '../../../utils/custom-hooks/useFetch';
import { IUserWithRoom } from '../../../types/dataTypes';
import { useLocation, useSearchParams } from 'react-router-dom';

interface MessageContactsProps{
  dataUrl:string;
  room:string;
  setData:(data:IUserWithRoom)=>void;
}

function MessageContacts({dataUrl,room,setData}:MessageContactsProps) {
  const {pathname} = useLocation();
  const [query,setQuery] = useSearchParams();
  const [data,loading,error] = useFetch<IUserWithRoom[]>(dataUrl);
  const chatId = query.get('chat');
  
  
  const handleClick = useCallback(function handleClick(person:IUserWithRoom){
    let id;
    if(pathname.includes('user')){
      id = person.emp_id;
    }
    else{
      id = person.user_id;
    }
    setQuery({'chat':id});
    setData(person)
  },[setQuery,setData,pathname]);

  useEffect(()=>{
    if(data && data.length > 0 && chatId){
      let person;
      if(pathname.includes('user')){
        person = data.find((entry)=>String(entry.emp_id) === chatId )
      }
      else{
        person = data.find((entry)=>String(entry.user_id) === chatId )
      }

      console.log(person);
      
      if(person){
        handleClick(person);
      }
    }
  },[data,chatId,handleClick,pathname])
  

  

  return (
    <Box className={classes.contacts}>
        <Box className={classes.header}>
          <Typography variant='h5'>
            Messages
          </Typography>
        </Box>
        <Box className={classes.list}>
            {
                loading ? (<>Loading</>) : (
                  <>
                  {data && data.map((person)=>(
                    <Box key={person.room_id} className={classes.person} sx={{bgcolor:person.room_id === room ? 'var(--grey)' : ''}}
                     onClick={()=>handleClick(person)}>
                      <Box className={classes.person_img} >
                        <img src={person.image || dummyUser} alt='user img' loading='lazy'/>
                      </Box>
                      <Typography>{person.name}</Typography>
                    </Box>
                  ))}
                  </>
                )
            }
            {
               data && data.length === 0 && (<p>No chats</p>)
            }
            {
              error &&
              (<p>Cannot get chats right now</p>)
            }
            
        </Box>
    </Box>
  )
}

export default MessageContacts
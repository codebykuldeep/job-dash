import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { AppDispatch } from '../../store/store';
import { UserVerify } from '../../utils/authMethods';
import {  getTokenString, removeToken, setToken } from '../../utils/utilsFunctions';
import { userActions } from '../../store/userSlice';
import HomeLoader from '../Common/HomeLoader';
//import ModeButton from '../Common/Home/ModeButton';
import Mode from '../Common/Home/Mode';

function RootLayout() {
  const [loading,setLoading] =useState(true);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(()=>{
    setLoading(true);
    if(getTokenString()){
      UserVerify()
      .then((result)=>{
        if(result.success){
          const {data,token} = result;
          setToken(token);
          dispatch(userActions.setUser(data));
          setLoading(false);
        }
        else{
          removeToken();
          setLoading(false);
        }
        
      })
      .catch(()=>{
        setLoading(false);
      })
    }
    else{
      setLoading(false);
    }
  },[dispatch])

  if(loading){
    return <HomeLoader/>
  }
  
  return (
    <>
    {!loading && <><Outlet/><Mode/></>}
    </>
  )
}

export default RootLayout
import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store';
import Loading from '../Common/Loading';
import Sidebar from '../Common/SideBar';
import classes from './admin-layout.module.css';

import AccountIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';


function AdminLayout() {
  const user = useSelector((state:RootState)=>state.userSlice.user);
  const [loading,setLoading]= useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user || (user && user.role !== 'admin')){
      navigate('/');
    }
    else{
      setLoading(false);
    }
  },[user,navigate])

  if(loading){
    return <Loading/>
  }
  return (
    <div className={classes.container}>
    <Sidebar list={list}/>
    <Suspense fallback={<Loading/>}>
      <Outlet/>
    </Suspense>
    </div>
  )
}

export default AdminLayout




const list=[
  {
      icon:<HomeIcon fontSize='large'/>,
      name:'Home',
      link:''
      
  },
  {
      icon:<BadgeIcon fontSize='large'/>,
      name:'Employers',
      link:'employers'
  },
  {
      icon:<PendingActionsIcon fontSize='large'/>,
      name:'Pendings',
      link:'pendings'
  },
  {
      icon:<AccountIcon fontSize='large'/>,
      name:'Acccount',
      link:'account'
  },
  {
    icon:<LogoutIcon fontSize='large'/>,
    name:'Logout',
    link:'/logout'
}
  ]
import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import Loading from '../Common/Loading';
import Sidebar from '../Common/SideBar';
import classes from './employer-layout.module.css'


import HomeIcon from '@mui/icons-material/Home';
import AccountIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../../App';

function EmployerLayout() {
  const user = useSelector((state:RootState)=>state.userSlice.user);
  const [loading,setLoading]= useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user || (user && user.role !== 'employer')){
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
      
    <Sidebar list={Boolean(user?.status) ? list : unApprovedList}/>
    
      <Suspense fallback={<Loading/>}>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Outlet/>
        </ThemeProvider>
      </Suspense>
    
    
    </div>
  )
}

export default EmployerLayout;

const unApprovedList =[
  {
    icon:<HomeIcon fontSize='large'/>,
    name:'Home',
    link:''
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

const list=[
  {
      icon:<HomeIcon fontSize='large'/>,
      name:'Home',
      link:''
      
  },
  {
      icon:<ArticleIcon fontSize='large'/>,
      name:'Posts',
      link:'posts'
  },
  {
      icon:<AddIcon fontSize='large'/>,
      name:'Add Posts',
      link:'add-post'
  },
  {
    icon:<SearchIcon fontSize='large'/>,
    name:'Find',
    link:'find'
  },
  {
    icon:<MessageIcon fontSize='large'/>,
    name:'Messages',
    link:'messages'
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
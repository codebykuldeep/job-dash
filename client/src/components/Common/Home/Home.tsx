import React  from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../store/store'
import { getTokenString, redirectToDashboard } from '../../../utils/utilsFunctions';
import classes from './home.module.css';
import { Box, Button, useColorScheme } from '@mui/material';


function Home() {
  const user  = useSelector((state:RootState)=>state?.userSlice?.user);
  const {mode} = useColorScheme();
  
  const navigate = useNavigate();
  const userStatus = getTokenString() && user;
 
  function handleClick(){
    if(userStatus){
      navigate(redirectToDashboard(user));
    }
    else{
      navigate('/auth');
    }
    
  }
  
  return (
    <Box className={classes.container} sx={{bgcolor:'background.default'}} data-testid='home-bg'>
      <div>
        <Box className={classes.text} sx={{color:mode === 'dark' ? 'text.secondary' : ''}}>
          Unlock Your Future: Find Your <br /><strong>Perfect Job</strong> Today!
        </Box>
        <p className={classes.para}>Welcome to findJob, where your dream job awaits! Browse thousands of job listings.</p>
        <div className={classes.button}>
          <Button variant='contained' onClick={handleClick} sx={{color:'white'}}>
            {userStatus ? "DashBoard" :'Login'}
          </Button>
        </div>
      </div>
    </Box>
  )
}

export default Home



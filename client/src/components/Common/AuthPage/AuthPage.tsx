import { Box } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import classes from './auth-page.module.css';


function AuthPage() {
    // const [ seachParams,setSeachParams]= useSearchParams();
    // const auth = seachParams.get('auth');
    const navigate = useNavigate();
    const {pathname} = useLocation();
    

    function handleFormChange(query:string){
        // setSeachParams({auth:query})
        navigate('/'+query);
    }
  return (
    <Box className={classes.container} sx={{bgcolor:"background.default"}}>
        <Box className={classes.image}>
          <img src={'https://res.cloudinary.com/dhnzclvra/image/upload/v1738215052/job-dashboard/cuwdu9yufmvblgnvinjv.png'} alt="auth side img" />
        </Box>
        <Box className={classes.form}>
            {pathname.includes('register') ? <Register handleFormChange={handleFormChange}/> : <Login handleFormChange={handleFormChange}/>}
        </Box>
    </Box>
  )
}

export default AuthPage
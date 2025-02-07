import React from 'react'
import classes from './admin-account.module.css';
import { Box } from '@mui/material';
import AdminImage from '../../../assets/admin.png'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useSearchParams } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
import Details from './Details';

function AdminAccount() {
  const user = useSelector((state:RootState)=>state.userSlice.user);
  const [searchParams,setSearchParams] = useSearchParams();
  const view = searchParams.get('view');

  function handleView(view:string){
    setSearchParams({view:view});
  }
  return (
    <Box className={classes.container} sx={{color:'text.primary',bgcolor:"background.default"}}>
      <Box className={classes.account}>
      <Box className={classes.left} sx={{bgcolor:"action.selected"}}>
        <Box className={classes.show_box}>
          <Box className={classes.image}><img src={AdminImage} alt='admin icon'/></Box>
          <Box>{user!.name}</Box>
        </Box>
        <Box className={classes.option}>
          <button onClick={()=>handleView('details')}>Details</button>
          {/* <button>Update Details</button> */}
          <button onClick={()=>handleView('password')}>Update Password</button>
        </Box>
      </Box>
      <Box className={classes.right}>
        {view === 'password' ? <UpdatePassword/> : <Details user={user!}/>}
      </Box>
      </Box>
    </Box>
  )
}

export default AdminAccount
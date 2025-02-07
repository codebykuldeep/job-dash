import { Box, Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store';
import VerificationModal from './VerificationModal';

function VerifyEmail() {
  const user = useSelector((state:RootState)=>state.userSlice.user);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let verified;
  let url ;
  if(user?.emp_id){
    verified = Boolean(user?.verified);
    url = 'employers'
  }
  else{
    verified = Boolean(user?.status);
    url = 'users'
  }

  
  return (
    <Box>
      <Box>Verify your Email</Box>
      <Box my={1}>
        <Button variant='contained' disabled={verified} onClick={handleOpen}>
          {verified ? 'Verified' : 'Click here to verify'}
        </Button>
      </Box>
      <VerificationModal open={open}  handleClose={handleClose} url={url}/>
    </Box>
  )
}

export default VerifyEmail
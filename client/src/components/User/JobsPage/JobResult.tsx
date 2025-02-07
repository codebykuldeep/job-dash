import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import JobCard from './JobCard';
import { Box, CircularProgress } from '@mui/material';
import classes from './job-result.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import SnackBar from '../../Common/AuthPage/SnackBar';


function JobResult() {
  const user =useSelector((state:RootState)=>state.userSlice.user);
  const {posts,loading,error} =useSelector((state:RootState)=>state.searchSlice)
  const [snackState,setsnackState] = useState({open:false,status:false,message:''})

  function handleSnackClose(){
    setsnackState(prev=>({...prev,open:false}));
  }
  function handleSnackOpen(){
    setsnackState({
      open:true,
      status:false,
      message:'Please complete your profile first !'
    });
  }

  if(loading){
    return  (
      <Box className={classes.loader}>
        <CircularProgress size={50}/>
      </Box>
    )
  }
  
  if(error){
    return <Box className={classes.empty} sx={{color:'text.primary'}}>
      Cannot get lastest jobs right now . 
    </Box>
  }

  
  if(!posts || posts.length === 0){
    return <Box className={classes.empty} sx={{color:'text.primary'}}>
      No result jobs for given query 
    </Box>
  }
  return (
    <>
      <Box className={classes.result_count} sx={{color:'text.primary'}}>Showing {posts.length} results</Box>
      <Grid container spacing={2} direction="row" sx={{alignItems:'stretch'}}>
        {posts.map((post, ind) => (
          <Grid size={12 / 2} key={ind}>
            <JobCard key={post.post_id} post={post} user={user!} handleOpen={handleSnackOpen} />
          </Grid>
        ))}
      </Grid>
      <SnackBar state={snackState} handleClose={handleSnackClose}/>
    </>
  );
}

export default JobResult
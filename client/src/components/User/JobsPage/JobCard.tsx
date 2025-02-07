import { Box, Button, Card, CardActions } from '@mui/material'
import React, { useState } from 'react'
import classes from './job-result.module.css';
import LocationIcon from '@mui/icons-material/LocationOn';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import { IPost, IUser } from '../../../types/dataTypes';
import { dateFormatter } from '../../../helper/helperFunctions';
import { userServerConnect } from '../../../utils/http-methods/userMethods';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { searchActions } from '../../../store/searchSlice';



interface JobCardProps{
  post:IPost;
  user:IUser;
  handleOpen:()=>void;
}

function JobCard({post,user,handleOpen}:JobCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [submit,setSubmit] = useState(false);
  const applied = Boolean(post.applied);


  async function handleApply(){
    
    if(!user?.resume || user?.experience === '' || !user?.summary || !user?.education ){
      handleOpen();
      return;
    }
    setSubmit(true);
    const result = await userServerConnect('GET','posts/apply',{post_id:post.post_id});
    if(Boolean(result.success)){
      dispatch(searchActions.updatePost(Number(post.post_id)));
    }  
    setSubmit(false);
  }
  return (
    <Card className={classes.card} sx={{bgcolor:'action.selected'}}>
      <Box className={classes.detail}>
        <Box className={classes.company}>
            {post.company_name || 'Not Available'}
        </Box>
        <Box className={classes.position}>
            <Box>{post.title}</Box>
        </Box>
        <Box className={classes.meta_info}>
            <div className={classes.info}><span><LocationIcon/></span><span>{post.location}</span></div>
            <div className={classes.info}><span><CalendarIcon/></span><span>{dateFormatter(post.created_at)}</span></div>
            <div className={classes.info}><span><SchoolIcon/></span><span>{post.education}</span></div>
        </Box>
        <Box className={classes.desc}>
            {post.description}
            {post.description}
        </Box>
        <Box className={classes.experience}>
          <span>Experience</span> - <span>{post.experience} year required</span>
        </Box>
        <Box className={classes.meta}>
            <span>{post.job_type}</span>
            <span>Last Date - {dateFormatter(post.date)}</span>
        </Box>
      </Box>
      <CardActions className={classes.card_btn}>
        <Button size="small" variant='contained' loading={submit}  loadingIndicator="Applying"
         onClick={handleApply} disabled={applied} sx={{width:'100px'}}>
          {applied ? 'Applied' : 'Apply'}
        </Button>
      </CardActions>
    </Card>
  )
}

export default JobCard
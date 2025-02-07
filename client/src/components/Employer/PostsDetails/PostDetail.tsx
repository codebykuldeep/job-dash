import React from 'react'
import classes from './post-detail.module.css'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../../utils/custom-hooks/useFetch';
import Loading from '../../Common/Loading';
import DetailCard from './DetailCard';
import { IPost } from '../../../types/dataTypes';
import Applicants from './Applicants';
import { Box } from '@mui/material';

function PostDetail() {
  const {id} =useParams();
  const [data,loading,error] = useFetch<IPost>(`posts/${id}`);
  if(loading && !data){
    return <Loading/>
  }
  if(error && !data){
    return <p>Error while loading page.Please try later</p>
  }


  return (
    <Box className={classes.container} sx={{color:'text.primary',bgcolor:"background.default"}}>
      <div>
        <h1>Post Details</h1>
        <DetailCard data={data!}/>
      </div>
      <div>
        <h2>Applicants for this Post</h2>
        <Applicants id={id!}/>
      </div>
    </Box>
  )
}

export default PostDetail
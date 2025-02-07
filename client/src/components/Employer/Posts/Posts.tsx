import React, { useEffect, useState } from 'react'
import { useFetch } from '../../../utils/custom-hooks/useFetch'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import Loading from '../../Common/Loading';
import classes from './posts.module.css'
import { IPost } from '../../../types/dataTypes';
import PostCard from './PostCard';
import { Box, Container, CssBaseline } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { deletePostMethod } from '../../../utils/http-methods/employersMethods';
import ErrorPage from '../../Common/ErrorPage';

function Posts() {
  
  const user = useSelector((state:RootState)=>state.userSlice.user)
  const [data,loading,error] = useFetch<IPost[]>('posts',{id:user!.emp_id})
  const [posts,setPosts] = useState<IPost[] | null>(null)

  useEffect(()=>{
    if(data){
      setPosts(data);
    }
  },[data])
  

  if(loading || !data){
    return <Loading/>
  }
  if(error){
    return <ErrorPage/>
  }

  
  
  async function deletePost(id:string) {
    
    const oldPosts = posts;
    setPosts(prev=>prev!.filter((post)=>post.post_id !== id))
    const result = await deletePostMethod(id);
    if(!result){
      setPosts(oldPosts);
    }
  }
  
  

  return (
    
    <Box className={classes.container} sx={{color:'text.primary',bgcolor:'background.default'}}>
      <CssBaseline/>
      <Container maxWidth='md' className={classes.heading}>
        <h1>All Jobs </h1>
      </Container>
      <Box className={classes.post_box}>
      <Container maxWidth='md' className={classes.posts}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          posts && posts.map((post)=>( <Grid key={post.post_id} size={12/3}>
            <PostCard  data={post} deletePost={deletePost}/>
          </Grid>))
        }
        
      </Grid>
        </Container>
      </Box>
    </Box>
    
  )
}

export default Posts
import React, { useEffect } from 'react';
import classes from './jobspage.module.css'
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import JobResult from './JobResult';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { searchPost } from '../../../store/searchSlice';
import { Box, useColorScheme } from '@mui/material';

function JobsPage() {
  const {mode} =useColorScheme()
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(searchPost(''));
  },[dispatch])
  return (
    <Box className={classes.container} sx={{bgcolor: mode === 'dark' ? '#202020': 'var(--dull-bg)'}}>
      <div className={classes.search}>
        <SearchBar/>
      </div>
      <div className={classes.content}>
        <div className={classes.filter}>
          <FilterBar mode={mode}/>
        </div>
        <div className={classes.result}>
          <JobResult/>
        </div>
      </div>
    </Box>
  )
}

export default JobsPage
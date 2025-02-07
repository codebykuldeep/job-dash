import React from 'react'
import classes from './home-loader.module.css'
import { Box, useColorScheme } from '@mui/material';

function HomeLoader() {
  const {mode} =useColorScheme();
  
  
  return (
    <Box className={classes.container}sx={{bgcolor:mode === 'dark' ? 'background.default' : ''}}>
      <div className={classes.spinnerContainer}>
        <div className={classes.spinner}></div>
        <div className={classes.loader}>
          <p>Loading</p>
          <div className={classes.words}>
            <span className={classes.word}>account</span>
            <span className={classes.word}>jobs</span>
            <span className={classes.word}>dashboard</span>
            <span className={classes.word}>companies</span>
            <span className={classes.word}>everything</span>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default HomeLoader
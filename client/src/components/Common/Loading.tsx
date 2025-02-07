import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import classes from './loading.module.css'

function Loading({bgColor="background.default"}:{bgColor?:string}) {
  return (
    <Box className={classes.loader} sx={{bgcolor:bgColor}}>
      <CircularProgress size={60} />
    </Box>
  )
}

export default Loading
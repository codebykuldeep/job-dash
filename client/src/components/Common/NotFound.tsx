import { Box, Stack } from '@mui/material'
import React from 'react';
import classes from './extra-comps.module.css'

function NotFound() {
  return (
    <Stack width={'100%'} height={'100vh'}  className={classes.not_found}>
        <Stack>
            <Box component={'h1'}>404</Box>
            <Box component={'h1'}>NOT FOUND</Box>
        </Stack>
    </Stack>
  )
}

export default NotFound
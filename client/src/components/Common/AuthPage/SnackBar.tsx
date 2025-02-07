import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { SnackBarType } from '../../../types/formTypes'

interface SnackbarProps{
    state:SnackBarType; 
    handleClose:()=>void;
}

function SnackBar({state,handleClose}:SnackbarProps) {
    const {open,status,message}= state;
    const vertical= 'top';
    const horizontal = 'right';
  return (
    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert
        onClose={handleClose}
        severity={status ? 'success' : 'error'}
        variant="filled"
        sx={{ width: '100%' }}
    >
        {message}
    </Alert>
      </Snackbar>
  )
}

export default SnackBar
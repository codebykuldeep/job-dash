import { Alert } from '@mui/material'
import React from 'react'
import classes from './emp-home-layout.module.css'

function RejectedHome() {
  return (
    <div className={classes.pending}>
        <div className={classes.message}>
            <Alert variant='outlined' severity='error' className={classes.warning}>
               <div className={classes.alert}>
                <div> YOUR ACCOUNT IS REJECTED</div>
                <div> After carefully reviewing your account ,it donot comply with our policies so you cannot register as employer</div>
               </div>
            </Alert>
        </div>
    </div>
  )
}

export default RejectedHome
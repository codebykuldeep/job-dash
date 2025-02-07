import React from 'react';
import classes from './emp-home-layout.module.css'
import { Alert } from '@mui/material';

function PendingHome() {
  return (
    <div className={classes.pending}>
        <div className={classes.message}>
            <Alert variant='outlined' severity='warning' className={classes.warning}>
               <div className={classes.alert}>
                <div> YOUR ACCOUNT IS ON HOLD</div>
                <div>After review by our admins , you can use services</div>
                <div> Please update your details in account</div>
               </div>
            </Alert>
        </div>
    </div>
  )
}

export default PendingHome
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IApplicant, IUser } from '../../../types/dataTypes';
import classes from './app-modal.module.css'
import { Alert, Button } from '@mui/material';
import { nameFormatter } from '../../../helper/helperFunctions';
import CallIcon from '@mui/icons-material/CallMade';
import { userServerConnect } from '../../../utils/http-methods/userMethods';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 800,
//   maxWidth:600,
  minHeight:400,
  color:'text.primary',
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
};

interface EmpModalProps{
    data:IApplicant,
    open:boolean;
    handleClose:()=>void;
    update:()=>void;
}

export default function AppModal({data,open,handleClose,update}:EmpModalProps) {
    const [errorState,setErrorState] = useState(false);
    const [submit,setSubmit] =useState(false);
    const user = data.user_data as unknown as IUser;
    const EmpDetails = ['user_id','name','email','phone','summary'];
    
    async function handleStatusUpdate(status:boolean){
      setSubmit(true);
      
      const result = await userServerConnect('POST','posts/status',undefined,{status:String(status),id:data.app_id});
      if(Boolean(result.success)){
        update();
        handleClose();
      }
      else{
        setErrorState(true)
      }
      setSubmit(false);
    }
  
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className={classes.modal}>
          <Box className={classes.heading}>
            <h1>Applicant Details</h1>
          </Box>
          <Box className={classes.content}>
            <Box className={classes.detail}>
              {EmpDetails.map((key, index) => (
                <p key={key}>
                  <span>{nameFormatter(key)} :</span>
                  <span>{user[key] || "Not Available"}</span>
                </p>
              ))}
              <p>
                  <span>Resume :</span>
                  <span><a href={user.resume} target='_blank' rel="noreferrer"><Button>Open <CallIcon/></Button></a></span>
                </p>
            </Box>
            {errorState && (
              <div className={classes.error}>
                Failed to update applicant status right now, Try later.
              </div>
            )}
            {submit && (
              <div className={classes.submit}>
                <Alert severity="info">Updating Status. Please wait !</Alert>
              </div>
            )}
            <Box className={classes.button}>
              <Button disabled={submit} variant="contained" onClick={()=>handleStatusUpdate(true)}>Looks Good</Button>
              <Button variant="contained" disabled={submit} onClick={()=>handleStatusUpdate(false)}>Reject</Button>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
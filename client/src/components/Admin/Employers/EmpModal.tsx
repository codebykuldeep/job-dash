import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IEmployer } from '../../../types/dataTypes';
import classes from './emp-modal.module.css'
import { Button } from '@mui/material';
import { nameFormatter } from '../../../helper/helperFunctions';
import { updateEmployerStatus } from '../../../utils/http-methods/adminMethods';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 500,
  maxWidth:600,
  minHeight:400,
  bgcolor: 'background.default',
//   border: '2px solid #000',
  color:'text.primary',
  boxShadow: 24,
};

interface EmpModalProps{
    data:IEmployer,
    open:boolean;
    handleClose:()=>void;
    update:()=>void;
}

export default function EmpModal({data,open,handleClose,update}:EmpModalProps) {
    const [errorState,setErrorState] = useState(false);
    
    const EmpDetails = ['emp_id','name','email','phone','company_name','summary'];
    const status = data.status === null ? "Not Approved" : Boolean(data.status) ? 'approved' : 'rejected';


    async function handleStatusUpdate(status:boolean){
      const emp_id = data.emp_id;
      const result = await updateEmployerStatus(emp_id,status);
      if(result){
        update();
        handleClose();
      }
      else{
        setErrorState(true)
      }
    }
  
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className={classes.modal}>
          <Box className={classes.heading}>
            <h1>Employer Details</h1>
            <span onClick={handleClose}><CloseIcon/></span>
          </Box>
          <Box className={classes.content}>
            <Box className={classes.detail}>
              {EmpDetails.map((key, index) => (
                <p key={key}>
                  <span>{nameFormatter(key)} :</span>
                  <span>{data[key] || "Not Available"}</span>
                </p>
              ))}
              <p>
                <span>Status</span>:<span>{status}</span>
              </p>
            </Box>
            {errorState && (
              <div className={classes.error}>
                Failed to update employer status right now, Try later.
              </div>
            )}
            <Box className={classes.button}>
              <Button variant="contained" onClick={()=>handleStatusUpdate(true)}>Approve</Button>
              <Button variant="contained" onClick={()=>handleStatusUpdate(false)}>Reject</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
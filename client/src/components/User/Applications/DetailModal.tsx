import React  from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IApplications, IUser } from '../../../types/dataTypes';
import classes from './detail-modal.module.css'
import { Button } from '@mui/material';
import { nameFormatter } from '../../../helper/helperFunctions';
import CallIcon from '@mui/icons-material/CallMade';
import { dateValidation } from '../../../utils/validation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 800,
//   maxWidth:600,
  minHeight:400,
  bgcolor: 'background.default',
//   border: '2px solid #000',
  boxShadow: 24,
  color:'text.primary'
};

interface EmpModalProps{
    data:IApplications,
    open:boolean;
    handleClose:()=>void;
    update?:()=>void;
}

export default function DetailModal({data,open,handleClose,update}:EmpModalProps) {
    const JobDetails = ['post_id','title','description','education','location','job_type','date'];
    const userData = data.user_data as unknown as IUser;
    const jobStatus = dateValidation(data.date)[1];
    const jobStatusValue =  jobStatus ? 'job expired' : 'active'

    const app_status = data.app_status === null ? 'pending' : Boolean(data.app_status) === true ?'selected' : 'rejected';
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className={classes.modal}>
          <Box className={classes.heading}>
            <h1>Applications Details</h1>
          </Box>
          <Box className={classes.content}>
            <Box className={classes.detail}>
              {JobDetails.map((key: string, index) => (
                <p key={key}>
                  <span>{nameFormatter(key)}</span> :
                  <span>
                    {data[key as keyof IApplications] || "Not Available"}
                  </span>
                </p>
              ))}
              <p>
                <span>Job post status :</span>
                <span className={jobStatus ? classes.expired : classes.active}>{jobStatusValue}</span>
              </p>
              <p>
                <span>Applied resume :</span>
                <span><a href={userData.resume} target='_blank' rel="noreferrer"><Button>Open <CallIcon/></Button></a></span>
              </p>
              <p className={classes[app_status]}>
                <span>Application status :</span>
                <span>{app_status}</span>
              </p>
            </Box>
            <Box className={classes.button}>
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
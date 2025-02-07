import  React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import OTPInput from 'react-otp-input';
import classes from './verify-email.module.css'
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button } from '@mui/material';
import { userServerConnect } from '../../../../utils/http-methods/userMethods';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { updateUser } from '../../../../store/userSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:400,
  bgcolor: 'background.paper',
  color:'text.primary',
  boxShadow: 24,
  border:'1px solid white'
};

interface VerificationModalProps{
    url:string;
    open:boolean;
    handleClose:()=>void;
}

export default function VerificationModal({open,url,handleClose}:VerificationModalProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [otp, setOtp] = useState('');
    const [otpStatus,setOTPStatus] = useState(false);
    const [submit,setSubmit] = useState(false);
    const [error,setError] = useState({status:false,message:''});
    const [empty,setEmpty] = useState(false);

    async function handleClick(){
        if(!otpStatus){
            setOTPStatus(true);
            await userServerConnect('GET',url+'/send-otp');
        }
        else{
            if(otp === '' ){
              setEmpty(true);
              return;
            }
            else{
              setEmpty(false);
            }

            setSubmit(true);
            const response = await userServerConnect('GET',url+'/verify-otp',{otp:otp})
            if(Boolean(response.success)){
                 dispatch(updateUser());
                handleClose();
            }
            else{
                setError({status:true,message:response.data.message});
            }
            setSubmit(false);
        }
    }
    
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
        <Box className={classes.close}>
            <button onClick={handleClose} ><CloseIcon/></button>
        </Box>
        <Box className={classes.otp_container}>
        <Box component={'h2'}>Verify your Email</Box>
        <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span></span>}
            inputStyle={classes.otp_box}
            inputType='number'
            renderInput={(props) => <input   {...props} />}
            />
        <Box>
        {empty && <Alert severity="warning">Please enter OTP</Alert>}
        {error.status && <Alert severity="error">{error.message}</Alert>}
        </Box>
        <Box>
            <Button variant='contained' onClick={handleClick} loading={submit} loadingPosition='end'>
                {otpStatus ? 'Verify Email' : 'Send OTP'}
            </Button>
        </Box>
        </Box>
        
        </Box>
      </Modal>
    </div>
  );
}
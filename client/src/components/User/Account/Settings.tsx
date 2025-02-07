import React, { FormEvent, useState } from 'react';
import classes from './user-account.module.css'
import { Alert, Box, Button, FormLabel, TextField } from '@mui/material';
import { userServerConnect } from '../../../utils/http-methods/userMethods';
import VerifyEmail from './VerifyEmail/VerifyEmail';

function Settings() {
  const [state,setState] = useState({password:'',old_password:''});
  const [submit,setSubmit] = useState(false);
  const [success,setSuccess] = useState(false);
  const [error,setError] = useState({status:false,message:''});

  function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    if(success){
      setSuccess(false);
    }
    if(error.status){
      setError(prev=>({...prev,status:false}));
    }
    const name = event.target.name;
    const value = event.target.value;
    setState((prev)=>({...prev,[name]:value}));
  }

  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setSubmit(true);
    if(state.password.length >= 6 && state.old_password.length >= 6){
      const result = await userServerConnect('POST','reset',undefined,state)
      if(Boolean(result.success)){
        setSuccess(true);
      }
      else{
        setError({status:true,message:result.data.message || 'Failed to update password'})
      }
    }
    else{
      if(!state.password || !state.old_password){
        setError({status:true,message:'Please fill both fields'})
      }
      else if(state.password.length < 6 || state.old_password.length < 6){
        setError({status:true,message:'Minimum password length is 6 characters.'})
      }
    }
    setSubmit(false);
  }
  return (
    <div className={classes.setting}>
      <div>
        <div>Update Password</div>
      </div>
      <form className={classes.setting_form} onSubmit={handleSubmit}>
        <Box className={classes.inp_form}>
          <FormLabel htmlFor={"old_password"} error={false}>
            Old Password
          </FormLabel>
          <TextField
            fullWidth
            placeholder={"Enter Old Passowrd"}
            id={"old_password"}
            name={"old_password"}
            type={"password"}
            onChange={handleChange}
          />
        </Box>
        <Box className={classes.inp_form}>
          <FormLabel htmlFor={"password"} error={false}>
            New Password
          </FormLabel>
          <TextField
            fullWidth
            placeholder={"Enter New Passowrd"}
            id={"password"}
            name={"password"}
            type={"password"}
            onChange={handleChange}
          />
        </Box>
        {
          error.status && (
            <Box className={classes.setting_error}>
              <Alert severity="error">{error.message}</Alert>
            </Box>
          )
        }
        {
          success && (
            <Box className={classes.setting_success}>
              <Alert severity="success">Password Updated.</Alert>
            </Box>
          )
        }
        <Box>
          <Button variant='contained' type='submit' disabled={submit}>Update</Button>
        </Box>
      </form>
      <VerifyEmail/>
    </div>
  );
}

export default Settings
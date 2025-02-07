import React, { FormEvent, useState } from 'react'
import classes from './details.module.css'
import { Alert, Box, Button, TextField } from '@mui/material'
import { userServerConnect } from '../../../utils/http-methods/userMethods';
function UpdatePassword() {
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
    <Box className={classes.container} sx={{bgcolor:'action.selected',borderRadius:'15px'}}>
      <div className={classes.heading}>Update Password</div>
      <div className={classes.form_box}>
        <div className={classes.form_head}>Update your account password.Please fill below details</div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.input}>
            <TextField
              id="old_password"
              name="old_password"
              label="Old Password"
              type="password"
              variant="standard"
              onChange={handleChange}
            />
          </div>
          <div className={classes.input}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              onChange={handleChange}
            />
          </div>
          <div>
                {error.status && (
                <Box className={classes.setting_error}>
                <Alert severity="error">{error.message}</Alert>
                </Box>
            )}
            {success && (
                <Box className={classes.setting_success}>
                <Alert severity="success">Password Updated.</Alert>
                </Box>
            )}
            </div>
          <div>
            <Button variant='contained' type='submit' loading={submit} loadingPosition='end'>Update</Button>
          </div>
        </form>
      </div>
    </Box>
  );
}

export default UpdatePassword
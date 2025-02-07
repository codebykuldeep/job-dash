import { Box, Button, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import InputField from './InputField';
import classes from './register.module.css'
import { FormStateType, ReqBody } from '../../../types/formTypes';
import { checkValidFormState, populateFormState, validation } from '../../../utils/validation';
import SnackBar from './SnackBar';
import { UserRegistration } from '../../../utils/authMethods';

interface RegisterProps{
    handleFormChange:(q:string)=>void;
}

function Register({handleFormChange}:RegisterProps) {
    const [formState,setFormState] = useState<FormStateType>(initialformState);
    const [submit,setSubmit] = useState(false);
    const [snackBar,setSnackBar] =useState({
        open:false,
        status:false,
        message:'THIS IS A MESSAGE'
    })
    function handleSnackClose(){
        setSnackBar(prev=>({...prev,open:false}));
    }
  
    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
      const name = event.target.name;
      const value = event.target.value;
      const [message,status] =validation(name,value);
      
      setFormState((prev)=>({
        ...prev,
        [name]:{
          message:message,
          status:status,
          value:value
        }
      }))  
    }
    
    async function handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        setSubmit(true);
        if(checkValidFormState(formState)){ 
            const formData = new FormData(event.target as HTMLFormElement)
            const body = Object.fromEntries(formData.entries()) as ReqBody;
            const result = await UserRegistration(body);
            if(Boolean(result.success)){
                setSnackBar({open:true,message:'Registration successful !',status:true});
                setFormState(initialformState);
                (event.target as HTMLFormElement).reset()
            }
            else{
                setSnackBar({open:true,
                    message:result.data.message || 'Registration failed',
                    status:false});
            }
        }
        else{
            setFormState(populateFormState(formState));
        }
        setSubmit(false);
    }
    
  return (
    <>
        <Box sx={{color:'text.primary'}} className={classes.heading}><h1>Registration Page</h1></Box>
        <SnackBar state={snackBar} handleClose={handleSnackClose}/>
        <Box className={classes.container}>
            <form className={classes.form_register} onSubmit={handleSubmit}>
                <InputField label='Name' type='text' name='name' formState={formState} onChange={handleChange}>Enter your name</InputField>
                <InputField label='Email' type='text' name='email' formState={formState} onChange={handleChange}>Enter your email</InputField>
                <InputField label='Phone Number' type='number' name='phone' formState={formState} onChange={handleChange}>Enter your phone number</InputField>
                <InputField label='Password' type='text' name='password' formState={formState} onChange={handleChange}>Enter your password</InputField>
                <Box>
                <FormLabel htmlFor='role' id="role" error={formState['role'].status}>Register as</FormLabel>
                    <RadioGroup
                        id='role'
                        name="role"
                        sx={{display:'flex',flexDirection:'row'}}
                        onChange={handleChange}
                    >
                        <FormControlLabel sx={{color:'text.primary'}}  value="employer" control={<Radio />} label="Employer" />
                        <FormControlLabel sx={{color:'text.primary'}} value="user" control={<Radio />} label="Jobseeker" />
                    </RadioGroup>
                </Box>
                <div className={classes.auth_btn}>
                    <Button loading={submit} loadingPosition='end' type='submit' variant='contained'>Register</Button>
                </div>
            </form>
            <Box sx={{color:'text.primary'}} className={classes.switch}>Already registered ! Click <button onClick={()=>handleFormChange('login')}>here</button></Box>
        </Box>
    </>
  )
}

export default Register


const initialformState={
    name:{
        value:'',
        status:false,
        message:''
    },
    email:{
        value:'',
        status:false,
        message:''
    },
    phone:{
        value:'',
        status:false,
        message:''
    },
    password:{
        value:'',
        status:false,
        message:''
    },
    role:{
        value:'',
        status:false,
        message:''
    }
}




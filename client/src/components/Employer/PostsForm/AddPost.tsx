import { Box, Button } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import LeftForm from './LeftForm'
import RightForm from './RightForm';
import classes from './add-post.module.css'
import { checkValidFormState, populateFormState, validation } from '../../../utils/validation';
import { FormStateType, ReqBody } from '../../../types/formTypes';
import {  postsMethod} from '../../../utils/http-methods/employersMethods';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import SnackBar from '../../Common/AuthPage/SnackBar';

function AddPost() {
  const user = useSelector((state:RootState)=>state.userSlice.user);
  const [snackState,setSnackState] = useState({open:false,status:false,message:''})
  const [submit,setSubmit] = useState(false);
  const [formState,setFormState] = useState<FormStateType>(initialformState);


  function snackClose(){
    setSnackState(prev=>({...prev,open:false}));
  }
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    
    const name = event.target.name;
    const value = event.target.value;
    const [message, status] = validation(name, value);

    setFormState((prev) => ({
      ...prev,
      [name]: {
        message: message,
        status: status,
        value: value,
      },
    }));
  }

  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault()
    if(!user!?.company_name || !user?.summary){
      setSnackState({
        open:true,
        status:false,
        message:'Please complete your profile !'
      })
      return;
    }
   
    setSubmit(true);
    if (checkValidFormState(formState)) {
      const formData = new FormData(event.target as HTMLFormElement);
      const body = Object.fromEntries(formData.entries());
      const result = await postsMethod('add',{...body,emp_id:user!.emp_id} as ReqBody);
      if(result){
        setSnackState(({open:true,status:true,message:'Job post added successful'}));
        (event.target as HTMLFormElement).reset();
        setFormState(initialformState)
      }
      else{
        setSnackState(({open:true,status:false,message:'Failed to add Job post'}));
      }
      
      
    } else {
      setFormState(populateFormState(formState));
    }
    setSubmit(false);
  }
  function handleReset(event:FormEvent<HTMLFormElement>){
    (event.target as HTMLFormElement).reset();
    
    setFormState(initialformState)
    
  }
  return (
    <Box className={classes.container} sx={{color:'text.primary',bgcolor:"background.default"}} >
        <Box component={'h1'} className={classes.heading}>Post a job</Box>
        <form className={classes.form_container} onSubmit={handleSubmit} onReset={handleReset}>
            <div className={classes.form}>
                <LeftForm formState={formState} onChange={handleChange}/>
                <RightForm formState={formState} onChange={handleChange}/>
            </div>
            <div className={classes.btn}>
                <Button type='submit' variant='contained' loading={submit} loadingPosition='end'>Submit</Button>
                <Button type='reset' variant='contained' disabled={submit}>Reset</Button>
            </div>
        </form>
        <SnackBar state={snackState} handleClose={snackClose}/>
    </Box>
  )
}

export default AddPost;



export const initialformState={
  title:{
      value:'',
      status:false,
      message:''
  },
  experience:{
    value:'',
    status:false,
    message:''
  },
  description:{
      value:'',
      status:false,
      message:''
  },
  education:{
      value:'',
      status:false,
      message:''
  },
  location:{
      value:'',
      status:false,
      message:''
  },
  job_type:{
      value:'',
      status:false,
      message:''
  },
  date:{
    value:'',
    status:false,
    message:''
  }
}